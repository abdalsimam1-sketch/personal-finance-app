import { Resend } from "resend";
import { BadRequest } from "../errors/errors.js";
const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationEmail = async (token: string, to: string) => {
  const verificationLink = `${process.env.CLIENT_URL}/verify-account/${token}`;

  const { error } = await resend.emails.send({
    from: "Personal Finance <noreply@mail.abdals.site>",
    to,
    subject: "Verify your account",
    html: `
<div style="background:#f4f4f5;padding:40px 16px;font-family:Arial,Helvetica,sans-serif;">
  <table role="presentation" align="center" width="100%" style="max-width:480px;background:#ffffff;border-radius:12px;padding:32px;">
    <tr>
      <td>
        <h1 style="margin:0 0 16px;font-size:22px;color:#201f24;">Verify your account</h1>
        <p style="margin:0 0 24px;font-size:15px;line-height:1.5;color:#696868;">
          Thanks for signing up for Personal Finance. Click the button below to confirm your email address.
        </p>
        <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 0 24px;">
          <tr>
            <td style="background:#201f24;border-radius:8px;">
              <a href="${verificationLink}"
                 style="display:inline-block;padding:14px 28px;font-size:15px;font-weight:bold;color:#ffffff;text-decoration:none;">
                Verify Email
              </a>
            </td>
          </tr>
        </table>
        
        <p style="margin:0;font-size:12px;color:#9b9b9b;">
          If you didn't create an account, you can ignore this email.
        </p>
      </td>
    </tr>
  </table>
</div>
`,
  });
  if (error) {
    console.error("Resend error : ", error.message);
  }
};
