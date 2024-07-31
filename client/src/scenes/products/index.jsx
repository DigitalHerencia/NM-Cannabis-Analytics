import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Avatar,
  Badge,
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Collapse,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Rating,
  Select,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import fallbackAvatar from "../../assets/logo192.png";
import Header from "../../components/Header.jsx";
import CircularIndeterminate from "../../components/Loading.jsx";
import { setComparisons, setProducts } from "../../state";
import {
  useGetComparisonByIdQuery,
  useGetProductsQuery,
} from "../../state/api.js";
import legend from "../../state/legend.js";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: "transform 0.25s ease-in-out",
}));

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

const Product = ({
  _id,
  name,
  category_name,
  description,
  dispensary_name,
  avatar_url,
  picture_url,
  price,
  license_type,
  brand_name,
  created_at,
  updated_at,
  parent_category,
  sub_category,
  comparisonData,
}) => {
  const [expanded, setExpanded] = useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const isPlaceholder =
    !avatar_url ||
    avatar_url ===
      "https://images.weedmaps.com/static/placeholders/weedmaps-logo.jpg";

  const formattedPrice = price ? `$${parseFloat(price).toFixed(2)}` : "N/A";

  return (
    <Card
      sx={{
        maxWidth: 345,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        position: "relative",
      }}
    >
      {comparisonData && comparisonData.dispensaries.length > 0 && (
        <Badge
          badgeContent={comparisonData.dispensaries.length}
          color='primary'
          sx={{
            position: "absolute",
            bottom: 20,
            right: 30,
            transform: "translate(50%, 50%)",
            backgroundColor: "#1e88e5",
          }}
        />
      )}
      <CardHeader
        avatar={
          <Avatar
            src={isPlaceholder ? fallbackAvatar : avatar_url}
            aria-label='dispensary'
            sx={{ width: 40, height: 40 }}
          />
        }
        title={
          <Box>
            <Typography
              variant='h6'
              component='div'
              sx={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                minHeight: "3em",
                color: "white",
              }}
            >
              {name} <span style={{ color: "#64b5f6" }}>{formattedPrice}</span>
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              {category_name}
            </Typography>
            <Box sx={{ marginBottom: 1 }} />
          </Box>
        }
        sx={{ minHeight: 65 }}
      />
      <CardMedia
        component='img'
        height='194'
        image={picture_url}
        alt={name}
        sx={{ bgcolor: "white", objectFit: "scale-down" }}
      />
      <CardContent>
        <Typography variant='h5' component='div'>
          {dispensary_name}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label='show more'
          sx={{
            ml: 1,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "normal",
            height: "20px",
            lineHeight: "20px",
          }}
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout='auto' unmountOnExit>
        <CardContent>
          <Box>
            <Typography variant='h5' sx={{ color: "#1e88e5" }}>
              Product Details
            </Typography>
            <Typography variant='body2'>Brand Name: {brand_name}</Typography>
            <Typography variant='body2'>
              License Type: {license_type}
            </Typography>
            <Typography variant='body2'>Created At: {created_at}</Typography>
            <Typography variant='body2'>Updated At: {updated_at}</Typography>
            <Typography variant='body2'>
              Parent Category: {parent_category?.name}
            </Typography>
            <Typography variant='body2'>
              Sub Category: {sub_category?.name}
            </Typography>
            <Typography variant='body2'>Description: {description}</Typography>
          </Box>
          {comparisonData ? (
            <Box sx={{ mt: 2 }}>
              <Typography variant='h6' sx={{ color: "#1e88e5" }}>
                Also available at:
              </Typography>
              {comparisonData.dispensaries
                .filter(
                  (dispensary) => dispensary.dispensary_name !== dispensary_name
                )
                .map((dispensary, index) => (
                  <Box key={index} sx={{ mb: 1 }}>
                    <Typography variant='body2'>
                      {dispensary.dispensary_name}:{" "}
                      {`$${parseFloat(price).toFixed(2)}`}
                    </Typography>
                  </Box>
                ))}
              <Typography variant='body2'>
                Average Price:{" "}
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                }).format(comparisonData.price_average_unit)}
              </Typography>
              <Typography variant='body2'>
                Average Rank: {comparisonData.ranking_average?.toFixed(2)}
              </Typography>
              <Typography variant='body2'>
                Average Rating:
                <Box mt='.3rem' mb='.3rem' sx={{ display: "block" }}>
                  <Rating
                    value={comparisonData.rating_average?.toFixed(2) || 0}
                    precision={0.1}
                    readOnly
                    color='#1e88e5'
                  />
                </Box>
              </Typography>
              <Typography variant='body2'>
                Trend Score: {comparisonData.trend_score?.toFixed(2)}
              </Typography>
              <Typography
                variant='body2'
                sx={{
                  color: comparisonData.trending ? "#1e88e5" : "white",
                }}
              >
                Trending: {comparisonData.trending ? "YES" : "NO"}
              </Typography>
            </Box>
          ) : (
            <Typography variant='body2' color='text.secondary'></Typography>
          )}
        </CardContent>
      </Collapse>
    </Card>
  );
};

const Products = () => {
  const isNonMobile = useMediaQuery("(min-width: 1000px)");
  const dispatch = useDispatch();
  const initialMenuId = useSelector((state) => state.kpi.menuId);
  const initialDispensaryId = useSelector((state) => state.kpi.dispensaryId);
  const [menuId, setMenuId] = useState(initialMenuId);
  const [dispensaryId, setDispensaryId] = useState(initialDispensaryId);

  const {
    data: productsData,
    isLoading: isLoadingProducts,
    error: productsError,
  } = useGetProductsQuery({ menuId });
  const {
    data: comparisonsData,
    isLoading: isLoadingComparisons,
    error: comparisonsError,
  } = useGetComparisonByIdQuery({ menuId });

  useEffect(() => {
    if (productsData) {
      dispatch(setProducts(productsData.data));
    }
  }, [productsData, dispatch]);

  useEffect(() => {
    if (comparisonsData) {
      dispatch(setComparisons(comparisonsData));
    }
  }, [comparisonsData, dispatch]);

  const handleMenuChange = (event) => {
    const selectedDispensaryId = event.target.value;
    const selectedDispensary = legend.find(
      (item) => item.dispensary_id === selectedDispensaryId
    );
    if (selectedDispensary) {
      setDispensaryId(selectedDispensaryId);
      if (selectedDispensary.menu_id) {
        setMenuId(selectedDispensary.menu_id);
      } else {
        alert("Menu not available");
      }
    }
  };

  // Filter legend data to include only dispensaries with menu_id
  const updatedMdData = legend
    .filter((item) => item.menu_id !== null)
    .sort((a, b) => a.name.localeCompare(b.name));

  // Log the number of names in the dropdown
  console.log(`Number of names in the dropdown: ${updatedMdData.length}`);

  if (isLoadingProducts || isLoadingComparisons) {
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

  if (productsError) {
    return <>Error loading products: {productsError.message}</>;
  }

  if (comparisonsError) {
    return <>Error loading comparisons: {comparisonsError.message}</>;
  }

  const products = productsData?.data || [];

  return (
    <Box m='1.5rem 2.5rem'>
      <Header title='PRODUCTS' subtitle='See your list of products.' />
      <FormControl fullWidth variant='outlined' sx={{ mt: 4, mb: 2 }}>
        <InputLabel>Choose Dispensary</InputLabel>
        <Select
          value={dispensaryId}
          onChange={handleMenuChange}
          label='Choose Dispensary'
        >
          {updatedMdData.map((dispensary) => (
            <MenuItem
              key={dispensary.dispensary_id}
              value={dispensary.dispensary_id}
            >
              {dispensary.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {products.length > 0 ? (
        <>
          <Box
            mt='20px'
            display='grid'
            gridTemplateColumns='repeat(4, minmax(0, 1fr))'
            justifyContent='space-between'
            rowGap='20px'
            columnGap='1.33%'
            sx={{
              "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
            }}
          >
            {products.map(
              ({
                id,
                attributes: {
                  name,
                  category_name,
                  body,
                  original_picture_url,
                  prices,
                  brand_name,
                  license_type,
                  created_at,
                  updated_at,
                  parent_category,
                  sub_category,
                },
              }) => {
                const dispensary = updatedMdData.find(
                  (d) => d.menu_id === menuId
                );
                const price = getPrice(prices);
                const comparisonData = comparisonsData.find((d) =>
                  d.product.some((p) => p.name === name)
                );
                return (
                  <Product
                    key={id}
                    _id={id}
                    name={name}
                    category_name={category_name}
                    description={body}
                    dispensary_name={dispensary?.name || "Unknown"}
                    avatar_url={dispensary?.avatar_url || fallbackAvatar}
                    picture_url={original_picture_url}
                    price={price ? price.toFixed(2) : "N/A"}
                    brand_name={brand_name}
                    license_type={license_type}
                    created_at={created_at}
                    updated_at={updated_at}
                    parent_category={parent_category}
                    sub_category={sub_category}
                    comparisonData={comparisonData}
                  />
                );
              }
            )}
          </Box>
          <Box mt='20px' sx={{ height: "20px" }} />{" "}
        </>
      ) : (
        <>No products available.</>
      )}
    </Box>
  );
};

export default Products;
