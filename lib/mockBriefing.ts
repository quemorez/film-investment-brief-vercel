export function buildMockBriefing(input: {
  recipientEmail: string;
  timeframe: string;
  region: string;
  categories: string[];
}) {
  const generatedAt = new Date().toISOString();

  const executiveSummary = [
    "Capital remains selective and is rewarding projects with clearer commercial logic.",
    "International incentive strategy can materially improve financing efficiency and production economics.",
    "Creator-led ecosystems remain important as audience, talent, and intellectual property discovery channels."
  ];

  const items = [
    {
      title: "Studios continue concentrating spend into higher-conviction projects",
      source: "Industry Synthesis",
      url: "https://example.com/source-1",
      published: generatedAt,
      summary: "Major buyers continue emphasizing clearer audience positioning, fewer bets, and stronger packaging discipline.",
      investorWhy: "Selective spend tends to favor projects with tighter risk control, clearer demand signals, and stronger distribution logic.",
      section: "Investment / Deals"
    },
    {
      title: "International incentives remain a meaningful lever in production planning",
      source: "Industry Synthesis",
      url: "https://example.com/source-2",
      published: generatedAt,
      summary: "Territories outside the US continue competing on rebates, infrastructure, and production support.",
      investorWhy: "Where a project is produced can materially affect its return profile, financing stack, and timing of cash recovery.",
      section: "International"
    },
    {
      title: "Creator ecosystems continue competing for audience time and monetization",
      source: "Industry Synthesis",
      url: "https://example.com/source-3",
      published: generatedAt,
      summary: "Digital-first formats and creators continue drawing attention and ad budgets away from some traditional media channels.",
      investorWhy: "Creator-native ecosystems increasingly matter as pipeline sources for IP, talent, and audience validation.",
      section: "New Media / Creator Economy"
    }
  ];

  const html = `
    <div style="font-family:Arial,Helvetica,sans-serif;max-width:860px;margin:0 auto;padding:24px;color:#0f172a;">
      <div style="background:#ffffff;border-radius:20px;padding:24px;box-shadow:0 12px 40px rgba(15,23,42,.08);">
        <h1 style="margin:0 0 8px 0;">Film Investment Brief</h1>
        <div style="font-size:14px;color:#64748b;margin-bottom:18px;">
          Generated: ${new Date(generatedAt).toLocaleString()}<br/>
          Timeframe: last ${input.timeframe} day(s)<br/>
          Region: ${input.region}
        </div>
        <h2 style="margin:0 0 8px 0;">Executive Summary</h2>
        <ul>${executiveSummary.map((x) => `<li>${x}</li>`).join("")}</ul>
        <h2 style="margin:20px 0 10px 0;">Briefing Items</h2>
        ${items.map((item) => `
          <div style="padding:14px 0;border-top:1px solid #dbe3f0;">
            <h3 style="margin:0 0 6px 0;">${item.title}</h3>
            <div style="font-size:13px;color:#64748b;margin-bottom:8px;">${item.source} · ${new Date(item.published).toLocaleString()}</div>
            <p style="margin:0 0 10px 0;">${item.summary}</p>
            <div style="background:#eef4ff;border-left:4px solid #2563eb;padding:10px 12px;border-radius:8px;">
              <strong>Why this matters for investors:</strong> ${item.investorWhy}
            </div>
            <p style="margin:10px 0 0 0;"><a href="${item.url}" style="color:#2563eb;text-decoration:none;">Open source</a></p>
          </div>
        `).join("")}
      </div>
    </div>
  `;

  const text = [
    "Film Investment Brief",
    `Generated: ${generatedAt}`,
    `Timeframe: last ${input.timeframe} day(s)`,
    `Region: ${input.region}`,
    "",
    "Executive Summary:",
    ...executiveSummary.map((x) => `- ${x}`),
    "",
    ...items.flatMap((item) => [
      item.title,
      `Source: ${item.source}`,
      `Published: ${item.published}`,
      `Summary: ${item.summary}`,
      `Why this matters for investors: ${item.investorWhy}`,
      `Link: ${item.url}`,
      ""
    ])
  ].join("\n");

  return {
    generatedAt,
    timeframe: input.timeframe,
    region: input.region,
    executiveSummary,
    items,
    html,
    text,
    subject: `Film Investment Brief - ${new Date().toLocaleDateString()}`
  };
}
