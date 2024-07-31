// @ts-nocheck
import StoreSharpIcon from "@mui/icons-material/StoreSharp";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  useTheme,
} from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import MapGL, {
  GeolocateControl,
  Marker,
  NavigationControl,
  Popup,
} from "react-map-gl";
import Header from "../../components/Header.jsx";
import CircularIndeterminate from "../../components/Loading.jsx";
import { useGetDispensariesQuery } from "../../state/api.js";
import legend from "../../state/legend.js";

const Geography = ({ isSidebarOpen }) => {
  const theme = useTheme();
  const {
    data: dispensaries,
    isLoading: isDispensariesLoading,
    error: dispensariesError,
  } = useGetDispensariesQuery();
  const [selectedDispensary, setSelectedDispensary] = useState(null);
  const [viewport, setViewport] = useState({
    latitude: 34.5199,
    longitude: -105.8701,
    zoom: 6,
    width: "100%",
    height: "100%",
  });
  const [dispensarySales, setDispensarySales] = useState(null);

  useEffect(() => {
    const adjustViewport = () => {
      setViewport((prevViewport) => ({
        ...prevViewport,
        longitude: isSidebarOpen
          ? prevViewport.longitude - 0.1
          : prevViewport.longitude + 0.1,
      }));
    };
    adjustViewport();
  }, [isSidebarOpen]);

  const handleDispensaryChange = (event) => {
    const dispensary = dispensaries.find((d) => d.name === event.target.value);
    setSelectedDispensary(dispensary);
    setViewport({
      ...viewport,
      latitude: dispensary.latitude,
      longitude: dispensary.longitude,
      zoom: 12,
    });
  };

  const getSalesForDispensary = useCallback((dispensaryName) => {
    const dispensaryData = legend.find(
      (d) => d.dispensary_name === dispensaryName
    );
    return dispensaryData ? dispensaryData.cityData : null;
  }, []);

  useEffect(() => {
    if (selectedDispensary) {
      const sales = getSalesForDispensary(selectedDispensary.name);
      setDispensarySales(sales);
    }
  }, [selectedDispensary, getSalesForDispensary]);

  if (isDispensariesLoading) {
    return (
      <Box
        display='flex'
        justifyContent='center'
        alignItems='center'
        height='100%'
      >
        <CircularIndeterminate />
      </Box>
    );
  }

  if (dispensariesError) {
    return <div>Error loading data</div>;
  }

  return (
    <Box m='1.5rem 2.5rem'>
      <Header
        title='GEOGRAPHY'
        subtitle='Find where your competition is located.'
      />
      <Box mt='2rem'>
        <FormControl fullWidth>
          <InputLabel>Dispensary</InputLabel>
          <Select
            value={selectedDispensary?.name || ""}
            label='Dispensary'
            onChange={handleDispensaryChange}
          >
            {dispensaries?.map((dispensary) => (
              <MenuItem key={dispensary._id} value={dispensary.name}>
                {dispensary.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Box
        mt='30px'
        height='65vh'
        border={
          theme.palette.secondary[200]
            ? `1px solid ${theme.palette.secondary[200]}`
            : "none"
        }
        borderRadius={theme.palette.secondary[200] ? "4px" : "0px"}
      >
        <MapGL
          {...viewport}
          mapStyle='mapbox://styles/mapbox/satellite-streets-v12'
          mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
          onMove={(evt) => setViewport(evt.viewState)}
        >
          {dispensaries?.map((dispensary) => (
            <Marker
              key={dispensary._id}
              longitude={dispensary.longitude}
              latitude={dispensary.latitude}
            >
              <StoreSharpIcon
                onClick={() => setSelectedDispensary(dispensary)}
                style={{
                  cursor: "pointer",
                  color: "#FFFFFF", // white color for the icon
                  stroke: "#000000",
                  strokeWidth: ".4pt",
                  fontSize: "2rem", // larger size for the icon
                }}
              />
            </Marker>
          ))}

          {selectedDispensary && (
            <Popup
              longitude={selectedDispensary.longitude}
              latitude={selectedDispensary.latitude}
              onClose={() => setSelectedDispensary(null)}
              closeOnClick={false}
            >
              <Box sx={{ color: "black" }}>
                <Typography variant='h6'>{selectedDispensary?.name}</Typography>
                <Typography>Address: {selectedDispensary?.address}</Typography>
                <Typography>Ranking: {selectedDispensary?.ranking}</Typography>
                <Typography>Rating: {selectedDispensary?.rating}</Typography>
                {dispensarySales ? (
                  <Typography>
                    Total Sales: {dispensarySales["Total Sales"]}
                  </Typography>
                ) : (
                  <Typography>No sales data available</Typography>
                )}
              </Box>
            </Popup>
          )}

          <NavigationControl position='top-left' />
          <GeolocateControl position='top-left' trackUserLocation />
        </MapGL>
      </Box>
    </Box>
  );
};

export default Geography;
