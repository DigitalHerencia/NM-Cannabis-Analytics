import DownloadOutlined from "@mui/icons-material/DownloadOutlined";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Rating,
  Select,
  Stack,
  useTheme,
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { FixedSizeList as List } from "react-window";
import FlexBetween from "../../components/FlexBetween";
import Header from "../../components/Header.jsx";
import CircularIndeterminate from "../../components/Loading.jsx";
import {
  useGetAllPromotionsQuery,
  useGetBreakdownQuery,
  useGetComparisonsQuery,
  useGetDispensariesQuery,
  useGetPerformanceQuery,
  useGetProductCategoriesQuery,
  useGetProductsQuery,
  useGetSalesQuery,
} from "../../state/api.js";
import legend from "../../state/legend.js";

const getPrice = (prices) => {
  const priceKeys = [
    "price_unit",
    "price_half_gram",
    "price_gram",
    "price_two_grams",
    "price_eighth",
    "price_quarter",
    "price_half_ounce",
    "price_ounce",
  ];
  for (const key of priceKeys) {
    if (prices[key] > 0) {
      return prices[key];
    }
  }
  return null;
};

const Reports = () => {
  const theme = useTheme();
  const { menuId: initialMenuId } = useSelector((state) => state.kpi);
  const [selectedFunction, setSelectedFunction] = useState("");
  const [results, setResults] = useState([]);
  const [columns, setColumns] = useState([]);

  const { data: breakdownData, isLoading: BreakdownLoading } =
    useGetBreakdownQuery();
  const { data: comparisonsData, isLoading: comparisonsLoading } =
    useGetComparisonsQuery({ menuId: initialMenuId });
  const { data: dispensariesData, isLoading: dispensariesLoading } =
    useGetDispensariesQuery();
  const { data: performanceData, isLoading: performanceLoading } =
    useGetPerformanceQuery();
  const { data: productsData, isLoading: productsLoading } =
    useGetProductsQuery({ menuId: initialMenuId });
  const { data: salesData, isLoading: salesLoading } = useGetSalesQuery();
  const { data: promoData, isLoading: promoLoading } =
    useGetAllPromotionsQuery();
  const { data: categoriesData, isLoading: isCategoriesLoading } =
    useGetProductCategoriesQuery();

  const functions = useMemo(
    () => [
      { name: "Promotion Analysis", params: [] },
      { name: "Dispensary Rankings", params: [] },
      { name: "Monthly City Sales", params: [] },
      { name: "Monthly Dispensary Sales", params: [] },
      { name: "Menu Analysis", params: ["selectedMenu", "selectedDispensary"] },
      { name: "Market Analysis", params: [] },
      { name: "Market Share Analysis", params: [] },
      { name: "Product Category Analysis", params: [] },
      { name: "Sales Segmentation", params: [] },
      { name: "Aggregate Offers", params: [] },
    ],
    []
  );

  const uniqueCategories = useMemo(() => {
    if (!categoriesData) return [];
    const categorySet = new Set();
    categoriesData.forEach((item) => {
      item.categories.forEach((cat) => {
        if (cat.category) {
          categorySet.add(cat.category);
        }
      });
    });
    return Array.from(categorySet).sort();
  }, [categoriesData]);

  const columnConfig = {
    "Aggregate Offers": [
      { id: "product_name", label: "Product Name" },
      {
        id: "matches",
        label: "Aggregate Offers",
      },
      {
        id: "average_price",
        label: "Average Price",
        format: (value) =>
          value !== undefined ? `$${parseFloat(value).toFixed(2)}` : "N/A",
      },
      {
        id: "average_rank",
        label: "Average Rank",
        format: (value) =>
          value !== undefined ? `${parseFloat(value).toFixed(2)}` : "N/A",
      },
      {
        id: "average_rating",
        label: "Average Rating",
        component: (value) => (
          <Rating value={parseFloat(value) || 0} precision={0.1} readOnly />
        ),
      },
      {
        id: "trend_score",
        label: "Trend Score",
        format: (value) =>
          value !== undefined ? `${parseFloat(value).toFixed(2)}` : "N/A",
      },
      {
        id: "trending",
        label: "Trending",
        format: (value) => (value ? "True" : "False"),
      },
    ],

    "Promotion Analysis": [
      { id: "source", label: "Dispensary" },
      { id: "title", label: "Title" },
      {
        id: "rank",
        label: "Rank",
        format: (value) =>
          value !== undefined ? parseFloat(value).toFixed(2) : "N/A",
      },
      {
        id: "rating",
        label: "Rating",
        component: (value) => (
          <Rating value={parseFloat(value)} precision={0.1} readOnly />
        ),
      },
      { id: "address", label: "Address" },
      { id: "city", label: "City" },
    ],
    "Dispensary Rankings": [
      { id: "name", label: "Name" },
      { id: "address", label: "Address" },
      { id: "city", label: "City" },
      {
        id: "ranking",
        label: "Rank",
        format: (value) =>
          value !== undefined ? parseFloat(value).toFixed(2) : "N/A",
      },
      {
        id: "rating",
        label: "Rating",
        component: (value) => (
          <Rating value={parseFloat(value)} precision={0.1} readOnly />
        ),
      },
    ],
    "Monthly City Sales": [
      { id: "City", label: "City" },
      { id: "month_year", label: "Month/Year" },
      { id: "totalAdultTickets", label: "Total Adult Tickets" },
      {
        id: "totalAdultUseSales",
        label: "Total Adult Sales",
        format: (value) =>
          value !== undefined
            ? `$${parseFloat(value).toLocaleString()}`
            : "N/A",
      },
      { id: "totalMedicalTickets", label: "Total Medical Tickets" },
      {
        id: "totalMedicalSales",
        label: "Total Medical Sales",
        format: (value) =>
          value !== undefined
            ? `$${parseFloat(value).toLocaleString()}`
            : "N/A",
      },
      { id: "totalTickets", label: "Total Tickets" },
      {
        id: "totalSales",
        label: "Total Sales",
        format: (value) =>
          value !== undefined
            ? `$${parseFloat(value).toLocaleString()}`
            : "N/A",
      },
    ],
    "Monthly Dispensary Sales": [
      { id: "Licensee", label: "Licensee" },
      { id: "address", label: "Address" },
      { id: "city", label: "City" },
      { id: "month", label: "Month", width: "100px" },
      { id: "year", label: "Year", width: "100px" },
      {
        id: "totalSales",
        label: "Total Sales",
        format: (value) =>
          value !== undefined
            ? `$${parseFloat(value).toLocaleString()}`
            : "N/A",
      },
      {
        id: "medicalSales",
        label: "Medical Sales",
        format: (value) =>
          value !== undefined
            ? `$${parseFloat(value).toLocaleString()}`
            : "N/A",
      },
      {
        id: "adultuseSales",
        label: "Adult Use Sales",
        format: (value) =>
          value !== undefined
            ? `$${parseFloat(value).toLocaleString()}`
            : "N/A",
      },
    ],
    "Menu Analysis": [
      { id: "dispensary_name", label: "DISPENSARY" },
      { id: "name", label: "PRODUCT NAME" },
      { id: "brand_name", label: "BRAND NAME", width: "250px" },
      { id: "category_name", label: "CATEGORY", width: "250px" },
      {
        id: "price",
        label: "PRICE",
        format: (value) =>
          value !== undefined ? `$${parseFloat(value).toFixed(2)}` : "N/A",
        width: "250px",
      },
    ],
    "Market Analysis": [
      { id: "City", label: "City" },
      {
        id: "Total Statewide Sales",
        label: "Total Statewide Sales",
        format: (value) =>
          value !== undefined
            ? `$${parseFloat(value).toLocaleString()}`
            : "N/A",
      },
      {
        id: "totalSales",
        label: "Total Sales",
        format: (value) =>
          value !== undefined
            ? `$${parseFloat(value).toLocaleString()}`
            : "N/A",
      },
      {
        id: "marketContribution",
        label: "Market Contribution",
        format: (value) =>
          value !== undefined ? `${parseFloat(value).toFixed(2)}%` : "N/A",
      },
      {
        id: "totalMedicalSales",
        label: "Total Medical Sales",
        format: (value) =>
          value !== undefined
            ? `$${parseFloat(value).toLocaleString()}`
            : "N/A",
      },
      {
        id: "totalAdultUseSales",
        label: "Total Adult Use Sales",
        format: (value) =>
          value !== undefined
            ? `$${parseFloat(value).toLocaleString()}`
            : "N/A",
      },
    ],
    "Market Share Analysis": [
      { id: "Licensee", label: "Licensee" },
      { id: "Address", label: "Address" },
      { id: "City", label: "City", width: "200px" },
      {
        id: "marketShare",
        label: "Market Share",
        format: (value) =>
          value !== undefined ? `${parseFloat(value).toFixed(2)}%` : "N/A",
        width: "200px",
      },
      {
        id: "marketCap",
        label: "Total Market",
        format: (value) =>
          value !== undefined
            ? `$${parseFloat(value).toLocaleString()}`
            : "N/A",
        width: "200px",
      },
      {
        id: "totalSales",
        label: "Total Sales",
        format: (value) =>
          value !== undefined
            ? `$${parseFloat(value).toLocaleString()}`
            : "N/A",
      },
    ],
    "Product Category Analysis": [
      { id: "name", label: "Dispensary Name", width: "300px" }, // Give more width to the dispensary name column
      { id: "city", label: "City", width: "250px" },
      { id: "address", label: "Address", width: "250px" },
      {
        id: "ranking",
        label: "Ranking",
        format: (value) =>
          value !== undefined ? `${parseFloat(value).toFixed(2)}` : "N/A",
        width: "100px",
      },
      ...uniqueCategories.map((category) => ({
        id: category,
        label: category,
        format: (value) => (value !== undefined ? value : "N/A"),
        width: "80px", // Reduce width for category columns
      })),
    ],
    "Sales Segmentation": [
      { id: "Licensee", label: "Licensee" },
      { id: "Address", label: "Address" },
      { id: "City", label: "City" },
      { id: "Zip", label: "Zip Code" },
      {
        id: "totalSales",
        label: "Total Sales",
        format: (value) =>
          value !== undefined
            ? `$${parseFloat(value).toLocaleString()}`
            : "N/A",
      },
      {
        id: "totalMedicalSales",
        label: "Total Medical Sales",
        format: (value) =>
          value !== undefined
            ? `$${parseFloat(value).toLocaleString()}`
            : "N/A",
      },
      {
        id: "totalAdultUseSales",
        label: "Total Adult Use Sales",
        format: (value) =>
          value !== undefined
            ? `$${parseFloat(value).toLocaleString()}`
            : "N/A",
      },
    ],
  };

  const processFilteredData = (selectedFuncObj, dataSources) => {
    let filteredData = [];
    let selectedColumns = columnConfig[selectedFunction] || [];

    switch (selectedFuncObj.name) {
      case "Aggregate Offers":
        filteredData = dataSources.comparisonsData
          ? dataSources.comparisonsData.map((comparison) => {
              const matches = comparison.dispensaries.map(
                (dispensary) => dispensary.matches
              );
              return {
                product_name: comparison.product[0]?.name || "N/A",
                matches: comparison.matches,
                average_price: comparison.price_average_unit,
                average_rank: comparison.ranking_average?.toFixed(2),
                average_rating: comparison.rating_average?.toFixed(2) || 0,
                trend_score: comparison.trend_score?.toFixed(2),
                trending: comparison.trending,
              };
            })
          : [];
        break;

      case "Promotion Analysis":
        filteredData = Array.isArray(dataSources.promoData)
          ? dataSources.promoData
              .map((data) => ({
                ...data,
                rank: data.rank ? parseFloat(data.rank).toFixed(2) : "N/A",
              }))
              .sort((a, b) => parseFloat(b.rank) - parseFloat(a.rank))
          : [];
        break;
      case "Dispensary Rankings":
        filteredData = Array.isArray(dataSources.dispensariesData)
          ? [...dataSources.dispensariesData].sort((a, b) => b.rank - a.rank)
          : [];
        break;
      case "Monthly City Sales":
        filteredData = Array.isArray(dataSources.performanceData)
          ? [...dataSources.performanceData].sort(
              (a, b) => new Date(a.month_year) - new Date(b.month_year)
            )
          : [];
        break;
      case "Monthly Dispensary Sales":
        filteredData = dataSources.salesData
          ? dataSources.salesData.flatMap((dispensary) =>
              dispensary.monthlyData.map((monthData) => ({
                ...monthData,
                Licensee: dispensary.Licensee,
                address: dispensary.Address,
                city: dispensary.City,
              }))
            )
          : [];
        break;
      case "Menu Analysis":
        filteredData = dataSources.productsData
          ? dataSources.productsData.data.map((product) => ({
              ...product.attributes,
              dispensary_name: legend.find((d) => d.menu_id === initialMenuId)
                ?.dispensary_name,
              price: getPrice(product.attributes.prices),
            }))
          : [];
        break;
      case "Market Analysis":
        if (dataSources.breakdownData) {
          const totalStatewideSales = dataSources.breakdownData.reduce(
            (acc, item) => acc + item.totalSales,
            0
          );
          filteredData = dataSources.breakdownData.map((item) => {
            const marketContribution =
              (item.totalSales / totalStatewideSales) * 100;
            return {
              City: item.city,
              "Total Statewide Sales": totalStatewideSales - item.totalSales,
              totalSales: item.totalSales,
              marketContribution: marketContribution.toFixed(2) + "%",
              totalMedicalSales: item.totalMedicalSales,
              totalAdultUseSales: item.totalAdultUseSales,
            };
          });
        } else {
          filteredData = [];
        }
        break;
      case "Market Share Analysis":
        filteredData = dataSources.breakdownData
          ? dataSources.breakdownData.flatMap((item) =>
              item.marketshare.map((market) => ({
                Licensee: market.Licensee,
                Address: market.Address,
                City: item.city,
                marketShare: market.marketShare,
                marketCap: market.marketCap,
                totalSales: market.totalSales,
              }))
            )
          : [];
        break;
      case "Product Category Analysis":
        filteredData = dataSources.categoriesData
          ? dataSources.categoriesData.map((category) => {
              const categoryCounts = {};
              category.categories.forEach((cat) => {
                if (uniqueCategories.includes(cat.category)) {
                  categoryCounts[cat.category] = cat.count;
                }
              });
              return {
                name: category.name,
                city: category.city,
                address: category.address,
                ranking: category.ranking,
                ...categoryCounts,
              };
            })
          : [];
        break;
      case "Sales Segmentation":
        filteredData = dataSources.breakdownData
          ? dataSources.breakdownData.flatMap((item) =>
              item.marketshare.map((market) => ({
                Licensee: market.Licensee,
                Address: market.Address,
                City: market.City,
                Zip: market.Zip,
                totalSales: market.totalSales,
                totalMedicalSales: market.totalMedicalSales,
                totalAdultUseSales: market.totalAdultUseSales,
              }))
            )
          : [];
        break;
      default:
        filteredData = [];
    }

    return { filteredData, selectedColumns };
  };

  useEffect(() => {
    if (selectedFunction) {
      const selectedFuncObj = functions.find(
        (func) => func.name === selectedFunction
      );
      if (selectedFuncObj) {
        const dataSources = {
          comparisonsData,
          dispensariesData,
          performanceData,
          productsData,
          salesData,
          breakdownData,
          promoData,
          categoriesData,
        };

        const { filteredData, selectedColumns } = processFilteredData(
          selectedFuncObj,
          dataSources
        );

        setResults(
          filteredData.map((row, index) => ({
            ...row,
            _id: row._id || `row-${index}`,
          }))
        );
        setColumns(selectedColumns);
      }
    }
  }, [
    selectedFunction,
    comparisonsData,
    dispensariesData,
    performanceData,
    productsData,
    salesData,
    breakdownData,
    promoData,
    categoriesData,
    functions,
  ]);

  useEffect(() => {
    console.log("Results:", results);
    console.log("Columns:", columns);
  }, [results, columns]);

  const handleDownload = () => {
    if (results.length === 0) return;

    const csvContent = [
      columns.map((column) => column.label).join(","), // headers
      ...results.map((row) =>
        columns.map((column) => row[column.id]).join(",")
      ), // data rows
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "data.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const renderRow = ({ index, style }) => {
    const row = results[index];
    return (
      <Box
        component='div'
        display='flex'
        key={row._id}
        style={{
          ...style,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {columns.map((column, colIndex) => (
          <Box
            component='div'
            key={column.id}
            style={{
              flex: column.width ? `0 0 ${column.width}` : 1, // Apply width if specified
              padding: "8px",
              boxSizing: "border-box",
              display: "flex",
              alignItems: "center",
              justifyContent: colIndex === 0 ? "left" : "center",
              textAlign: colIndex === 0 ? "left" : "center",
              lineHeight: colIndex === 0 ? "1.5" : "1.5",
            }}
          >
            {column.component
              ? column.component(row[column.id])
              : column.format
              ? column.format(row[column.id])
              : row[column.id]}
          </Box>
        ))}
      </Box>
    );
  };

  const renderTable = () => (
    <Box
      component={Paper}
      sx={{
        width: "100%",
        height: "650px",
        overflow: "hidden",
      }}
    >
      <Box
        component='div'
        sx={{
          display: "flex",
          alignItems: "center",
          backgroundColor: theme.palette.background.paper,
          borderBottom: `1px solid ${theme.palette.divider}`,
        }}
      >
        {columns.map((column, colIndex) => (
          <Box
            component='div'
            key={column.id}
            sx={{
              flex: column.width ? `0 0 ${column.width}` : 1, // Apply width if specified
              padding: "8px",
              boxSizing: "border-box",
              display: "flex",
              alignItems: "center",
              justifyContent: colIndex === 0 ? "flex-start" : "center",
              textAlign: colIndex === 0 ? "left" : "center",
              fontWeight: "bold",
              textTransform: "uppercase",
              lineHeight: colIndex === 0 ? "3" : "1.5",
            }}
          >
            {column.label}
          </Box>
        ))}
      </Box>
      <List height={650} itemCount={results.length} itemSize={50} width='100%'>
        {renderRow}
      </List>
    </Box>
  );

  const loading =
    comparisonsLoading ||
    dispensariesLoading ||
    performanceLoading ||
    productsLoading ||
    salesLoading ||
    promoLoading ||
    BreakdownLoading ||
    isCategoriesLoading;

  if (loading) {
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
        <Header title='Reports' subtitle='Run and export reports' />
        <Button
          sx={{
            backgroundColor: theme.palette.secondary.light,
            color: theme.palette.background.alt,
            "&:hover": {
              backgroundColor: theme.palette.secondary[200],
              color: theme.palette.grey[300],
            },
            fontSize: "14px",
            fontWeight: "bold",
            padding: "10px 20px",
          }}
          onClick={handleDownload}
        >
          <DownloadOutlined sx={{ mr: "10px" }} />
          Download Report
        </Button>
      </FlexBetween>
      <Stack
        direction='column'
        alignItems='center'
        justifyContent='space-between'
        mt='2px'
      >
        <Box height='72vh' width='100%'>
          <FlexBetween>
            <FormControl
              fullWidth
              variant='outlined'
              margin='dense'
              sx={{ mr: 2 }}
            >
              <InputLabel id='function-dropdown-label'>
                Select Function
              </InputLabel>
              <Select
                labelId='function-dropdown-label'
                value={selectedFunction}
                onChange={(event) => setSelectedFunction(event.target.value)}
                label='Select Function'
              >
                {functions.map((func, index) => (
                  <MenuItem key={index} value={func.name}>
                    {func.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </FlexBetween>

          <Box
            sx={{ mt: 0.5 }}
            height='100%'
            width='100%'
            display='flex'
            flexDirection='column'
            justifyContent='center'
            alignItems='center'
          >
            {renderTable()}
          </Box>
        </Box>
      </Stack>
    </Box>
  );
};

export default Reports;
