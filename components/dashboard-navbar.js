import PropTypes from "prop-types";
import styled from "@emotion/styled";
import {
  AppBar,
  Badge,
  Box,
  IconButton,
  Toolbar,
  Tooltip,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Bell as BellIcon } from "../public/images/icons/bell";
import { Users as UsersIcon } from "../public/images/icons/users";
import NextLink from "next/link";
import { useEffect, useState } from "react";
import userApi from "../public/api/usersApi";

const DashboardNavbarRoot = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette?.background.paper,
  boxShadow: theme?.shadows?.[3],
}));

export const DashboardNavbar = (props) => {
  const { onSidebarOpen, ...other } = props;
  const [userName, setUserName] = useState();
  const fetchUserName = async () => {
    const response = await userApi.getUserById(localStorage.getItem("userId"));
    setUserName(response.username);
    try {
    } catch (error) {}
  };
  useEffect(() => {
    fetchUserName();
  }, []);

  return (
    <>
      <DashboardNavbarRoot
        sx={{
          left: {
            lg: 280,
          },
          width: {
            lg: "calc(100% - 280px)",
          },
        }}
        {...other}
      >
        <Toolbar
          disableGutters
          sx={{
            minHeight: 64,
            left: 0,
            px: 2,
          }}
        >
          <IconButton
            onClick={onSidebarOpen}
            sx={{
              display: {
                xs: "inline-flex",
                lg: "none",
              },
            }}
          >
            <MenuIcon fontSize="small" />
          </IconButton>
          <Box sx={{ flexGrow: 1 }} />
          <Tooltip title="Contacts">
            <IconButton sx={{ ml: 1 }}>
              <UsersIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Notifications">
            <IconButton sx={{ ml: 1 }}>
              <Badge badgeContent={4} color="primary" variant="dot">
                <BellIcon fontSize="small" />
              </Badge>
            </IconButton>
          </Tooltip>
          <div
            style={{
              fontWeight: "600",
              fontSize: "15px",
              color: "white",
              backgroundColor: "rgb(240 229 229)",
              borderRadius: "8px",
              padding: "5px 10px",
              marginLeft: "5px",
              cursor: "pointer",
            }}
          >
            <NextLink className="username" href="/accountadmin">
              {userName ? userName : ""}
            </NextLink>
          </div>
        </Toolbar>
      </DashboardNavbarRoot>
    </>
  );
};

DashboardNavbar.propTypes = {
  onSidebarOpen: PropTypes.func,
};
