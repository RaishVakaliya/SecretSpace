import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getAuthenticatedUser } from "./users";

export const generateUploadUrl = mutation(async (ctx) => {
  const identity = await ctx.auth.getUserIdentity();
  if (!identity) throw new Error("Unauthorized");

  return await ctx.storage.generateUploadUrl();
});

export const createPost = mutation({
  args: {
    text: v.optional(v.string()),
    storageId: v.id("_storage"),
  },
  handler: async (ctx, args) => {
    const currentUser = await getAuthenticatedUser(ctx);

    const imageUrl = await ctx.storage.getUrl(args.storageId);
    if (!imageUrl) throw new Error("Image not found");

    //createPost
    const postId = await ctx.db.insert("posts", {
      userId: currentUser._id,
      imageUrl,
      storageId: args.storageId,
      text: args.text,
      likes: 0,
      comments: 0,
    });

    //increment number of posts count by 1
    await ctx.db.patch(currentUser._id, {
      posts: currentUser.posts + 1,
    });

    return postId;
  },
});

export const getFeedPosts = query({
  handler: async (ctx) => {
    let currentUserId = null;
    try {
      const identity = await ctx.auth.getUserIdentity();
      if (identity) {
        const user = await ctx.db
          .query("users")
          .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
          .first();
        if (user) {
          currentUserId = user._id;
        }
      }
    } catch (error) {
      console.error("Error getting current user:", error);
    }

    let postsQuery = ctx.db.query("posts").order("desc");

    // Filter out current user's posts if authenticated
    if (currentUserId) {
      postsQuery = postsQuery.filter((q) =>
        q.or(
          q.eq(q.field("userId"), null),
          q.neq(q.field("userId"), currentUserId),
        ),
      );
    }

    const posts = await postsQuery.collect();
    if (posts.length === 0) return [];

    // Enhance posts with user data
    const postsWithInfo = await Promise.all(
      posts.map(async (post) => {
        // Handle null userId for anonymous posts
        const postAuthor = post.userId ? await ctx.db.get(post.userId) : null;

        return {
          ...post,
          author: postAuthor
            ? {
                _id: postAuthor?._id,
                username: postAuthor?.username,
                image: postAuthor?.image,
              }
            : {
                _id: null,
                username: "Anonymous",
                image: null,
              },
        };
      }),
    );

    return postsWithInfo;
  },
});

export const toggleLike = mutation({
  args: { postId: v.id("posts") },
  handler: async (ctx, args) => {
    const currentUser = await getAuthenticatedUser(ctx);

    const existing = await ctx.db
      .query("likes")
      .withIndex("by_user_and_post", (q) =>
        q.eq("userId", currentUser._id).eq("postId", args.postId),
      )
      .first();

    const post = await ctx.db.get(args.postId);
    if (!post) throw new Error("Post not found");

    if (existing) {
      // Remove Like
      await ctx.db.delete(existing._id);
      await ctx.db.patch(args.postId, { likes: post.likes - 1 });

      return false;
    } else {
      // Add Like
      await ctx.db.insert("likes", {
        userId: currentUser._id,
        postId: args.postId,
      });

      await ctx.db.patch(args.postId, { likes: post.likes + 1 });

      return true;
    }
  },
});

export const deletePost = mutation({
  args: { postId: v.id("posts") },
  handler: async (ctx, args) => {
    const currentUser = await getAuthenticatedUser(ctx);

    const post = await ctx.db.get(args.postId);
    if (!post) throw new Error("Post not found");

    // verify ownership
    if (post.userId != currentUser._id)
      throw new Error("Not authorized to delete this post");

    // delete associated likes
    const likes = await ctx.db
      .query("likes")
      .withIndex("by_post", (q) => q.eq("postId", args.postId))
      .collect();

    for (const like of likes) {
      await ctx.db.delete(like._id);
    }

    // delete associated comments
    const comments = await ctx.db
      .query("comments")
      .withIndex("by_post", (q) => q.eq("postId", args.postId))
      .collect();

    for (const comment of comments) {
      await ctx.db.delete(comment._id);
    }

    // delete the storage file only if storageId exists
    if (post.storageId) {
      await ctx.storage.delete(post.storageId);
    }

    // delete the post
    await ctx.db.delete(args.postId);

    // decrement user's post count by 1
    await ctx.db.patch(currentUser._id, {
      posts: Math.max(0, (currentUser.posts || 1) - 1),
    });
  },
});

export const deleteAllUserPosts = mutation({
  handler: async (ctx) => {
    const currentUser = await getAuthenticatedUser(ctx);

    // Get all posts by the current user
    const userPosts = await ctx.db
      .query("posts")
      .withIndex("by_user", (q) => q.eq("userId", currentUser._id))
      .collect();

    // If no posts, return early
    if (userPosts.length === 0) return { deletedCount: 0 };

    // Delete each post and its associated data
    for (const post of userPosts) {
      // Delete associated likes
      const likes = await ctx.db
        .query("likes")
        .withIndex("by_post", (q) => q.eq("postId", post._id))
        .collect();

      for (const like of likes) {
        await ctx.db.delete(like._id);
      }

      // Delete associated comments
      const comments = await ctx.db
        .query("comments")
        .withIndex("by_post", (q) => q.eq("postId", post._id))
        .collect();

      for (const comment of comments) {
        await ctx.db.delete(comment._id);
      }

      // Delete the storage file if it exists
      if (post.storageId) {
        await ctx.storage.delete(post.storageId);
      }

      // Delete the post
      await ctx.db.delete(post._id);
    }

    // Reset user's post count to 0
    await ctx.db.patch(currentUser._id, {
      posts: 0,
    });

    return { deletedCount: userPosts.length };
  },
});

// Add this new function for text-only confessions
export const createTextPost = mutation({
  args: {
    text: v.string(),
  },
  handler: async (ctx, args) => {
    const currentUser = await getAuthenticatedUser(ctx);

    const postId = await ctx.db.insert("posts", {
      userId: currentUser._id,
      text: args.text,
      imageUrl: "",
      likes: 0,
      comments: 0,
    });

    await ctx.db.patch(currentUser._id, {
      posts: currentUser.posts + 1,
    });

    return postId;
  },
});

// Add this new function for anonymous text-only confessions
export const createAnonymousTextPost = mutation({
  args: {
    text: v.string(),
  },
  handler: async (ctx, args) => {
    const postId = await ctx.db.insert("posts", {
      userId: null,
      text: args.text,
      imageUrl: "",
      likes: 0,
      comments: 0,
    });

    return postId;
  },
});

// Add this new function for anonymous image posts
export const createAnonymousPost = mutation({
  args: {
    text: v.optional(v.string()),
    storageId: v.id("_storage"),
  },
  handler: async (ctx, args) => {
    const imageUrl = await ctx.storage.getUrl(args.storageId);
    if (!imageUrl) throw new Error("Image not found");

    const postId = await ctx.db.insert("posts", {
      userId: null,
      imageUrl,
      storageId: args.storageId,
      text: args.text,
      likes: 0,
      comments: 0,
    });

    return postId;
  },
});

// Add this function for anonymous image upload URL generation
export const generateAnonymousUploadUrl = mutation(async (ctx) => {
  return await ctx.storage.generateUploadUrl();
});

export const getUserPosts = query({
  handler: async (ctx) => {
    try {
      const identity = await ctx.auth.getUserIdentity();
      if (!identity) return [];

      const user = await ctx.db
        .query("users")
        .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
        .first();

      if (!user) return [];

      const posts = await ctx.db
        .query("posts")
        .withIndex("by_user", (q) => q.eq("userId", user._id))
        .order("desc")
        .collect();

      return posts;
    } catch (error) {
      console.error("Error in getUserPosts:", error);
      return [];
    }
  },
});

export const hasUserLikedPost = query({
  args: { postId: v.id("posts") },
  handler: async (ctx, args) => {
    try {
      const identity = await ctx.auth.getUserIdentity();
      if (!identity) return false;

      const user = await ctx.db
        .query("users")
        .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
        .first();

      if (!user) return false;

      const like = await ctx.db
        .query("likes")
        .withIndex("by_user_and_post", (q) =>
          q.eq("userId", user._id).eq("postId", args.postId),
        )
        .first();

      return !!like;
    } catch (error) {
      console.error("Error in hasUserLikedPost:", error);
      return false;
    }
  },
});

// Add this function to get the current like count for a post
export const getPostLikeCount = query({
  args: { postId: v.id("posts") },
  handler: async (ctx, args) => {
    const post = await ctx.db.get(args.postId);
    if (!post) return 0;
    return post.likes;
  },
});

// Add these new query functions for different sorting options
export const getFeedPostsByDate = query({
  handler: async (ctx) => {
    let currentUserId = null;
    try {
      const identity = await ctx.auth.getUserIdentity();
      if (identity) {
        const user = await ctx.db
          .query("users")
          .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
          .first();
        if (user) {
          currentUserId = user._id;
        }
      }
    } catch (error) {
      console.error("Error getting current user:", error);
    }

    let postsQuery = ctx.db.query("posts").order("desc");

    if (currentUserId) {
      postsQuery = postsQuery.filter((q) =>
        q.or(
          q.eq(q.field("userId"), null),
          q.neq(q.field("userId"), currentUserId),
        ),
      );
    }

    const posts = await postsQuery.collect();
    if (posts.length === 0) return [];

    // Enhance posts with user data
    const postsWithInfo = await Promise.all(
      posts.map(async (post) => {
        if (!post.userId) {
          return {
            ...post,
            author: {
              _id: null,
              username: "Anonymous",
              image: null,
            },
          };
        }

        // Fetch user for posts with a valid userId
        const postAuthor = await ctx.db.get(post.userId);

        if (!postAuthor) {
          return {
            ...post,
            author: {
              _id: null,
              username: "Anonymous",
              image: null,
            },
          };
        }

        return {
          ...post,
          author: {
            _id: postAuthor._id,
            username: postAuthor.username ?? "Anonymous",
            image: postAuthor.image ?? null,
          },
        };
      }),
    );

    return postsWithInfo;
  },
});

export const getFeedPostsByLikes = query({
  handler: async (ctx) => {
    let currentUserId = null;
    try {
      const identity = await ctx.auth.getUserIdentity();
      if (identity) {
        const user = await ctx.db
          .query("users")
          .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
          .first();
        if (user) {
          currentUserId = user._id;
        }
      }
    } catch (error) {
      console.error("Error getting current user:", error);
    }

    // Get all posts
    let postsQuery = ctx.db.query("posts");

    // Filter out current user's posts if authenticated
    if (currentUserId) {
      postsQuery = postsQuery.filter((q) =>
        q.or(
          q.eq(q.field("userId"), null),
          q.neq(q.field("userId"), currentUserId),
        ),
      );
    }

    const posts = await postsQuery.collect();
    if (posts.length === 0) return [];

    const postsWithInfo = await Promise.all(
      posts.map(async (post) => {
        if (!post.userId) {
          return {
            ...post,
            author: {
              _id: null,
              username: "Anonymous",
              image: null,
            },
          };
        }

        // Fetch user for posts with a valid userId
        const postAuthor = await ctx.db.get(post.userId);

        // Additional null check for postAuthor
        if (!postAuthor) {
          return {
            ...post,
            author: {
              _id: null,
              username: "Anonymous",
              image: null,
            },
          };
        }

        return {
          ...post,
          author: {
            _id: postAuthor._id,
            username: postAuthor.username ?? "Anonymous",
            image: postAuthor.image ?? null,
          },
        };
      }),
    );

    return postsWithInfo.sort((a, b) => b.likes - a.likes);
  },
});

export const getFeedPostsByComments = query({
  handler: async (ctx) => {
    // Get current user if authenticated (same as above)
    let currentUserId = null;
    try {
      const identity = await ctx.auth.getUserIdentity();
      if (identity) {
        const user = await ctx.db
          .query("users")
          .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
          .first();
        if (user) {
          currentUserId = user._id;
        }
      }
    } catch (error) {
      console.error("Error getting current user:", error);
    }

    // Get all posts
    let postsQuery = ctx.db.query("posts");

    if (currentUserId) {
      postsQuery = postsQuery.filter((q) =>
        q.neq(q.field("userId"), currentUserId),
      );
    }

    const posts = await postsQuery.collect();
    if (posts.length === 0) return [];

    // Enhance posts with user data
    const postsWithInfo = await Promise.all(
      posts.map(async (post) => {
        const postAuthor = post.userId ? await ctx.db.get(post.userId) : null;

        return {
          ...post,
          author: postAuthor
            ? {
                _id: postAuthor?._id,
                username: postAuthor?.username,
                image: postAuthor?.image,
              }
            : {
                _id: null,
                username: "Anonymous",
                image: null,
              },
        };
      }),
    );

    return postsWithInfo.sort((a, b) => b.comments - a.comments);
  },
});
