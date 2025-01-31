import  { useState } from "react";
import { AppBar, Toolbar, Typography, Box, Button, Drawer, List, ListItem, ListItemText, useMediaQuery, useTheme } from "@mui/material";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md")); 

  const menuItems = [
    { label: "Home", path: "/" },
    { label: "Clienti da promuovere", path: "/upselling-customers" },
    { label: "Lista Clienti", path: "/customers-information" },
    { label: "Clienti dormienti", path: "/zombie" }
  ];

  const toggleDrawer = (open:boolean) => {
    setOpen(open);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            La squadra della barba
          </Typography>
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
            {menuItems.map((item) => (
              <Button key={item.label} component={Link} to={item.path} color="inherit">
                {item.label}
              </Button>
            ))}
          </Box>
          {isMobile && (
            <span onClick={() => toggleDrawer(true)}>
              Menù
            </span>
          )}
        </Toolbar>
      </AppBar>


      {isMobile && (
        <Drawer anchor="left" open={open} onClose={() => toggleDrawer(false)}>
          <List>
            {menuItems.map((item) => (
              <ListItem key={item.label} component={Link} to={item.path} onClick={() => toggleDrawer(false)}>
                <ListItemText primary={item.label} />
              </ListItem>
            ))}
          </List>
        </Drawer>
      )}
    </Box>
  );
};

export default Navbar;
