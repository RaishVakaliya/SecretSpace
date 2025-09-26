import { v } from "convex/values";
import { mutation, query, internalMutation } from "./_generated/server";
import { getAuthenticatedUser } from "./users";
import { internal } from "./_generated/api";

// Create a new secret message
export const createSecretMessage = mutation({
  args: {
    encryptedContent: v.string(),
    uuid: v.string(),
    expiresAt: v.number(),
    recipientEmail: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const currentUser = await getAuthenticatedUser(ctx);

    // Store the encrypted message in the database
    const messageId = await ctx.db.insert("secret_messages", {
      userId: currentUser._id,
      clerkId: currentUser.clerkId,
      uuid: args.uuid,
      encryptedContent: args.encryptedContent,
      message: "", // This field is not used but required by schema
      expiresAt: args.expiresAt,
      recipientEmail: args.recipientEmail,
    });

    // Send email notification to recipient if email is provided
    if (args.recipientEmail) {
      try {
        // Look up recipient user to check if they have email notifications enabled
        const recipient = await ctx.db
          .query("users")
          .filter((q) => q.eq(q.field("email"), args.recipientEmail))
          .first();

        // Only send notification if recipient exists and has notifications enabled
        if (recipient) {
          // Check if email notifications are explicitly disabled
          if (recipient.emailNotifications === false) {
            console.log("Email notifications disabled for recipient", {
              email: args.recipientEmail,
            });
          } else {
            // Send notification if enabled or setting is undefined
            // Extract first and last name from fullname if available
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
                profileImage: recipient.image || "", // Pass the profile image URL
              }
            );
          }
        } else {
          // Recipient not found in database, send notification anyway
          // In this case, we don't have first/last name
          await ctx.scheduler.runAfter(
            0,
            internal.sendNotification.sendSecretMessageNotification,
            {
              toEmail: args.recipientEmail,
              firstName: "",
              lastName: "",
            }
          );
        }
      } catch (error) {
        // Log error but don't block message creation
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

      // Find messages sent to this user's email that haven't expired
      // In getInboxMessages function
      const messages = await ctx.db
        .query("secret_messages")
        .withIndex("by_recipient", (q) =>
          q.eq("recipientEmail", currentUser.email)
        )
        .filter((q) => q.gt(q.field("expiresAt"), now)) // Only include non-expired messages
        .collect();

      return messages.map((message) => ({
        _id: message._id,
        uuid: message.uuid,
        expiresAt: message.expiresAt,
      }));
    } catch (error) {
      // If user not found or any other error, return empty array
      console.error("Error in getInboxMessages:", error);
      return [];
    }
  },
});

// Get a secret message by UUID
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
      // Message has expired, we can't delete in a query
      // The message will be deleted when someone tries to view it
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

// Get all secret messages created by the current user
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

    // Delete each expired message
    let deletedCount = 0;
    for (const message of expiredMessages) {
      await ctx.db.delete(message._id);
      deletedCount++;
    }

    return deletedCount;
  },
});
