import React, { useState } from "react";
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
    Select,
    MenuItem,
    FormControl,
    InputLabel,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import ClearIcon from "@mui/icons-material/Clear";
import SaveIcon from "@mui/icons-material/Save";
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
    onCellClick,
    onDataUpdate,
    onTimeSlotChange,
    rowHeaderColor = "#1976d2",
    headerColor = "#0d47a1",
    breakColor = "#e3f2fd",
    editButtonProps = {},
    editCellDialogProps = {},
    editHeaderDialogProps = {},
    editCellDialogUIProps = {},
    editHeaderDialogUIProps = {},
    data: slotsData,
    slotOptions,
}) => {
    const {
        variant = "outlined",
        variantActive = "contained",
        color = "primary",
        label = "Edit",
        labelActive = "Done",
        tooltip = "Enter Edit Mode",
        tooltipActive = "Exit Edit Mode",
        icon = <EditIcon />,
        iconActive,
        disabled,
        sx: customSx,
    } = editButtonProps;

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
    const [data, setData] = useState(slotsData || createEmptyData());
    const [colors, setColors] = useState(createEmptyColors());
    const [isEditMode, setIsEditMode] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [openHeaderDialog, setOpenHeaderDialog] = useState(false);
    const [editingCell, setEditingCell] = useState<{
        day: string;
        timeSlotId: string;
    } | null>(null);
    const [editValue, setEditValue] = useState("");
    const [editColor, _setEditColor] = useState("#e8f5e9");
    const [editingHeader, setEditingHeader] = useState<string | null>(null);
    const [headerLabel, setHeaderLabel] = useState("");
    const [headerStartTime, setHeaderStartTime] = useState("");
    const [headerEndTime, setHeaderEndTime] = useState("");

    // Helper function to get slot option color by matching label or id
    const getSlotOptionColor = (slotId: string): string | undefined => {
        if (!slotOptions) return undefined;
        return slotOptions.find(
            (option) => option.id === slotId || option.label === slotId
        )?.color;
    };

    // Helper function to get cell background color - matches cellValue with slotOption label
    const getCellBackgroundColor = (day: string, slotId: string): string => {
        const cellValue = data?.[day]?.[slotId];

        // If cell has a value, try to match it with slotOptions
        if (cellValue && slotOptions) {
            const matchedOption = slotOptions.find(
                (option) => option.label === cellValue || option.id === cellValue
            );
            if (matchedOption) {
                return matchedOption.color;
            }
        }

        // Otherwise use saved color
        return colors[day]?.[slotId] || "#e8f5e9";
    };

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

    const handleCellClick = (day: string, timeSlotId: string) => {
        if (!isEditMode) {
            const currentValue = data[day]?.[timeSlotId] || "";
            if (currentValue && onCellClick)
                onCellClick(day, timeSlotId);
        } else {
            const currentValue = data[day]?.[timeSlotId] || "";
            setEditValue(currentValue);
            setEditingCell({ day, timeSlotId });
            setOpenDialog(true);
        }
    };

    const handleClose = () => {
        setOpenDialog(false);
        setEditingCell(null);
    };

    const handleHeaderClose = () => {
        setOpenHeaderDialog(false);
        setEditingHeader(null);
    };

    const handleClear = () => {
        setEditValue("");
    };

    const handleSave = () => {
        if (!editingCell) return;

        const { day, timeSlotId } = editingCell;

        // Calculate new data
        const newData = {
            ...data,
            [day]: {
                ...data[day],
                [timeSlotId]: editValue || null,
            },
        };

        // Update data state
        setData(newData);

        // Update colors state
        setColors((prevColors) => ({
            ...prevColors,
            [day]: {
                ...prevColors[day],
                [timeSlotId]: editColor,
            },
        }));

        // Call parent callback with new data
        if (onCellChange) {
            onCellChange(day, timeSlotId, editValue || null, editColor);
        }

        // Call data update callback with complete updated data
        if (onDataUpdate) {
            onDataUpdate(newData);
        }

        // Close dialog and reset
        handleClose();
        handleClear();
    }

    const handleHeaderSave = () => {
        if (!editingHeader) return;

        // Create updated timeSlots array
        const updatedTimeSlots = timeSlots.map((slot) => {
            if (slot.id === editingHeader) {
                return {
                    ...slot,
                    label: headerLabel,
                    startTime: headerStartTime,
                    endTime: headerEndTime,
                };
            }
            return slot;
        });

        // Update timeSlots state
        setTimeSlots(updatedTimeSlots);

        // Call parent callback with updated timeSlots
        if (onTimeSlotChange) {
            onTimeSlotChange(updatedTimeSlots);
        }

        // Close dialog and reset
        handleHeaderClose();
    }

    return (
        <Box sx={{ width: "100%", padding: 2, margin: 0 }}>
            {title && (
                <Stack direction="row" sx={{ mb: 2, justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                        {title}
                    </Typography>
                    <Tooltip title={isEditMode ? tooltipActive : tooltip}>
                        <Button
                            onClick={() => setIsEditMode(!isEditMode)}
                            variant={isEditMode ? variantActive : variant}
                            color={color}
                            startIcon={isEditMode && iconActive ? iconActive : icon}
                            sx={[{ textTransform: "none" }, ...(Array.isArray(customSx) ? customSx : [customSx])]}
                            disabled={disabled}
                        >
                            {isEditMode ? labelActive : label}
                        </Button>
                    </Tooltip>
                </Stack>
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
                                        backgroundColor: slot.isBreak ? "#1565c0" : (getSlotOptionColor(slot.id) || headerColor),
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
                                        const cellValue = data?.[day]?.[slot.id];
                                        const isBreakSlot = slot.isBreak;
                                        const isEvenSlot = index % 2 === 0;

                                        return (
                                            <Tooltip title={isEditMode ? "Edit" : "Go to grade"} key={`${day}-${slot.id}`}>
                                                <TableCell
                                                    onClick={() =>
                                                        !isBreakSlot && handleCellClick(day, slot.id)
                                                    }
                                                    sx={{
                                                        textAlign: "center",
                                                        fontWeight: cellValue ? "600" : "400",
                                                        backgroundColor: isBreakSlot
                                                            ? isTodayRow
                                                                ? "rgba(255, 193, 7, 0.25)"
                                                                : breakColor
                                                            : cellValue
                                                                ? getCellBackgroundColor(day, slot.id)
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
                                                                        const customColor = getCellBackgroundColor(day, slot.id);
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

            {/* Edit Dialog */}
            <Dialog
                open={openDialog}
                onClose={handleClose}
                maxWidth={editCellDialogProps.maxWidth || "xs"}
                fullWidth={editCellDialogProps.fullWidth !== false}
                sx={editCellDialogProps.sx}
            >
                <DialogTitle sx={editCellDialogUIProps.titleProps?.sx}>
                    {editCellDialogUIProps.title || `Edit Slot - ${editingCell?.day} (${timeSlots.find((s) => s.id === editingCell?.timeSlotId)?.label})`}
                </DialogTitle>
                <DialogContent sx={editCellDialogProps.sx}>
                    <Box sx={{ pt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
                        {/* Instruction Section */}
                        <Typography variant="body2" sx={{
                            fontWeight: 500,
                            color: '#1976d2',
                            padding: '8px 12px',
                            backgroundColor: '#f5f5f5',
                            borderRadius: 1,
                            borderLeft: '3px solid #1976d2'
                        }}>
                            {editCellDialogUIProps.instructionTitle || "Select a class/grade to assign it to this time slot."}
                        </Typography>

                        {/* Selection Field */}
                        <FormControl fullWidth size={editCellDialogUIProps.selectFieldProps?.size || "small"}>
                            <InputLabel>{editCellDialogUIProps.selectFieldProps?.label || "Select Class/Grade"}</InputLabel>
                            <Select
                                autoFocus
                                label={editCellDialogUIProps.selectFieldProps?.label || "Select Class/Grade"}
                                value={editValue}
                                onChange={(e) => setEditValue(e.target.value)}
                                sx={editCellDialogUIProps.selectFieldProps?.sx}
                            >
                                <MenuItem value="">None</MenuItem>
                                {slotOptions?.map((option) => (
                                    <MenuItem key={option.id} value={`${option.id}`}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        {
                            editValue && slotOptions && (() => {
                                const selectedOption = slotOptions.find(opt => opt.id === editValue);
                                return selectedOption ? (
                                    <Box>
                                        <Typography variant="body2" sx={{ fontWeight: 600, mb: 1, color: '#333' }}>
                                            Preview:
                                        </Typography>
                                        <Box
                                            sx={{
                                                width: '100%',
                                                padding: '16px',
                                                backgroundColor: selectedOption.color,
                                                border: '2px solid #1976d2',
                                                borderRadius: '8px',
                                                display: 'flex',
                                                flexDirection: 'column',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                transition: 'all 0.2s ease',
                                                boxShadow: '0 2px 8px rgba(25, 118, 210, 0.2)',
                                                '&:hover': {
                                                    boxShadow: '0 4px 12px rgba(25, 118, 210, 0.3)',
                                                },
                                            }}
                                        >
                                            <Typography sx={{ fontWeight: 'bold', border: '2 px solid #1976d2', fontSize: '1rem' }}>
                                                {selectedOption.label}
                                            </Typography>
                                        </Box>
                                    </Box>
                                ) : null;
                            })()
                        }
                    </Box>
                </DialogContent>
                <DialogActions sx={editCellDialogProps.sx}>
                    <Button
                        onClick={handleClear}
                        color={editCellDialogUIProps.clearButtonProps?.color || "error"}
                        variant={editCellDialogUIProps.clearButtonProps?.variant || "outlined"}
                        sx={editCellDialogUIProps.clearButtonProps?.sx}
                        startIcon={<ClearIcon />}
                    >
                        Clear
                    </Button>
                    <Button
                        onClick={handleClose}
                        color={editCellDialogUIProps.cancelButtonProps?.color || "inherit"}
                        variant={editCellDialogUIProps.cancelButtonProps?.variant || "text"}
                        sx={editCellDialogUIProps.cancelButtonProps?.sx}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleSave}
                        variant={editCellDialogUIProps.saveButtonProps?.variant || "contained"}
                        color={editCellDialogUIProps.saveButtonProps?.color || "primary"}
                        sx={editCellDialogUIProps.saveButtonProps?.sx}
                        startIcon={<SaveIcon />}
                    >
                        Save
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Header Edit Dialog */}
            <Dialog
                open={openHeaderDialog}
                onClose={handleHeaderClose}
                maxWidth={editHeaderDialogProps.maxWidth || "xs"}
                fullWidth={editHeaderDialogProps.fullWidth !== false}
                sx={editHeaderDialogProps.sx}
            >
                <DialogTitle sx={editHeaderDialogUIProps.titleProps?.sx}>
                    {editHeaderDialogUIProps.title || "Edit Time Slot"}
                </DialogTitle>
                <DialogContent sx={editHeaderDialogProps.sx}>
                    <Typography variant="body2" sx={{
                        fontWeight: 500,
                        color: '#1976d2',
                        padding: '8px 12px',
                        backgroundColor: '#f5f5f5',
                        borderRadius: 1,
                        borderLeft: '3px solid #1976d2'
                    }}>
                        {editHeaderDialogUIProps.instructionTitle || "Edit the slot name, start time, and end time."}
                    </Typography>
                    <Box sx={{ pt: 2, display: "flex", flexDirection: "column", gap: 2 }}>
                        <TextField
                            autoFocus
                            fullWidth
                            label="Slot Name"
                            value={headerLabel}
                            onChange={(e) => setHeaderLabel(e.target.value.toUpperCase())}
                            placeholder="e.g., 1, 2, 3..."
                            variant={editHeaderDialogUIProps.slotNameFieldProps?.variant || "outlined"}
                            size={editHeaderDialogUIProps.slotNameFieldProps?.size || "small"}
                            sx={editHeaderDialogUIProps.slotNameFieldProps?.sx}
                        />
                        <TextField
                            fullWidth
                            label="Start Time"
                            type="time"
                            value={headerStartTime}
                            onChange={(e) => setHeaderStartTime(e.target.value)}
                            variant={editHeaderDialogUIProps.startTimeFieldProps?.variant || "outlined"}
                            size={editHeaderDialogUIProps.startTimeFieldProps?.size || "small"}
                            sx={editHeaderDialogUIProps.startTimeFieldProps?.sx}
                        />
                        <TextField
                            fullWidth
                            label="End Time"
                            type="time"
                            value={headerEndTime}
                            onChange={(e) => setHeaderEndTime(e.target.value)}
                            variant={editHeaderDialogUIProps.endTimeFieldProps?.variant || "outlined"}
                            size={editHeaderDialogUIProps.endTimeFieldProps?.size || "small"}
                            sx={editHeaderDialogUIProps.endTimeFieldProps?.sx}
                        />
                    </Box>
                </DialogContent>
                <DialogActions sx={editHeaderDialogProps.sx}>
                    <Button
                        onClick={handleHeaderClose}
                        color={editHeaderDialogUIProps.cancelButtonProps?.color || "inherit"}
                        variant={editHeaderDialogUIProps.cancelButtonProps?.variant || "text"}
                        sx={editHeaderDialogUIProps.cancelButtonProps?.sx}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleHeaderSave}
                        variant={editHeaderDialogUIProps.saveButtonProps?.variant || "contained"}
                        color={editHeaderDialogUIProps.saveButtonProps?.color || "primary"}
                        sx={editHeaderDialogUIProps.saveButtonProps?.sx}
                        startIcon={<SaveIcon />}
                    >
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default Timetable;