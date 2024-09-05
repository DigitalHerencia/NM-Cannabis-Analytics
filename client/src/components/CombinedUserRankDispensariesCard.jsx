import SettingsIcon from "@mui/icons-material/Settings"
import {
    Card,
    CardContent,
    IconButton,
    List,
    ListItem,
    ListItemText,
    Typography,
    useTheme,
} from "@mui/material"
import React from "react"
import { useGetKPIQuery } from "../state/api"
import CircularIndeterminate from "./Loading.jsx"

const RankedCompetitorList = () => {
    const theme = useTheme()
    const { data, isLoading, error } = useGetKPIQuery()
    if (isLoading) return <CircularIndeterminate />
    if (error) return <div>Error fetching data</div>

    const kpiData = data && data[0] && data[0].rankData
    const competitors =
        kpiData && kpiData.competitors ? kpiData.competitors : []

    const combinedRanks = competitors
        .slice(0, 10)
        .concat(competitors.slice(-10))

    return (
        <Card
            style={{
                backgroundColor: theme.palette.background.paper,
                color: theme.palette.text.primary,
                maxHeight: "400px",
                overflow: "auto",
                width: "100%",
                boxShadow: theme.shadows[3],
                borderRadius: theme.shape.borderRadius,
            }}
        >
            <CardContent>
                <Typography
                    variant="h3" // Larger font size for the title
                    fontWeight="bold"
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "15px", // Increase margin for better separation
                        color: theme.palette.primary.main, // Apply theme color to title
                    }}
                >
                    Ranked Competitor List
                    <IconButton color="inherit">
                        <SettingsIcon />
                    </IconButton>
                </Typography>
                <List>
                    {combinedRanks.length > 0 ? (
                        combinedRanks.map((competitor, index) => {
                            const [name, location] =
                                competitor.name.split(" - ")

                            return (
                                <ListItem
                                    key={index}
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        padding: "8px 0", // Adjust padding to fit content better
                                        borderBottom: `1px solid ${theme.palette.divider}`,
                                        "&:last-child": {
                                            borderBottom: "none",
                                        },
                                    }}
                                >
                                    <Typography
                                        variant="h4" // Larger font size for the rank number
                                        fontWeight="bold"
                                        color={theme.palette.primary.main}
                                        sx={{
                                            marginRight: "12px", // Increased spacing between number and text
                                            minWidth: "60px", // Allocate more space for rank number
                                            textAlign: "right", // Right-align for visual consistency
                                        }}
                                    >
                                        {competitor.rankPosition}
                                    </Typography>
                                    <ListItemText
                                        primary={
                                            <>
                                                <span
                                                    style={{
                                                        fontWeight: "normal",
                                                        fontSize: "1rem", // Standard font size
                                                        marginRight: "8px", // Space between name and location
                                                        color: theme.palette
                                                            .text.primary,
                                                    }}
                                                >
                                                    {name}
                                                </span>
                                                {location && (
                                                    <span
                                                        style={{
                                                            fontWeight:
                                                                "normal",
                                                            color: theme.palette
                                                                .text.secondary,
                                                        }}
                                                    >
                                                        - {location}
                                                    </span>
                                                )}
                                            </>
                                        }
                                        primaryTypographyProps={{
                                            fontSize: "0.95rem", // Slightly larger for readability
                                        }}
                                    />
                                </ListItem>
                            )
                        })
                    ) : (
                        <Typography
                            sx={{
                                textAlign: "center",
                                padding: "16px 0",
                                fontStyle: "italic",
                                color: theme.palette.text.disabled,
                            }}
                        >
                            No data available
                        </Typography>
                    )}
                </List>
            </CardContent>
        </Card>
    )
}

export default RankedCompetitorList
