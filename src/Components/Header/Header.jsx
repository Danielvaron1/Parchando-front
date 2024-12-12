import "./Header.css";
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ComforterBrush from '../../Resources/ComforterBrush-Regular.ttf';
import {useState} from "react";
import {useUserContext} from "../../Context/UserContext";
import {
    Badge,
    Divider,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    SwipeableDrawer
} from "@mui/material";
import {AccountCircle} from "@mui/icons-material";

const pages = ['Inicio', 'Eventos', 'Mis Eventos', 'Acerca De'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const Header = () => {
    const {userData} = useUserContext();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [activeItem, setActiveItem] = useState("");
    const [state, setState] = React.useState(false);

    const handleItemClick = (item) => {
        setActiveItem(item);
    };

    const menuId = 'primary-search-account-menu';

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const isMenuOpen = Boolean(anchorEl);

    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: "bottom",
                horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleMenuClose}>My account</MenuItem>
        </Menu>
    );

    const toggleDrawer = (newOpen) => () => {
        setState(newOpen);
    };

    const list = () => (
        <Box
            sx={{ width: 250 }}
            role="presentation"
            onClick={toggleDrawer( false)}
            onKeyDown={toggleDrawer( false)}
        >
            <List>
                {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Divider />
            <List>
                {['All mail', 'Trash', 'Spam'].map((text, index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    return (
        <AppBar position="static" className="Header">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        className="logo"
                        href="/"
                        sx={{
                            mr: 2,
                            display: {xs: 'none', md: 'flex'},
                            fontFamily: {ComforterBrush},
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        Parchando.com
                    </Typography>

                    <Box sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}}}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={toggleDrawer( true)}
                            color="inherit"
                        >
                            <MenuIcon/>
                        </IconButton>
                        <SwipeableDrawer
                            anchor={"left"}
                            open={state}
                            onClose={toggleDrawer( false)}
                            onOpen={toggleDrawer( true)}
                        >
                            {list()}
                        </SwipeableDrawer>
                    </Box>
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        className="logo"
                        href="/"
                        sx={{
                            mr: 2,
                            display: {xs: 'flex', md: 'none'},
                            flexGrow: 1,
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        Parchando.com
                    </Typography>
                    <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex', justifyContent: 'center'}}}>
                        {pages.map((page) => (
                            <Button
                                className={`${activeItem === page ? "active" : ""}`}
                                key={page}
                                onClick={() => handleItemClick(page)}
                                sx={{my: 2, color: 'white', display: 'block'}}
                            >
                                {page}
                            </Button>
                        ))}
                    </Box>
                    <Box sx={{flexGrow: 0}}>
                        {userData.name != null ? (
                            <Box>
                                <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                                    <Badge color="secondary" variant="dot" invisible={false}>
                                        <MailIcon />
                                    </Badge>
                                </IconButton>
                                <IconButton
                                    size="large"
                                    aria-label="show 17 new notifications"
                                    color="inherit"
                                >
                                    <Badge color="secondary" variant="dot" invisible={false}>
                                        <NotificationsIcon />
                                    </Badge>
                                </IconButton>
                                <IconButton
                                    size="large"
                                    edge="end"
                                    aria-label="account of current user"
                                    aria-controls={menuId}
                                    aria-haspopup="true"
                                    onClick={handleProfileMenuOpen}
                                    color="inherit"
                                >
                                    <AccountCircle />
                                </IconButton>
                            </Box>
                        ) : (
                            <Button href={"/auth"} variant="contained" className={"login"}>
                                Entrar
                            </Button>
                        )}
                        <Menu
                            sx={{mt: '45px'}}
                            id="menu-appbar"
                            anchorEl={null}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean()}
                            onClose={null}
                        >
                            {settings.map((setting) => (
                                <MenuItem key={setting} onClick={null}>
                                    <Typography sx={{textAlign: 'center'}}>{setting}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
            {renderMenu}
        </AppBar>
    );
};

export default Header;