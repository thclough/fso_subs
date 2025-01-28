import axios from "axios";
import { DiaryEntry } from "../types";
import { EntrySchema } from "../utils";
import { z } from "zod";

const baseUrl = "http://localhost:3000/api/diaries";

const getAllEntries = async () => {
  const res = await axios.get<DiaryEntry[]>(baseUrl);
  // parse the response for robustness
  z.array(EntrySchema).parse(res.data);
  return res.data;
};

export default { getAllEntries };
