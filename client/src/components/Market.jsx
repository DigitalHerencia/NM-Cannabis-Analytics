import PieChartIcon from "@mui/icons-material/PieChart";
import {
  Box,
  Card,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { ResponsivePie } from "@nivo/pie";
import { useEffect, useMemo, useState } from "react";
import { useGetBreakdownQuery } from "../state/api.js";
import FlexBetween from "./FlexBetween.jsx";
import CircularIndeterminate from "./Loading.jsx";

const Market = () => {
  const theme = useTheme();
  const { data: breakdownData, isLoading: isBreakdownLoading } =
    useGetBreakdownQuery();
  const [selectedCity, setSelectedCity] = useState("");

  const uniqueCities = useMemo(() => {
    if (!breakdownData) return [];
    const citiesSet = new Set(breakdownData.map((item) => item.City));
    return Array.from(citiesSet).sort();
  }, [breakdownData]);

  useEffect(() => {
    if (uniqueCities.length > 0) {
      setSelectedCity(uniqueCities[0]);
    }
  }, [uniqueCities]);

  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
  };

  const formattedData = useMemo(() => {
    if (!breakdownData || !selectedCity) return [];

    const selectedCityData = breakdownData.find(
      (item) => item.City === selectedCity
    );

    if (!selectedCityData) return [];

    const otherCitiesTotal = breakdownData
      .filter((item) => item.City !== selectedCity)
      .reduce((acc, item) => acc + item.totalSales, 0);

    return [
      {
        id: selectedCity,
        label: selectedCity,
        value: selectedCityData.totalSales,
        color: "#1565c0",
      },
      {
        id: "Other Cities",
        label: "Other Cities",
        value: otherCitiesTotal,
        color: "#73a3d9",
      },
    ];
  }, [breakdownData, selectedCity]);

  const selectedCityDetails = useMemo(() => {
    if (!breakdownData || !selectedCity) return null;

    const selectedCityData = breakdownData.find(
      (item) => item.City === selectedCity
    );

    if (!selectedCityData) return null;

    return (
      <Card sx={{ width: 360 }}>
        <Box sx={{ p: 2 }}>
          <Stack direction='row' alignItems='center' spacing={1}>
            <PieChartIcon sx={{ fontSize: 45, color: "#42a5f5" }} />
            <Typography gutterBottom variant='h5' component='div'>
              {selectedCity}
            </Typography>
          </Stack>
          <Divider sx={{ my: 1 }} />
          <Typography variant='h6'>
            Total Sales: $
            {formattedData
              .reduce((acc, item) => acc + item.value, 0)
              .toLocaleString()}
          </Typography>
          <Divider sx={{ my: 1 }} />
          <Typography variant='body2' color='#fff'>
            Total Sales: ${selectedCityData.totalSales.toLocaleString()}
          </Typography>
          <Typography variant='body2' color='#fff'>
            Total Medical Sales: $
            {selectedCityData.totalMedicalSales.toLocaleString()}
          </Typography>
          <Typography variant='body2' color='#fff'>
            Total Adult Use Sales: $
            {selectedCityData.totalAdultUseSales.toLocaleString()}
          </Typography>
        </Box>
      </Card>
    );
  }, [breakdownData, selectedCity, formattedData]);

  if (isBreakdownLoading) {
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

  return (
    <Box>
      <FormControl fullWidth variant='outlined' margin='normal'>
        <InputLabel>City</InputLabel>
        <Select value={selectedCity} onChange={handleCityChange} label='City'>
          {uniqueCities.map((city) => (
            <MenuItem key={city} value={city}>
              {city}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FlexBetween />
      <Stack
        direction='row'
        alignItems='center'
        justifyContent='center'
        spacing={4}
        mt={2}
      >
        <Box height='65vh' width='60%' position='relative'>
          <ResponsivePie
            data={formattedData}
            colors={{ datum: "data.color" }}
            margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
            sortByValue={true}
            innerRadius={0.6}
            borderWidth={1}
            borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
            animate={false}
            activeOuterRadiusOffset={25}
            activeInnerRadiusOffset={10}
            motionConfig={"gentle"}
            enableArcLabels={false}
            enableArcLinkLabels={true}
            arcLinkLabelsTextColor={theme.palette.secondary[200]}
            arcLinkLabelsThickness={2}
            arcLinkLabelsColor={{ from: "color" }}
            arcLinkLabelsStraightLength={15}
            arcLabelsSkipAngle={40}
            arcLabelsTextColor={{ from: "color", modifiers: [["darker", 2]] }}
            tooltip={({ datum: { id, value } }) => (
              <strong
                style={{
                  background: theme.palette.background.paper,
                  padding: "5px 10px",
                  borderRadius: "3px",
                  boxShadow: theme.shadows[3],
                  color: "white",
                  transform: "translate(15px, 0)",
                }}
              >
                {id}: ${value.toLocaleString()}
              </strong>
            )}
          />
          <Box
            position='absolute'
            top='50%'
            left='50%'
            color={theme.palette.secondary[400]}
            textAlign='center'
            pointerEvents='none'
            sx={{ transform: "translate(-50%, -50%)" }}
          >
            <Typography variant='h6'>
              Total Sales: $
              {formattedData
                .reduce((acc, item) => acc + item.value, 0)
                .toLocaleString()}
            </Typography>
          </Box>
        </Box>
        <Stack
          paddingTop={10}
          height='65vh'
          width='50%'
          direction='column'
          alignItems='center'
          spacing={-1}
        >
          {selectedCityDetails}
          <Card sx={{ width: 360 }}>
            <Divider sx={{ ml: 2, mr: 2 }} />
            {formattedData.map((item) => (
              <Stack
                key={item.id}
                direction='row'
                alignItems='center'
                spacing={1.5}
                sx={{ p: 1.5, ml: 2 }}
              >
                <Box
                  width={20}
                  height={20}
                  bgcolor={item.color}
                  borderRadius='50%'
                />
                <Typography variant='body2'>{item.label}</Typography>
              </Stack>
            ))}
          </Card>
        </Stack>
      </Stack>
    </Box>
  );
};

export default Market;
