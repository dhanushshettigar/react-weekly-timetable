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

export interface SlotOptionsData {
  label: string;
  color: string;
  id: string;
}

export interface EditButtonProps {
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
  sx?: import("@mui/material").SxProps;
}

export interface DialogProps {
  sx?: import("@mui/material").SxProps;
  maxWidth?: "xs" | "sm" | "md" | "lg" | "xl" | false;
  fullWidth?: boolean;
}

export interface DialogContentProps {
  sx?: import("@mui/material").SxProps;
}

export interface DialogActionsProps {
  sx?: import("@mui/material").SxProps;
}

export interface DialogTitleProps {
  sx?: import("@mui/material").SxProps;
}

export interface ButtonProps {
  sx?: import("@mui/material").SxProps;
  color?: "inherit" | "primary" | "secondary" | "error" | "warning" | "info" | "success";
  variant?: "text" | "outlined" | "contained";
}

export interface TextFieldProps {
  sx?: import("@mui/material").SxProps;
  size?: "small" | "medium";
  variant?: "standard" | "filled" | "outlined";
}

export interface SelectFieldProps {
  sx?: import("@mui/material").SxProps;
  size?: "small" | "medium";
  variant?: "standard" | "filled" | "outlined";
  label?: string;
}

export interface EditCellDialogUIProps {
  title?: string | React.ReactNode;
  titleProps?: DialogTitleProps;
  instructionTitle?: string;
  selectFieldProps?: SelectFieldProps;
  colorPickerBoxProps?: {
    sx?: import("@mui/material").SxProps;
  };
  colorPickerLabelProps?: {
    sx?: import("@mui/material").SxProps;
  };
  clearButtonProps?: ButtonProps;
  cancelButtonProps?: ButtonProps;
  saveButtonProps?: ButtonProps;
}

export interface EditHeaderDialogUIProps {
  title?: string | React.ReactNode;
  titleProps?: DialogTitleProps;
  instructionTitle?: string;
  slotNameFieldProps?: TextFieldProps;
  startTimeFieldProps?: TextFieldProps;
  endTimeFieldProps?: TextFieldProps;
  cancelButtonProps?: ButtonProps;
  saveButtonProps?: ButtonProps;
}

export interface TimetableProps {
  title?: string;
  timeSlots: TimeSlot[];
  days: string[];
  data?: TimetableData;
  slotOptions?: SlotOptionsData[];
  onCellChange?: (day: string, timeSlotId: string, value: string | null, color: string) => void;
  onCellClick?: (day: string, timeSlotId: string) => void;
  onDataUpdate?: (updatedData: TimetableData) => void;
  onTimeSlotChange?: (updatedTimeSlots: TimeSlot[]) => void;
  isEditable?: boolean;
  rowHeaderColor?: string;
  headerColor?: string;
  breakColor?: string;
  week?: "week1" | "week2";
  editButtonProps?: EditButtonProps;
  editCellDialogProps?: DialogProps & DialogContentProps & DialogActionsProps;
  editHeaderDialogProps?: DialogProps & DialogContentProps & DialogActionsProps;
  editCellDialogUIProps?: EditCellDialogUIProps;
  editHeaderDialogUIProps?: EditHeaderDialogUIProps;
}
