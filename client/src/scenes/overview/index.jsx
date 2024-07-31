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
import { useGetPerformanceQuery } from "../../state/api.js";

const Overview = () => {
  const theme = useTheme();
  const [selectedCity1, setSelectedCity1] = useState("");
  const [selectedCity2, setSelectedCity2] = useState("");
  const [xAxisValues, setXAxisValues] = useState([]);
  const { data: salesData, isLoading } = useGetPerformanceQuery();

  useEffect(() => {
    if (salesData) {
      const uniqueCities = Array.from(
        new Set(salesData.map((entry) => entry.City))
      )
        .filter(
          (city) =>
            ![
              "SUNLAND",
              "ALBUQERQUE",
              "T OR C",
              "CHAPPARAL",
              "MESILLA",
            ].includes(city)
        )
        .sort();
      if (uniqueCities.length > 0) {
        setSelectedCity1(uniqueCities[0]);
        setSelectedCity2(uniqueCities[1] || uniqueCities[0]);
      }

      const allMonths = Array.from(
        new Set(
          salesData.map(({ month_year }) => {
            const [month, year] = month_year.split(" ");
            return `${month} ${year.slice(-2)}`;
          })
        )
      ).sort((a, b) => {
        const [monthA, yearA] = a.split(" ");
        const [monthB, yearB] = b.split(" ");
        return (
          new Date(`1 ${monthA} ${yearA}`) - new Date(`1 ${monthB} ${yearB}`)
        );
      });

      setXAxisValues(allMonths);
    }
  }, [salesData]);

  const formattedData = useMemo(() => {
    if (!salesData) return [];

    const formatCityData = (city) => {
      const cityData = salesData
        .filter((entry) => entry.City === city)
        .reduce((acc, { month_year, totalSales }) => {
          const [month, year] = month_year.split(" ");
          const formattedMonth = `${month} ${year.slice(-2)}`;
          acc[formattedMonth] = totalSales;
          return acc;
        }, {});

      return xAxisValues.map((x) => ({
        x,
        y: cityData[x] || 0,
      }));
    };

    const data1 = formatCityData(selectedCity1);
    const data2 = formatCityData(selectedCity2);

    return [
      {
        id: selectedCity1,
        color: theme.palette.secondary[400],
        data: data1,
      },
      {
        id: selectedCity2,
        color: theme.palette.secondary[200],
        data: data2,
      },
    ];
  }, [
    salesData,
    selectedCity1,
    selectedCity2,
    xAxisValues,
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
      <Header title='OVERVIEW' subtitle='Compare sales between cities' />
      <Box height='68vh'>
        <FlexBetween>
          <FormControl
            fullWidth
            variant='outlined'
            margin='normal'
            sx={{ mr: 2 }}
          >
            <InputLabel>City 1</InputLabel>
            <Select
              value={selectedCity1}
              label='City 1'
              onChange={(e) => setSelectedCity1(e.target.value)}
            >
              {salesData &&
                Array.from(new Set(salesData.map((entry) => entry.City)))
                  .filter(
                    (city) =>
                      ![
                        "SUNLAND",
                        "ALBUQERQUE",
                        "T OR C",
                        "CHAPPARAL",
                        "MESILLA",
                      ].includes(city)
                  )
                  .sort()
                  .map((city) => (
                    <MenuItem key={city} value={city}>
                      {city}
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
            <InputLabel>City 2</InputLabel>
            <Select
              value={selectedCity2}
              label='City 2'
              onChange={(e) => setSelectedCity2(e.target.value)}
            >
              {salesData &&
                Array.from(new Set(salesData.map((entry) => entry.City)))
                  .filter(
                    (city) =>
                      ![
                        "SUNLAND",
                        "ALBUQERQUE",
                        "T OR C",
                        "CHAPPARAL",
                        "MESILLA",
                      ].includes(city)
                  )
                  .sort()
                  .map((city) => (
                    <MenuItem key={city} value={city}>
                      {city}
                    </MenuItem>
                  ))}
            </Select>
          </FormControl>
        </FlexBetween>
        {selectedCity1 && selectedCity2 && (
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
                      fill: theme.palette.secondary[500],
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
              margin={{ top: 30, right: 50, bottom: 80, left: 90 }}
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
                format: (value) => {
                  const [month, year] = value.split(" ");
                  return `${month.slice(0, 3)} ${year}`;
                },
              }}
              axisLeft={{
                orient: "left",
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: "",
                legendOffset: -70,
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
                  itemsSpacing: 100,
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

export default Overview;
