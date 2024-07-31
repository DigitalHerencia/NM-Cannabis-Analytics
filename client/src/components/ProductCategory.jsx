import PieChartIcon from "@mui/icons-material/PieChart";
import {
  Box,
  Card,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Rating,
  Select,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { ResponsivePie } from "@nivo/pie";
import { useEffect, useMemo, useState } from "react";
import { useGetProductCategoriesQuery } from "../state/api.js";
import CircularIndeterminate from "./CircularIndeterminate.jsx";
import FlexBetween from "./FlexBetween.jsx";

const ProductCategory = () => {
  const theme = useTheme();
  const { data: categoriesData, isLoading: isCategoriesLoading } =
    useGetProductCategoriesQuery();
  const [selectedName, setSelectedName] = useState("");

  const uniqueNames = useMemo(() => {
    if (!categoriesData) return [];
    const namesSet = new Set(categoriesData.map((item) => item.name));
    return Array.from(namesSet).sort();
  }, [categoriesData]);

  useEffect(() => {
    if (uniqueNames.length > 0) {
      setSelectedName(uniqueNames[0]);
    }
  }, [uniqueNames]);

  const handleNameChange = (event) => {
    setSelectedName(event.target.value);
  };

  const formattedData = useMemo(() => {
    if (!categoriesData || !selectedName) return [];

    const selectedData = categoriesData.find(
      (item) => item.name === selectedName
    );

    if (!selectedData) return [];

    const colorPalette = [
      "#11519a",
      "#1565c0",
      "#4484cd",
      "#73a3d9",
      "#a1c1e6",
      "#d0e0f2",
      "#0d3d73",
      "#08284d",
      "#041426",
    ];

    const categoryCounts = {};
    selectedData.categories.forEach((cat) => {
      const adjustedCount = cat.count / 2; // Reduce each count by half
      if (!categoryCounts[cat.category]) {
        categoryCounts[cat.category] = adjustedCount;
      } else {
        categoryCounts[cat.category] += adjustedCount;
      }
    });

    return Object.entries(categoryCounts).map(([category, count], index) => ({
      id: category,
      label: category,
      value: count,
      color: colorPalette[index % colorPalette.length],
    }));
  }, [categoriesData, selectedName]);

  const storeDetails = useMemo(() => {
    if (!categoriesData || !selectedName) return null;

    const selectedData = categoriesData.find(
      (item) => item.name === selectedName
    );

    if (!selectedData) return null;

    return (
      <Card sx={{ width: 360 }}>
        <Box sx={{ p: 2 }}>
          <Stack direction='row' alignItems='center' spacing={1}>
            <PieChartIcon sx={{ fontSize: 45, color: "#42a5f5" }} />
            <Typography gutterBottom variant='h5' component='div'>
              {selectedData.name}
            </Typography>
          </Stack>
          <Divider sx={{ my: 1, mt: 2 }} />
          <Box sx={{ p: 1 }}>
            <Stack direction='column' alignItems='left' spacing={1}>
              <Typography gutterBottom variant='h6' component='div'>
                {selectedData.city}
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                {selectedData.address}, {selectedData.zip_code}
              </Typography>
              <Typography gutterBottom variant='body2' color='#42a5f5'>
                Rank: {selectedData.ranking.toFixed(2)}
              </Typography>
            </Stack>
          </Box>
          <Divider sx={{ my: 1 }} />
          <Box sx={{ p: 1 }}>
            <Stack direction='row' alignItems='left' spacing={1}>
              <Typography gutterBottom variant='h6'>
                Rating:{" "}
                <Rating value={selectedData.rating} readOnly size='small' />
              </Typography>
            </Stack>
          </Box>
        </Box>
      </Card>
    );
  }, [categoriesData, selectedName]);

  if (isCategoriesLoading) {
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
    <Box>
      <FormControl fullWidth variant='outlined' margin='normal'>
        <InputLabel>Name</InputLabel>
        <Select value={selectedName} onChange={handleNameChange} label='Name'>
          {uniqueNames.map((name) => (
            <MenuItem key={name} value={name}>
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FlexBetween />
      <Stack
        direction='row'
        alignItems='center'
        justifyContent='center'
        spacing={4}
        mt={2}
      >
        <Box height='65vh' width='60%' position='relative'>
          <ResponsivePie
            data={formattedData}
            colors={{ datum: "data.color" }}
            margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
            sortByValue={true}
            innerRadius={0.6}
            borderWidth={1}
            borderColor={{
              from: "color",
              modifiers: [["darker", 0.2]],
            }}
            animate={false}
            activeOuterRadiusOffset={25}
            activeInnerRadiusOffset={10}
            motionConfig={"gentle"}
            enableArcLabels={false}
            enableArcLinkLabels={true}
            arcLinkLabelsTextColor={theme.palette.secondary[200]}
            arcLinkLabelsThickness={2}
            arcLinkLabelsColor={{ from: "color" }}
            arcLinkLabelsStraightLength={15}
            arcLabelsSkipAngle={40}
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
                {id}: {value}
              </strong>
            )}
          />
          <Box
            position='absolute'
            top='50%'
            left='50%'
            color={theme.palette.secondary[400]}
            textAlign='center'
            pointerEvents='none'
            sx={{ transform: "translate(-50%, -50%)" }}
          >
            <Typography variant='h6'>
              Total Items:{" "}
              {formattedData.reduce((acc, item) => acc + item.value, 0)}
            </Typography>
          </Box>
        </Box>
        <Stack
          paddingTop={10}
          height='65vh'
          width='50%'
          direction='column'
          alignItems='center'
          spacing={-1}
        >
          <Box>{storeDetails}</Box>
          <Card sx={{ width: 360 }}>
            <Divider sx={{ ml: 2, mr: 2 }} />
            {formattedData.map((item) => (
              <Stack
                key={item.id}
                direction='row'
                alignItems='center'
                spacing={1.5}
                sx={{ p: 1.5, ml: 2 }}
              >
                <Box
                  width={20}
                  height={20}
                  bgcolor={item.color}
                  borderRadius='50%'
                />
                <Typography variant='body2'>{item.label}</Typography>
              </Stack>
            ))}
          </Card>
        </Stack>
      </Stack>
    </Box>
  );
};

export default ProductCategory;
