import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import {
  Box,
  Button,
  Grow,
  List,
  ListItem,
  ListItemText,
  Modal,
  Paper,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import customParseFormat from "dayjs/plugin/customParseFormat";
import isBetween from "dayjs/plugin/isBetween";
import localizedFormat from "dayjs/plugin/localizedFormat";
import weekOfYear from "dayjs/plugin/weekOfYear";
import React, { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CalendarComponent from "../../components/Daily";
import Header from "../../components/Header";
import CircularIndeterminate from "../../components/Loading";
import {
  addPromotion,
  removePromotion,
  setPromotions,
  updatePromotion,
} from "../../state";
import { useGetAllPromotionsQuery } from "../../state/api";

dayjs.extend(weekOfYear);
dayjs.extend(customParseFormat);
dayjs.extend(localizedFormat);
dayjs.extend(isBetween);
dayjs.extend(advancedFormat);

const PromotionItem = React.memo(({ promotion, onAddToCalendar }) => {
  const theme = useTheme();
  return (
    <Paper
      key={promotion.promoId}
      elevation={3}
      sx={{
        padding: theme.spacing(2),
        marginBottom: theme.spacing(2),
        backgroundColor: theme.palette.grey[800],
      }}
    >
      <ListItem
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        <ListItemText
          primary={
            <Typography
              variant='h6'
              sx={{
                fontWeight: "bold",
                color: theme.palette.secondary[300],
              }}
            >
              {promotion.title}
            </Typography>
          }
          secondary={
            <>
              <Typography
                variant='body2'
                color='textSecondary'
                component='span'
              >
                <strong>Promo ID:</strong> {promotion.promoId}
                <br />
              </Typography>
              <Typography
                variant='body2'
                color='textSecondary'
                component='span'
              >
                <strong>Slug:</strong> {promotion.slug}
                <br />
              </Typography>
              <Typography
                variant='body2'
                color='textSecondary'
                component='span'
              >
                <strong>Rank:</strong>{" "}
                {promotion.rank ? promotion.rank.toFixed(2) : " "}
                <br />
              </Typography>
              <Typography
                variant='body2'
                color='textSecondary'
                component='span'
              >
                <strong>Rating:</strong> {promotion.rating || " "}
                <br />
              </Typography>
              <Typography
                variant='body2'
                color='textSecondary'
                component='span'
              >
                <i>Source:</i> {promotion.source || " "}
                <br />
              </Typography>
            </>
          }
          sx={{ marginBottom: theme.spacing(1) }}
        />
        <Button
          variant='contained'
          size='small'
          sx={{
            backgroundColor: theme.palette.secondary[500],
            color: theme.palette.background.alt,
            "&:hover": {
              backgroundColor: theme.palette.secondary[200],
              color: theme.palette.grey[300],
            },
            alignSelf: "center",
            transform: "scale(0.925)",
            marginTop: theme.spacing(1),
          }}
          onClick={() => onAddToCalendar(promotion)}
        >
          <strong>Add to Calendar</strong>
        </Button>
      </ListItem>
    </Paper>
  );
});

const Daily = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const calendarState = useSelector((state) => state.calendar);
  const promotions = calendarState ? calendarState.promotions : [];
  const [openModal, setOpenModal] = useState(false);
  const [modalData, setModalData] = useState({
    id: null,
    title: "",
    slug: "",
    date: dayjs().format("YYYY-MM-DD"),
  });
  const { data: promoData, isLoading, isError } = useGetAllPromotionsQuery();

  // Load initial promotions from local storage
  useMemo(() => {
    const storedPromotions =
      JSON.parse(localStorage.getItem("calendarPromotions")) || [];
    dispatch(setPromotions(storedPromotions));

    if (!isLoading && !isError && promoData) {
      const combinedPromotions = [...storedPromotions];
      promoData.forEach((promotion) => {
        if (!combinedPromotions.find((p) => p.id === promotion.promoId)) {
          combinedPromotions.push({
            id: promotion.promoId,
            title: promotion.title,
            slug: promotion.slug,
            start: promotion.date,
          });
        }
      });
      dispatch(setPromotions(combinedPromotions));
      localStorage.setItem(
        "calendarPromotions",
        JSON.stringify(combinedPromotions)
      );
    }
  }, [promoData, isLoading, isError, dispatch]);

  const handleAddPromotionToCalendar = () => {
    const existingPromotionIndex = promotions.findIndex(
      (promo) => promo.id === modalData.id
    );

    if (existingPromotionIndex !== -1) {
      // Update existing promotion
      dispatch(
        updatePromotion({
          id: modalData.id,
          updates: {
            title: modalData.title,
            slug: modalData.slug,
            start: modalData.date,
          },
        })
      );
    } else {
      // Add new promotion
      const newPromotion = {
        id: new Date().getTime().toString(),
        title: modalData.title,
        slug: modalData.slug,
        start: modalData.date,
      };
      dispatch(addPromotion(newPromotion));
    }

    setOpenModal(false);
  };

  const handleOpenModal = (promotion) => {
    if (promotion) {
      setModalData({
        id: promotion.id,
        title: promotion.title,
        slug: promotion.slug,
        date: dayjs(promotion.start).format("YYYY-MM-DD"),
      });
    } else {
      setModalData({
        id: new Date().getTime().toString(),
        title: "",
        slug: "",
        date: dayjs().format("YYYY-MM-DD"),
      });
    }
    setOpenModal(true);
  };

  const handleDateClick = (selected) => {
    setModalData({
      id: new Date().getTime().toString(),
      title: "",
      slug: "",
      date: dayjs(selected.dateStr).format("YYYY-MM-DD"),
    });
    setOpenModal(true);
  };

  const handleEventClick = (selected) => {
    const { id } = selected.event;
    const promotion = promotions.find((promo) => promo.id === id);
    if (promotion) {
      setModalData({
        id: promotion.id,
        title: promotion.title,
        slug: promotion.slug,
        date: dayjs(selected.event.startStr).format("YYYY-MM-DD"),
      });
      setOpenModal(true);
    }
  };

  const handleEventDrop = (info) => {
    const { id } = info.event;
    const newStart = info.event.startStr;
    const newEnd = info.event.endStr;

    dispatch(
      updatePromotion({
        id: id,
        updates: {
          start: newStart,
          end: newEnd,
        },
      })
    );
  };

  const handleEventResize = (info) => {
    const { id } = info.event;
    const newStart = info.event.startStr;
    const newEnd = info.event.endStr;

    dispatch(
      updatePromotion({
        id: id,
        updates: {
          start: newStart,
          end: newEnd,
        },
      })
    );
  };

  const handleDeletePromotion = () => {
    dispatch(removePromotion(modalData.id));
    setOpenModal(false);
  };

  const renderEventContent = (eventInfo) => (
    <div style={{ width: "100%", height: "20px" }}>
      <b>{eventInfo.event.title}</b>
    </div>
  );

  return (
    <>
      {isLoading ? (
        <Box
          display='flex'
          justifyContent='center'
          alignItems='center'
          height='100%'
        >
          <CircularIndeterminate />
        </Box>
      ) : (
        <Box m='20px'>
          <Header title='Daily' subtitle='Plan your competitive advantage' />
          <Box mt='20px' display='flex' justifyContent='space-between'>
            <Box
              mt='10px'
              flex='1 1 20%'
              backgroundColor={theme.palette.background.alt}
              p='15px'
              borderRadius='4px'
            >
              <Typography
                color={theme.palette.secondary[400]}
                variant='h4'
                sx={{
                  position: "sticky",
                  top: 0,
                  backgroundColor: theme.palette.background.alt,
                  zIndex: 0,
                  padding: "10px 0",
                }}
              >
                Trending Promotions
              </Typography>
              <Box
                sx={{
                  maxHeight: "calc(75vh - 140px)",
                  overflowY: "auto",
                  marginTop: "10px",
                  marginBottom: "50px ",
                }}
              >
                <List>
                  {promoData.map((promotion) => (
                    <PromotionItem
                      key={promotion.promoId}
                      promotion={promotion}
                      onAddToCalendar={handleOpenModal}
                    />
                  ))}
                </List>
              </Box>
            </Box>
            <Box flex='1 1 100%' ml='15px'>
              <CalendarComponent>
                <FullCalendar
                  height='75vh'
                  plugins={[
                    dayGridPlugin,
                    timeGridPlugin,
                    interactionPlugin,
                    listPlugin,
                  ]}
                  headerToolbar={{
                    left: "prev,next today",
                    center: "title",
                    right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
                  }}
                  initialView='dayGridMonth'
                  editable={true}
                  selectable={true}
                  selectMirror={true}
                  dayMaxEvents={true}
                  eventStartEditable={true}
                  eventResizableFromStart={true}
                  eventDurationEditable={true}
                  eventDrop={handleEventDrop}
                  eventResize={handleEventResize}
                  select={handleDateClick}
                  eventClick={handleEventClick}
                  events={promotions}
                  eventContent={renderEventContent}
                  themeSystem='standard'
                />
              </CalendarComponent>
            </Box>
          </Box>
          <Modal open={openModal} onClose={() => setOpenModal(false)}>
            <Grow in={openModal}>
              <Box
                sx={{
                  position: "absolute",
                  top: "15%",
                  left: "40%",
                  width: 600,
                  bgcolor: "#3d3d3d",
                  border: "2px solid #000",
                  boxShadow: 24,
                  p: 4,
                }}
              >
                <Typography
                  variant='h4'
                  align='center'
                  component='h2'
                  sx={{ mb: 2 }}
                >
                  Add Promotions to Your Calendar
                </Typography>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <StaticDatePicker
                    orientation='landscape'
                    value={dayjs(modalData.date)}
                    onChange={(newValue) =>
                      setModalData({
                        ...modalData,
                        date: dayjs(newValue).format("YYYY-MM-DD"),
                      })
                    }
                  />
                </LocalizationProvider>
                <TextField
                  label='Promotion Title'
                  value={modalData.title}
                  onChange={(e) =>
                    setModalData({ ...modalData, title: e.target.value })
                  }
                  fullWidth
                  margin='normal'
                  variant='outlined'
                />
                <TextField
                  label='Promotion Slug'
                  value={modalData.slug}
                  onChange={(e) =>
                    setModalData({ ...modalData, slug: e.target.value })
                  }
                  fullWidth
                  margin='normal'
                  variant='outlined'
                />
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mt: 2,
                  }}
                >
                  <Button
                    variant='contained'
                    color='primary'
                    onClick={handleAddPromotionToCalendar}
                  >
                    Save Changes
                  </Button>
                  <Button
                    variant='contained'
                    color='secondary'
                    onClick={handleDeletePromotion}
                  >
                    Delete Promotion
                  </Button>
                </Box>
              </Box>
            </Grow>
          </Modal>
        </Box>
      )}
    </>
  );
};

export default Daily;
