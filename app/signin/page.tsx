use client";

import { signIn } from "next-auth/react";
import { Button } from "@/components/Button";

export default function SignInPage() {
  return (
    <main style={{minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center", padding:24}}>
      <div style={{maxWidth:560, width:"100%", background:"#fff", border:"1px solid #e2e8f0", borderRadius:24, padding:32, boxShadow:"0 12px 40px rgba(15,23,42,.08)"}}>
        <h1 style={{fontSize:36, marginTop:0}}>Authorize Google</h1>
        <p style={{color:"#64748b"}}>
          This app sends through the Gmail API only after the sender explicitly approves access. No Gmail password is stored in the app.
        </p>
        <Button onClick={() => signIn("google", { callbackUrl: "/" })}>Continue with Google</Button>
      </div>
    </main>
  );
}
