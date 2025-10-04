import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import bodyParser from "body-parser";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const usersFile = path.join(__dirname, "data", "users.json");

if (!fs.existsSync(usersFile)) fs.writeFileSync(usersFile, "[]", "utf8");

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

let currentUser = null;

const readUsers = () => JSON.parse(fs.readFileSync(usersFile, "utf8"));
const saveUsers = (users) =>
  fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));

// ---------- Authentication ----------
app.post("/api/register", (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res.status(400).json({ error: "Username and password required" });

  const users = readUsers();
  if (users.find((u) => u.username === username))
    return res.status(400).json({ error: "Username already exists" });

  users.push({ id: Date.now(), username, password, habits: [] });
  saveUsers(users);
  res.json({ message: "Registration successful. Please login." });
});

app.post("/api/login", (req, res) => {
  const { username, password } = req.body;
  const users = readUsers();
  const user = users.find(
    (u) => u.username === username && u.password === password
  );
  if (!user) return res.status(401).json({ error: "Invalid credentials" });
  currentUser = username;
  res.json({ message: "Login successful", username });
});

// ---------- Auth guard ----------
app.use((req, res, next) => {
  if (
    req.path.startsWith("/api/") &&
    !["/api/login", "/api/register"].includes(req.path)
  ) {
    if (!currentUser) return res.status(401).json({ error: "Not logged in" });
  }
  next();
});

// ---------- Habit Endpoints ----------
app.get("/api/habits", (req, res) => {
  const users = readUsers();
  const me = users.find((u) => u.username === currentUser);
  res.json(me?.habits || []);
});

app.post("/api/habits", (req, res) => {
  const users = readUsers();
  const me = users.find((u) => u.username === currentUser);
  const newHabit = { id: Date.now(), name: req.body.name, completed: [], streak: 0 };
  me.habits.push(newHabit);
  saveUsers(users);
  res.json(newHabit);
});

app.put("/api/habits/:id/complete", (req, res) => {
  const { date, details } = req.body;
  const users = readUsers();
  const me = users.find((u) => u.username === currentUser);
  me.habits = me.habits.map((h) => {
    if (h.id !== Number(req.params.id)) return h;
    const done = h.completed.find((d) => d.date === date);
    let completed = done
      ? h.completed.filter((d) => d.date !== date)
      : [...h.completed, { date, details }];
    return { ...h, completed, streak: completed.length };
  });
  saveUsers(users);
  res.json({ success: true });
});

app.delete("/api/habits/:id", (req, res) => {
  const users = readUsers();
  const me = users.find((u) => u.username === currentUser);
  me.habits = me.habits.filter((h) => h.id !== Number(req.params.id));
  saveUsers(users);
  res.json({ success: true });
});

// ---------- Virtual folder routes ----------
app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "public", "index.html"))
);
app.get("/login", (req, res) =>
  res.sendFile(path.join(__dirname, "public", "login.html"))
);
app.get("/register", (req, res) =>
  res.sendFile(path.join(__dirname, "public", "register.html"))
);

app.listen(PORT, () =>
  console.log(`✅ Server running at http://localhost:${PORT}`)
);
// --- route to home buttons page ---
app.get(["/", "/home"], (req, res) => {
  res.sendFile(path.join(__dirname, "public", "home.html"));
});

app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "login.html"));
});

app.get("/register", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "register.html"));
});