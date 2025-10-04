// -------------------- Main Tracker Script --------------------
const habitForm = document.getElementById("habit-form");
const habitInput = document.getElementById("habit-input");
const habitList = document.getElementById("habit-list");
const welcomeUser = document.getElementById("welcomeUser");

let habits = [];
let selectedDate = new Date().toISOString().split("T")[0];
const emojis = ["🎉","👏","🌟","🥳","💪","🔥","🎯","🙌","🏆","😊"];

// ---------- Date Picker ----------
document.addEventListener("DOMContentLoaded", () => {
  const username = localStorage.getItem("username");
  if (username && welcomeUser) {
    welcomeUser.textContent = `👋 Hello, ${username}!`;
  }
  const datePicker = document.createElement("input");
  datePicker.type = "date";
  datePicker.value = selectedDate;
  datePicker.className = "date-picker";
  datePicker.addEventListener("change", (e) => {
    selectedDate = e.target.value;
    renderHabits();
  });
  document.querySelector(".app").insertBefore(datePicker, habitList);
  loadHabits();
});

  

// ---------- Load All Habits ----------
async function loadHabits() {
  const res = await fetch("/api/habits");
  if (!res.ok) {
    if (res.status === 401) window.location.href = "/login";
    return;
  }
  habits = await res.json();
  renderHabits();
}

// ---------- Add New Habit ----------
habitForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = habitInput.value.trim();
  if (!name) return;
  await fetch("/api/habits", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name }),
  });
  habitInput.value = "";
  loadHabits();
});

// ---------- Toggle Complete ----------
async function completeHabit(id) {
  const details = prompt("Enter details about your task:");
  await fetch(`/api/habits/${id}/complete`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ date: selectedDate, details }),
  });
  showCongrats(selectedDate);
  loadHabits();
}

// ---------- Delete Habit ----------
async function deleteHabit(id) {
  await fetch(`/api/habits/${id}`, { method: "DELETE" });
  loadHabits();
}

// ---------- Celebration Banner ----------
function showCongrats(date) {
  const div = document.createElement("div");
  div.className = "congrats-tab";
  const emoji = emojis[Math.floor(Math.random() * emojis.length)];
  div.innerHTML = `${emoji} Congratulations! You completed your task for ${date}`;
  document.body.appendChild(div);
  setTimeout(() => {
    div.classList.add("fade-out");
    setTimeout(() => div.remove(), 700);
  }, 2500);
}

// ---------- Render Habits + Per-Habit Circular Progress ----------
function renderHabits() {
  habitList.innerHTML = "";
  habits.forEach((habit) => {
    const done = habit.completed.find((d) => d.date === selectedDate);

    const div = document.createElement("div");
    div.className = "habit-card";
    div.innerHTML = `
      <div class="top-row">
        <span class="habit-title">${habit.name} 🔥 ${habit.completed.length} days</span>
        <div class="actions">
          <button class="${done ? "done" : ""}" onclick="completeHabit(${habit.id})">
            ${done ? "Done" : "Mark Done"}
          </button>
          <button class="delete-btn" onclick="deleteHabit(${habit.id})">🗑 Delete</button>
        </div>
      </div>
    `;

    if (done?.details) {
      const p = document.createElement("p");
      p.className = "details";
      p.textContent = "Details: " + done.details;
      div.appendChild(p);
    }

    habitList.appendChild(div);
  });

  renderProgressRings(habits);
}

// ---------- Multiple Circular Progress Rings (Overview) ----------
function renderProgressRings(habits) {
  const containerId = "progressRingsContainer";
  let container = document.getElementById(containerId);

  if (!container) {
    container = document.createElement("div");
    container.id = containerId;
    container.className = "progress-rings-wrapper";
    document.querySelector(".app").appendChild(container);
  }
  container.innerHTML = "";

  habits.forEach((habit) => {
    const doneToday = habit.completed.find((d) => d.date === selectedDate);
    const percent = doneToday
      ? 100
      : habit.streak === 0
      ? 0
      : Math.min((habit.streak / 30) * 100, 100);

    const radius = 40;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percent / 100) * circumference;

    const wrapper = document.createElement("div");
    wrapper.className = "progress-item";
    wrapper.innerHTML = `
      <div style="position:relative; width:100px; height:100px; display:flex; align-items:center; justify-content:center;">
        <svg class="progress-ring" width="100" height="100">
          <circle class="progress-ring__background" stroke="#e5e7eb" stroke-width="10" fill="transparent"
            r="${radius}" cx="50" cy="50"></circle>
          <circle class="progress-ring__value" stroke="#2563eb" stroke-width="10" fill="transparent"
            r="${radius}" cx="50" cy="50"
            style="stroke-dasharray:${circumference} ${circumference}; stroke-dashoffset:${offset};
                   transform:rotate(-90deg); transform-origin:50% 50%;" />
        </svg>
        <span class="progress-text" style="position:absolute; left:50%; top:50%; transform:translate(-50%, -50%);">
          ${percent.toFixed(0)}%
        </span>
      </div>
      <div class="progress-label">${habit.name}</div>
    `;
    container.appendChild(wrapper);
  });
}