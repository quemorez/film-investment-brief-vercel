import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { buildMockBriefing } from "@/lib/mockBriefing";
import { sendGmailMessage } from "@/lib/gmail";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email || !session.accessToken) {
      return NextResponse.json({ error: "You must authorize with Google before sending." }, { status: 401 });
    }

    const body = await req.json();

    if (!body.recipientEmail) {
      return NextResponse.json({ error: "Recipient email is required." }, { status: 400 });
    }

    const briefing = buildMockBriefing(body);

    await sendGmailMessage({
      accessToken: session.accessToken,
      from: session.user.email,
      to: body.recipientEmail,
      subject: briefing.subject,
      html: briefing.html,
      text: briefing.text
    });

    return NextResponse.json({ ok: true, briefing });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "Failed to send briefing." },
      { status: 500 }
    );
  }
}
