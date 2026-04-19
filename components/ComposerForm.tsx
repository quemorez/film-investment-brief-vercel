"use client";

import { useState } from "react";
import { Button } from "@/components/Button";

export function ComposerForm({ onGenerated }: { onGenerated: (payload: any) => void }) {
  const [recipientEmail, setRecipientEmail] = useState("");
  const [timeframe, setTimeframe] = useState("7");
  const [region, setRegion] = useState("both");
  const [categories, setCategories] = useState<string[]>(["film", "tv", "new_media", "investment"]);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  function toggleCategory(value: string) {
    setCategories((prev) => prev.includes(value) ? prev.filter((x) => x !== value) : [...prev, value]);
  }

  async function generatePreview() {
    setLoading(true);
    setStatus("");
    try {
      const res = await fetch("/api/briefing/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ recipientEmail, timeframe, region, categories })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to generate briefing");
      onGenerated(data);
      setStatus("Briefing generated.");
    } catch (error: any) {
      setStatus(error?.message || "Failed to generate briefing.");
    } finally {
      setLoading(false);
    }
  }

  async function sendBriefing() {
    setLoading(true);
    setStatus("");
    try {
      const res = await fetch("/api/briefing/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ recipientEmail, timeframe, region, categories })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to send briefing");
      onGenerated(data.briefing);
      setStatus("Briefing emailed successfully.");
    } catch (error: any) {
      setStatus(error?.message || "Failed to send briefing.");
    } finally {
      setLoading(false);
    }
  }

  const categoryOptions = [
    ["film", "Film"],
    ["tv", "TV"],
    ["new_media", "New Media"],
    ["investment", "Investment"],
    ["incentives", "Incentives"]
  ];

  return (
    <div style={{background:"#fff", border:"1px solid #e2e8f0", borderRadius:24, padding:24, boxShadow:"0 12px 40px rgba(15,23,42,.08)"}}>
      <h2 style={{marginTop:0, fontSize:28}}>Compose Briefing</h2>
      <p style={{color:"#64748b"}}>Generate a preview or send directly through your authorized Google account.</p>

      <div style={{display:"grid", gap:16}}>
        <div>
          <label style={{display:"block", marginBottom:8, fontWeight:600}}>Recipient email</label>
          <input
            type="email"
            value={recipientEmail}
            onChange={(e) => setRecipientEmail(e.target.value)}
            placeholder="recipient@example.com"
            style={{width:"100%", padding:"14px 16px", borderRadius:16, border:"1px solid #cbd5e1"}}
          />
        </div>

        <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:16}}>
          <div>
            <label style={{display:"block", marginBottom:8, fontWeight:600}}>Timeframe</label>
            <select value={timeframe} onChange={(e) => setTimeframe(e.target.value)} style={{width:"100%", padding:"14px 16px", borderRadius:16, border:"1px solid #cbd5e1"}}>
              <option value="1">Last 1 day</option>
              <option value="7">Last 7 days</option>
              <option value="30">Last 30 days</option>
            </select>
          </div>

          <div>
            <label style={{display:"block", marginBottom:8, fontWeight:600}}>Region</label>
            <select value={region} onChange={(e) => setRegion(e.target.value)} style={{width:"100%", padding:"14px 16px", borderRadius:16, border:"1px solid #cbd5e1"}}>
              <option value="both">Both</option>
              <option value="domestic">Domestic</option>
              <option value="international">International</option>
            </select>
          </div>
        </div>

        <div>
          <label style={{display:"block", marginBottom:8, fontWeight:600}}>Categories</label>
          <div style={{display:"flex", gap:8, flexWrap:"wrap"}}>
            {categoryOptions.map(([value, label]) => (
              <button
                key={value}
                type="button"
                onClick={() => toggleCategory(value)}
                style={{
                  padding:"10px 14px",
                  borderRadius:999,
                  border: categories.includes(value) ? "1px solid #0f172a" : "1px solid #cbd5e1",
                  background: categories.includes(value) ? "#0f172a" : "#fff",
                  color: categories.includes(value) ? "#fff" : "#334155",
                  cursor:"pointer"
                }}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div style={{display:"flex", gap:12, flexWrap:"wrap"}}>
          <Button onClick={generatePreview} disabled={!recipientEmail || loading}>
            {loading ? "Working..." : "Generate Preview"}
          </Button>
          <Button onClick={sendBriefing} disabled={!recipientEmail || loading}>
            {loading ? "Working..." : "Send Briefing"}
          </Button>
        </div>

        {status ? <div style={{fontSize:14, color:"#475569"}}>{status}</div> : null}
      </div>
    </div>
  );
}
