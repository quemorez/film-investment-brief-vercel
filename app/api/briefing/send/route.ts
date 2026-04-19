import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
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

    const url = process.env.PYTHON_BRIEFING_API_URL;

    if (!url) {
      return NextResponse.json({ error: "PYTHON_BRIEFING_API_URL is not configured." }, { status: 500 });
    }

    const briefingRes = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });

    const briefing = await briefingRes.json();

    if (!briefingRes.ok) {
      return NextResponse.json(
        { error: briefing.error || "Failed to generate briefing from backend." },
        { status: briefingRes.status }
      );
    }

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