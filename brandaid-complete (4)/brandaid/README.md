# 🏆 Brand Aid — The Ultimate Marketing Championship

A full-stack website for Brand Aid, built with HTML, CSS, JavaScript (frontend) and Node.js + Express (backend).

---

## 📁 Project Structure

```
brandaid/
│
├── frontend/                  ← All frontend files
│   ├── index.html             ← Main HTML (all 19 sections)
│   ├── css/
│   │   └── style.css          ← Complete stylesheet
│   └── js/
│       └── main.js            ← All frontend JavaScript
│
├── backend/                   ← Node.js + Express backend
│   ├── server.js              ← Main server entry point
│   ├── .env.example           ← Copy to .env and fill values
│   │
│   ├── routes/                ← API route definitions
│   │   ├── registration.js
│   │   ├── submission.js
│   │   ├── vote.js
│   │   ├── contact.js
│   │   ├── slogan.js
│   │   └── leaderboard.js
│   │
│   ├── controllers/           ← Business logic
│   │   ├── registrationController.js
│   │   ├── submissionController.js
│   │   ├── voteController.js
│   │   ├── contactController.js
│   │   ├── sloganController.js
│   │   └── leaderboardController.js
│   │
│   ├── models/                ← Data models (in-memory / MongoDB-ready)
│   │   ├── Registration.js
│   │   ├── Submission.js
│   │   ├── Vote.js
│   │   └── Contact.js
│   │
│   └── middleware/            ← Reusable middleware
│       ├── requestLogger.js
│       ├── validator.js
│       └── errorHandler.js
│
├── package.json               ← Dependencies & scripts
└── README.md                  ← This file
```

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Up Environment Variables
```bash
cp backend/.env.example backend/.env
# Now open backend/.env and fill in your values
```

### 3. Start the Server

**Development (auto-restarts on file changes):**
```bash
npm run dev
```

**Production:**
```bash
npm start
```

### 4. Open in Browser
```
http://localhost:3000
```

---

## 🌐 API Endpoints

| Method | Endpoint                  | Description                        |
|--------|---------------------------|------------------------------------|
| GET    | `/api/health`             | Server health check                |
| POST   | `/api/register`           | Register a new team                |
| GET    | `/api/register`           | Get all registrations (admin)      |
| POST   | `/api/submit`             | Submit a creative entry            |
| GET    | `/api/submit`             | Get all submissions (admin)        |
| POST   | `/api/vote`               | Cast a vote for a team             |
| GET    | `/api/vote/results`       | Get voting results & percentages   |
| POST   | `/api/contact`            | Send a contact message             |
| POST   | `/api/generate-slogan`    | AI slogan generation (Claude API)  |
| GET    | `/api/leaderboard`        | Get current leaderboard            |
| POST   | `/api/leaderboard/update` | Update team scores (admin)         |

---

## 🎨 Color Palette

| Name      | Hex       | RGB              |
|-----------|-----------|------------------|
| Turquoise | `#447F98` | rgb(68,127,152)  |
| Slate Blue| `#629BB6` | rgb(98,155,182)  |
| Platinum  | `#DADEE1` | rgb(218,222,237) |
| Glacier   | `#B9D8E1` | rgb(185,219,225) |
| Ice Blue  | `#D6EBF3` | rgb(214,235,243) |

---

## 📋 Sections (19 Total)

1. 🏠 Hero — Countdown timer, CTA buttons
2. ℹ️ About — What is Brand Aid, objectives, skills
3. 🔄 Event Structure — 4 rounds + judging criteria
4. 📜 Rules & Guidelines — 6 rule cards + rulebook download
5. 📝 Registration — Team registration form
6. 📤 Ad Submission — File upload + slogan text entry
7. 📊 Leaderboard — Live scores with progress bars
8. 🗳 Voting — People's Choice Award voting
9. 🤖 AI Slogan Generator — Claude-powered slogan tool
10. 🏆 Previous Winners — Hall of Fame
11. ❓ FAQ — Accordion-style Q&A
12. 🎁 Prizes — Winner, Runner-up, Special awards
13. 👨‍⚖️ Judges Panel — Expert judge profiles
14. 🤝 Sponsors — Sponsor logo display
15. 🖼 Gallery — Event photo grid
16. 📞 Contact — Info + message form
17. 📰 Blog — Marketing tips and case studies
18. ✍️ Content Writing — Article, copy, tagline challenges
19. 🤝 Team Finder — Companionship / team discovery

---

## 🔧 Tech Stack

**Frontend:**
- HTML5
- CSS3 (custom properties, grid, flexbox, animations)
- Vanilla JavaScript (ES6+)
- Google Fonts: Bebas Neue, Syne, DM Sans

**Backend:**
- Node.js (v18+)
- Express.js
- dotenv
- cors
- morgan
- node-fetch (for Anthropic API calls)

**AI Integration:**
- Anthropic Claude API (`claude-sonnet-4-20250514`)
- Backend proxy keeps API key secure

**Ready to upgrade to:**
- MongoDB + Mongoose (models are schema-ready)
- Nodemailer (email confirmation on registration)
- Multer (file uploads for ad submissions)

---

## 🛠 Deployment

### Deploy to Render / Railway
1. Push code to GitHub
2. Connect repo to Render or Railway
3. Set environment variables in dashboard
4. Deploy — it's live!

### Deploy to Vercel (frontend only)
1. Put the `frontend/` folder as your project root
2. Deploy — works as a static site

### Deploy to cPanel / Shared Hosting
1. Upload `frontend/` files to `public_html/`
2. For backend: use a Node.js hosting plan

---

## 📄 License

© 2025 Brand Aid · DBS College · Dehradun
Made with ❤️ for the students of DBS College
