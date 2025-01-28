import { useState, useEffect } from "react";
import Entries from "./components/Entries";
import { DiaryEntry } from "./types";
import entryService from "./services/entryService";

const App = () => {
  const [entries, setEntries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    entryService.getAllEntries().then((data) => setEntries(data));
  }, []);

  return (
    <>
      <div>
        <Entries entries={entries} />
      </div>
    </>
  );
};

export default App;
