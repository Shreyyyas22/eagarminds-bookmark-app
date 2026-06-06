import { Resend } from "resend";

export async function sendWelcomeEmail(email: string, handle: string) {
  if (!process.env.RESEND_API_KEY) {
    return;
  }

  const resend = new Resend(process.env.RESEND_API_KEY);
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

  await resend.emails.send({
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
}
