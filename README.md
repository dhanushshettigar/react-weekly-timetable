# React Weekly Timetable

A powerful, flexible, and easy-to-use React component for displaying and managing weekly schedules and timetables. Perfect for schools, universities, gyms, meeting room bookings, and any application that needs to display time-based schedules.

![React](https://img.shields.io/badge/React->=17-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-Supported-blue?logo=typescript)
![License](https://img.shields.io/badge/License-MIT-green)

## 🎯 Features

- ✨ **Fully Editable** - Toggle edit mode to modify schedule entries
- 🎨 **Customizable Colors** - Color-code different activities or classes
- 🏗️ **Custom Header Styles** - Personalize row headers and cell backgrounds
- ⏱️ **Break Time Support** - Automatically highlight break periods
- 📱 **Responsive Design** - Works seamlessly on all screen sizes
- 🔔 **Event Callbacks** - React to user interactions with comprehensive events
- 🎭 **Material-UI Integration** - Built with Material-UI for beautiful, professional UI
- ♿ **Accessible** - Follows accessibility best practices
- 📦 **TypeScript Support** - Fully typed for better development experience
- 🎯 **Zero Dependencies** - Except React and MUI (peer dependencies)

## 📦 Installation

Install via npm:

```bash
npm install react-weekly-timetable
```

Or with yarn:

```bash
yarn add react-weekly-timetable
```

Or with pnpm:

```bash
pnpm add react-weekly-timetable
```

### Peer Dependencies

Make sure you have the following packages installed in your project:

```json
{
  "react": ">=17.0.0",
  "react-dom": ">=17.0.0",
  "@mui/material": ">=5.0.0",
  "@mui/icons-material": ">=5.0.0",
  "@emotion/react": ">=11.0.0",
  "@emotion/styled": ">=11.0.0"
}
```

## 🚀 Quick Start

### Basic Usage

```jsx
import React from 'react';
import { Timetable } from 'react-weekly-timetable';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';

const theme = createTheme();

function App() {
  const timeSlots = [
    { id: 'p1', label: 'Period 1', startTime: '09:00', endTime: '10:00' },
    { id: 'p2', label: 'Period 2', startTime: '10:00', endTime: '11:00' },
    { id: 'break', label: 'Break', startTime: '11:00', endTime: '11:30', isBreak: true },
    { id: 'p3', label: 'Period 3', startTime: '11:30', endTime: '12:30' },
  ];

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  const data = {
    Monday: { p1: 'Mathematics', p2: 'Science', break: null, p3: 'English' },
    Tuesday: { p1: 'English', p2: 'Math', break: null, p3: 'Science' },
    Wednesday: { p1: 'Science', p2: 'English', break: null, p3: 'Math' },
    Thursday: { p1: 'Art', p2: 'History', break: null, p3: 'Math' },
    Friday: { p1: 'PE', p2: 'Science', break: null, p3: 'English' },
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Timetable
        title="School Timetable"
        timeSlots={timeSlots}
        days={days}
        data={data}
      />
    </ThemeProvider>
  );
}

export default App;
```

## 📖 Examples

### Example 1: School Schedule with Colors

```jsx
const slotOptions = [
  { label: 'Mathematics', id: 'math', color: '#E91E63' },
  { label: 'Science', id: 'science', color: '#2196F3' },
  { label: 'English', id: 'english', color: '#4CAF50' },
];

<Timetable
  title="📚 School Timetable"
  timeSlots={timeSlots}
  days={days}
  data={data}
  slotOptions={slotOptions}
  onCellClick={(day, timeSlotId) => {
    console.log(`Clicked: ${day} at ${timeSlotId}`);
  }}
  onCellChange={(day, timeSlotId, value, color) => {
    console.log(`Updated: ${day} - ${value}`);
  }}
/>
```

### Example 2: Editable Meeting Schedule

```jsx
const [scheduleData, setScheduleData] = useState(initialData);

<Timetable
  title="🏢 Meeting Rooms"
  timeSlots={timeSlots}
  days={days}
  data={scheduleData}
  slotOptions={slotOptions}
  editButtonProps={{
    label: "Edit Schedule",
    labelActive: "Save Changes",
    tooltip: "Click to edit",
    tooltipActive: "Click to save",
  }}
  onDataUpdate={(newData) => {
    setScheduleData(newData);
    // Save to backend
    saveSchedule(newData);
  }}
/>
```

### Example 3: Gym Class Schedule

```jsx
<Timetable
  title="💪 Gym Classes"
  timeSlots={gymTimeSlots}
  days={['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']}
  data={gymSchedule}
  slotOptions={classOptions}
  rowHeaderColor="#1B5E20"
  headerColor="#2E7D32"
  breakColor="#C8E6C9"
  onCellClick={(day, timeSlotId) => {
    // Handle class registration
    registerForClass(day, timeSlotId);
  }}
/>
```

## 📚 API Documentation

### Props

#### Core Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `title` | `string` | No | `undefined` | Title displayed at the top of the timetable |
| `timeSlots` | `TimeSlot[]` | Yes | - | Array of time slot definitions |
| `days` | `string[]` | Yes | - | Array of day names (e.g., ['Monday', 'Tuesday', ...]) |
| `data` | `TimetableData` | No | `{}` | Initial schedule data mapping days to slot values |
| `slotOptions` | `SlotOptionsData[]` | No | `[]` | Available options for cells with color coding |

#### Styling Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `rowHeaderColor` | `string` | `"#1976d2"` | Background color of the time slot headers (left column) |
| `headerColor` | `string` | `"#0d47a1"` | Background color of the day headers (top row) |
| `breakColor` | `string` | `"#e3f2fd"` | Background color for break periods |

#### Event Callbacks

| Callback | Parameters | Description |
|----------|-----------|-------------|
| `onCellClick` | `(day: string, timeSlotId: string)` | Fired when a cell is clicked (view mode only) |
| `onCellChange` | `(day: string, timeSlotId: string, value: string \| null, color: string)` | Fired when a cell is edited |
| `onDataUpdate` | `(data: TimetableData)` | Fired with the complete updated data when cells are saved |
| `onTimeSlotChange` | `(updatedTimeSlots: TimeSlot[])` | Fired when time slot headers are edited |

#### Customization Props

| Prop | Type | Description |
|------|------|-------------|
| `editButtonProps` | `EditButtonProps` | Customize the edit button appearance and behavior |
| `editCellDialogProps` | `DialogProps` | Customize the cell edit dialog |
| `editHeaderDialogProps` | `DialogProps` | Customize the header edit dialog |
| `editCellDialogUIProps` | `EditCellDialogUIProps` | Customize UI elements within the cell edit dialog |
| `editHeaderDialogUIProps` | `EditHeaderDialogUIProps` | Customize UI elements within the header edit dialog |

### Types

#### TimeSlot

```typescript
interface TimeSlot {
  id: string;                    // Unique identifier
  startTime: string;             // Format: "HH:MM" (24-hour)
  endTime: string;               // Format: "HH:MM" (24-hour)
  label: string;                 // Display label
  isBreak?: boolean;             // Mark as break period (optional)
}
```

#### TimetableData

```typescript
interface TimetableData {
  [day: string]: {
    [timeSlotId: string]: string | null;
  };
}
```

Example:
```javascript
{
  Monday: {
    p1: "Mathematics",
    p2: "Science",
    break: null,
    p3: "English"
  },
  Tuesday: {
    p1: "English",
    p2: null,
    break: null,
    p3: "Math"
  }
}
```

#### SlotOptionsData

```typescript
interface SlotOptionsData {
  label: string;  // Display name
  color: string;  // Hex color code
  id: string;     // Unique identifier
}
```

#### EditButtonProps

```typescript
interface EditButtonProps {
  variant?: "text" | "outlined" | "contained";
  variantActive?: "text" | "outlined" | "contained";
  color?: "primary" | "secondary" | "error" | "warning" | "info" | "success";
  label?: string;
  labelActive?: string;
  tooltip?: string;
  tooltipActive?: string;
  icon?: React.ReactNode;
  iconActive?: React.ReactNode;
  disabled?: boolean;
  sx?: SxProps;
}
```

## 🎨 Styling & Customization

### Color Customization

Customize the overall color scheme:

```jsx
<Timetable
  title="Custom Colors"
  timeSlots={timeSlots}
  days={days}
  data={data}
  rowHeaderColor="#2C3E50"      // Dark blue-gray
  headerColor="#34495E"         // Slightly lighter
  breakColor="#ECF0F1"          // Light gray
/>
```

### Edit Button Customization

```jsx
<Timetable
  editButtonProps={{
    variant: "contained",
    variantActive: "contained",
    color: "success",
    label: "✏️ Edit",
    labelActive: "✅ Done",
    tooltip: "Enter edit mode to modify the schedule",
    tooltipActive: "Save and exit edit mode",
  }}
  // ... other props
/>
```

### Dialog Customization

```jsx
<Timetable
  editCellDialogProps={{
    maxWidth: "sm",
    fullWidth: true,
  }}
  editCellDialogUIProps={{
    title: "Edit Schedule Entry",
    saveButtonProps: {
      color: "success",
      variant: "contained",
    },
  }}
  // ... other props
/>
```

## 🔧 Advanced Usage

### Controlled Component (with State Management)

```jsx
function ScheduleManager() {
  const [schedule, setSchedule] = useState(initialData);

  const handleDataUpdate = (newData) => {
    setSchedule(newData);
    // Sync with backend
    API.saveSchedule(newData);
  };

  return (
    <Timetable
      title="Managed Schedule"
      timeSlots={timeSlots}
      days={days}
      data={schedule}
      slotOptions={slotOptions}
      onDataUpdate={handleDataUpdate}
    />
  );
}
```

### Dynamic Time Slots

```jsx
function FlexibleSchedule() {
  const [timeSlots, setTimeSlots] = useState(initialTimeSlots);

  const handleTimeSlotChange = (updatedSlots) => {
    setTimeSlots(updatedSlots);
    // Save to backend
    API.saveTimeSlots(updatedSlots);
  };

  return (
    <Timetable
      title="Flexible Schedule"
      timeSlots={timeSlots}
      days={days}
      data={data}
      onTimeSlotChange={handleTimeSlotChange}
    />
  );
}
```

### Integration with Form Libraries (React Hook Form)

```jsx
import { useForm } from 'react-hook-form';

function ScheduleForm() {
  const { watch, setValue } = useForm({
    defaultValues: { schedule: initialData }
  });

  const schedule = watch('schedule');

  const handleDataUpdate = (newData) => {
    setValue('schedule', newData);
  };

  return (
    <form>
      <Timetable
        title="Form-Integrated Schedule"
        timeSlots={timeSlots}
        days={days}
        data={schedule}
        onDataUpdate={handleDataUpdate}
      />
      <button type="submit">Save Schedule</button>
    </form>
  );
}
```

## 🎯 Use Cases

### 📚 Educational Institutions
- School timetables
- University class schedules
- Online course schedules
- Exam schedules

### 🏢 Business & Offices
- Meeting room bookings
- Employee schedules
- Conference room availability
- Team shift management

### 💪 Health & Fitness
- Gym class schedules
- Personal training sessions
- Yoga class timetables
- Fitness center bookings

### 🏥 Healthcare
- Doctor appointment schedules
- Hospital shift management
- Medical staff rotation
- Patient appointment displays

### 🚇 Transportation & Travel
- Bus schedules
- Train timetables
- Flight schedules
- Shuttle service availability

## 🔐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

MIT License - feel free to use this package in your personal and commercial projects.

## 📧 Support

For issues, questions, or suggestions, please open an issue on the GitHub repository.

## 🎓 Tutorial

Check out the `src/main.tsx` file for comprehensive examples including:
- Basic school timetables
- University schedules with advanced customization
- Editable office meeting room schedules
- Gym class schedules
- Resource booking systems

Run the development server to see all examples in action:

```bash
npm run dev
```

## 🗂️ Project Structure

```
react-weekly-timetable/
├── src/
│   ├── components/
│   │   └── Timetable.tsx       # Main component
│   ├── types/
│   │   └── index.ts            # TypeScript type definitions
│   ├── main.tsx                # Examples & tutorial
│   └── index.ts                # Package export
├── README.md                   # This file
├── package.json                # Package configuration
├── tsconfig.json               # TypeScript configuration
└── vite.config.ts              # Vite configuration
```

## 🚀 Performance Tips

1. **Memoization**: For large schedules, consider wrapping the component with `React.memo`
2. **State Management**: Use context or state management libraries for complex schedules
3. **Data Structure**: Keep the data structure flat and avoid deep nesting
4. **Virtualization**: For very large lists, consider implementing virtual scrolling

## 🎉 Changelog

### v0.1.0
- Initial release
- Core timetable functionality
- Editable cells and headers
- Color customization
- Event callbacks
- TypeScript support
