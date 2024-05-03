import { Icon } from "@iconify/react";
import MenuIcon from "@mui/icons-material/Menu";
import { Grid, ListItemText } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import * as React from "react";
import Home from "../home";
import HistoricalData from "../history";
import MarsExplore from "../mars";
import Logo from '../assets/logo.png';

const drawerWidth = 240;

function ResponsiveDrawer(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);
  const [selectComponent, setSelectComponent] = React.useState(<Home />);

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const handleHomeOpen = () => {
    setSelectComponent(<Home />);
  };

  const handleHistoryOpen = () => {
    setSelectComponent(<HistoricalData />);
  };

  const handleMarsOpen = () => {
    setSelectComponent(<MarsExplore />);
  };

  const drawer = (
    <div>
      <Toolbar sx={{ background: "#000269" }}>
        <Box sx={{ flexGrow: 1 }}>
          <img src={Logo} alt="logo" style={{ width: "100px" }} />
        </Box>
      </Toolbar>
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={handleHomeOpen}>
            <ListItemIcon>
              <Icon icon="solar:home-broken" style={{ fontSize: "25px" }} />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton onClick={handleHistoryOpen}>
            <ListItemIcon>
              <Icon icon="raphael:history" style={{ fontSize: "25px" }} />
            </ListItemIcon>
            <ListItemText primary="Data Recap" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton onClick={handleMarsOpen}>
            <ListItemIcon>
              <Icon icon="fluent-emoji-high-contrast:ringed-planet" style={{ fontSize: "25px" }} />
            </ListItemIcon>
            <ListItemText primary="Mars Explore" />
          </ListItemButton>
        </ListItem>
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Project Deep Sky
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />

        <Box sx={{ px: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sx={{px:2}}>
              {selectComponent}
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}

ResponsiveDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * Remove this when copying and pasting into your project.
   */
  window: PropTypes.func,
};

export default ResponsiveDrawer;
