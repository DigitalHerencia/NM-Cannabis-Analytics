import { Box, useMediaQuery } from "@mui/material";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar.jsx";
import Sidebar from "../../components/Sidebar.jsx";

const Layout = () => {
  const isNonMobile = useMediaQuery("(min-width: 600px)");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const user = [
    {
      companyName: null,
      jobTitle: null,
      industry: null,
      _id: "6677972f84c55e7127d018f6",
      firstName: "Ivan",
      lastName: "Roman",
      email: "southwestmediaservices@gmail.com",
      passwordHash:
        "$2a$10$FQGqLnDxocA9JhJ.pN1KBuXHHJXVEZ86zvh6Qump4y7KoH4wFRdg6",
      role: "superAdmin",
      companyDetails: {
        name: "Digital Herencia",
        jobTitle: "Owner",
        industry: "Tech",
      },
      experienceLevel: "Senior Dev",
      contactNumber: "(915) 474-4564",
      dispensaryId: null,
      menuId: null,
      userId: null,
      createdAt: "2024-06-23T03:31:59.182Z",
      updatedAt: "2024-07-04T19:51:41.326Z",
      __v: 0,
      refreshToken: null,
    },
  ];
  return (
    <Box display={isNonMobile ? "flex" : "block"} width='100%' height='100%'>
      <Sidebar
        user={user || {}}
        isNonMobile={isNonMobile}
        drawerWidth='250px'
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      <Box flexGrow={1}>
        <Navbar
          user={user || {}}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;
