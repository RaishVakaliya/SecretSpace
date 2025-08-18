import { Resend } from "resend";
import { internalAction } from "./_generated/server";

// Initialize Resend with the API key from environment variables
const resend = new Resend(process.env.RESEND_API_KEY);

export const sendSecretMessageNotification = internalAction({
  handler: async (
    ctx,
    {
      toEmail,
      firstName = "", // Recipient's first name
      lastName = "", // Recipient's last name
      profileImage = "", // Recipient's profile image URL
    }: {
      toEmail: string;
      firstName?: string;
      lastName?: string;
      profileImage?: string;
    }
  ) => {
    // Track retry attempts
    const maxRetries = 3;
    let currentAttempt = 0;
    let lastError: any = null;

    // Create a greeting using the recipient's name
    const fullName =
      firstName && lastName
        ? `${firstName} ${lastName}`
        : firstName || lastName || "there";

    // Default profile image if none is provided
    const defaultProfileImage =
      "https://res.cloudinary.com/dzwwok8fj/image/upload/v1755418057/default_avatar.jpg";
    const userProfileImage = profileImage || defaultProfileImage;

    while (currentAttempt < maxRetries) {
      try {
        const data = await resend.emails.send({
          from: "SecretSpace <no-reply@mail.secretspace.me>",
          to: toEmail,
          subject: "You have received a new secret message on SecretSpace",
          html: `
                  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px; background-color: #ffffff; text-align: center;">
                    <!-- Logo + App Name -->
                    <div style="margin-bottom: 14px;">
                      <img src="https://res.cloudinary.com/dzwwok8fj/image/upload/v1755418057/app_logo_bw3a90.jpg" 
                        alt="SecretSpace Logo"
                        width="66" height="36"
                        style="display: inline-block; vertical-align: middle; margin-right: 8px;" 
                      />
                      <span style="font-size: 32px; font-weight: bold; color: #111827; vertical-align: middle;">SecretSpace</span>
                    </div>      

                    <h2 style="color: #6366f1; margin-bottom: 0; margin-top: 0;">New Secret Message</h2>

                    <!-- Profile Section -->
                    <div style="margin: 16px 0; text-align: center;">
                      <!-- Profile Image -->
                      <img src="${userProfileImage}" 
                        alt="Profile Image"
                        width="50" height="50" 
                        style="border-radius: 50%; border: 3px solid #6366f1; object-fit: cover; margin-top: 0; margin-bottom: 8px;" 
                      />

                      <!-- Email -->
                      <p style="margin-bottom: 8px; margin-top: 0; font-size: 14px; color: #111;">
                        <span style="color: #111 !important; text-decoration: none !important;">
                          ${toEmail}
                        </span>
                      </p>
                      
                      <!-- Full Name -->
                      <p style="font-size: 16px; margin-bottom: 16px; margin-top: 0; font-weight: bold; color: #111827;">
                        Hi ${fullName || "there"},
                      </p>
                    </div>

                    <p style="margin-bottom: 13; margin-top: 0;">You have received a new secret message on SecretSpace.</p>
                    <p style="margin-bottom: 0; margin-top: 0;">Please log in to your account to view the message. Remember, secret messages can only be viewed once and will self-destruct after viewing.</p>

                    <!-- Button -->
                    <div style="margin: 30px 0; text-align:center;">
                      <a href="https://secretspace.me/inbox"
                        style="display:inline-block;
                          padding:12px 24px;
                          background-color:#3367d6; 
                          color:#ffffff; 
                          text-decoration:none; 
                          border-radius:8px; 
                          font-weight:bold;
                          font-size:16px;">
                        View Message
                      </a>
                    </div>

                    <p style="margin: 20px 0;">
                      Best regards,<br>
                      <span style="font-weight: bold;">SecretSpace Team</span>
                    </p>

                    <hr style="margin: 0 0; border: none; border-top: 1px solid #e5e7eb;" />

                    <!-- Footer -->
                    <footer style="margin-top: 20px">
                      <p style="font-size: 12px; color: #6b7280; margin-top: 0; margin-bottom: 8px;">
                        © SecretSpace 2025 | 
                        <a href="https://secretspace.me" style="color: #6366f1; text-decoration: none;">Visit Website</a>
                      </p>

                      <p style="font-size: 12px; color: #6b7280; margin-top: 0; margin-bottom: 8px;">
                        <a href="https://secretspace.me/help" style="color: #6366f1; text-decoration: underline; margin-right: 12px;">Help Center</a>
                        |
                        <a href="https://secretspace.me/privacy-policy" style="color: #6366f1; text-decoration: underline; margin: 0 12px;">Privacy Policy</a>
                        |
                      <a href="https://secretspace.me/security-center" style="color: #6366f1; text-decoration: underline; margin-left: 12px;">Security</a>
                      </p>

                      <p style="font-size: 12px; margin: 0 0; color: #6b7280;">
                        If you'd like to unsubscribe and stop receiving these emails, 
                        <a href="https://secretspace.me/settings" style="color: #6366f1; text-decoration: none;">click here</a>.
                      </p>
                    </footer>
                  </div>
                `,
        });

        // Fix the TypeScript error by accessing the id correctly
        console.log("Email sent successfully", { id: data?.data?.id });
        console.log("ctx auth", ctx.auth);

        return { success: true, id: data?.data?.id };
      } catch (error) {
        lastError = error;
        console.error("Failed to send email notification", {
          error,
          attempt: currentAttempt + 1,
          recipient: toEmail,
        });

        if (
          error instanceof Error &&
          (error.message.includes("rate limit") ||
            error.message.includes("timeout") ||
            error.message.includes("network"))
        ) {
          currentAttempt++;
          await new Promise((resolve) =>
            setTimeout(resolve, 1000 * Math.pow(2, currentAttempt))
          );
        } else {
          // Don't retry for other types of errors
          break;
        }
      }
    }

    return {
      success: false,
      error: lastError?.message || "Unknown error sending email",
    };
  },
});
