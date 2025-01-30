import React from "react";
import { Entry } from "../../types";
import HospitalEntryR from "./HospitalEntryR";
import HealthCheckEntryR from "./HealthCheckEntryR";
import OccupationalHealthcareEntryR from "./OccupationalHealtcareEntryR";

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const EntryPanel: React.FC<{ entry: Entry }> = ({ entry }) => {
  switch (entry.type) {
    case "Hospital":
      return <HospitalEntryR entry={entry} />;
    case "HealthCheck":
      return <HealthCheckEntryR entry={entry} />;
    case "OccupationalHealthcare":
      return <OccupationalHealthcareEntryR entry={entry} />;
    default:
      return assertNever(entry);
  }
};

export default EntryPanel;
