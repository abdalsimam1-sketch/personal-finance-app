import { Resend } from "resend";
export const resend = new Resend(process.env.RESEND_API_KEY);

export const sendPasswordResetEmail = async (sendTo: string, token: string) => {
  const resetLink = `${process.env.CLIENT_URL}/reset-password/${token}`;
  const html = `
    <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto; padding: 24px;">
      <h2 style="color: #1a1a1a;">Reset your Password</h2>
      <p style="color: #444; font-size: 15px; line-height: 1.5;">
        Thanks for requesting this service. Click the button below to reset your password to set a new one.
      </p>
      <a href="${resetLink}"
         style="display: inline-block; margin-top: 16px; padding: 12px 24px;
                background-color: #2563eb; color: #ffffff; text-decoration: none;
                border-radius: 6px; font-weight: bold;">
        Reset Password
      </a>
      <p style="color: #888; font-size: 13px; margin-top: 24px;">
        If you didn't request this, you can safely ignore this email.
      </p>
    </div>
  `;
  await resend.emails.send({
    from: "Personal Finance App <noreply@mail.abdals.site>",
    to: sendTo,
    subject: "Reset your password",
    html,
  });
};
