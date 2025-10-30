const API_BASE = "https://localhost:5001"; // adjust port to your backend

export async function getTodaySchedule() {
  const res = await fetch(`${API_BASE}/schedule/today`);
  return res.json();
}

export async function getNext7Days() {
  const res = await fetch(`${API_BASE}/schedule/next7days`);
  return res.json();
}

export async function addEvent(event) {
  const res = await fetch(`${API_BASE}/schedule`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(event),
  });
  return res.json();
}

export async function deleteEvent(id) {
  await fetch(`${API_BASE}/schedule/${id}`, { method: "DELETE" });
}
