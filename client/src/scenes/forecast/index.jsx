import { Box, Button, useTheme } from "@mui/material";
import { ResponsiveLine } from "@nivo/line";
import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import regression from "regression";
import FlexBetween from "../../components/FlexBetween.jsx";
import Header from "../../components/Header.jsx";
import CircularIndeterminate from "../../components/Loading.jsx";
import { useGetSalesQuery } from "../../state/api.js";

const Forecast = () => {
  const theme = useTheme();
  const [isPredictions, setIsPredictions] = useState(false);
  const salesId = useSelector((state) => state.kpi.salesId);
  const { data, isLoading } = useGetSalesQuery();

  const filteredData = useMemo(() => {
    if (!data || !salesId) return null;
    return data.find((item) => item._id === salesId);
  }, [data, salesId]);

  const formattedData = useMemo(() => {
    if (!filteredData) return [];

    const monthData = filteredData.monthlyData;

    const startDate = isPredictions
      ? new Date("2024-04-01")
      : new Date("2022-05-01");
    const endDate = isPredictions
      ? new Date("2025-04-01")
      : new Date("2024-04-01");
    const allMonths = [];

    for (
      let date = startDate;
      date <= endDate;
      date.setMonth(date.getMonth() + 1)
    ) {
      const month = date
        .toLocaleString("default", { month: "long" })
        .toLowerCase();
      const year = date.getFullYear();
      allMonths.push({ month, year, totalSales: 0 });
    }

    const extendedMonthData = allMonths.map(({ month, year }) => {
      const monthEntry = monthData.find(
        (entry) => entry.month === month && entry.year === year
      );
      return monthEntry || { month, year, totalSales: 0 };
    });

    const formatted = extendedMonthData.map(({ totalSales }, i) => [
      i,
      totalSales,
    ]);
    const regressionLine = regression.linear(formatted);

    if (isPredictions) {
      return [
        {
          id: "Predicted Revenue",
          color: "red",
          data: extendedMonthData.map(({ month, year }, i) => ({
            x: `${month.charAt(0).toUpperCase() + month.slice(1, 3)} '${String(
              year
            ).slice(-2)}`,
            y:
              Math.abs(regressionLine.predict(i)[1]) +
              Math.random() * 0.7 * regressionLine.predict(i)[1],
          })),
        },
      ];
    } else {
      return [
        {
          id: "Actual Revenue",
          color: theme.palette.secondary[400],
          data: extendedMonthData.map(({ month, year, totalSales }) => ({
            x: `${month.charAt(0).toUpperCase() + month.slice(1, 3)} '${String(
              year
            ).slice(-2)}`,
            y: totalSales,
          })),
        },
        {
          id: "Regression Line",
          color: theme.palette.secondary[200],
          data: regressionLine.points.map((point, i) => ({
            x: `${
              extendedMonthData[i].month.charAt(0).toUpperCase() +
              extendedMonthData[i].month.slice(1, 3)
            } '${String(extendedMonthData[i].year).slice(-2)}`,
            y: point[1],
          })),
        },
      ];
    }
  }, [filteredData, isPredictions, theme.palette.secondary]);

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
      <FlexBetween>
        <Header
          title='FORECAST'
          subtitle='Revenue forecast for the following year'
        />
        <Button
          onClick={() => setIsPredictions(!isPredictions)}
          sx={{
            backgroundColor: theme.palette.secondary.light,
            color: theme.palette.background.alt,
            boxShadow: "0.1rem 0.1rem 0.1rem 0.1rem rgba(0,0,0,.4)",
            "&:hover": {
              backgroundColor: theme.palette.secondary[200],
              color: theme.palette.grey[600],
            },
            fontSize: "14px",
            fontWeight: "bold",
            padding: "10px 20px",
          }}
        >
          {isPredictions
            ? "Show Actual Revenue and Regression Line"
            : "Show Predicted Revenue for Next Year"}
        </Button>
      </FlexBetween>
      <Box height='80vh'>
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
          curve='natural'
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
            tickRotation: -45,
            legend: "",
            legendOffset: 46,
            legendPosition: "middle",
            format: (d) => d.split(" ")[0], // Show only month names
          }}
          axisLeft={{
            orient: "left",
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "",
            legendOffset: -40,
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
              translateX: 0,
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
    </Box>
  );
};

export default Forecast;
