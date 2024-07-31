import { Box, styled } from "@mui/material";

const CalendarComponent = styled(Box)(({ theme }) => ({
  // Check if theme is defined before accessing its properties
  ...(theme && {
    "& .fc-prev-button:hover": {
      backgroundColor: theme.palette.secondary[200],
      color: theme.palette.background.default,
    },
    "& .fc-prev-button:active": {
      backgroundColor: theme.palette.primary[200],
      color: theme.palette.background.alt,
    },
    "& .fc-prev-button:focus": {
      borderColor: theme.palette.background.alt,
    },
    "& .fc-today-button": {
      backgroundColor: theme.palette.secondary[400],
      color: theme.palette.background.alt,
    },
    "& .fc-today-button:disabled": {
      backgroundColor: theme.palette.grey[600],
      color: theme.palette.grey[400],
    },
    "& .fc-today-button:hover": {
      backgroundColor: theme.palette.secondary[200],
      color: theme.palette.background.default,
    },
    "& .fc-today-button:active": {
      backgroundColor: theme.palette.primary[300],
      color: theme.palette.background.default,
    },
    "& .fc-today-button:focus": {
      borderColor: theme.palette.background.alt,
    },
    "& .fc-toolbar-title": {
      color: "white",
      fontWeight: "bold",
      fontSize: "1.5em",
    },
    "& .fc-toolbar": {
      backgroundColor: theme.palette.background.default,
      padding: "10px",
    },
    "& .fc-button-group .fc-button": {
      backgroundColor: theme.palette.background.alt,
      borderColor: theme.palette.background.alt,
      color: theme.palette.secondary[300],
    },
    "& .fc-button-group .fc-button:hover": {
      backgroundColor: theme.palette.secondary[200],
      color: theme.palette.background.default,
    },
    "& .fc-button-group .fc-button:active": {
      backgroundColor: theme.palette.primary[300],
      color: theme.palette.background.default,
      borderColor: theme.palette.primary[400],
    },
    "& .fc-button-group .fc-button:focus": {
      borderColor: theme.palette.background.alt,
    },
    "& .fc-button-primary:not(:disabled).fc-button-active": {
      backgroundColor: theme.palette.primary[300],
      color: theme.palette.background.default,
      borderColor: theme.palette.primary[400],
    },
    "& .fc-button:focus": {
      borderColor: theme.palette.background.alt,
    },
    "& .promotions-section": {
      backgroundColor: theme.palette.background.default,
      borderColor: theme.palette.background.alt,
      color: theme.palette.secondary[300],
    },
    "& .promotion-card": {
      backgroundColor: theme.palette.background.alt,
      borderColor: theme.palette.secondary[300],
      color: theme.palette.secondary[100],
    },
    "& .fc .fc-timegrid-col.fc-day-today": {
      backgroundColor: theme.palette.primary[300],
      color: theme.palette.background.alt,
    },
    "& .fc-daygrid-day.fc-day-today": {
      backgroundColor: theme.palette.primary[200],
      color: theme.palette.background.alt,
    },
    "& .fc-daygrid-day:hover": {
      backgroundColor: theme.palette.secondary[200],
      color: theme.palette.background.alt,
    },
    "& .fc-daygrid-day:active": {
      backgroundColor: theme.palette.primary[300],
    },
    "& .fc-daygrid-day:focus": {
      borderColor: theme.palette.background.alt,
    },
    "& .fc-scroller": {
      overflow: "hidden scroll",
    },
    "& .fc-col-header": {
      backgroundColor: theme.palette.background.alt,
      color: "white",
    },
    "& .css-2f2brb, .fc-day-today": {
      backgroundColor: theme.palette.background.alt,
      color: "white",
    },
    "& .fc-timegrid-col:hover": {
      backgroundColor: theme.palette.background.default,
    },
    "& .fc-timegrid-col:active": {
      backgroundColor: theme.palette.background.default,
    },
    "& .fc-timegrid-col:focus": {
      borderColor: theme.palette.background.alt,
    },
    "& .fc-timegrid-event, .fc-h-event, .fc-event-main": {
      backgroundColor: theme.palette.secondary[500],
      color: theme.palette.background.alt,
      borderColor: theme.palette.background.alt,
      whiteSpace: "truncate",
      overflow: "hidden",
    },
    "& .fc-list-day": {
      backgroundColor: theme.palette.background.alt,
      color: "white",
    },
    "& .fc-list-event": {
      backgroundColor: `${theme.palette.grey[700]} !important`,
      color: `${"white"} !important`,
    },
    "& .fc-list-event:hover": {
      backgroundColor: theme.palette.secondary[300],
      color: `${theme.palette.background.alt} !important`,
    },
    "& .fc-cell-shaded": {
      backgroundColor: theme.palette.background.alt,
    },
    "& .fc-timegrid-col.fc-day-today": {
      backgroundColor: `${theme.palette.background.default}!important`,
    },
    "& .fc-timegrid-event": {
      backgroundColor: theme.palette.secondary[300],
      color: theme.palette.background.default,
      borderColor: theme.palette.background.default,
      whiteSpace: "pre-line",
    },
    "& .fc-daygrid-more-link": {
      backgroundColor: theme.palette.background.alt,
      color: theme.palette.secondary[300],
    },
    "& .fc-daygrid-more-link:hover": {
      backgroundColor: theme.palette.background.alt,
      color: "white",
    },
    "& .fc-daygrid-more-link:active": {
      backgroundColor: theme.palette.primary[300],
      color: theme.palette.background.default,
    },
    "& .fc-daygrid-more-link:focus": {
      borderColor: theme.palette.background.alt,
    },
    "& .fc-event, .fc-daygrid-event": {
      backgroundColor: theme.palette.secondary[300],
      color: theme.palette.background.alt,
      borderColor: theme.palette.background.alt,
      whiteSpace: "truncate",
      overflow: "hidden",
    },
    "& .css-14zpmdn": {
      backgroundColor: theme.palette.background.alt,
      color: "white",
    },
    "--fc-page-bg-color": theme.palette.background.alt,
    "--fc-list-event-hover-bg-color": theme.palette.secondary[300],
    "--css-2v0rzl": theme.palette.background.alt,
    "--css-14aghcl": theme.palette.background.alt,
  }),
}));
export default CalendarComponent;
