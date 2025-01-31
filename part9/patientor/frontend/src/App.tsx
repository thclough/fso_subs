import { useState, useEffect } from "react";
//import axios from "axios";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import { Button, Divider, Container, Typography } from "@mui/material";

//import { apiBaseUrl } from "./constants";
import { Diagnosis, Patient } from "./types";

import BlendedContext from "./context";
import PatientView from "./components/PatientView";
import PatientListPage from "./components/PatientListPage";

import patientService from "./services/patients";
import diagnosesService from "./services/diagnoses";

import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";


const App = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);

  useEffect(() => {
    // void axios.get<void>(`${apiBaseUrl}/ping`);

    const fetchPatientList = async () => {
      const patients = await patientService.getAll();
      setPatients(patients);
    };
    void fetchPatientList();
  }, []);

  useEffect(() => {
    const fetchDiagnoses = async () => {
      const diagnoses = await diagnosesService.getAll();
      setDiagnoses(diagnoses);
    };
    void fetchDiagnoses();
  }, []);

  return (
    <div className="App">
      <Router>
        <BlendedContext.Provider value={diagnoses}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Container>
              <Typography variant="h3" style={{ marginBottom: "0.5em" }}>
                Patientor
              </Typography>
              <Button
                component={Link}
                to="/"
                variant="contained"
                color="primary"
              >
                Home
              </Button>
              <Divider hidden />
              <Routes>
                <Route
                  path="/"
                  element={
                    <PatientListPage
                      patients={patients}
                      setPatients={setPatients}
                    />
                  }
                />
                <Route path="/patients/:id" element={<PatientView />} />
              </Routes>
            </Container>
          </LocalizationProvider>
        </BlendedContext.Provider>
      </Router>
    </div>
  );
};

export default App;
