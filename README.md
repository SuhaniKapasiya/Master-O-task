# 7 UP 7 DOWN – SDE (Flutter & MERN Stack) Technical Assignment

A multi-part, full-stack technical assignment for SDE candidates, demonstrating skills in React, Node.js/Express, MongoDB, and Flutter (WebView + JS-Dart communication).

---

## 🔷 Part 1: React Web UI
**Live URL:** [https://master-o-task.vercel.app/login](https://master-o-task.vercel.app/login)

**Tech Stack:** React.js, Axios, TailwindCSS, Material UI, Responsive Design

### Features
- User Authentication (Register, Login, JWT)
- Email verification required for login
- Game screen: Play 7UP/7DOWN/7, roll dice, see point updates
- History screen: View round-wise logs
- Protected routes (auth required)
- Responsive for desktop & mobile

---

## 🔶 Part 2: Node.js + Express + MongoDB Backend API
**Base API URL:** [https://master-o-task.onrender.com/](https://master-o-task.onrender.com/)

**Tech Stack:** Node.js, Express.js, MongoDB, Mongoose, JWT, Nodemailer

### Features
- Auth: Register, Login (JWT), Email Verification (Nodemailer)
- Game logic: Bet on 7UP/7DOWN/7, roll dice, win/loss logic
- Game history stored in MongoDB
- Swagger API Docs (optional: Postman collection included)
- Protected endpoints (JWT token auth)
- Input validation, rate limiting, logging

#### 🧪 API Setup (Local)
```bash
git clone https://github.com/ghshivamkashyap/Master-O-task.git
cd backend
npm install
cp .env.example .env
# Add Mongo URI, JWT secret, SMTP creds
npm start
```

---

## 🟢 Part 3: Flutter App (WebView + JS-Dart Communication)
**APK:** Download APK from Google Drive (link provided separately)

**Tech Stack:** Flutter, WebView, Dart–JS Channels, SharedPreferences, Connectivity Plus

### Features
- Home screen: Button to open WebView
- WebView screen: Loads the React web app
- JS → Dart: React app sends message → Flutter shows alert
- Dart → JS: Flutter sends username to React app
- Shows loading indicator, handles 404s gracefully
- Detects poor network
- Persist state using Shared Preferences

#### 📱 Flutter App Setup (Local)
```bash
git clone <repo-url>
cd android
flutter pub get
flutter run
# OR install from APK link above
```

---

## 📂 Folder Structure
```
root/
├── backend/         # Node.js API
├── ui/              # React UI
├── android/         # Flutter WebView app
└── README.md        # This file
```

---

## 🔍 Assumptions / Notes
- User points start at a fixed value and change based on game outcome
- Auth is token-based (JWT), not session
- Email verification is required to login
- Game logic and dice rolls are server-generated
- Flutter and React communicate through a JS channel (bi-directional)

---

## 📷 Screenshots / Demo Video
- **Web screen recording:** [Google Drive Link](https://drive.google.com/file/d/14vnXV5KqJTFwbogRx16Ccxnq4H3t5OuT/view?usp=sharing)
- **Mobile app screen recording:** [Google Drive Link](https://drive.google.com/file/d/1d2qiuieEk9AVo-zJk85K3ngdfJo8DYRO/view?usp=sharing)

---

## 📬 Deliverables
- GitHub repo link (or zip)
- APK (linked above)
- This README
- [Optional] Loom video or screenshots

---

For any questions or clarifications, please contact the assignment author.
