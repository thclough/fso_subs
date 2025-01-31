import React from "react";
import { Entry } from "../../types";
import HospitalEntryR from "./HospitalEntryR";
import HealthCheckEntryR from "./HealthCheckEntryR";
import OccupationalHealthcareEntryR from "./OccupationalHealtcareEntryR";
import { assertNever } from "../../utils";

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
