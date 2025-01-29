import { useState, useEffect } from "react";
import { DiaryEntry } from "./types";
import entryService from "./services/entryService";

import Entries from "./components/Entries";
import DiaryForm from "./components/DiaryForm";
import Notification from "./components/Notification";

const App = () => {
  const [entries, setEntries] = useState<DiaryEntry[]>([]);
  const [notification, setNotification] = useState("");

  useEffect(() => {
    entryService.getAllEntries().then((data) => setEntries(data));
  }, []);

  const flashNotification = (notification: string, interval: number) => {
    setNotification(notification);
    setTimeout(() => setNotification(""), interval);
  };

  return (
    <div>
      <h1>Flight Entries</h1>
      <Notification notification={notification} />
      <h2>Add Entry</h2>
      <DiaryForm
        entries={entries}
        setEntriesFunc={setEntries}
        notificationController={flashNotification}
      />
      <h2>Past Entries</h2>
      <Entries entries={entries} />
    </div>
  );
};

export default App;
