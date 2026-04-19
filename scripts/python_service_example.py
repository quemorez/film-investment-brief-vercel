from fastapi import FastAPI
from pydantic import BaseModel
from datetime import datetime

app = FastAPI()

class BriefingRequest(BaseModel):
    recipientEmail: str
    timeframe: str
    region: str
    categories: list[str]

@app.post("/generate")
def generate(req: BriefingRequest):
    generated = datetime.utcnow().isoformat() + "Z"
    return {
        "generatedAt": generated,
        "timeframe": req.timeframe,
        "region": req.region,
        "executiveSummary": ["Python service successfully generated this briefing."],
        "items": [{
            "title": "Sample Python-generated industry item",
            "source": "Python Service",
            "url": "https://example.com",
            "published": generated,
            "summary": "Replace this bridge output with your real Python news and investment intelligence engine.",
            "investorWhy": "This bridge lets the Vercel-hosted frontend call your Python briefing backend cleanly.",
            "section": "General Industry"
        }],
        "html": f"<div><h1>Film Investment Brief</h1><p>Generated: {generated}</p></div>",
        "text": f"Film Investment Brief\nGenerated: {generated}",
        "subject": "Film Investment Brief"
    }
