import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  useTheme,
} from "@mui/material";
import { ResponsiveLine } from "@nivo/line";
import { useEffect, useMemo, useState } from "react";
import FlexBetween from "../../components/FlexBetween.jsx";
import Header from "../../components/Header.jsx";
import CircularIndeterminate from "../../components/Loading.jsx";
import { useGetSalesQuery } from "../../state/api.js";

const Performance = () => {
  const theme = useTheme();
  const [selectedDispensary1, setSelectedDispensary1] = useState("");
  const [selectedDispensary2, setSelectedDispensary2] = useState("");
  const { data: salesData, isLoading } = useGetSalesQuery();

  const months = [
    "Apr '22",
    "May '22",
    "Jun '22",
    "Jul '22",
    "Aug '22",
    "Sep '22",
    "Oct '22",
    "Nov '22",
    "Dec '22",
    "Jan '23",
    "Feb '23",
    "Mar '23",
    "Apr '23",
    "May '23",
    "Jun '23",
    "Jul '23",
    "Aug '23",
    "Sep '23",
    "Oct '23",
    "Nov '23",
    "Dec '23",
    "Jan '24",
    "Feb '24",
    "Mar '24",
  ];

  useEffect(() => {
    if (salesData && salesData.length > 0) {
      setSelectedDispensary1(salesData[0].Licensee);
      setSelectedDispensary2(salesData[1]?.Licensee || salesData[0].Licensee);
    }
  }, [salesData]);

  const formatDataForDispensary = (dispensaryData) => {
    const dataMap = dispensaryData.reduce(
      (acc, { month, year, totalSales }) => {
        const formattedMonth = `${
          month.charAt(0).toUpperCase() + month.slice(1, 3)
        } '${String(year).slice(-2)}`;
        acc[formattedMonth] = totalSales;
        return acc;
      },
      {}
    );

    return months.map((month) => ({
      x: month,
      y: dataMap[month] || 0,
    }));
  };

  const formattedData = useMemo(() => {
    if (!salesData) return [];

    const getDispensaryData = (licensee) => {
      const dispensary = salesData.find((entry) => entry.Licensee === licensee);
      if (!dispensary) return [];
      return formatDataForDispensary(dispensary.monthlyData);
    };

    const data1 = getDispensaryData(selectedDispensary1);
    const data2 = getDispensaryData(selectedDispensary2);

    return [
      {
        id: selectedDispensary1,
        color: theme.palette.secondary[400],
        data: data1,
      },
      {
        id: selectedDispensary2,
        color: theme.palette.secondary[200],
        data: data2,
      },
    ];
  }, [
    salesData,
    selectedDispensary1,
    selectedDispensary2,
    theme.palette.secondary,
  ]);

  if (isLoading) {
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
    <Box m='1.5rem 2.5rem'>
      <Header
        title='PERFORMANCE'
        subtitle='Compare sales against competitors'
      />
      <Box height='68vh'>
        <FlexBetween>
          <FormControl
            fullWidth
            variant='outlined'
            margin='normal'
            sx={{ mr: 2 }}
          >
            <InputLabel>Dispensary 1</InputLabel>
            <Select
              value={selectedDispensary1}
              label='Dispensary 1'
              onChange={(e) => setSelectedDispensary1(e.target.value)}
            >
              {salesData &&
                salesData.map((dispensary) => (
                  <MenuItem
                    key={dispensary._id.$oid}
                    value={dispensary.Licensee}
                  >
                    {dispensary.Licensee} - {dispensary.Address}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
          <FormControl
            fullWidth
            variant='outlined'
            margin='normal'
            sx={{ mr: 2 }}
          >
            <InputLabel>Dispensary 2</InputLabel>
            <Select
              value={selectedDispensary2}
              label='Dispensary 2'
              onChange={(e) => setSelectedDispensary2(e.target.value)}
            >
              {salesData &&
                salesData.map((dispensary) => (
                  <MenuItem
                    key={dispensary._id.$oid}
                    value={dispensary.Licensee}
                  >
                    {dispensary.Licensee} - {dispensary.Address}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </FlexBetween>
        {selectedDispensary1 && selectedDispensary2 && (
          <Box height='70vh' mt='1rem'>
            <ResponsiveLine
              data={formattedData}
              theme={{
                axis: {
                  domain: {
                    line: {
                      stroke: theme.palette.secondary[500],
                    },
                  },
                  legend: {
                    text: {
                      fill: theme.palette.secondary[100],
                    },
                  },
                  ticks: {
                    line: {
                      stroke: theme.palette.secondary[500],
                      strokeWidth: 1,
                    },
                    text: {
                      fill: theme.palette.secondary[500],
                    },
                  },
                },
                legends: {
                  text: {
                    fill: theme.palette.secondary[500],
                  },
                },
              }}
              colors={{ datum: "color" }}
              margin={{ top: 30, right: 50, bottom: 80, left: 60 }}
              xScale={{ type: "point" }}
              yScale={{
                type: "linear",
                min: "0",
                max: "auto",
                stacked: false,
                reverse: false,
              }}
              axisTop={null}
              axisRight={null}
              axisBottom={{
                orient: "bottom",
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: "",
                legendOffset: 60,
                legendPosition: "middle",
              }}
              axisLeft={{
                orient: "left",
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: "",
                legendOffset: -60,
                legendPosition: "middle",
                format: (d) => `$${d.toLocaleString()}`,
              }}
              enableGridX={false}
              enableGridY={false}
              pointSize={10}
              pointColor={{ theme: "background" }}
              pointBorderWidth={2}
              pointBorderColor={{ from: "serieColor" }}
              pointLabelYOffset={-12}
              useMesh={true}
              tooltip={({ point }) => {
                const formattedValue = point.data.y.toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                });
                return (
                  <div
                    style={{
                      background: theme.palette.background.paper,
                      padding: "5px 10px",
                      borderRadius: "3px",
                      boxShadow: theme.shadows[3],
                      color: { datum: "color" },
                    }}
                  >
                    <strong>{point.serieId}</strong>
                    <br />
                    {point.data.xFormatted}: {formattedValue}
                  </div>
                );
              }}
              legends={[
                {
                  anchor: "bottom",
                  direction: "row",
                  justify: false,
                  translateX: -50,
                  translateY: 60,
                  itemsSpacing: 350,
                  itemDirection: "left-to-right",
                  itemWidth: 80,
                  itemHeight: 20,
                  itemOpacity: 1,
                  symbolSize: 12,
                  symbolShape: "circle",
                  effects: [
                    {
                      on: "hover",
                      style: {
                        itemTextColor: theme.palette.primary[200],
                      },
                    },
                  ],
                },
              ]}
            />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Performance;
