# Film Investment Brief - Deployment-Focused Vercel Build

This package is a production-oriented rebuild of the Film Investment Brief web app.

## What it does
- Runs as a browser-based web app with no terminal for end users
- Uses Google OAuth so the sender explicitly authorizes Gmail send access
- Sends briefing emails from the authorized user's Gmail account
- Includes a polished UI for composing and previewing briefings
- Includes a mock generator now, plus a clean bridge for your Python intelligence backend

## Production model
This uses Google OAuth and Gmail API send scope.
That means email is sent from the Gmail account of the user who signed in and authorized access.

## Stack
- Next.js 14
- TypeScript
- NextAuth
- Gmail API via googleapis
- Vercel-ready routing and environment model

## Deploy to Vercel

### 1. Create a GitHub repo
Put the contents of this folder into a GitHub repository.

### 2. Import to Vercel
Create a new Vercel project and import the repo.

### 3. Add environment variables in Vercel
Set these in Project Settings > Environment Variables:

NEXTAUTH_URL=https://your-app.vercel.app
NEXTAUTH_SECRET=replace_with_a_long_random_secret
GOOGLE_CLIENT_ID=replace_me
GOOGLE_CLIENT_SECRET=replace_me
PYTHON_BRIEFING_API_URL=https://your-python-service.example.com/generate

If you are not using the Python backend yet, you can omit PYTHON_BRIEFING_API_URL.

### 4. Configure Google Cloud OAuth

Create a Google Cloud project and:
- enable Gmail API
- configure OAuth consent screen
- create OAuth Client ID for Web application

Add these Authorized redirect URIs:
- http://localhost:3000/api/auth/callback/google
- https://your-app.vercel.app/api/auth/callback/google

Scopes used:
- openid
- email
- profile
- https://www.googleapis.com/auth/gmail.send

### 5. Deploy
Push to GitHub. Vercel will build and deploy automatically.

## Local development
npm install
cp .env.example .env.local
npm run dev

## Security notes
- No Gmail password is stored in the app
- Sender explicitly authorizes Gmail send
- This package does not include a database. For production history/auditing, add one.

## Recommended next upgrades
- Real PDF generation on the server
- Persistent briefing history
- Admin allowlist
- Replace mock generator with your Python intelligence engine
- Add branded sender copy and logo assets
