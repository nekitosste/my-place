import React from "react";
import { Link, Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import axiosClient from "../axios-client";
import { Box, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import LogoutIcon from "@mui/icons-material/Logout";

export default function DefaultLayout() {
  const { user, token, setUser, setToken, notification } = useStateContext();

  if (!token) {
    return <Navigate to="login" />;
  }
  const onLogout = (ev) => {
    ev.preventDefault();
    axiosClient.post("/logout").then(() => {
      setUser({});
      setToken(null);
    });
  };

  React.useEffect(() => {
    axiosClient.get("/user").then(({ data }) => {
      setUser(data);
    });
  }, []);
  return (
    <div id="defaultLayout">
      {/* <aside>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/place">Place</Link>
      </aside> */}
      <div className="content">
        <header>
          <div>My Profile {user.name}</div>
          <Box sx={{ display: { md: "block", xs: "none" } }}>
            <div>
              <Link className="btn-add" to="/newplace">
                Add New
              </Link>
              <Link
                to="/place"
                className="btn-logout"
                style={{ marginLeft: "20px" }}
              >
                Home Page
              </Link>
              <a href="#" className="btn-logout" onClick={onLogout}>
                Logout
              </a>
            </div>
          </Box>
          <Box sx={{ display: { md: "none", xs: "block" } }}>
            <Link to="/newplace">
              <IconButton color="black">
                <AddIcon color="inherit" fontSize="small" />
              </IconButton>
            </Link>
            <a href="#" onClick={onLogout}>
              <IconButton color="black">
                <LogoutIcon color="inherit" fontSize="small" />
              </IconButton>
            </a>
          </Box>
        </header>

        <main>
          <Outlet />
        </main>
      </div>
      {notification && <div className="notification">{notification}</div>}
    </div>
  );
}
