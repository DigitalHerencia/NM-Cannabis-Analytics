import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useGetKPIQuery } from "../state/api.js";
import CircularIndeterminate from "./CircularIndeterminate.jsx";

const TrendingProductsTable = () => {
  const theme = useTheme();
  const { data, isLoading } = useGetKPIQuery();

  const findNonZeroPrice = (item) => {
    const priceFields = [
      "price_average_unit",
      "price_average_half_gram",
      "price_average_gram",
      "price_average_two_grams",
      "price_average_eighth",
      "price_average_quarter",
      "price_average_half_ounce",
      "price_average_ounce",
    ];
    for (const field of priceFields) {
      if (item[field] !== 0) {
        return item[field];
      }
    }
    return 0;
  };

  const transformData = (data) => {
    return data[0].productData.trendingProducts.map((item, index) => {
      const averagePrice = findNonZeroPrice(item);

      return {
        id: index + 1,
        product_name: item.product.name,
        aggregate_offers: item.matches,
        average_price: averagePrice,
        average_rank: item.ranking_average,
        trending: item.trending,
        category_name: item.product.category_name,
      };
    });
  };

  const centeredCell = (params) => (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        whiteSpace: "normal",
        wordWrap: "break-word",
      }}
    >
      {params.value}
    </Box>
  );

  const columns = [
    {
      field: "product_name",
      headerName: "Top Ranked Popular Products",
      flex: 1,
      headerClassName: "headerCell",
      renderCell: (params) =>
        params.value !== undefined ? (
          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "left",
              whiteSpace: "normal",
              wordWrap: "break-word",
            }}
          >
            {params.value}
          </Box>
        ) : null,
    },
    {
      field: "aggregate_offers",
      headerName: "Aggregate Offers",
      flex: 0.5,
      headerAlign: "center",
      renderCell: centeredCell,
      headerClassName: "headerCell",
    },
    {
      field: "average_price",
      headerName: "Average Price",
      flex: 0.5,
      headerAlign: "center",
      renderCell: (params) =>
        params.value !== undefined ? (
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              whiteSpace: "normal",
              wordWrap: "break-word",
            }}
          >
            {`$${parseFloat(params.value).toFixed(2)}`}
          </Box>
        ) : (
          "N/A"
        ),
      headerClassName: "headerCell",
    },
    {
      field: "average_rank",
      headerName: "Average Rank",
      flex: 0.5,
      headerAlign: "center",
      renderCell: (params) =>
        params.value !== undefined ? (
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              whiteSpace: "normal",
              wordWrap: "break-word",
            }}
          >
            {`${parseFloat(params.value).toFixed(2)}`}
          </Box>
        ) : (
          "N/A"
        ),
      headerClassName: "headerCell",
    },
    {
      field: "trending",
      headerName: "Trending",
      flex: 0.4,
      headerAlign: "center",
      renderCell: (params) => (
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            whiteSpace: "normal",
            wordWrap: "break-word",
          }}
        >
          {params.value ? "True" : "False"}
        </Box>
      ),
      headerClassName: "headerCell",
    },
    {
      field: "category_name",
      headerName: "Category",
      flex: 0.5,
      headerAlign: "center",
      renderCell: centeredCell,
      headerClassName: "headerCell",
    },
  ];

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
    <Box
      sx={{
        mr: "-10px",
        height: 430,
        borderBottom: "30px solid #141414", // Add a black border at the bottom
        "& .MuiDataGrid-root": {
          border: "none",
        },
        "& .MuiDataGrid-cell": {
          borderBottom: "none",
        },
        "& .MuiDataGrid-columnHeaders": {
          backgroundColor: theme.palette.background.alt,
          color: theme.palette.secondary[100],
          borderBottom: "none",
        },
        "& .MuiDataGrid-virtualScroller": {
          backgroundColor: theme.palette.grey[700],
        },
        "& .MuiDataGrid-footerContainer": {
          backgroundColor: theme.palette.background.alt,
          color: theme.palette.secondary[100],
          borderTop: "none",
          display: "none", // Hide pagination
        },
        "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
          color: `${theme.palette.secondary[200]} !important`,
        },
        "& .headerCell": {
          whiteSpace: "normal",
          wordWrap: "break-word",
        },
        "& .dataGridCell": {
          whiteSpace: "normal",
          wordWrap: "break-word",
        },
      }}
    >
      <DataGrid
        loading={isLoading || !data}
        rows={data ? transformData(data) : []}
        getRowId={(row) => row.id}
        columns={columns}
      />
    </Box>
  );
};

export default TrendingProductsTable;
