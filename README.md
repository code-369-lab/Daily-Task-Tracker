# 🌱 Daily Habit Tracker

A modern, minimalist **Node + Express + Vanilla JS** web app to build and maintain good habits.  
Track daily tasks, mark them complete, add notes, and watch your progress circle fill up!

---

## 🚀 Live Demo

✅ **Deployed on Render:**  
👉 https://daily-task-tracker-1-4nnm.onrender.com


---

## 🧩 Overview

| Feature | Description |
|----------|--------------|
| 👤 Authentication | Register & login system with per‑user data |
| ✏️ Habit Management | Add, delete, mark done, and record daily details |
| 📅 Date Tracking | Mark tasks by date with streak counter |
| 🔵 Progress Rings | Circular SVG visualization, 100 % fill when task done |
| 🎉 Motivation | Fun “Congratulations” popup and emojis |
| 📁 Storage | JSON file‑based simple local persistence |
| 🧱 Backend | Express server with RESTful APIs |
| 💅 Frontend | Clean white Poppins UI, Flexbox layout |
| ☁️ Hosting | Render (Free Web Service) |

---

## ⚙️ Tech Stack

**Backend:** Node.js, Express, body‑parser, cors  
**Frontend:** HTML5, CSS3, Vanilla JS  
**Visualization:** Custom SVG Circular Progress  
**Storage:** Local JSON (`data/users.json`)  

---

## 🧠 Project Structure

habit-tracker/
├── server.js              # Express backend (routes + APIs)
├── package.json           # Node setup & dependencies
├── data/
│   └── users.json         # stores users & their habits
├── public/
│   ├── home.html          # front page (Login / Register buttons)
│   ├── login.html         # login form
│   ├── register.html      # registration page
│   ├── index.html         # main dashboard
│   ├── style.css          # all styling
│   └── script.js          # vanilla JS logic (UI, fetch, rings, etc.)
└── README.md              # project documentation


## 🧩 Installation (Local Setup)

If you'd like to run it locally before making changes:

```bash
git clone https://github.com/YOUR_USERNAME/habit-tracker.git
cd habit-tracker
npm install
mkdir data
echo "[]" > data/users.json
npm start
