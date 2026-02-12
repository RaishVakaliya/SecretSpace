import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const submitFeedback = mutation({
  args: {
    feedbackType: v.string(),
    feedbackText: v.string(),
    email: v.optional(v.string()),
    name: v.optional(v.string()),
    rating: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    let userId = undefined;
    try {
      const identity = await ctx.auth.getUserIdentity();
      if (identity) {
        const user = await ctx.db
          .query("users")
          .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
          .first();
        if (user) {
          userId = user._id;
        }
      }
    } catch (error) {
      console.error("Error getting current user:", error);
    }

    const feedbackId = await ctx.db.insert("feedback", {
      feedbackType: args.feedbackType,
      feedbackText: args.feedbackText,
      email: args.email,
      name: args.name,
      rating: args.rating,
      createdAt: Date.now(),
      userId,
    });

    return feedbackId;
  },
});

export const getAllFeedback = query({
  handler: async (ctx) => {
    return await ctx.db.query("feedback").order("desc").collect();
  },
});
