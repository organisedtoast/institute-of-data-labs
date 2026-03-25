import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import { NavLink } from 'react-router-dom';

const navlinkStyle = {
  color: '#151d1c',
  textDecoration: 'none',
};


const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

export default function NavBar() {
  // State to track which element the menu is anchored to (null = menu is closed)
  const [anchorEl, setAnchorEl] = React.useState(null);

  // Convert anchorEl to boolean: true if menu should be open, false if closed
  const isMenuOpen = Boolean(anchorEl);

  // Opens the menu when the MenuIcon button is clicked
  // event.currentTarget is the button that was clicked - the menu will appear anchored to this element
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Closes the menu by setting anchorEl back to null
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const menuId = 'nav-menu';
  
  // This variable holds the JSX for the dropdown menu containing navigation links
  // The menu appears when anchorEl is set (i.e., when handleMenuOpen is called)
  const renderMenu = (
    <Menu
      // anchorEl tells the Menu where to position itself (the button it should appear next to)
      anchorEl={anchorEl}
      // Position the menu below and to the right of the anchor element
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      // keepMounted keeps the menu in the DOM even when closed (better for accessibility)
      keepMounted
      // Transform origin determines which corner of the menu aligns with the anchor
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      // Menu is open when isMenuOpen is true (when anchorEl is not null)
      open={isMenuOpen}
      // Close the menu when user clicks outside or presses Escape
      onClose={handleMenuClose}
    >
      {/* Each MenuItem is a row in the dropdown menu */}
      {/* When clicked, close the menu and navigate to the specified route */}
      <MenuItem onClick={handleMenuClose}>
        <NavLink style={navlinkStyle} to="/">Home</NavLink>
      </MenuItem>
      <MenuItem onClick={handleMenuClose}>
        <NavLink style={navlinkStyle} to="/stocks">Stocks</NavLink>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: '#4a148c' }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
            onClick={handleMenuOpen}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            Stock Gossip Monitor
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
        </Toolbar>
      </AppBar>
      {renderMenu}
    </Box>
  );
}
