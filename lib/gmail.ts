import { google } from "googleapis";

function encodeMessage(message: string) {
  return Buffer.from(message)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

export async function sendGmailMessage(args: {
  accessToken: string;
  from: string;
  to: string;
  subject: string;
  html: string;
  text: string;
}) {
  const auth = new google.auth.OAuth2();
  auth.setCredentials({ access_token: args.accessToken });

  const gmail = google.gmail({ version: "v1", auth });

  const mime = [
    `From: ${args.from}`,
    `To: ${args.to}`,
    `Subject: ${args.subject}`,
    "MIME-Version: 1.0",
    'Content-Type: multipart/alternative; boundary="brief-boundary"',
    "",
    "--brief-boundary",
    'Content-Type: text/plain; charset="UTF-8"',
    "",
    args.text,
    "--brief-boundary",
    'Content-Type: text/html; charset="UTF-8"',
    "",
    args.html,
    "--brief-boundary--"
  ].join("\n");

  await gmail.users.messages.send({
    userId: "me",
    requestBody: {
      raw: encodeMessage(mime)
    }
  });
}
