import Entry from "./Entry";
import { DiaryEntry } from "../types";

interface RenderEntries {
  entries: DiaryEntry[];
}

const Entries = (props: RenderEntries) => (
  <div>
    {props.entries.map((entry) => (
      <div key={entry.id} style={{ paddingBottom: "10px" }}>
        <Entry entry={entry} />
      </div>
    ))}
  </div>
);

export default Entries;
