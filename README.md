# AMNS Records — Website

A dark, minimal Next.js website for AMNS Records. Features a Spotify-powered releases section, music videos section, and team socials.

---

## Before You Start — Things to Fill In

Open `pages/index.js` and update the `TEAM` array with real Instagram and Spotify URLs for Nico and Andrew. That's the only manual edit needed before deploying.

---

## Step 1 — Get Your Spotify API Credentials

You need 4 values: Client ID, Client Secret, Refresh Token, and Artist ID.

### 1a. Create a Spotify App
1. Go to https://developer.spotify.com/dashboard
2. Log in and click **Create app**
3. Name it anything (e.g. "AMNS Records Site")
4. Set the Redirect URI to `http://localhost:3000`
5. Check the **Web API** checkbox, hit Save
6. On the app page, copy your **Client ID** and **Client Secret**

### 1b. Get Your Artist ID
Go to your Spotify artist profile in a browser. The URL looks like:
```
https://open.spotify.com/artist/4tZwfgrHOc3mvqYlEYSvVi
```
The part after `/artist/` is your Artist ID. Copy it.

### 1c. Get a Refresh Token
Run this in your terminal (replace the values):

```bash
# Step 1 — open this URL in your browser (replace YOUR_CLIENT_ID)
https://accounts.spotify.com/authorize?client_id=YOUR_CLIENT_ID&response_type=code&redirect_uri=http://localhost:3000&scope=user-read-private

# After you authorize, you'll be redirected to localhost:3000?code=XXXXXX
# Copy that code value

# Step 2 — exchange it for a refresh token (replace all 3 values)
curl -X POST https://accounts.spotify.com/api/token \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -u "YOUR_CLIENT_ID:YOUR_CLIENT_SECRET" \
  -d "grant_type=authorization_code&code=YOUR_CODE&redirect_uri=http://localhost:3000"
```

The response JSON will have a `refresh_token` field. Copy it.

---

## Step 2 — Run Locally (Optional)

```bash
# Install dependencies
npm install

# Copy the env example and fill in your values
cp .env.local.example .env.local
# (edit .env.local with your actual credentials)

# Run the dev server
npm run dev
```

Open http://localhost:3000. Releases will load from Spotify; if credentials are missing it falls back to placeholders silently.

---

## Step 3 — Push to GitHub

1. Create a new repo on https://github.com (make it private if you want)
2. In your project folder:

```bash
git init
git add .
git commit -m "initial commit"
git remote add origin https://github.com/YOUR_USERNAME/amns-records.git
git push -u origin main
```

---

## Step 4 — Deploy to Vercel

1. Go to https://vercel.com and sign in (or sign up — it's free)
2. Click **Add New → Project**
3. Click **Import** next to your `amns-records` GitHub repo
4. Vercel auto-detects Next.js — no config changes needed
5. Before hitting Deploy, click **Environment Variables** and add all 4:

| Name | Value |
|---|---|
| `SPOTIFY_CLIENT_ID` | your client id |
| `SPOTIFY_CLIENT_SECRET` | your client secret |
| `SPOTIFY_REFRESH_TOKEN` | your refresh token |
| `SPOTIFY_ARTIST_ID` | your artist id |

6. Click **Deploy**

That's it. Vercel gives you a `.vercel.app` URL immediately. Once Andrew points `amnsrecords.com` to Vercel, go to **Project Settings → Domains** and add `amnsrecords.com` — Vercel walks you through the DNS setup.

---

## Step 5 — Connecting amnsrecords.com

In the domain registrar (wherever Andrew bought the domain):

- Add a **CNAME** record: `www` → `cname.vercel-dns.com`
- Add an **A** record: `@` → `76.76.21.21`

Or just add the domain in Vercel's dashboard and follow their guided DNS instructions — it's the easiest path.

---

## Updating the Site Later

Every time you push to GitHub, Vercel auto-redeploys. No manual steps.

To update social links or team info, edit `TEAM` in `pages/index.js`.
To add music videos later, edit the `Videos` section in `pages/index.js` — swap the placeholder divs for `<iframe>` YouTube embeds.

---

## File Structure

```
amns-records/
├── lib/
│   └── spotify.js          ← Spotify API helpers
├── pages/
│   ├── _app.js
│   ├── index.js            ← Main page (edit TEAM array here)
│   └── api/
│       └── releases.js     ← Spotify API route
├── styles/
│   └── globals.css
├── .env.local.example      ← Copy this to .env.local
├── next.config.js
└── package.json
```
