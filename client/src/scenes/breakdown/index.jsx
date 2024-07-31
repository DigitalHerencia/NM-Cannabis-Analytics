import { Box, ToggleButton, ToggleButtonGroup, useTheme } from "@mui/material";
import { useState } from "react";
import Header from "../../components/Header.jsx";
import Market from "../../components/Market";
import MarketShare from "../../components/MarketShare";
import ProductCategory from "../../components/ProductCategory";
import SalesSegment from "../../components/SalesSegment";

const Breakdown = () => {
  // eslint-disable-next-line
  const theme = useTheme();
  const [view, setView] = useState("productCategory");

  // eslint-disable-next-line
  const handleViewChange = (event, newView) => {
    setView(newView);
  };

  return (
    <Box m='1.5rem 2.5rem'>
      <Box display='flex' justifyContent='space-between'>
        <Header
          title='BREAKDOWN'
          subtitle='Breakdown of inventory by category'
        />
        <ToggleButtonGroup
          sx={{ my: 2 }}
          color='primary'
          value={view}
          exclusive
          onChange={handleViewChange}
          aria-label='View Selection'
        >
          <ToggleButton value='productCategory'>Product Category</ToggleButton>
          <ToggleButton value='salesSegment'>Sales Segment</ToggleButton>
          <ToggleButton value='market'>Market</ToggleButton>
          <ToggleButton value='marketShare'>Market Share</ToggleButton>
        </ToggleButtonGroup>
      </Box>
      {view === "productCategory" && <ProductCategory />}
      {view === "salesSegment" && <SalesSegment />}
      {view === "market" && <Market />}
      {view === "marketShare" && <MarketShare />}
    </Box>
  );
};

export default Breakdown;
