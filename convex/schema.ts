import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    username: v.string(),
    fullname: v.string(),
    email: v.string(),
    image: v.string(),
    posts: v.number(),
    clerkId: v.string(),
    searchable: v.optional(v.boolean()),
    emailNotifications: v.optional(v.boolean()),
  }).index("by_clerk_id", ["clerkId"]),

  posts: defineTable({
    userId: v.union(v.id("users"), v.null()),
    imageUrl: v.optional(v.string()),
    storageId: v.optional(v.id("_storage")),
    text: v.optional(v.string()),
    likes: v.number(),
    comments: v.number(),
  }).index("by_user", ["userId"]),

  comments: defineTable({
    userId: v.union(v.id("users"), v.null()),
    postId: v.id("posts"),
    content: v.string(),
  }).index("by_post", ["postId"]),

  likes: defineTable({
    userId: v.id("users"),
    postId: v.id("posts"),
  })
    .index("by_post", ["postId"])
    .index("by_user_and_post", ["userId", "postId"]),

  secret_messages: defineTable({
    userId: v.id("users"),
    uuid: v.string(),
    clerkId: v.string(),
    encryptedContent: v.string(),
    message: v.string(),
    expiresAt: v.number(),
    recipientEmail: v.optional(v.string()),
    encryptedKey: v.optional(v.string()),
  })
    .index("by_uuid", ["uuid"])
    .index("by_creator", ["clerkId"])
    .index("by_recipient", ["recipientEmail"]),

  feedback: defineTable({
    feedbackType: v.string(),
    feedbackText: v.string(),
    email: v.optional(v.string()),
    rating: v.optional(v.number()),
    name: v.optional(v.string()),
    createdAt: v.number(),
    userId: v.optional(v.id("users")),
  }),

  report_issues: defineTable({
    issueType: v.string(),
    description: v.string(),
    email: v.optional(v.string()),
    screenshotUrl: v.optional(v.string()),
    storageId: v.optional(v.id("_storage")),
    createdAt: v.number(),
    userId: v.optional(v.id("users")),
  }),
});
