import { Resend } from "resend";

type SendWelcomeEmailResult =
  | { ok: true }
  | { ok: false; error: string };

export async function sendWelcomeEmail(
  email: string,
  handle: string,
): Promise<SendWelcomeEmailResult> {
  if (!process.env.RESEND_API_KEY) {
    console.warn("[email] RESEND_API_KEY is not set — skipping welcome email");
    return { ok: false, error: "RESEND_API_KEY is not configured" };
  }

  const resend = new Resend(process.env.RESEND_API_KEY);
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

  const { error } = await resend.emails.send({
    from: "EagerMinds Bookmarks <onboarding@resend.dev>",
    to: email,
    subject: "Welcome to EagerMinds Bookmarks",
    html: `
      <h2>Welcome, @${handle}</h2>
      <p>Your account has been created successfully.</p>
      <p>Your public profile is live at <a href="${appUrl}/@${handle}">${appUrl}/@${handle}</a>.</p>
      <p>Start adding bookmarks on your dashboard.</p>
    `,
  });

  if (error) {
    console.error("[email] Failed to send welcome email:", error.message);
    return { ok: false, error: error.message };
  }

  return { ok: true };
}
