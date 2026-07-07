# Akshat Goyal — Portfolio (MERN Stack)

A production-style personal portfolio built to showcase full-stack skills —
not just a static page, but a real client + API + database application.

## What's inside

```
portfolio/
├── client/     React (Vite) + Tailwind CSS v4 + Framer Motion frontend
└── server/     Node.js + Express + MongoDB backend (contact form API)
```

### Design concept
The hero background is a custom-animated "request pipeline" — a packet
travelling through `Client → Gateway → Auth (JWT/RBAC) → API → Database`.
It's not decoration: it's literally the architecture you build (JWT auth,
RBAC, REST APIs, DB optimization), rendered as the site's signature visual.

Palette: deep ink navy background, warm amber "signal" accent, mint for
online/status states. Type: Space Grotesk (headings), Inter (body),
JetBrains Mono (tags/labels) — reinforcing the engineering identity.

### Tech used
- **Frontend**: React 19, Vite, Tailwind CSS v4, Framer Motion, react-icons
- **Backend**: Express 5, Mongoose, express-validator, express-rate-limit, CORS
- **Database**: MongoDB (Atlas free tier recommended)
- **Deployment**: Vercel (frontend) + Render (backend) + MongoDB Atlas

---

## 1. Run locally

### Prerequisites
- Node.js 18+ installed
- A free [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register) account (or local MongoDB)

### Backend
```bash
cd server
cp .env.example .env
# edit .env and paste your MongoDB connection string into MONGO_URI
npm install
npm run dev
```
Server runs on `http://localhost:5000`.

### Frontend
```bash
cd client
cp .env.example .env
npm install
npm run dev
```
Site runs on `http://localhost:5173`.

Open it in your browser — the contact form will POST to your local backend
and save messages to MongoDB.

---

## 2. Customize before deploying

- Update `client/src/data/resume.js` — all your content (About, skills,
  experience, projects) lives in this one file. Fix the GitHub/LinkedIn
  URLs and each project's real `github`/`live` links.
- Replace the favicon at `client/public/favicon.svg` if you want a custom one.
- Update the meta tags in `client/index.html` (title, description, OG tags).

---

## 3. Deploy live (free tier, step by step)

### Step A — Database: MongoDB Atlas
1. Create a free cluster at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas/register).
2. Under **Database Access**, create a user with a password.
3. Under **Network Access**, add `0.0.0.0/0` (allow access from anywhere) — fine for a portfolio project.
4. Click **Connect → Drivers**, copy the connection string. It looks like:
   `mongodb+srv://<user>:<password>@cluster0.xxxxx.mongodb.net/portfolio?retryWrites=true&w=majority`

### Step B — Backend: Render
1. Push this repo to GitHub.
2. Go to [render.com](https://render.com) → **New → Web Service** → connect your repo.
3. Set **Root Directory** to `server`.
4. Build command: `npm install` — Start command: `npm start`.
5. Add environment variables in Render's dashboard:
   - `MONGO_URI` = your Atlas connection string
   - `CLIENT_URL` = your Vercel URL (add after Step C, e.g. `https://akshat-portfolio.vercel.app`)
   - `PORT` = `5000` (Render sets its own PORT automatically, but this is a safe default)
6. Deploy. Note the live URL, e.g. `https://akshat-portfolio-api.onrender.com`.

> Free Render services spin down after inactivity and take ~30s to wake on
> the next request — normal for free tier, worth mentioning if a recruiter
> tries the form after it's been idle.

### Step C — Frontend: Vercel
1. Go to [vercel.com](https://vercel.com) → **Add New → Project** → import the same repo.
2. Set **Root Directory** to `client`.
3. Framework preset: Vite (auto-detected).
4. Add environment variable:
   - `VITE_API_URL` = your Render backend URL from Step B (e.g. `https://akshat-portfolio-api.onrender.com`)
5. Deploy. Vercel gives you a live URL, e.g. `https://akshat-portfolio.vercel.app`.
6. Go back to Render and update `CLIENT_URL` to this Vercel URL so CORS allows it, then redeploy the backend.

### Step D — Verify
Visit your Vercel URL, submit the contact form, and confirm the message
appears in your MongoDB Atlas collection (**Browse Collections** in the Atlas UI).

### Optional — custom domain
Both Vercel and Render support custom domains for free (you just pay the
domain registrar, e.g. Namecheap/GoDaddy — around $10–15/year for a `.dev` or `.com`).

---

## 4. What to say about this project on your resume/LinkedIn

Something like: *"Designed and deployed a full-stack portfolio (React,
Node.js/Express, MongoDB) with a REST API, input validation, and rate
limiting on the contact endpoint; deployed via Vercel + Render + MongoDB Atlas."*
This itself becomes a legitimate MERN project you can talk about in interviews.
