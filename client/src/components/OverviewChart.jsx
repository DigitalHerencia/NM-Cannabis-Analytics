import { Box, useTheme } from "@mui/material";
import { ResponsiveLine } from "@nivo/line";
import { useMemo } from "react";
import { useGetKPIQuery } from "../state/api.js"; // Assuming the KPI collection query
import CircularIndeterminate from "./Loading.jsx";

const OverviewChart = () => {
  const theme = useTheme();
  const { data: kpiData, isLoading } = useGetKPIQuery(); // Fetching KPI collection data

  const paletteSecondary200 = theme.palette.secondary[200];

  const formattedData = useMemo(() => {
    if (!kpiData) return [];

    const salesData = kpiData.flatMap((item) => item.salesData.monthlyData);

    const data = salesData.map(({ month, year, totalSales }) => ({
      x: `${month.charAt(0).toUpperCase() + month.slice(1, 3)} '${String(
        year
      ).slice(-2)}`,
      y: totalSales,
    }));

    return [
      {
        id: "Sales",
        color: paletteSecondary200,
        data,
      },
    ];
  }, [kpiData, paletteSecondary200]);

  if (isLoading || !kpiData || formattedData.length === 0) {
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
    <Box
      height='100%'
      width='100%'
      className='chartContainer'
      position='relative'
    >
      <ResponsiveLine
        data={formattedData}
        theme={{
          axis: {
            domain: {
              line: {
                stroke: theme.palette.secondary[200],
              },
            },
            legend: {
              text: {
                fill: theme.palette.secondary[200],
              },
            },
            ticks: {
              line: {
                stroke: theme.palette.secondary[200],
                strokeWidth: 1,
              },
              text: {
                fill: theme.palette.secondary[200],
              },
            },
          },
          legends: {
            text: {
              fill: theme.palette.secondary[200],
            },
          },
          tooltip: {
            container: {
              background: "white",
              color: "black",
            },
          },
        }}
        colors={{ datum: "color" }}
        margin={{ top: 20, right: 20, bottom: 50, left: 60 }}
        xScale={{ type: "point" }}
        yScale={{
          type: "linear",
          min: "0",
          max: "auto",
          stacked: true,
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
          legendOffset: 36,
          legendPosition: "middle",
        }}
        axisLeft={{
          orient: "left",
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "",
          legendOffset: -50,
          legendPosition: "middle",
          format: (d) => `$${d.toLocaleString()}`,
        }}
        enableGridX={false}
        enableGridY={false}
        enableArea={true}
        areaOpacity={0.3}
        pointSize={10}
        pointColor={{ theme: "background" }}
        pointBorderWidth={2}
        pointBorderColor={{ from: "seriesColor" }}
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
                color: point.serieColor,
              }}
            >
              <strong>{point.serieId}</strong>
              <br />
              {point.data.xFormatted}: {formattedValue}
            </div>
          );
        }}
      />
    </Box>
  );
};

export default OverviewChart;
