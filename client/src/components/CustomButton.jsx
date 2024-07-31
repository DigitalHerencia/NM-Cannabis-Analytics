// src/components/CustomButton.jsx
import { Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const CustomButton = ({ onClick, children, ...props }) => {
  const theme = useTheme();
  return (
    <Button
      onClick={onClick}
      sx={{
        backgroundColor: theme.palette.secondary[200],
        color: theme.palette.grey[900],
        "&:hover": {
          backgroundColor: theme.palette.secondary[300],
          color: theme.palette.secondary[100],
        },
      }}
      {...props}
    >
      {children}
    </Button>
  );
};

export default CustomButton;
