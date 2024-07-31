import { Box, Button, TextField, Typography, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import FlexBetween from "../components/FlexBetween";
import CircularIndeterminate from "../components/Loading";
import { useRegisterUserMutation } from "../state/api";

// Array of background image paths
const backgroundImages = [
  "client/src/scenes/register/_reg1.png",
  "client/src/scenes/register/_reg2.png",
  "client/src/scenes/register/_reg3.png",
];

const getRandomBackground = () => {
  const randomIndex = Math.floor(Math.random() * backgroundImages.length);
  return backgroundImages[randomIndex];
};

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [industry, setIndustry] = useState("");
  const [experienceLevel, setExperienceLevel] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [backgroundImage, setBackgroundImage] = useState(getRandomBackground());
  const [registerUser, { isLoading }] = useRegisterUserMutation();
  const navigate = useNavigate();
  const theme = useTheme();

  useEffect(() => {
    setBackgroundImage(getRandomBackground());
  }, []);

  const handleRegister = async () => {
    try {
      await registerUser({
        email,
        password,
        role,
        firstName,
        lastName,
        companyName,
        jobTitle,
        industry,
        experienceLevel,
        contactNumber,
      }).unwrap();
      navigate("/login");
    } catch (error) {
      console.error("Failed to register: ", error);
    }
  };

  if (isLoading) {
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
      minHeight='100vh'
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <FlexBetween color={theme.palette.secondary.main}>
        <Box display='flex' alignItems='center' gap='3rem'>
          <Typography variant='h4' fontWeight='bold'>
            COMPETITIVE ADVANTAGE
          </Typography>
        </Box>
      </FlexBetween>
      <Box
        display='flex'
        flexDirection='column'
        alignItems='center'
        justifyContent='center'
        bgcolor='rgba(0, 0, 0, 0.5)'
        p={5}
        borderRadius={2}
      >
        <Typography variant='h4' gutterBottom color='white'>
          Register
        </Typography>
        <TextField
          label='First Name'
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          margin='normal'
          fullWidth
        />
        <TextField
          label='Last Name'
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          margin='normal'
          fullWidth
        />
        <TextField
          label='Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          margin='normal'
          fullWidth
        />
        <TextField
          label='Password'
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          margin='normal'
          fullWidth
        />
        <TextField
          label='Role'
          value={role}
          onChange={(e) => setRole(e.target.value)}
          margin='normal'
          fullWidth
        />
        <TextField
          label='Company Name'
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          margin='normal'
          fullWidth
        />
        <TextField
          label='Job Title'
          value={jobTitle}
          onChange={(e) => setJobTitle(e.target.value)}
          margin='normal'
          fullWidth
        />
        <TextField
          label='Industry'
          value={industry}
          onChange={(e) => setIndustry(e.target.value)}
          margin='normal'
          fullWidth
        />
        <TextField
          label='Experience Level'
          value={experienceLevel}
          onChange={(e) => setExperienceLevel(e.target.value)}
          margin='normal'
          fullWidth
        />
        <TextField
          label='Contact Number'
          value={contactNumber}
          onChange={(e) => setContactNumber(e.target.value)}
          margin='normal'
          fullWidth
        />
        <Button
          variant='contained'
          color='primary'
          onClick={handleRegister}
          sx={{ mt: 2 }}
        >
          Register
        </Button>
        <Link to='/login' style={{ marginTop: "20px", color: "white" }}>
          Already have an account? Login here
        </Link>
      </Box>
    </Box>
  );
};

export default Register;
