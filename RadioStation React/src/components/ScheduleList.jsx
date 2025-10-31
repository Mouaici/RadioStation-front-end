import { useEffect, useState } from "react";
import { getTodaySchedule, deleteEvent } from "../services/api";

export default function ScheduleList() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSchedule = async () => {
      setLoading(true);
      try {
        const data = await getTodaySchedule();
        setEvents(data);
        setError("");
      } catch (err) {
        console.error(err);
        setError("Failed to load schedule");
      } finally {
        setLoading(false);
      }
    };

    fetchSchedule();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteEvent(id);
      setEvents(events.filter((e) => e.id !== id));
    } catch {
      alert("Failed to delete event");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <ul>
      {events.map((e) => (
        <li key={e.id}>
          {e.title} ({new Date(e.startTime).toLocaleTimeString()} - {new Date(e.endTime).toLocaleTimeString()})
          <button onClick={() => handleDelete(e.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
}
