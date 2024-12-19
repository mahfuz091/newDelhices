"use client";

import { styled, useTheme } from "@mui/material/styles";

import MuiDrawer from "@mui/material/Drawer";

import List from "@mui/material/List";

import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import PostAddIcon from "@mui/icons-material/PostAdd";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import CategoryIcon from "@mui/icons-material/Category";
import FoodBankIcon from "@mui/icons-material/FoodBank";
import CollectionsBookmarkIcon from "@mui/icons-material/CollectionsBookmark";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import ShopIcon from "@mui/icons-material/Shop";
import LogoutIcon from "@mui/icons-material/Logout";
import HomeIcon from "@mui/icons-material/Home";

import { NavLink, useNavigate } from "react-router-dom";
import useAxiosPublic from "../../hooks/UseAxiosPublic";
import logo from "../../assets/images/logo.svg";
// import logo from "@/assets/images/oyolloo-logo-color-horizontal.png";

const menuItems = [
  {
    title: "Dashboard",
    path: "/dashboard/home",
    icon: <HomeIcon />,
  },
  {
    title: "Category",
    path: "/dashboard/category",
    icon: <CategoryIcon />,
  },

  {
    title: "Items",
    path: "/dashboard/items",
    icon: <FoodBankIcon />,
  },
  {
    title: "Reservation",
    path: "/dashboard/reservation",
    icon: <CollectionsBookmarkIcon />,
  },

  {
    title: "Orders",
    path: "/dashboard/orders",
    icon: <ShopIcon />,
  },
  {
    title: "Blog",
    path: "/dashboard/blog",
    icon: <PostAddIcon />,
  },
  {
    title: "Sauce",
    path: "/dashboard/sauce",
    icon: <PostAddIcon />,
  },
  {
    title: "Nan Sauce",
    path: "/dashboard/nan-sauce",
    icon: <PostAddIcon />,
  },
  {
    title: "Drinks And Fries",
    path: "/dashboard/drinks",
    icon: <PostAddIcon />,
  },
];

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const DrawerWrapper = ({ open, handleDrawerClose }) => {
  const axiosPublic = useAxiosPublic();
  const theme = useTheme();
  const navigate = useNavigate();

  const handleClick = (path) => {
    // router.push(path);
  };
  const handleLogout = async () => {
    try {
      const res = await axiosPublic.post(
        "api/users/logout",
        {},
        {
          withCredentials: true,
        }
      );

      if (res.status === 200) {
        localStorage.removeItem("user");
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Drawer variant='permanent' open={open}>
      <DrawerHeader>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === "rtl" ? (
            <ChevronRightIcon />
          ) : (
            <ChevronLeftIcon />
          )}
        </IconButton>
      </DrawerHeader>
      <Divider />

      <List>
        {menuItems.map((text, index) => (
          <ListItem key={index} disablePadding sx={{ display: "block" }}>
            <NavLink
              className={({ isActive }) => (isActive ? "active" : "")}
              to={text.path}
            >
              <ListItemButton
                onClick={() => handleClick(text.path)}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  {/* {index % 2 === 0 ? <InboxIcon /> : <MailIcon />} */}
                  {text.icon}
                </ListItemIcon>
                <ListItemText
                  primary={text.title}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </NavLink>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        <ListItem disablePadding sx={{ display: "block" }}>
          <a>
            <ListItemButton
              onClick={() => handleLogout()}
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                {/* {index % 2 === 0 ? <InboxIcon /> : <MailIcon />} */}
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary='Log Out' sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </a>
        </ListItem>
      </List>
    </Drawer>
  );
};

export default DrawerWrapper;
