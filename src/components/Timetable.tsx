import React, { useState, useEffect } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    Box,
    Typography,
    Stack,
    Tooltip,
    Alert,
    Card,
    CardContent,
    Divider,
    CircularProgress,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import ClearIcon from "@mui/icons-material/Clear";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import InfoIcon from "@mui/icons-material/Info";
import ClickIcon from "@mui/icons-material/TouchApp";
import TimerIcon from "@mui/icons-material/Timer";
import TextFieldsIcon from "@mui/icons-material/TextFields";
import type { TimetableProps } from "../types";

const convertTo12Hour = (time24: string): string => {
    if (!time24) return "";
    const [hours, minutes] = time24.split(":").map(Number);
    const period = hours >= 12 ? "PM" : "AM";
    const hours12 = hours % 12 || 12;
    return `${hours12}:${String(minutes).padStart(2, "0")} ${period}`;
};

const isToday = (day: string): boolean => {
    const today = new Date();
    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const todayName = dayNames[today.getDay()];
    return day.toLowerCase() === todayName.toLowerCase();
};


const Timetable: React.FC<TimetableProps> = ({
    title = "Timetable",
    timeSlots: initialTimeSlots,
    days,
    onCellChange,
    rowHeaderColor = "#1976d2",
    headerColor = "#0d47a1",
    breakColor = "#e3f2fd",
}) => {

    const createEmptyData = () => {
        const emptyData: { [key: string]: { [key: string]: string | null } } = {};
        days.forEach((day) => {
            emptyData[day] = {};
            initialTimeSlots.forEach((slot) => {
                emptyData[day][slot.id] = null;
            });
        });
        return emptyData;
    };

    const createEmptyColors = () => {
        const emptyColors: { [key: string]: { [key: string]: string } } = {};
        days.forEach((day) => {
            emptyColors[day] = {};
            initialTimeSlots.forEach((slot) => {
                emptyColors[day][slot.id] = "#e8f5e9";
            });
        });
        return emptyColors;
    };

    const [timeSlots, setTimeSlots] = useState(initialTimeSlots);
    const [data, setData] = useState(createEmptyData());
    const [colors, setColors] = useState(createEmptyColors());
    const [isEditMode, setIsEditMode] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [openHeaderDialog, setOpenHeaderDialog] = useState(false);
    const [openClearAllDialog, setOpenClearAllDialog] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [editingCell, setEditingCell] = useState<{
        day: string;
        timeSlotId: string;
    } | null>(null);
    const [editValue, setEditValue] = useState("");
    const [editColor, setEditColor] = useState("#e8f5e9");
    const [editingHeader, setEditingHeader] = useState<string | null>(null);
    const [headerLabel, setHeaderLabel] = useState("");
    const [headerStartTime, setHeaderStartTime] = useState("");
    const [headerEndTime, setHeaderEndTime] = useState("");


    const handleHeaderClick = (slotId: string) => {
        if (!isEditMode) return;
        const slot = timeSlots.find(s => s.id === slotId);
        if (slot) {
            setEditingHeader(slotId);
            setHeaderLabel(slot.label);
            setHeaderStartTime(slot.startTime);
            setHeaderEndTime(slot.endTime);
            setOpenHeaderDialog(true);
        }
    };

    return (
        <Box sx={{ width: "100%", padding: 0, margin: 0 }}>
            {title && (
                <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold" }}>
                    {title}
                </Typography>
            )}
            < TableContainer
                component={Paper}
                sx={{
                    overflowX: "auto",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                    borderRadius: "8px",
                    minWidth: "100%",
                    fontSize: "0.875rem",
                    padding: "0 !important",
                    margin: "0 !important",
                    "& > *": {
                        padding: "0 !important",
                        margin: "0 !important",
                    },
                    "& table": {
                        padding: "0 !important",
                        margin: "0 !important",
                    },
                }}
            >
                <Table
                    sx={{
                        width: "100%",
                        borderCollapse: "collapse",
                        tableLayout: "fixed",
                        display: "table",
                        fontSize: "0.75rem",
                        margin: "0 !important",
                        padding: "0 !important",
                    }}
                    aria-label="timetable"
                >
                    <TableHead sx={{ margin: "0 !important", padding: "0 !important" }}>
                        <TableRow sx={{ backgroundColor: headerColor, display: "table-row", height: "80px", margin: "0 !important", padding: "0 !important" }}>
                            <TableCell
                                sx={{
                                    fontWeight: "bold",
                                    color: "white",
                                    textAlign: "center",
                                    width: "100px",
                                    minWidth: "100px",
                                    maxWidth: "100px",
                                    backgroundColor: rowHeaderColor,
                                    borderRight: "2px solid #0d47a1",
                                    padding: "10px 6px",
                                    display: "table-cell",
                                    fontSize: "0.75rem",
                                    height: "80px",
                                    verticalAlign: "middle",
                                }}
                            >
                                Day
                            </TableCell>
                            {timeSlots.map((slot) => (
                                <TableCell
                                    key={slot.id}
                                    onClick={() => handleHeaderClick(slot.id)}
                                    sx={{
                                        fontWeight: "bold",
                                        color: "white",
                                        textAlign: "center",
                                        width: "65px",
                                        minWidth: "65px",
                                        maxWidth: "65px",
                                        backgroundColor: slot.isBreak ? "#1565c0" : headerColor,
                                        padding: "8px 4px",
                                        fontSize: "0.7rem",
                                        borderRight: "1px solid rgba(255,255,255,0.2)",
                                        whiteSpace: "normal",
                                        display: "table-cell",
                                        cursor: isEditMode ? "pointer" : "default",
                                        transition: "all 0.2s ease",
                                        height: "80px",
                                        verticalAlign: "middle",
                                        "&:hover": {
                                            opacity: isEditMode ? 0.8 : 1,
                                            boxShadow: isEditMode ? "inset 0 0 5px rgba(0,0,0,0.3)" : "none",
                                        },
                                    }}
                                >
                                    <Stack direction="column" spacing={0.5}>
                                        <Box sx={{ display: "flex", alignItems: "center", gap: 0.3, justifyContent: "center" }}>
                                            <Typography variant="caption" sx={{ display: "block", fontWeight: "bold", fontSize: "0.65rem", color: "white" }}>
                                                {slot.label}
                                            </Typography>
                                            {isEditMode && (
                                                <EditIcon sx={{ fontSize: "0.6rem", opacity: 0.7 }} />
                                            )}
                                        </Box>
                                        <Typography variant="caption" sx={{ fontSize: "0.6rem", lineHeight: 1, color: "#fff9c4", fontWeight: "500" }}>
                                            {convertTo12Hour(slot.startTime)}-{convertTo12Hour(slot.endTime)}
                                        </Typography>
                                    </Stack>
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody sx={{ margin: "0 !important", padding: "0 !important" }}>
                        {days.map((day) => {
                            const isTodayRow = isToday(day);
                            return (
                                <TableRow key={day} sx={{
                                    display: "table-row",
                                    margin: "0 !important",
                                    padding: "0 !important",
                                    backgroundColor: isTodayRow ? "rgba(255, 193, 7, 0.12)" : "transparent",
                                    transition: "background-color 0.3s ease",
                                    borderLeft: isTodayRow ? "5px solid #ffc107" : "none",
                                }}>
                                    <TableCell
                                        sx={{
                                            fontWeight: "bold",
                                            backgroundColor: isTodayRow ? "#ffc107" : rowHeaderColor,
                                            width: "100px",
                                            minWidth: "100px",
                                            padding: "8px 4px",
                                            verticalAlign: "middle",
                                            color: isTodayRow ? "#333" : "white",
                                            textAlign: "center",
                                            borderRight: "2px solid #0d47a1",
                                            display: "table-cell",
                                            fontSize: "0.7rem",
                                            transition: "background-color 0.3s ease",
                                            position: "relative",
                                        }}
                                    >
                                        {day}
                                        {isTodayRow && (
                                            <Typography
                                                variant="caption"
                                                sx={{
                                                    display: "block",
                                                    fontSize: "0.55rem",
                                                    opacity: 0.9,
                                                    fontWeight: "normal",
                                                    mt: 0.5,
                                                }}
                                            >
                                                TODAY
                                            </Typography>
                                        )}
                                    </TableCell>
                                    {timeSlots.map((slot, index) => {
                                        const cellValue = data[day]?.[slot.id];
                                        const isBreakSlot = slot.isBreak;
                                        const isEvenSlot = index % 2 === 0;

                                        return (
                                            <Tooltip title={isEditMode ? "Edit" : "Go to grade"} key={`${day}-${slot.id}`}>
                                                <TableCell
                                                    onClick={() =>
                                                        // !isBreakSlot && handleCellClick(day, slot.id)
                                                        null
                                                    }
                                                    sx={{
                                                        textAlign: "center",
                                                        fontWeight: cellValue ? "600" : "400",
                                                        backgroundColor: isBreakSlot
                                                            ? isTodayRow
                                                                ? "rgba(255, 193, 7, 0.25)"
                                                                : breakColor
                                                            : cellValue
                                                                ? colors[day]?.[slot.id] || (isTodayRow ? "#fff9c4" : "#e8f5e9")
                                                                : isTodayRow
                                                                    ? "rgba(255, 193, 7, 0.15)"
                                                                    : isEvenSlot
                                                                        ? "#fafafa"
                                                                        : "white",
                                                        cursor: isEditMode && !isBreakSlot ? "pointer" : "pointer",
                                                        transition: "all 0.2s ease",
                                                        border: isTodayRow ? "1px solid #ffb300" : "1px solid #e0e0e0",
                                                        padding: "6px 3px",
                                                        width: "65px",
                                                        minWidth: "65px",
                                                        maxWidth: "65px",
                                                        height: "50px",
                                                        display: "table-cell",
                                                        verticalAlign: "middle",
                                                        fontSize: "0.65rem",
                                                        position: "relative",
                                                        "&:hover": {
                                                            backgroundColor: isBreakSlot
                                                                ? isTodayRow
                                                                    ? "rgba(255, 193, 7, 0.35)"
                                                                    : breakColor
                                                                : cellValue
                                                                    ? (() => {
                                                                        const customColor = colors[day]?.[slot.id];
                                                                        if (customColor && customColor !== "#ffffff") {
                                                                            const rgb = parseInt(customColor.slice(1), 16);
                                                                            const r = (rgb >> 16) & 255;
                                                                            const g = (rgb >> 8) & 255;
                                                                            const b = rgb & 255;
                                                                            return `rgba(${r}, ${g}, ${b}, 0.7)`;
                                                                        }
                                                                        return isTodayRow ? "#fff59d" : "#c8e6c9";
                                                                    })()
                                                                    : isTodayRow
                                                                        ? "rgba(255, 193, 7, 0.25)"
                                                                        : isEvenSlot
                                                                            ? "#f0f0f0"
                                                                            : "#f5f5f5",
                                                            boxShadow: isEditMode && !isBreakSlot ? "0 2px 8px rgba(0,0,0,0.15)" : "none",
                                                        },
                                                    }}
                                                >
                                                    <Stack
                                                        direction="row"
                                                        spacing={0.5}
                                                        sx={{ width: "100%" }}
                                                    >
                                                        <Typography
                                                            variant="caption"
                                                            sx={{
                                                                color: isBreakSlot ? "#1976d2" : "#333",
                                                                fontStyle: isBreakSlot ? "italic" : "normal",
                                                                flex: 1,
                                                                fontSize: "0.8rem",
                                                                fontWeight: '500'
                                                            }}
                                                        >
                                                            {cellValue || (isBreakSlot ? "BREAK" : "-")}
                                                        </Typography>
                                                        {isEditMode && !isBreakSlot && cellValue && (
                                                            <Tooltip title="Edit">
                                                                <EditIcon
                                                                    sx={{
                                                                        fontSize: "1rem",
                                                                        color: "#1976d2",
                                                                        opacity: 0.7,
                                                                        "&:hover": { opacity: 1 },
                                                                    }}
                                                                />
                                                            </Tooltip>
                                                        )}
                                                    </Stack>
                                                </TableCell>
                                            </Tooltip>
                                        );
                                    })}
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default Timetable;