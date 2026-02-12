import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getAuthenticatedUser } from "./users";

export const addComment = mutation({
  args: {
    content: v.string(),
    postId: v.id("posts"),
  },
  handler: async (ctx, args) => {
    let userId = null;
    try {
      const currentUser = await getAuthenticatedUser(ctx);
      userId = currentUser._id;
    } catch (error) {
      // Allow anonymous comments
    }

    const post = await ctx.db.get(args.postId);
    if (!post) throw new ConvexError("Post not found");

    const commentId = await ctx.db.insert("comments", {
      userId: userId,
      postId: args.postId,
      content: args.content,
    });

    await ctx.db.patch(args.postId, {
      comments: post.comments + 1,
    });

    return commentId;
  },
});

export const getComments = query({
  args: { postId: v.id("posts") },
  handler: async (ctx, args) => {
    const comments = await ctx.db
      .query("comments")
      .withIndex("by_post", (q) => q.eq("postId", args.postId))
      .order("desc")
      .collect();

    const post = await ctx.db.get(args.postId);
    const postCreatorId = post?.userId;

    const commentsWithInfo = await Promise.all(
      comments.map(async (comment) => {
        if (!comment.userId) {
          return {
            ...comment,
            user: {
              fullname: "Anonymous",
              image: null,
            },
            isPostCreator: false,
          };
        }

        const isPostCreator = comment.userId === postCreatorId;

        const user = await ctx.db.get(comment.userId);
        return {
          ...comment,
          userId: comment.userId,
          user: {
            fullname: user?.fullname || "Anonymous",
            image: user?.image,
          },
          isPostCreator,
        };
      }),
    );

    return commentsWithInfo;
  },
});

export const getPostCommentCount = query({
  args: { postId: v.id("posts") },
  handler: async (ctx, args) => {
    const post = await ctx.db.get(args.postId);
    return post?.comments || 0;
  },
});
