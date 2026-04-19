import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const url = process.env.PYTHON_BRIEFING_API_URL;
    if (!url) {
      return NextResponse.json({ error: "PYTHON_BRIEFING_API_URL is not configured." }, { status: 500 });
    }

    const body = await req.json();

    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json({ error: data.error || "Python generator failed." }, { status: res.status });
    }

    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: "Failed to call Python generator." }, { status: 500 });
  }
}
