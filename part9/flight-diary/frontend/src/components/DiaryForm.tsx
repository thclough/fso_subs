import { DiaryEntry } from "../types";
import entryService from "../services/entryService";
import React from "react";
import axios from "axios";
import { Weather, Visibility } from "../types";

interface formProps {
  entries: DiaryEntry[];
  setEntriesFunc: React.Dispatch<React.SetStateAction<DiaryEntry[]>>;
  notificationController: (notification: string, interval: number) => void;
}

const DiaryForm = (props: formProps) => {
  const addEntry = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    const newEntryPost = {
      date: form.date.value,
      weather: form.weather.value,
      visibility: form.visibility.value,
      comment: form.comment.value,
    };

    try {
      const addedEntry = await entryService.addEntry(newEntryPost);
      const newEntries = props.entries.concat(addedEntry);
      props.setEntriesFunc(newEntries);

      form.date.value = "";
      form.weather.value = "";
      form.visibility.value = "";
      form.comment.value = "";
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        props.notificationController(error.response.data, 3000);
      } else {
        console.error(error);
      }
    }
  };

  return (
    <form onSubmit={addEntry}>
      date: <input type="date" name="date" />
      <br />
      {/* weather: <input name="weather" />
      <br /> */}
      <div>
        weather:
        {Object.values(Weather).map((cat, idx) => (
          <label key={cat}>
            <input
              type="radio"
              id={cat}
              name="weather"
              value={cat}
              defaultChecked={idx === 0}
            />
            {cat}
          </label>
        ))}
      </div>
      <div>
        visibility:
        {Object.values(Visibility).map((cat, idx) => (
          <label key={cat}>
            <input
              type="radio"
              id={cat}
              name="visibility"
              value={cat}
              defaultChecked={idx === 0}
            />
            {cat}
          </label>
        ))}
      </div>
      comment (optional): <input name="comment" />
      <br />
      <button type="submit">create</button>
    </form>
  );
};

export default DiaryForm;
