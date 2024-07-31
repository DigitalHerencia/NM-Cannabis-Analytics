import { Box, TextField, Typography, useTheme } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import CustomButton from "../../components/CustomButton.jsx";
import FlexBetween from "../../components/FlexBetween.jsx";
import CircularIndeterminate from "../../components/Loading.jsx";
import { setToken } from "../../state";
import { useLoginUserMutation } from "../../state/api";
import login1Image from "./log1.jpg";
import login2Image from "./log2.jpg";
import login3Image from "./log3.jpg";
import splash1Image from "./splash1.jpg";
import splash2Image from "./splash2.jpg";
import splash3Image from "./splash3.jpg";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginUser, { isLoading }] = useLoginUserMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const [backgroundImage, setBackgroundImage] = useState(null);
  const [loginBoxVisible, setLoginBoxVisible] = useState(false);
  const [animationPlayed, setAnimationPlayed] = useState(false);

  const pairs = useMemo(
    () => [
      { splash: splash1Image, login: login1Image },
      { splash: splash2Image, login: login2Image },
      { splash: splash3Image, login: login3Image },
    ],
    []
  );

  useEffect(() => {
    if (!animationPlayed) {
      const randomPair = pairs[Math.floor(Math.random() * pairs.length)];
      setBackgroundImage(randomPair.splash);

      const fadeInBackground = async () => {
        const background = document.getElementById("background");
        background.style.opacity = 1;
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setBackgroundImage(randomPair.login);
        background.style.opacity = 0;
        await new Promise((resolve) => setTimeout(resolve, 100));
        background.style.opacity = 1;
        await new Promise((resolve) => setTimeout(resolve, 100));
        setLoginBoxVisible(true);
        setAnimationPlayed(true);
      };

      fadeInBackground();
    }
  }, [pairs, animationPlayed]);

  const handleLogin = async () => {
    try {
      const loginResponse = await loginUser({ email, password }).unwrap();
      dispatch(
        setToken({
          token: loginResponse.token,
          refreshToken: loginResponse.refreshToken,
          user: loginResponse.user,
        })
      );
      navigate("/");
    } catch (error) {
      console.error("Failed to login: ", error);
    }
  };

  return (
    <Box
      display='flex'
      flexDirection='column'
      alignItems='center'
      justifyContent='center'
      minHeight='100vh'
      position='relative'
    >
      <Box
        id='background'
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          zIndex: 0,
          opacity: 0,
          transition: "opacity 2.5s",
        }}
      />
      {isLoading ? (
        <CircularIndeterminate />
      ) : (
        <>
          {loginBoxVisible && (
            <Box
              sx={{
                position: "sticky",
                top: "50%",
                transform: "translateY(-50%)",
                padding: "2rem",
                zIndex: 1,
                textAlign: "center",
                opacity: 1,
                animation: animationPlayed ? "none" : "fadeIn 2.5s",
                backgroundColor: `0 0 0 50px ${theme.palette.background.alt} inset`,
                borderRadius: "8px",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
              }}
            >
              <Typography
                variant='h4'
                fontWeight='bold'
                color={theme.palette.text.primary}
              >
                WELCOME
              </Typography>
              <Box
                sx={{
                  "& input:-webkit-autofill": {
                    boxShadow: `0 0 0 100px ${theme.palette.background.default} inset`,
                    textFillColor: theme.palette.text.primary,
                    caretColor: theme.palette.text.primary,
                    borderRadius: "inherit",
                  },
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: theme.palette.text.primary,
                  },
                }}
              >
                <TextField
                  label='Email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  margin='normal'
                  fullWidth
                  variant='filled'
                  InputLabelProps={{
                    sx: {
                      color: theme.palette.text.primary,
                    },
                  }}
                  InputProps={{
                    sx: {
                      color: theme.palette.text.primary,
                    },
                  }}
                />
              </Box>
              <Box
                sx={{
                  "& input:-webkit-autofill": {
                    boxShadow: `0 0 0 100px ${theme.palette.background.default} inset`,
                    textFillColor: theme.palette.text.primary,
                    caretColor: theme.palette.text.primary,
                    borderRadius: "inherit",
                  },
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: theme.palette.text.primary,
                  },
                }}
              >
                <TextField
                  label='Password'
                  type='password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  margin='normal'
                  fullWidth
                  variant='filled'
                  InputLabelProps={{
                    sx: {
                      color: theme.palette.text.primary,
                    },
                  }}
                  InputProps={{
                    sx: {
                      color: theme.palette.text.primary,
                    },
                  }}
                />
              </Box>
              <FlexBetween justifyContent={"center"} alignContent={"center"}>
                <CustomButton
                  onClick={handleLogin}
                  sx={{
                    backgroundColor: theme.palette.background.paper,
                    color: theme.palette.text.primary,
                    "&:hover": {
                      backgroundColor: theme.palette.background.default,
                      color: theme.palette.text.secondary,
                    },
                    marginTop: "20px",
                    width: "70px",
                  }}
                >
                  Login
                </CustomButton>
                <CustomButton
                  onClick={() => navigate("/register")}
                  sx={{
                    backgroundColor: theme.palette.background.paper,
                    color: theme.palette.text.primary,
                    "&:hover": {
                      backgroundColor: theme.palette.background.default,
                      color: theme.palette.text.secondary,
                    },
                    marginTop: "20px",
                    width: "70px",
                  }}
                >
                  Register
                </CustomButton>
              </FlexBetween>
            </Box>
          )}
        </>
      )}
    </Box>
  );
};

export default Login;
