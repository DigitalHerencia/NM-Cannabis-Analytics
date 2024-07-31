import NumbersOutlinedIcon from "@mui/icons-material/NumbersOutlined";
import SettingsIcon from "@mui/icons-material/Settings";
import {
  Card,
  CardContent,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import { useGetKPIQuery } from "../state/api";
import CircularIndeterminate from "./Loading.jsx";

const BelowUserRankDispensariesCard = () => {
  const theme = useTheme();
  const { data, isLoading, error } = useGetKPIQuery();
  if (isLoading) return <CircularIndeterminate />;
  if (error) return <div>Error fetching data</div>;

  const kpiData = data && data[0] && data[0].rankData;
  const competitors = kpiData && kpiData.competitors ? kpiData.competitors : [];

  const belowUserRank = competitors.slice(-10);

  return (
    <Card
      style={{
        backgroundColor: theme.palette.background.alt,
        color: "white",
        maxHeight: "400px",
        overflow: "auto",
      }}
    >
      <CardContent>
        <Typography
          variant='h6'
          fontWeight='bold'
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          Bottom 10 Competitors Below User's Rank
          <IconButton color='inherit'>
            <SettingsIcon />
          </IconButton>
        </Typography>
        <List>
          {belowUserRank.length > 0 ? (
            belowUserRank.map((competitor, index) => (
              <ListItem key={index}>
                <ListItemIcon>
                  <NumbersOutlinedIcon color='primary' />
                </ListItemIcon>
                <ListItemText
                  primary={`${competitor.name} - Rank: ${competitor.rankPosition}`}
                  primaryTypographyProps={{
                    fontSize: 14,
                    fontWeight: "medium",
                  }}
                />
              </ListItem>
            ))
          ) : (
            <Typography>No data available</Typography>
          )}
        </List>
      </CardContent>
    </Card>
  );
};

export default BelowUserRankDispensariesCard;
