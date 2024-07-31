import { Box } from "@mui/material";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import CircularIndeterminate from "../../components/Loading.jsx";
import { clearToken } from "../../state";
import { useLogoutUserMutation } from "../../state/api";

const Logout = () => {
  const [logoutUser, { isLoading }] = useLogoutUserMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const logout = async () => {
      try {
        await logoutUser().unwrap();
      } catch (error) {
        console.error("Failed to logout: ", error);
      } finally {
        dispatch(clearToken());
        navigate("/login");
      }
    };

    logout();
  }, [logoutUser, dispatch, navigate]);

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

  return null;
};

export default Logout;
