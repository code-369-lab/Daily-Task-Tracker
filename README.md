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
├── server.js           -> Backend using Express (routes & APIs)
├── package.json        -> Node setup and dependencies
│
├── data/
│   └── users.json      -> Stores users and their habits
│
├── public/
│   ├── home.html       -> Front page (Login / Register buttons)
│   ├── login.html      -> Login page
│   ├── register.html   -> Registration page
│   ├── index.html      -> Main dashboard
│   ├── style.css       -> All styling
│   └── script.js       -> JavaScript logic for UI & features
│
└── README.md           -> Project documentation

---

## 🧩 Installation (Local Setup)

If you'd like to run it locally before making changes:

```bash
git clone https://github.com/YOUR_USERNAME/habit-tracker.git
cd habit-tracker
npm install
mkdir data
echo "[]" > data/users.json
npm start
