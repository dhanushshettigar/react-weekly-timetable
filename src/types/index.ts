// Timetable Types
export interface TimeSlot {
  id: string;
  startTime: string;
  endTime: string;
  label: string;
  isBreak?: boolean;
}

export interface DaySchedule {
  [timeSlotId: string]: string | null;
}

export interface TimetableData {
  [day: string]: DaySchedule;
}

export interface TimetableProps {
  title?: string;
  timeSlots: TimeSlot[];
  days: string[];
  data?: TimetableData;
  onCellChange?: (day: string, timeSlotId: string, value: string | null) => void;
  isEditable?: boolean;
  rowHeaderColor?: string;
  headerColor?: string;
  breakColor?: string;
  week?: "week1" | "week2";
}
