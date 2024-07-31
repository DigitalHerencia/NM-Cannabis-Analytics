import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallback />;
    }

    return this.props.children;
  }
}

function ErrorFallback() {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate("/");
  };

  return (
    <Box
      display='flex'
      flexDirection='column'
      alignItems='center'
      justifyContent='center'
      height='100vh'
      textAlign='center'
    >
      <ErrorOutlineIcon style={{ fontSize: 100, color: "red" }} />
      <Typography variant='h3' color='error'>
        Oops! You broke the website.
      </Typography>
      <Typography variant='h6'>
        Something went wrong. Please try again later.
      </Typography>
      <Button
        variant='contained'
        color='primary'
        onClick={handleRedirect}
        style={{ marginTop: "20px" }}
      >
        Go to Home
      </Button>
    </Box>
  );
}

export default ErrorBoundary;
