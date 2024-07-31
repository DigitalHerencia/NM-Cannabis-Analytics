import {
  CalendarMonthOutlined,
  HomeOutlined,
  PieChartOutlined,
  PointOfSaleOutlined,
  ReceiptLongOutlined,
  ShoppingCartOutlined,
  StarsOutlined,
  TrendingUpOutlined,
} from "@mui/icons-material";
import { Box, Rating, Typography } from "@mui/material";
import { useGetKPIQuery } from "../state/api";
import CircularIndeterminate from "./Loading.jsx";
import StatBox from "./StatBox";

// Format numbers with commas
const formatNumber = (number) => {
  if (number === undefined || number === null) {
    return "0.00";
  }
  return number.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

// Format percentage
const formatPercentage = (number) => {
  if (number === undefined || number === null) {
    return "0.00%";
  }
  return `${number.toFixed(2)}%`;
};

const TotalSalesKPI = () => {
  const { data, isLoading, error } = useGetKPIQuery();
  if (isLoading) return <CircularIndeterminate />;
  if (error) return <div>Error fetching data</div>;
  const kpiData = data[0];
  return (
    <StatBox
      title='Total Sales'
      value={`$${
        kpiData?.salesData?.totalLifetimeSales
          ? formatNumber(parseFloat(kpiData.salesData.totalLifetimeSales))
          : "0.00"
      }`}
      icon={<ShoppingCartOutlined />}
      increase='in business'
      description={`${
        kpiData?.salesData?.monthlyData?.length || 0
      } months recorded`}
    />
  );
};

const UserRankKPI = () => {
  const { data, isLoading, error } = useGetKPIQuery();
  if (isLoading) return <CircularIndeterminate />;
  if (error) return <div>Error fetching data</div>;
  const kpiData = data[0]?.rankData;
  const dispensaryData = data[0]?.dispensaryData;
  return (
    <StatBox
      title='Your Rank'
      value={
        <Typography mt={1} align='center' variant='h3' fontWeight={"600"}>
          {`#${kpiData?.userRank || "N/A"}`} / 311
        </Typography>
      }
      icon={<StarsOutlined />}
      increase='Rating:'
      description={
        <Box mt={1} mr={5}>
          <Rating
            value={dispensaryData?.rating || 0}
            readOnly
            precision={0.5}
          />
        </Box>
      }
    />
  );
};

const MonthlySalesKPI = () => {
  const { data, isLoading, error } = useGetKPIQuery();
  if (isLoading) return <CircularIndeterminate />;
  if (error) return <div>Error fetching data</div>;
  const kpiData = data[0]?.salesData;
  return (
    <StatBox
      title='Sales This Month'
      value={`$${
        kpiData?.salesLatestMonth
          ? formatNumber(parseFloat(kpiData.salesLatestMonth))
          : "0.00"
      }`}
      icon={<CalendarMonthOutlined />}
      increase={kpiData?.salesMonthTrend || "+0%"}
      description='Since last month'
    />
  );
};

const YearlySalesKPI = () => {
  const { data, isLoading, error } = useGetKPIQuery();
  if (isLoading) return <CircularIndeterminate />;
  if (error) return <div>Error fetching data</div>;
  const kpiData = data[0]?.salesData;
  return (
    <StatBox
      title='Sales This Year'
      value={`$${
        kpiData?.salesYtd ? formatNumber(parseFloat(kpiData.salesYtd)) : "0.00"
      }`}
      icon={<TrendingUpOutlined />}
      increase={kpiData?.salesYtdTrend || "+0%"}
      description='Since last year'
    />
  );
};

const DispensaryInfoKPI = () => {
  const { data, isLoading, error } = useGetKPIQuery();
  if (isLoading) return <CircularIndeterminate />;
  if (error) return <div>Error fetching data</div>;
  const kpiData = data[0]?.dispensaryData;
  return (
    <StatBox
      title='Dispensary Info'
      value={
        <Typography variant='h5' fontWeight='600'>
          {kpiData?.name || "N/A"}
        </Typography>
      }
      icon={<HomeOutlined />}
      increase={
        <Typography
          variant='body2'
          fontWeight='200'
          fontStyle='normal'
          sx={{ color: "#ffffff" }}
        >
          {kpiData?.address || "N/A"}
        </Typography>
      }
      description=''
    />
  );
};

const AverageMonthlySalesKPI = () => {
  const { data, isLoading, error } = useGetKPIQuery();
  if (isLoading) return <CircularIndeterminate />;
  if (error) return <div>Error fetching data</div>;
  const kpiData = data[0];
  return (
    <StatBox
      title='Average Monthly Sales'
      value={`$${
        kpiData?.averageMonthlySales
          ? formatNumber(parseFloat(kpiData.averageMonthlySales))
          : "0.00"
      }`}
      icon={<ReceiptLongOutlined />}
      increase='best month'
      description={kpiData?.highestMonthSalesData || "N/A"}
    />
  );
};

const MarketKPI = () => {
  const { data, isLoading, error } = useGetKPIQuery();
  if (isLoading) return <CircularIndeterminate />;
  if (error) return <div>Error fetching data</div>;
  const kpiData = data[0]?.salesData;
  return (
    <StatBox
      title='Market'
      value={
        kpiData?.marketTotal ? (
          <Typography variant='h3' fontWeight='600'>
            ${formatNumber(parseFloat(kpiData.marketTotal))}
          </Typography>
        ) : (
          <Typography variant='h3' fontWeight='600'>
            $0.00
          </Typography>
        )
      }
      icon={<PointOfSaleOutlined />}
      increase=''
      description='City market data'
    />
  );
};

const MarketShareKPI = () => {
  const { data, isLoading, error } = useGetKPIQuery();
  if (isLoading) return <CircularIndeterminate />;
  if (error) return <div>Error fetching data</div>;
  const kpiData = data[0]?.salesData;
  return (
    <StatBox
      title='Market Share'
      value={
        <Typography ml={6} variant='h3' fontWeight='600'>
          {kpiData?.marketShare
            ? formatPercentage(parseFloat(kpiData.marketShare))
            : "0.00%"}
        </Typography>
      }
      icon={<PieChartOutlined />}
      increase='+5%'
      description='Since last month'
    />
  );
};

export {
  AverageMonthlySalesKPI,
  DispensaryInfoKPI,
  MarketKPI,
  MarketShareKPI,
  MonthlySalesKPI,
  TotalSalesKPI,
  UserRankKPI,
  YearlySalesKPI,
};
