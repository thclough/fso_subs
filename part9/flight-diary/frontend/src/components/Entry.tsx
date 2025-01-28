import { DiaryEntry } from "../types";

interface RenderEntry {
  entry: DiaryEntry;
}

const Entry = (props: RenderEntry) => (
  <div>
    <b>{props.entry.date}</b> <br />
    weather: {props.entry.weather} <br />
    visibility: {props.entry.visibility} <br />
    comment: <i>{props.entry.comment}</i>
  </div>
);

export default Entry;
