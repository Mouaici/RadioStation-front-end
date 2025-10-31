import { useState } from "react";
import { addEvent } from "../services/api";

export default function ScheduleForm({ onEventAdded }) {
  const [form, setForm] = useState({
    title: "",
    startTime: "",
    endTime: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!form.title || !form.startTime || !form.endTime) {
      setError("Please fill all fields.");
      return;
    }
    if (new Date(form.endTime) <= new Date(form.startTime)) {
      setError("End time must be after start time.");
      return;
    }

    try {
      const newEvent = await addEvent(form);
      onEventAdded(newEvent);
      setForm({ title: "", startTime: "", endTime: "" });
      setError("");
    } catch (err) {
      console.error(err);
      setError("Failed to add event.");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "2rem" }}>
      <h3>Add New Event</h3>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <input
        type="text"
        name="title"
        placeholder="Title"
        value={form.title}
        onChange={handleChange}
        required
        style={{ marginRight: "0.5rem" }}
      />
      <input
        type="datetime-local"
        name="startTime"
        value={form.startTime}
        onChange={handleChange}
        required
        style={{ marginRight: "0.5rem" }}
      />
      <input
        type="datetime-local"
        name="endTime"
        value={form.endTime}
        onChange={handleChange}
        required
        style={{ marginRight: "0.5rem" }}
      />
      <button type="submit">Add Event</button>
    </form>
  );
}
