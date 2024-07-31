import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useState } from "react";
import CustomColumnMenu from "../../components/DataGridCustomColumnMenu.jsx";
import DataGridCustomToolbar from "../../components/DataGridCustomToolbar.jsx";
import Header from "../../components/Header.jsx";
import CircularIndeterminate from "../../components/Loading.jsx";
import { useGetDispensariesQuery } from "../../state/api.js";

const Licensees = () => {
  const theme = useTheme();

  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [sort, setSort] = useState([]);
  const [search, setSearch] = useState("");

  const [searchInput, setSearchInput] = useState("");
  const { data, isLoading } = useGetDispensariesQuery({
    page,
    pageSize,
    sort: JSON.stringify(sort),
    search,
  });

  const columns = [
    {
      field: "name",
      headerName: "Name",
      flex: 0.5,
      renderCell: (params) => (
        <Box
          sx={{
            whiteSpace: "normal",
            wordWrap: "break-word",
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "block",
          }}
        >
          {params.value}
        </Box>
      ),
    },
    {
      field: "address",
      headerName: "Address",
      flex: 0.5,
      renderCell: (params) => (
        <Box
          sx={{
            whiteSpace: "normal",
            wordWrap: "break-word",
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "block",
          }}
        >
          {params.value}
        </Box>
      ),
    },
    {
      field: "city",
      headerName: "City",
      flex: 0.3,
    },
    {
      field: "phone_number",
      headerName: "Phone Number",
      flex: 0.5,
      renderCell: (params) => {
        return params.value.replace(/^(\d{3})(\d{3})(\d{4})/, "($1)$2-$3");
      },
    },
    {
      field: "menu_id",
      headerName: "Menu ID",
      flex: 0.4,
    },
    {
      field: "ranking",
      headerName: "Rank",
      flex: 0.5,
      valueFormatter: (params) => {
        return params.value.toFixed(2);
      },
    },
    {
      field: "rating",
      headerName: "Rating",
      flex: 0.3,
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
    <Box m='1.5rem 2.5rem'>
      <Header
        title='Licensed Dispensaries'
        subtitle='A Comprehensive list of your competitors'
      />
      <Box
        height='80vh'
        sx={{
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
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${theme.palette.secondary[200]} !important`,
          },
        }}
      >
        <DataGrid
          loading={isLoading || !data}
          getRowId={(row) => row._id}
          rows={data || []}
          columns={columns}
          rowsPerPageOptions={[20, 50, 100]}
          pagination
          page={page}
          pageSize={pageSize}
          onPageChange={(newPage) => setPage(newPage)}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          onSortModelChange={(newSortModel) => setSort(newSortModel)}
          components={{
            ColumnMenu: CustomColumnMenu,
            Toolbar: DataGridCustomToolbar,
          }}
          componentsProps={{
            toolbar: { searchInput, setSearchInput, setSearch },
          }}
        />
      </Box>
    </Box>
  );
};

export default Licensees;
