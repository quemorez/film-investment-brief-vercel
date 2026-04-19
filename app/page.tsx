use client";

import { useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { ComposerForm } from "@/components/ComposerForm";
import { BriefingPreview } from "@/components/BriefingPreview";
import { Button } from "@/components/Button";

export default function HomePage() {
  const { status, data: session } = useSession();
  const [briefing, setBriefing] = useState<any | null>(null);

  return (
    <main style={{minHeight:"100vh"}}>
      <div style={{maxWidth:1280, margin:"0 auto", padding:"40px 24px"}}>
        <div style={{background:"linear-gradient(135deg,#020617 0%, #0f172a 55%, #1d4ed8 100%)", color:"#fff", borderRadius:32, padding:32, boxShadow:"0 12px 40px rgba(15,23,42,.18)", marginBottom:24}}>
          <div style={{display:"flex", gap:24, alignItems:"flex-end", justifyContent:"space-between", flexWrap:"wrap"}}>
            <div>
              <div style={{fontSize:12, letterSpacing:"0.2em", textTransform:"uppercase", color:"#bfdbfe", marginBottom:12}}>Film Intelligence</div>
              <h1 style={{fontSize:52, lineHeight:1.05, margin:"0 0 14px 0", maxWidth:900}}>Deployment-ready investor briefing app.</h1>
              <p style={{maxWidth:760, color:"#dbeafe", margin:0}}>
                Browser-based, Vercel-ready, and safe by default through Google OAuth Gmail sending.
              </p>
            </div>

            <div style={{display:"flex", gap:10, flexWrap:"wrap"}}>
              {status === "authenticated" ? (
                <>
                  <div style={{alignSelf:"center", color:"#dbeafe", fontSize:14}}>
                    {session?.user?.email}
                  </div>
                  <Button onClick={() => signOut()}>Sign out</Button>
                </>
              ) : (
                <Button onClick={() => signIn("google")}>Authorize Google</Button>
              )}
            </div>
          </div>
        </div>

        {status !== "authenticated" ? (
          <div style={{background:"#fff", border:"1px solid #e2e8f0", borderRadius:24, padding:24, boxShadow:"0 12px 40px rgba(15,23,42,.08)"}}>
            <h2 style={{marginTop:0, fontSize:32}}>Authorize first</h2>
            <p style={{color:"#64748b", maxWidth:840}}>
              This production-oriented build uses Google OAuth. The sender explicitly approves Gmail send access, and the app sends through the Gmail API without storing a Gmail password.
            </p>
            <Button onClick={() => signIn("google")}>Continue with Google</Button>
          </div>
        ) : (
          <div style={{display:"grid", gridTemplateColumns:"460px minmax(0,1fr)", gap:24}}>
            <ComposerForm onGenerated={setBriefing} />
            <BriefingPreview briefing={briefing} />
          </div>
        )}
      </div>
    </main>
  );
}
