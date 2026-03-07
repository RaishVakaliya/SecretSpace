import { v } from "convex/values";
import { mutation, query, internalMutation } from "./_generated/server";
import { getAuthenticatedUser } from "./users";
import { internal } from "./_generated/api";

export const createSecretMessage = mutation({
  args: {
    encryptedContent: v.string(),
    uuid: v.string(),
    expiresAt: v.number(),
    recipientEmail: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const currentUser = await getAuthenticatedUser(ctx);

    const messageId = await ctx.db.insert("secret_messages", {
      userId: currentUser._id,
      clerkId: currentUser.clerkId,
      uuid: args.uuid,
      encryptedContent: args.encryptedContent,
      message: "",
      expiresAt: args.expiresAt,
      recipientEmail: args.recipientEmail,
    });

    if (args.recipientEmail) {
      try {
        const recipient = await ctx.db
          .query("users")
          .filter((q) => q.eq(q.field("email"), args.recipientEmail))
          .first();

        if (recipient) {
          // Check if email notifications are explicitly disabled
          if (recipient.emailNotifications === false) {
            console.log("Email notifications disabled for recipient", {
              email: args.recipientEmail,
            });
          } else {
            let firstName = "";
            let lastName = "";

            if (recipient.fullname) {
              const nameParts = recipient.fullname.split(" ");
              firstName = nameParts[0] || "";
              lastName = nameParts.slice(1).join(" ") || "";
            }

            await ctx.scheduler.runAfter(
              0,
              internal.sendNotification.sendSecretMessageNotification,
              {
                toEmail: args.recipientEmail,
                firstName,
                lastName,
                profileImage: recipient.image || "",
                isNewUser: false,
              },
            );
          }
        } else {
          await ctx.scheduler.runAfter(
            0,
            internal.sendNotification.sendSecretMessageNotification,
            {
              toEmail: args.recipientEmail,
              firstName: "",
              lastName: "",
              isNewUser: true,
            },
          );
        }
      } catch (error) {
        console.error("Error sending email notification", {
          error,
          recipientEmail: args.recipientEmail,
        });
      }
    }

    return messageId;
  },
});

export const getInboxMessages = query({
  handler: async (ctx) => {
    try {
      const currentUser = await getAuthenticatedUser(ctx);
      const now = Date.now();

      const messages = await ctx.db
        .query("secret_messages")
        .withIndex("by_recipient", (q) =>
          q.eq("recipientEmail", currentUser.email),
        )
        .filter((q) => q.gt(q.field("expiresAt"), now))
        .collect();

      return messages.map((message) => ({
        _id: message._id,
        uuid: message.uuid,
        expiresAt: message.expiresAt,
      }));
    } catch (error) {
      console.error("Error in getInboxMessages:", error);
      return [];
    }
  },
});

export const getSecretMessageByUuid = query({
  args: {
    uuid: v.string(),
  },
  handler: async (ctx, args) => {
    // Check if the message exists
    const message = await ctx.db
      .query("secret_messages")
      .withIndex("by_uuid", (q) => q.eq("uuid", args.uuid))
      .first();

    if (!message) return null;

    // Check if the message has expired
    if (message.expiresAt < Date.now()) {
      return null;
    }

    return message;
  },
});

// Delete a secret message after it's been viewed
export const deleteSecretMessage = mutation({
  args: {
    messageId: v.id("secret_messages"),
  },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.messageId);
    return true;
  },
});

export const getUserSecretMessages = query({
  handler: async (ctx) => {
    const currentUser = await getAuthenticatedUser(ctx);

    const messages = await ctx.db
      .query("secret_messages")
      .withIndex("by_creator", (q) => q.eq("clerkId", currentUser.clerkId))
      .collect();

    return messages;
  },
});

// Function to clean up expired messages (called by CRON job)
export const cleanExpiredMessages = internalMutation({
  handler: async (ctx) => {
    const now = Date.now();

    // Find all expired messages
    const expiredMessages = await ctx.db
      .query("secret_messages")
      .filter((q) => q.lt(q.field("expiresAt"), now))
      .collect();

    let deletedCount = 0;
    for (const message of expiredMessages) {
      await ctx.db.delete(message._id);
      deletedCount++;
    }

    return deletedCount;
  },
});
