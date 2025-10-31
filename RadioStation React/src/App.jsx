import { useEffect, useState } from "react";
import axios from "axios";

const API_BASE = "http://localhost:5266/schedule"; // adjust port to your backend

function App() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [newEvent, setNewEvent] = useState({
    title: "",
    startTime: "",
    endTime: "",
  });

  // Load today's schedule on startup
  useEffect(() => {
    loadToday();
  }, []);

  const loadToday = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_BASE}/today`);
      setEvents(res.data);
      setError("");
    } catch (err) {
      console.error(err);
      setError("Failed to load schedule.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewEvent({ ...newEvent, [name]: value });
  };

  const handleAddEvent = async (e) => {
    e.preventDefault();
    if (!newEvent.title || !newEvent.startTime || !newEvent.endTime) {
      alert("Please fill all fields.");
      return;
    }
    try {
      const res = await axios.post(API_BASE, newEvent);
      setEvents([...events, res.data]);
      setNewEvent({ title: "", startTime: "", endTime: "" });
    } catch (err) {
      console.error(err);
      alert("Failed to add event.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;
    try {
      await axios.delete(`${API_BASE}/${id}`);
      setEvents(events.filter((e) => e.id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete event.");
    }
  };

  if (loading) return <p>Loading schedule...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>🎙️ Radio Station Event Scheduler</h1>

      {/* Add Event Form */}
      <form onSubmit={handleAddEvent} style={{ marginBottom: "2rem" }}>
        <input
          type="text"
          name="title"
          placeholder="Event Title"
          value={newEvent.title}
          onChange={handleChange}
          style={{ marginRight: "0.5rem" }}
        />
        <input
          type="datetime-local"
          name="startTime"
          value={newEvent.startTime}
          onChange={handleChange}
          style={{ marginRight: "0.5rem" }}
        />
        <input
          type="datetime-local"
          name="endTime"
          value={newEvent.endTime}
          onChange={handleChange}
          style={{ marginRight: "0.5rem" }}
        />
        <button type="submit">Add</button>
      </form>

      {/* Event List */}
      <h3>Today's Schedule</h3>
      {events.length === 0 ? (
        <p>No events scheduled for today.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {events.map((ev) => (
            <li
              key={ev.id}
              style={{
                border: "1px solid #ddd",
                borderRadius: "8px",
                padding: "1rem",
                marginBottom: "0.5rem",
              }}
            >
              <strong>{ev.title}</strong>
              <div>
                {new Date(ev.startTime).toLocaleString()} →{" "}
                {new Date(ev.endTime).toLocaleString()}
              </div>
              <button
                onClick={() => handleDelete(ev.id)}
                style={{
                  marginTop: "0.5rem",
                  background: "red",
                  color: "white",
                  border: "none",
                  padding: "0.4rem 0.8rem",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
