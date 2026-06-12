import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider, createTheme, CssBaseline, Container, Box, Tabs, Tab, Paper, Typography } from "@mui/material";
import { Timetable } from "./index";

// ============================================================================
// EXAMPLE 1: BASIC SCHOOL TIMETABLE
// ============================================================================
const Example1_BasicSchoolTimetable = () => {
  const timeSlots = [
    { id: "p1", label: "Period 1", startTime: "09:00", endTime: "10:00" },
    { id: "p2", label: "Period 2", startTime: "10:00", endTime: "11:00" },
    { id: "br", label: "Break", startTime: "11:00", endTime: "11:30", isBreak: true },
    { id: "p3", label: "Period 3", startTime: "11:30", endTime: "12:30" },
    { id: "p4", label: "Period 4", startTime: "12:30", endTime: "13:30" },
    { id: "lunch", label: "Lunch", startTime: "13:30", endTime: "14:00", isBreak: true },
    { id: "p5", label: "Period 5", startTime: "14:00", endTime: "15:00" },
  ];

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

  const data = {
    Monday: { p1: "Mathematics", p2: "Science", br: null, p3: "English", p4: "History", lunch: null, p5: "PE" },
    Tuesday: { p1: "English", p2: "Math", br: null, p3: "Science", p4: "Art", lunch: null, p5: "History" },
    Wednesday: { p1: "Science", p2: "English", br: null, p3: "PE", p4: "Math", lunch: null, p5: "Art" },
    Thursday: { p1: "Art", p2: "History", br: null, p3: "Math", p4: "English", lunch: null, p5: "Science" },
    Friday: { p1: "PE", p2: "Science", br: null, p3: "Art", p4: "English", lunch: null, p5: "Math" },
  };

  const slotOptions = [
    { label: "Mathematics", id: "Mathematics", color: "#E91E63" },
    { label: "Science", id: "Science", color: "#2196F3" },
    { label: "English", id: "English", color: "#4CAF50" },
    { label: "History", id: "History", color: "#FF9800" },
    { label: "Art", id: "Art", color: "#9C27B0" },
    { label: "PE", id: "PE", color: "#F44336" },
  ];

  return (
    <Timetable
      title="📚 School Timetable - Basic Example"
      timeSlots={timeSlots}
      days={days}
      data={data}
      slotOptions={slotOptions}
      onCellClick={(day, timeSlotId) => console.log(`Clicked: ${day} - ${timeSlotId}`)}
      onCellChange={(day, timeSlotId, value, color) => {
        console.log(`Updated: ${day} ${timeSlotId} = ${value} (Color: ${color})`);
      }}
    />
  );
};

// ============================================================================
// EXAMPLE 2: UNIVERSITY SCHEDULE WITH CUSTOM COLORS
// ============================================================================
const Example2_UniversitySchedule = () => {
  const timeSlots = [
    { id: "08:00", label: "08:00 - 09:00", startTime: "08:00", endTime: "09:00" },
    { id: "09:00", label: "09:00 - 10:00", startTime: "09:00", endTime: "10:00" },
    { id: "10:00", label: "10:00 - 11:00", startTime: "10:00", endTime: "11:00" },
    { id: "br1", label: "Coffee Break", startTime: "11:00", endTime: "11:15", isBreak: true },
    { id: "11:15", label: "11:15 - 12:15", startTime: "11:15", endTime: "12:15" },
    { id: "12:15", label: "12:15 - 13:15", startTime: "12:15", endTime: "13:15" },
    { id: "lunch", label: "Lunch", startTime: "13:15", endTime: "14:00", isBreak: true },
    { id: "14:00", label: "14:00 - 15:00", startTime: "14:00", endTime: "15:00" },
    { id: "15:00", label: "15:00 - 16:00", startTime: "15:00", endTime: "16:00" },
  ];

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  const data = {
    Monday: {
      "08:00": "Data Structures",
      "09:00": "Data Structures",
      "10:00": "Algorithms",
      "br1": null,
      "11:15": "Algorithms",
      "12:15": "Web Dev",
      lunch: null,
      "14:00": "Database",
      "15:00": "Database",
    },
    Tuesday: {
      "08:00": "Web Dev",
      "09:00": "Web Dev",
      "10:00": "Database",
      "br1": null,
      "11:15": "Database",
      "12:15": "Data Structures",
      lunch: null,
      "14:00": "Algorithms",
      "15:00": "Algorithms",
    },
    Wednesday: {
      "08:00": "Database",
      "09:00": "Database",
      "10:00": "Web Dev",
      "br1": null,
      "11:15": "Web Dev",
      "12:15": "Data Structures",
      lunch: null,
      "14:00": "Algorithms",
      "15:00": null,
    },
    Thursday: {
      "08:00": "Algorithms",
      "09:00": "Algorithms",
      "10:00": "Data Structures",
      "br1": null,
      "11:15": "Data Structures",
      "12:15": "Database",
      lunch: null,
      "14:00": "Web Dev",
      "15:00": "Web Dev",
    },
    Friday: {
      "08:00": "Web Dev Lab",
      "09:00": "Web Dev Lab",
      "10:00": "Database Lab",
      "br1": null,
      "11:15": "Database Lab",
      "12:15": "Project Work",
      lunch: null,
      "14:00": "Project Work",
      "15:00": "Project Work",
    },
    Saturday: {
      "08:00": "Optional Seminar",
      "09:00": "Optional Seminar",
      "10:00": null,
      "br1": null,
      "11:15": null,
      "12:15": null,
      lunch: null,
      "14:00": null,
      "15:00": null,
    },
  };

  const slotOptions = [
    { label: "Data Structures", id: "ds", color: "#3F51B5" },
    { label: "Algorithms", id: "algo", color: "#00BCD4" },
    { label: "Web Dev", id: "webdev", color: "#00ACC1" },
    { label: "Database", id: "db", color: "#0097A7" },
    { label: "Web Dev Lab", id: "weblab", color: "#26C6DA" },
    { label: "Database Lab", id: "dblab", color: "#4DD0E1" },
    { label: "Project Work", id: "project", color: "#80DEEA" },
    { label: "Optional Seminar", id: "seminar", color: "#B2EBF2" },
  ];

  return (
    <Timetable
      title="🎓 University Schedule - Advanced Example"
      timeSlots={timeSlots}
      days={days}
      data={data}
      slotOptions={slotOptions}
      rowHeaderColor="#1a237e"
      headerColor="#0d47a1"
      breakColor="#e0f2f1"
      onCellChange={(day, timeSlotId, value, color) => {
        console.log(`${day} ${timeSlotId} updated to: ${value}`);
      }}
      onDataUpdate={(newData) => {
        console.log("Full schedule updated:", newData);
      }}
    />
  );
};

// ============================================================================
// EXAMPLE 3: OFFICE MEETING ROOMS WITH EDIT MODE
// ============================================================================
const Example3_OfficeMeetingRooms = () => {
  const [scheduleData, setScheduleData] = useState({
    Monday: {
      "m1": "Team Standup",
      "m2": "Client Meeting",
      "br": null,
      "m3": "Planning Session",
      "m4": "One-on-One",
    },
    Tuesday: {
      "m1": "Strategy Meeting",
      "m2": "Team Standup",
      "br": null,
      "m3": "Budget Review",
      "m4": "Project Review",
    },
    Wednesday: {
      "m1": "Client Meeting",
      "m2": "Team Standup",
      "br": null,
      "m3": "Brainstorm Session",
      "m4": "Team Sync",
    },
    Thursday: {
      "m1": "Team Standup",
      "m2": "Quarterly Review",
      "br": null,
      "m3": "Tech Discussion",
      "m4": "Planning",
    },
    Friday: {
      "m1": "Team Standup",
      "m2": "Week Wrap-up",
      "br": null,
      "m3": "Retrospective",
      "m4": "Social",
    },
  });

  const timeSlots = [
    { id: "m1", label: "09:00 - 10:00", startTime: "09:00", endTime: "10:00" },
    { id: "m2", label: "10:00 - 11:00", startTime: "10:00", endTime: "11:00" },
    { id: "br", label: "Break", startTime: "11:00", endTime: "11:30", isBreak: true },
    { id: "m3", label: "11:30 - 12:30", startTime: "11:30", endTime: "12:30" },
    { id: "m4", label: "14:00 - 15:00", startTime: "14:00", endTime: "15:00" },
  ];

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

  const slotOptions = [
    { label: "Team Standup", id: "standup", color: "#FF6B6B" },
    { label: "Client Meeting", id: "client", color: "#4ECDC4" },
    { label: "Strategy Meeting", id: "strategy", color: "#45B7D1" },
    { label: "Planning Session", id: "planning", color: "#FFA07A" },
    { label: "One-on-One", id: "1on1", color: "#98D8C8" },
    { label: "Brainstorm Session", id: "brainstorm", color: "#F7DC6F" },
    { label: "Budget Review", id: "budget", color: "#BB8FCE" },
    { label: "Quarterly Review", id: "quarterly", color: "#F8B88B" },
    { label: "Project Review", id: "project", color: "#85C1E2" },
    { label: "Tech Discussion", id: "tech", color: "#A8D8EA" },
    { label: "Team Sync", id: "sync", color: "#AA96DA" },
    { label: "Week Wrap-up", id: "wrapup", color: "#FCBAD3" },
    { label: "Retrospective", id: "retro", color: "#A0FFA0" },
    { label: "Social", id: "social", color: "#FFD700" },
  ];

  return (
    <Timetable
      title="🏢 Office Meeting Rooms - Editable Schedule"
      timeSlots={timeSlots}
      days={days}
      data={scheduleData}
      slotOptions={slotOptions}
      rowHeaderColor="#2C3E50"
      headerColor="#34495E"
      breakColor="#ECF0F1"
      editButtonProps={{
        label: "Edit Schedule",
        labelActive: "Save Changes",
        tooltip: "Click to edit the schedule",
        tooltipActive: "Click to save changes",
      }}
      onCellChange={(day, timeSlotId, value, color) => {
        console.log(`Meeting updated: ${day} - ${value}`);
      }}
      onDataUpdate={(newData) => {
        setScheduleData(newData as any);
        console.log("Schedule saved:", newData);
      }}
    />
  );
};

// ============================================================================
// EXAMPLE 4: GYM CLASS SCHEDULE WITH CUSTOM STYLING
// ============================================================================
const Example4_GymSchedule = () => {
  const timeSlots = [
    { id: "6am", label: "6:00 - 7:00 AM", startTime: "06:00", endTime: "07:00" },
    { id: "7am", label: "7:00 - 8:00 AM", startTime: "07:00", endTime: "08:00" },
    { id: "8am", label: "8:00 - 9:00 AM", startTime: "08:00", endTime: "09:00" },
    { id: "br1", label: "Break", startTime: "09:00", endTime: "10:00", isBreak: true },
    { id: "5pm", label: "5:00 - 6:00 PM", startTime: "17:00", endTime: "18:00" },
    { id: "6pm", label: "6:00 - 7:00 PM", startTime: "18:00", endTime: "19:00" },
    { id: "7pm", label: "7:00 - 8:00 PM", startTime: "19:00", endTime: "20:00" },
    { id: "8pm", label: "8:00 - 9:00 PM", startTime: "20:00", endTime: "21:00" },
  ];

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  const data = {
    Monday: { "6am": "Yoga", "7am": "Cardio", "8am": "Strength", br1: null, "5pm": "Spin Class", "6pm": "Zumba", "7pm": "Pilates", "8pm": "CrossFit" },
    Tuesday: { "6am": "Cardio", "7am": "Strength", "8am": "Yoga", br1: null, "5pm": "Swimming", "6pm": "Strength", "7pm": "Zumba", "8pm": "Boxing" },
    Wednesday: { "6am": "Strength", "7am": "Yoga", "8am": "Cardio", br1: null, "5pm": "Yoga", "6pm": "Pilates", "7pm": "Spin Class", "8pm": "CrossFit" },
    Thursday: { "6am": "Pilates", "7am": "Cardio", "8am": "Strength", br1: null, "5pm": "Boxing", "6pm": "Yoga", "7pm": "Swimming", "8pm": "Zumba" },
    Friday: { "6am": "Zumba", "7am": "Strength", "8am": "Pilates", br1: null, "5pm": "Cardio", "6pm": "CrossFit", "7pm": "Boxing", "8pm": "Yoga" },
    Saturday: { "6am": "CrossFit", "7am": "Yoga", "8am": "Swimming", br1: null, "5pm": "Strength", "6pm": "Pilates", "7pm": "Cardio", "8pm": null },
    Sunday: { "6am": "Yoga", "7am": "Pilates", "8am": "Stretching", br1: null, "5pm": null, "6pm": "Yoga", "7pm": "Meditation", "8pm": null },
  };

  const slotOptions = [
    { label: "Yoga", id: "yoga", color: "#E8F5E9" },
    { label: "Cardio", id: "cardio", color: "#FFEBEE" },
    { label: "Strength", id: "strength", color: "#FFF3E0" },
    { label: "Pilates", id: "pilates", color: "#F3E5F5" },
    { label: "Zumba", id: "zumba", color: "#FCE4EC" },
    { label: "Spin Class", id: "spin", color: "#E0F2F1" },
    { label: "CrossFit", id: "crossfit", color: "#F1F8E9" },
    { label: "Boxing", id: "boxing", color: "#FFE0B2" },
    { label: "Swimming", id: "swimming", color: "#E1F5FE" },
    { label: "Meditation", id: "meditation", color: "#EDE7F6" },
    { label: "Stretching", id: "stretching", color: "#E3F2FD" },
  ];

  return (
    <Timetable
      title="💪 Gym Class Schedule"
      timeSlots={timeSlots}
      days={days}
      data={data}
      slotOptions={slotOptions}
      rowHeaderColor="#1B5E20"
      headerColor="#2E7D32"
      breakColor="#C8E6C9"
      onCellClick={(day, timeSlotId) => {
        console.log(`Register for ${day} at ${timeSlotId}`);
      }}
    />
  );
};

// ============================================================================
// EXAMPLE 5: SHARED RESOURCES BOOKING
// ============================================================================
const Example5_ResourceBooking = () => {
  const timeSlots = [
    { id: "9-10", label: "09:00 - 10:00", startTime: "09:00", endTime: "10:00" },
    { id: "10-11", label: "10:00 - 11:00", startTime: "10:00", endTime: "11:00" },
    { id: "11-12", label: "11:00 - 12:00", startTime: "11:00", endTime: "12:00" },
    { id: "lunch", label: "Lunch", startTime: "12:00", endTime: "13:00", isBreak: true },
    { id: "13-14", label: "13:00 - 14:00", startTime: "13:00", endTime: "14:00" },
    { id: "14-15", label: "14:00 - 15:00", startTime: "14:00", endTime: "15:00" },
    { id: "15-16", label: "15:00 - 16:00", startTime: "15:00", endTime: "16:00" },
    { id: "16-17", label: "16:00 - 17:00", startTime: "16:00", endTime: "17:00" },
  ];

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

  const data = {
    Monday: {
      "9-10": "John - Conference Room A",
      "10-11": "Sarah - Conference Room A",
      "11-12": "Mike - Conference Room A",
      lunch: null,
      "13-14": "Emma - Conference Room A",
      "14-15": "John - Conference Room A",
      "15-16": null,
      "16-17": "Sarah - Conference Room A",
    },
    Tuesday: {
      "9-10": "Emma - Conference Room A",
      "10-11": "Mike - Conference Room A",
      "11-12": null,
      lunch: null,
      "13-14": "Sarah - Conference Room A",
      "14-15": null,
      "15-16": "John - Conference Room A",
      "16-17": "Emma - Conference Room A",
    },
    Wednesday: {
      "9-10": "Sarah - Conference Room A",
      "10-11": "John - Conference Room A",
      "11-12": "Emma - Conference Room A",
      lunch: null,
      "13-14": "Mike - Conference Room A",
      "14-15": "Sarah - Conference Room A",
      "15-16": "John - Conference Room A",
      "16-17": null,
    },
    Thursday: {
      "9-10": "Mike - Conference Room A",
      "10-11": "Emma - Conference Room A",
      "11-12": "Sarah - Conference Room A",
      lunch: null,
      "13-14": "John - Conference Room A",
      "14-15": "Emma - Conference Room A",
      "15-16": null,
      "16-17": "Mike - Conference Room A",
    },
    Friday: {
      "9-10": "John - Conference Room A",
      "10-11": null,
      "11-12": "Emma - Conference Room A",
      lunch: null,
      "13-14": "Sarah - Conference Room A",
      "14-15": "Mike - Conference Room A",
      "15-16": "John - Conference Room A",
      "16-17": null,
    },
  };

  const slotOptions = [
    { label: "John - Conference Room A", id: "john", color: "#BBDEFB" },
    { label: "Sarah - Conference Room A", id: "sarah", color: "#C8E6C9" },
    { label: "Mike - Conference Room A", id: "mike", color: "#FFE0B2" },
    { label: "Emma - Conference Room A", id: "emma", color: "#F8BBD0" },
  ];

  return (
    <Timetable
      title="🏛️ Conference Room Booking System"
      timeSlots={timeSlots}
      days={days}
      data={data}
      slotOptions={slotOptions}
      rowHeaderColor="#1565C0"
      headerColor="#0D47A1"
      breakColor="#BBDEFB"
      onCellClick={(day, timeSlotId) => {
        alert(`Booking slot: ${day} - ${timeSlotId}`);
      }}
    />
  );
};

// ============================================================================
// MAIN APP WITH TABBED INTERFACE
// ============================================================================
const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
  },
});

const MainApp = () => {
  const [activeTab, setActiveTab] = useState(0);

  const examples = [
    { name: "Basic School", component: <Example1_BasicSchoolTimetable /> },
    { name: "University", component: <Example2_UniversitySchedule /> },
    { name: "Office Meetings", component: <Example3_OfficeMeetingRooms /> },
    { name: "Gym Classes", component: <Example4_GymSchedule /> },
    { name: "Room Booking", component: <Example5_ResourceBooking /> },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" sx={{ fontWeight: "bold", mb: 2 }}>
          📅 React Weekly Timetable - Examples & Tutorial
        </Typography>
        <Typography variant="body1" sx={{ color: "text.secondary", mb: 3 }}>
          Explore different use cases and configurations of the Timetable component. Switch between examples to see various implementations.
        </Typography>
      </Box>

      <Paper sx={{ mb: 3 }}>
        <Tabs
          value={activeTab}
          onChange={(_, newValue) => setActiveTab(newValue)}
          variant="scrollable"
          scrollButtons="auto"
        >
          {examples.map((example, index) => (
            <Tab key={index} label={example.name} />
          ))}
        </Tabs>
      </Paper>

      <Box sx={{ mt: 3, mb: 6 }}>
        {examples[activeTab].component}
      </Box>

      <Paper sx={{ p: 3, mt: 6, backgroundColor: "#f5f5f5" }}>
        <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
          📌 Example Features to Try:
        </Typography>
        <Typography component="div" variant="body2" sx={{ whiteSpace: "pre-wrap" }}>
          {`✓ Click on cells to interact with the schedule
✓ In Office Meetings example - click "Edit Schedule" button to modify entries
✓ Observe different color schemes for different use cases
✓ Check console for event logging (open DevTools)
✓ Notice break times are highlighted differently
✓ Responsive design works on different screen sizes`}
        </Typography>
      </Paper>
    </Container>
  );
};

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <MainApp />
    </ThemeProvider>
  </StrictMode>,
);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <MainApp />
    </ThemeProvider>
  </StrictMode>
);