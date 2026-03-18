import { v } from "convex/values";
import { action } from "./_generated/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendContactEmail = action({
  args: {
    name: v.string(),
    email: v.string(),
    subject: v.string(),
    message: v.string(),
  },
  handler: async (_, args) => {
    const { name, email, subject, message } = args;

    try {
      const { data, error } = await resend.emails.send({
        from: "SecretSpace Contact <no-reply@mail.secretspace.me>",
        to: "vakaliyaraish7@gmail.com",
        subject: `Contact Form: ${subject}`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
            <h2 style="color: #6366f1;">New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Subject:</strong> ${subject}</p>
            <div style="margin-top: 20px; padding: 15px; background-color: #f9fafb; border-radius: 5px;">
              <p><strong>Message:</strong></p>
              <p style="white-space: pre-wrap;">${message}</p>
            </div>
            <p style="margin-top: 20px; font-size: 12px; color: #666;">
              This email was sent from the SecretSpace contact form.
            </p>
          </div>
        `,
      });

      if (error) {
        console.error("Resend error:", error);
        throw new Error(error.message);
      }

      return { success: true, id: data?.id };
    } catch (err) {
      console.error("Failed to send contact email:", err);
      throw new Error("Failed to send message. Please try again later.");
    }
  },
});
