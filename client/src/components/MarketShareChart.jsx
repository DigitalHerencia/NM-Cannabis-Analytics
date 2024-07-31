import { Box, Typography, useTheme } from "@mui/material";
import { ResponsivePie } from "@nivo/pie";
import { useGetKPIQuery } from "../state/api.js";
import CircularIndeterminate from "./CircularIndeterminate.jsx";

const MarketShareChart = () => {
  const theme = useTheme();
  const { data, isLoading } = useGetKPIQuery();

  const formattedData = () => {
    if (
      !data ||
      !data[0] ||
      !data[0].salesData ||
      !data[0].salesData.totalLifetimeSales
    ) {
      return [];
    }
    let selectedMarket = data[0].salesData.marketTotal;
    if (!selectedMarket) {
      return [];
    }

    return [
      {
        id: "Market Share",
        label: "Market Share",
        value: data[0].salesData.totalLifetimeSales,
        color: "#1565c0",
      },
      {
        id: "Market",
        label: "Market",
        value: selectedMarket,
        color: "#73a3d9",
      },
    ];
  };

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

  const dataForPie = formattedData();

  if (dataForPie.length === 0) {
    return <div>No data available</div>;
  }

  return (
    <Box height='100%' width='100%' position='relative'>
      <ResponsivePie
        data={dataForPie}
        theme={{
          axis: {
            ticks: {
              text: {
                fill: theme.palette.secondary[200],
              },
            },
          },
        }}
        colors={{ datum: "data.color" }}
        margin={{ top: 40, right: 10, bottom: 20, left: 10 }}
        innerRadius={0.6}
        activeOuterRadiusOffset={8}
        borderWidth={1}
        borderColor={{
          from: "color",
          modifiers: [["darker", 0.2]],
        }}
        enableArcLabels={false}
        enableArcLinkLabels={false}
        arcLabelsTextColor={{
          from: "color",
          modifiers: [["darker", 2]],
        }}
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
            {id}: $
            {Number.parseFloat(value)
              .toFixed(2)
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          </strong>
        )}
      />
      <Box
        position='relative'
        color={theme.palette.secondary[400]}
        textAlign='center'
        pointerEvents='none'
        sx={{ transform: "translate(0%, -1000%)" }}
      >
        <Typography variant='h6'>Market Share</Typography>
      </Box>
    </Box>
  );
};

export default MarketShareChart;
