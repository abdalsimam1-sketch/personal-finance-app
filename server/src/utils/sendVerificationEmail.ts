import { Resend } from "resend";
export const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationEmail = async (sendTo: string, token: string) => {
  const verificationLink = `${process.env.CLIENT_URL}/verify-email/${token}`;
  const html = `
    <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto; padding: 24px;">
      <h2 style="color: #1a1a1a;">Verify your email</h2>
      <p style="color: #444; font-size: 15px; line-height: 1.5;">
        Thanks for signing up. Click the button below to verify your email address and activate your account.
      </p>
      <a href="${verificationLink}"
         style="display: inline-block; margin-top: 16px; padding: 12px 24px;
                background-color: #2563eb; color: #ffffff; text-decoration: none;
                border-radius: 6px; font-weight: bold;">
        Verify Email
      </a>
      <p style="color: #888; font-size: 13px; margin-top: 24px;">
        If you didn't create an account, you can safely ignore this email.
      </p>
    </div>
  `;
  await resend.emails.send({
    from: "Personal Finance App <noreply@mail.abdals.site>",
    to: sendTo,
    subject: "Verify you account email",
    html,
  });
};
