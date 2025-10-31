const API_BASE = "https://localhost:7211"; // your backend URL

export async function getTodaySchedule() {
  const res = await fetch(`${API_BASE}/schedule/today`);
  if (!res.ok) throw new Error("Failed to fetch schedule");
  return res.json();
}

export async function getNext7Days() {
  const res = await fetch(`${API_BASE}/schedule/next7days`);
  if (!res.ok) throw new Error("Failed to fetch schedule");
  return res.json();
}

export async function addEvent(event) {
  const res = await fetch(`${API_BASE}/schedule`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(event),
  });
  if (!res.ok) throw new Error("Failed to create event");
  return res.json();
}

export async function deleteEvent(id) {
  const res = await fetch(`${API_BASE}/schedule/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete event");
}
