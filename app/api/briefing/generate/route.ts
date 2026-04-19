import { NextRequest, NextResponse } from "next/server";
import { buildMockBriefing } from "@/lib/mockBriefing";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (!body.recipientEmail) {
      return NextResponse.json({ error: "Recipient email is required." }, { status: 400 });
    }

    return NextResponse.json(buildMockBriefing(body));
  } catch {
    return NextResponse.json({ error: "Failed to generate briefing." }, { status: 500 });
  }
}
