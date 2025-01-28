import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";

const Navbar = () => {
return (
    <Box sx={{ flexGrow: 1 }}>
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          My Navbar
        </Typography>
        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2 }}>
          <Button color="inherit">Home</Button>
          <Button color="inherit">About</Button>
          <Button color="inherit">Clienti dormienti</Button>
          <Button color="inherit">Contact</Button>
        </Box>
      </Toolbar>
    </AppBar>
  </Box>
)
}


export default Navbar;