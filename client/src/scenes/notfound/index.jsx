import { Box, Button, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import CircularIndeterminate from "../../components/Loading.jsx";

const NotFound = () => {
  const { navigate, isloading } = useNavigate();
  const theme = useTheme();

  const handleGoHome = () => {
    navigate("/dashboard");
  };

  if (isloading) {
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
      display='flex'
      flexDirection='column'
      alignItems='center'
      justifyContent='center'
      height='100vh'
      bgcolor={theme.palette.background.default}
      color={theme.palette.text.primary}
    >
      <Typography variant='h1' color={theme.palette.error.main}>
        404
      </Typography>
      <Typography variant='h6' mb={4}>
        The page you are looking for could not be found.
      </Typography>
      <Button variant='contained' color='primary' onClick={handleGoHome}>
        Go to Dashboard
      </Button>
    </Box>
  );
};

export default NotFound;
