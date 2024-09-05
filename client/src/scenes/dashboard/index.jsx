// @ts-nocheck
import { DownloadOutlined } from "@mui/icons-material"
import { Box, Button, useMediaQuery, useTheme } from "@mui/material"
import React from "react"
import { useNavigate } from "react-router-dom"
import BreakdownChart from "../../components/BreakdownChart"
import CombinedUserRankDispensariesCard from "../../components/CombinedUserRankDispensariesCard"
import FlexBetween from "../../components/FlexBetween"
import Header from "../../components/Header"
import {
    DispensaryInfoKPI,
    MonthlySalesKPI,
    UserRankKPI,
    YearlySalesKPI,
} from "../../components/KPI"
import MarketShareChart from "../../components/MarketShareChart"
import OverviewChart from "../../components/OverviewChart"
import SalesSegmentChart from "../../components/SalesSegmentChart"
import TrendingProductsTable from "../../components/TrendingProductsTable"

const Dashboard = () => {
    const theme = useTheme()
    const isNonMediumScreens = useMediaQuery("(min-width: 1200px)")
    const navigate = useNavigate()

    return (
        <Box m="1.5rem 2.5rem">
            <FlexBetween>
                <Header
                    title="DASHBOARD"
                    subtitle="Welcome to your dashboard"
                />
                <Box>
                    <Button
                        sx={{
                            backgroundColor: theme.palette.primary.main,
                            color: theme.palette.background.alt,
                            "&:hover": {
                                backgroundColor: theme.palette.primary.dark,
                                color: theme.palette.grey[200],
                            },
                            fontSize: "14px",
                            fontWeight: "bold",
                            padding: "10px 20px",
                        }}
                        onClick={() => navigate("/reports")}
                    >
                        <DownloadOutlined sx={{ mr: "10px" }} />
                        Download Reports
                    </Button>
                </Box>
            </FlexBetween>
            <Box
                mt="20px"
                display="grid"
                gridTemplateColumns="repeat(12, 1fr)"
                gridAutoRows="130px"
                gap="10px"
                sx={{
                    "& > div": {
                        gridColumn: isNonMediumScreens ? undefined : "span 12",
                    },
                }}
            >
                {/* TOP LEFT SECTION */}
                <Box
                    gridColumn="span 2"
                    display="flex"
                    flexDirection="column"
                    gap="10px"
                    gridRow="span 2"
                >
                    <DispensaryInfoKPI />
                    <YearlySalesKPI />
                </Box>
                <Box
                    gridColumn="span 2"
                    display="flex"
                    flexDirection="column"
                    gap="10px"
                    gridRow="span 2"
                >
                    <UserRankKPI />
                    <MonthlySalesKPI />
                </Box>

                {/* TOP RIGHT SECTION */}
                <Box
                    gridColumn="span 4"
                    gridRow="span 2"
                    display="flex"
                    gap={"10px"}
                    justifyContent={"center"}
                >
                    <CombinedUserRankDispensariesCard sx={{ height: "100%" }} />
                </Box>

                {/* TOP RIGHT CORNER */}
                <Box
                    gridColumn="span 4"
                    gridRow="span 2"
                    backgroundColor={theme.palette.background.alt}
                    p="1.5rem"
                    borderRadius="0.55rem"
                    display="flex"
                    flexDirection="row"
                    alignItems="center"
                >
                    <SalesSegmentChart />
                    <BreakdownChart />
                    <MarketShareChart />
                </Box>

                {/* BOTTOM SECTION */}
                <Box gridColumn="span 6" gridRow="span 3">
                    <TrendingProductsTable />
                </Box>
                <Box
                    ml="10px"
                    mb="-20px"
                    gridColumn="span 6"
                    gridRow="span 3"
                    p="1rem"
                    backgroundColor={theme.palette.background.alt}
                    borderRadius="0.55rem"
                >
                    <OverviewChart />
                </Box>
            </Box>
        </Box>
    )
}

export default Dashboard
