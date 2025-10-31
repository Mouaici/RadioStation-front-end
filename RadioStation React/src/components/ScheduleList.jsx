import { useEffect, useState } from "react";
import { getTodaySchedule, deleteEvent } from "../services/api";

export default function ScheduleList() {
  const [events, setEvents] = useState([
    {
      id: 1,
      title: "Morning Jazz Hour",
      startTime: "2025-10-09T08:00",
      endTime: "2025-10-09T09:00",
      hosts: ["Alice"],
      guests: ["Bob"],
    },
  ]);

  useEffect(() => {
    // Uncomment this once your backend is running
    // getTodaySchedule().then(setEvents);
  }, []);

  const handleDelete = async (id) => {
    await deleteEvent(id);
    setEvents(events.filter(e => e.id !== id));
  };

  return (
    <div>
      <h2>Today's Schedule</h2>
      {events.length === 0 && <p>No events scheduled today.</p>}
      <ul>
        {events.map(e => (
          <li key={e.id} style={{ marginBottom: "10px" }}>
            <strong>{e.title}</strong> ({new Date(e.startTime).toLocaleTimeString()} - {new Date(e.endTime).toLocaleTimeString()})
            <br />
            <small>Hosts: {e.hosts.join(", ")} | Guests: {e.guests.join(", ")}</small>
            <br />
            <button onClick={() => handleDelete(e.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
// getTodaySchedule().then(setEvents);
