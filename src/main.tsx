import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import { Timetable } from "./index";

const theme = createTheme();

// Sample data to test your component
const timeSlots = [
  { id: "p1", label: "Period 1", startTime: "09:00", endTime: "10:00" },
  { id: "p2", label: "Period 2", startTime: "10:00", endTime: "11:00" },
  { id: "br", label: "Break",    startTime: "11:00", endTime: "11:30", isBreak: true },
  { id: "p3", label: "Period 3", startTime: "11:30", endTime: "12:30" },
];

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

const data = {
  Monday:    { p1: "Mathematics", p2: "Science",  br: null, p3: "English" },
  Tuesday:   { p1: "History",     p2: "Math",     br: null, p3: "Art" },
  Wednesday: { p1: "Science",     p2: "English",  br: null, p3: "PE" },
  Thursday:  { p1: "Art",         p2: "History",  br: null, p3: "Math" },
  Friday:    { p1: "English",     p2: "PE",        br: null, p3: "Science" },
};

const subjectColors = {
  Mathematics: "#4CAF50",
  Science:     "#2196F3",
  English:     "#FF9800",
  History:     "#9C27B0",
  Art:         "#E91E63",
  PE:          "#00BCD4",
  Math:        "#4CAF50",
};

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Timetable
        title="Class 10 - A Timetable"
        timeSlots={timeSlots}
        days={days}
        data={data}
        isEditable={true}
      />
    </ThemeProvider>
  </StrictMode>
);