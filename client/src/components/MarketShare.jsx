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

const MarketShare = () => {
  const theme = useTheme();
  const { data: breakdownData, isLoading: isBreakdownLoading } =
    useGetBreakdownQuery();
  const [selectedName, setSelectedName] = useState("");

  const uniqueLicensees = useMemo(() => {
    if (!breakdownData) return [];
    const licenseesSet = new Set();
    breakdownData.forEach((item) =>
      item.marketshare.forEach((market) => licenseesSet.add(market.Licensee))
    );
    return Array.from(licenseesSet).sort();
  }, [breakdownData]);

  useEffect(() => {
    if (uniqueLicensees.length > 0) {
      setSelectedName(uniqueLicensees[0]);
    }
  }, [uniqueLicensees]);

  const handleNameChange = (event) => {
    setSelectedName(event.target.value);
  };

  const formattedData = useMemo(() => {
    if (!breakdownData || !selectedName) return [];

    let selectedMarket = null;

    breakdownData.forEach((item) => {
      item.marketshare.forEach((market) => {
        if (market.Licensee === selectedName) {
          selectedMarket = market;
        }
      });
    });

    if (!selectedMarket) return [];

    return [
      {
        id: "Total Sales",
        label: "Total Sales",
        value: selectedMarket.totalSales,
        color: "#1565c0",
      },
      {
        id: "Market Cap",
        label: "Market Cap",
        value: selectedMarket.marketCap,
        color: "#73a3d9",
      },
    ];
  }, [breakdownData, selectedName]);

  const selectedMarketDetails = useMemo(() => {
    if (!breakdownData || !selectedName) return null;

    let selectedMarket = null;

    breakdownData.forEach((item) => {
      item.marketshare.forEach((market) => {
        if (market.Licensee === selectedName) {
          selectedMarket = market;
        }
      });
    });

    if (!selectedMarket) return null;

    return (
      <Card sx={{ width: 360 }}>
        <Box sx={{ p: 2 }}>
          <Stack direction='row' alignItems='center' spacing={1}>
            <PieChartIcon sx={{ fontSize: 45, color: "#42a5f5" }} />
            <Typography gutterBottom variant='h5' component='div'>
              {selectedMarket.Licensee}
            </Typography>
          </Stack>
          <Divider sx={{ my: 1 }} />
          <Typography variant='body1' color='#fff' gutterBottom>
            {selectedMarket.Address}, {selectedMarket.City},{" "}
            {selectedMarket.Zip}
          </Typography>
          <Divider sx={{ my: 1 }} />
          <Typography variant='body2' color='#fff'>
            Market Share: {selectedMarket.marketShare.toFixed(2)}%
          </Typography>
          <Typography variant='body2' color='#fff'>
            Total Market: ${selectedMarket.marketCap.toLocaleString()}
          </Typography>
        </Box>
      </Card>
    );
  }, [breakdownData, selectedName]);

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
        <InputLabel>Licensee</InputLabel>
        <Select
          value={selectedName}
          onChange={handleNameChange}
          label='Licensee'
        >
          {uniqueLicensees.map((licensee) => (
            <MenuItem key={licensee} value={licensee}>
              {licensee}
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
              Total Market: $
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
          {selectedMarketDetails}
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

export default MarketShare;
