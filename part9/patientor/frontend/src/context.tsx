import { createContext } from "react";
import { Diagnosis } from "./types";

const BlendedContext = createContext<Diagnosis[]>([]);

export default BlendedContext;
