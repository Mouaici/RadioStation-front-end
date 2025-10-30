import { useState } from "react";
import ScheduleList from "./components/ScheduleList";
import ScheduleForm from "./components/ScheduleForm";

function App() {
  const [refresh, setRefresh] = useState(false);

  const handleEventAdded = () => {
    setRefresh(!refresh); // refresh the list
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>🎙️ Radio Station Scheduler</h1>
      <ScheduleForm onEventAdded={handleEventAdded} />
      <hr />
      <ScheduleList key={refresh} />
    </div>
  );
}

export default App;
