import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Modal,
  Rating,
  Select,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setKPI, setMode } from "../state";
import { useCreateKPIMutation } from "../state/api";
import legend from "../state/legend";
import CircularIndeterminate from "./CircularIndeterminate";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const SettingsModal = ({ open, handleClose }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [dispensary, setDispensary] = useState("");
  const [mode, setModeValue] = useState("light");
  const [dispensaryDetails, setDispensaryDetails] = useState(null);
  const [createKPI, { isLoading, isSuccess, isError }] = useCreateKPIMutation();

  useEffect(() => {
    if (dispensary) {
      const selected = legend.find((item) => item.name === dispensary);
      setDispensaryDetails(selected || null);
    }
  }, [dispensary]);

  useEffect(() => {
    if (isSuccess) {
      handleClose();
    }
  }, [isSuccess, handleClose]);

  const handleSave = () => {
    if (dispensaryDetails) {
      const kpiData = {
        dispensaryId: dispensaryDetails.dispensary_id || null,
        menuId: dispensaryDetails.menu_id || null,
        salesId: dispensaryDetails.sales_id || null,
        userId: "6677972f84c55e7127d018f6", // Replace with actual user ID if needed
      };

      createKPI(kpiData).then(() => {
        dispatch(setKPI(kpiData));
        dispatch(setMode(mode));
      });
    } else {
      dispatch(setMode(mode));
      handleClose();
    }
  };

  const handleToggleChange = (event) => {
    setModeValue(event.target.checked ? "dark" : "light");
  };

  // Filter legend data to include only dispensaries with menu_id
  const updatedLegend = legend
    .filter((item) => item.menu_id !== null)
    .sort((a, b) => a.name.localeCompare(b.name));

  // Log the number of names in the dropdown
  console.log(`Number of names in the dropdown: ${updatedLegend.length}`);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby='settings-modal-title'
      aria-describedby='settings-modal-description'
    >
      <Box sx={style}>
        <Typography id='settings-modal-title' variant='h6' component='h2'>
          User Settings
        </Typography>
        {isLoading && <CircularIndeterminate />}
        {!isLoading && (
          <>
            <TextField
              fullWidth
              label='Your Name'
              variant='outlined'
              sx={{ mt: 2 }}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <FormControl fullWidth sx={{ mt: 2 }}>
              <InputLabel id='dispensary-label'>Dispensary</InputLabel>
              <Select
                labelId='dispensary-label'
                id='dispensary'
                value={dispensary}
                label='Dispensary'
                onChange={(e) => setDispensary(e.target.value)}
              >
                {updatedLegend.map((dispensary) => (
                  <MenuItem key={dispensary.id} value={dispensary.name}>
                    {dispensary.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {dispensaryDetails && (
              <Box sx={{ mt: 2 }}>
                <Typography variant='body1'>
                  <strong>Name:</strong> {dispensaryDetails.name}
                </Typography>
                <Typography variant='body1'>
                  <strong>Address:</strong> {dispensaryDetails.address}
                </Typography>
                <Typography variant='body1'>
                  <strong>City:</strong> {dispensaryDetails.city}
                </Typography>
                <Typography variant='body1'>
                  <strong>Zip Code:</strong> {dispensaryDetails.zip_code}
                </Typography>
                <Typography variant='body1'>
                  <strong>Rank:</strong> {dispensaryDetails.ranking.toFixed(2)}
                </Typography>
                <Typography variant='body1'>
                  <strong>Rating:</strong>
                </Typography>
                <Rating
                  value={
                    dispensaryDetails.rating ? dispensaryDetails.rating : 0
                  }
                  readOnly
                />
              </Box>
            )}
            <FormControl fullWidth sx={{ mt: 2 }}>
              <FormControlLabel
                control={
                  <Switch
                    checked={mode === "dark"}
                    onChange={handleToggleChange}
                    name='mode'
                    color='primary'
                  />
                }
                label={`Mode: ${mode.charAt(0).toUpperCase() + mode.slice(1)}`}
              />
            </FormControl>
            {isError && (
              <Typography color='error' variant='body2'>
                Error saving KPI data. Please try again.
              </Typography>
            )}
            <Box
              sx={{ mt: 2, display: "flex", justifyContent: "space-between" }}
            >
              <Button
                variant='contained'
                color='secondary'
                onClick={handleClose}
              >
                Close
              </Button>
              <Button variant='contained' color='primary' onClick={handleSave}>
                Save
              </Button>
            </Box>
          </>
        )}
      </Box>
    </Modal>
  );
};

export default SettingsModal;
