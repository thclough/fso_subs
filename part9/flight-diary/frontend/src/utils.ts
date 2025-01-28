import { z } from "zod";
import { Weather, Visibility } from "./types";

const EntrySchema = z.object({
  id: z.number(),
  date: z.string().date(),
  weather: z.nativeEnum(Weather),
  visibility: z.nativeEnum(Visibility),
  comment: z.string().optional(),
});

export { EntrySchema };
