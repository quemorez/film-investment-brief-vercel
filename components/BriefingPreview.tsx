export function BriefingPreview({ briefing }: { briefing: any | null }) {
  if (!briefing) {
    return (
      <div style={{background:"#fff", border:"1px solid #e2e8f0", borderRadius:24, padding:24, boxShadow:"0 12px 40px rgba(15,23,42,.08)"}}>
        <div style={{color:"#64748b"}}>No briefing generated yet.</div>
      </div>
    );
  }

  return (
    <div style={{background:"#fff", border:"1px solid #e2e8f0", borderRadius:24, padding:24, boxShadow:"0 12px 40px rgba(15,23,42,.08)"}}>
      <h2 style={{marginTop:0, fontSize:28}}>Preview</h2>
      <p style={{color:"#64748b"}}>Generated {new Date(briefing.generatedAt).toLocaleString()}</p>

      <h3>Executive Summary</h3>
      <ul>
        {briefing.executiveSummary.map((line: string, index: number) => (
          <li key={index}>{line}</li>
        ))}
      </ul>

      <div style={{display:"grid", gap:18}}>
        {briefing.items.map((item: any, index: number) => (
          <div key={index} style={{borderTop:"1px solid #e2e8f0", paddingTop:16}}>
            <div style={{fontSize:20, fontWeight:700}}>{item.title}</div>
            <div style={{fontSize:13, color:"#64748b", marginTop:4}}>
              {item.source} · {new Date(item.published).toLocaleString()}
            </div>
            <p>{item.summary}</p>
            <div style={{background:"#eef4ff", borderLeft:"4px solid #2563eb", padding:"10px 12px", borderRadius:8}}>
              <strong>Why this matters for investors:</strong> {item.investorWhy}
            </div>
            <p><a href={item.url} target="_blank">Open source</a></p>
          </div>
        ))}
      </div>
    </div>
  );
}
