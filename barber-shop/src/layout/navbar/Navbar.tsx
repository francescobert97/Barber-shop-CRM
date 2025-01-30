import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const Navbar = () => {
return (
    <Box sx={{ flexGrow: 1 }}>
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          La squadra della barba
        </Typography>
        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2 }}>
          <Button component={Link} to={'/'}  color="inherit">Home</Button>
          <Button color="inherit"  component={Link} to={'/upselling-customers'}>Clienti da upsellare</Button>
        <Button   component={Link} to={'/customers-information'} color="inherit">Lista Clienti</Button>
        <Button   component={Link} to={'/zombie'} color="inherit">Clienti dormienti</Button>
        </Box>
      </Toolbar>
    </AppBar>
  </Box>
)
}


export default Navbar;