import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const generateUploadUrl = mutation(async (ctx) => {
  return await ctx.storage.generateUploadUrl();
});

export const submitIssueReport = mutation({
  args: {
    issueType: v.string(),
    description: v.string(),
    email: v.optional(v.string()),
    storageId: v.optional(v.id("_storage")),
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

    let screenshotUrl = undefined;
    if (args.storageId) {
      const url = await ctx.storage.getUrl(args.storageId);
      screenshotUrl = url ?? undefined;
    }

    const reportId = await ctx.db.insert("report_issues", {
      issueType: args.issueType,
      description: args.description,
      email: args.email,
      screenshotUrl,
      storageId: args.storageId,
      createdAt: Date.now(),
      userId,
    });

    return reportId;
  },
});

export const getAllIssueReports = query({
  handler: async (ctx) => {
    return await ctx.db.query("report_issues").order("desc").collect();
  },
});
