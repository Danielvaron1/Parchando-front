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
import {Link} from 'react-router-dom';
import {
    Badge,
    Divider,
    List,
    ListItem, ListItemAvatar,
    ListItemButton,
    ListItemIcon,
    ListItemText, Stack,
    SwipeableDrawer
} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import {deepPurple} from "@mui/material/colors";
import {Logout, Settings, People} from "@mui/icons-material";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import dayjs from "dayjs";


const pages = ['Inicio', 'Eventos', 'Mis Eventos', 'Acerca De'];

const Header = () => {
    const {userData, setUserData} = useUserContext();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [anchorNot, setAnchorNot] = React.useState(null);
    const [activeItem, setActiveItem] = useState("");
    const [state, setState] = React.useState(false);
    const [notif, setNotif] = React.useState([
        {
            id: 1,
            tipoId: 1,
            tipo: "Amistad",
            fecha: dayjs("2024-08-12 05:23:15"),
            leido: false
        },
        {
            id: 2,
            tipoId: 2,
            tipo: "Solicitud",
            fecha:  dayjs("2024-08-12 05:23:16"),
            leido: true
        },
        {
            id: 3,
            tipoId: 3,
            tipo: "Cancelado",
            fecha:  dayjs("2024-08-12 03:23:15"),
            leido: false
        },
        {
            id: 4,
            tipoId: 4,
            tipo: "Comentario",
            fecha:  dayjs("2024-08-12 05:23:17"),
            leido: true
        },
        {
            id: 5,
            tipoId: 5,
            tipo: "Asistente",
            fecha:  dayjs("2024-08-12 02:23:15"),
            leido: false
        },
        {
            id: 6,
            tipoId: 6,
            tipo: "Salio",
            fecha:  dayjs("2024-08-13 05:23:15"),
            leido: true
        }
    ]);


    const handleItemClick = (item) => {
        setActiveItem(item);
    };

    const menuId = 'primary-search-account-menu';

    const notiId = 'notifications-menu';

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleNotificationsOpen = (event) => {
        setAnchorNot(event.currentTarget);
        setNotif((prevNotif) => prevNotif.map(noti => ({ ...noti, leido: true })));
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleNotificationsClose = () => {
        setAnchorNot(null);
    };

    const hasUnreadNotifications = () => {
        return notif.some(noti => !noti.leido);
    };

    const isMenuOpen = Boolean(anchorEl);

    const isNotificationsOpen = Boolean(anchorNot);

    function handleLogout() {
        setUserData({
            name: '',
            email: '',
            date: null,
            phone: '',
            password: '',
            description: '',
            city: '',
            interests: []
        });
        handleMenuClose()
    }

    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: "bottom",
                horizontal: 'left',
            }}
            id={menuId}
            keepMounted
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <Link to={"/PerfilUpdate"}><MenuItem onClick={handleMenuClose}>
                <ListItemIcon>
                    <Settings fontSize="small"/>
                </ListItemIcon>
                Perfil
            </MenuItem></Link>
            <Link to={"/Amigos"}><MenuItem onClick={handleMenuClose}>
                <ListItemIcon>
                    <People fontSize="small"/>
                </ListItemIcon>
                Amigos
            </MenuItem></Link>
            <Divider variant="middle"/>
            <Link to={"/"}><MenuItem onClick={handleLogout}>
                <ListItemIcon>
                    <Logout fontSize="small"/>
                </ListItemIcon>
                Salir
            </MenuItem></Link>
        </Menu>
    );

    function notifItem(noti) {
        const mensajes = {
            "Amistad": "Acepto tu solicitud de amistad",
            "Solicitud": "Te envió una solicitud de amistad",
            "Cancelado": "El evento fue cancelado",
            "Comentario": "Tiene un nuevo comentario",
            "Asistente": "Una persona se inscribió a tu evento",
            "Salio": "Una persona se salió de tu evento"
        };
        const path = {
            "Amistad": "/Amigo",
            "Solicitud": "/Solicitudes",
            "Cancelado": "/Eventos",
            "Comentario": "/Evento",
            "Asistente": "/Evento",
            "Salio": "/Evento"
        };

        function handleNotificationRead(id) {
            handleNotificationsClose();
            setNotif((prevNotif) => prevNotif.filter((noti) => noti.id !== id));
        }

        return (
            <Stack key={noti.id}>
                <Link to={path[noti.tipo]} onClick={handleNotificationsClose}>
                    <ListItem key={noti.id} alignItems="flex-start"
                              secondaryAction={
                                  <IconButton edge="end" aria-label="read"
                                              onClick={() => (handleNotificationRead(noti.id))}>
                                      <DeleteForeverIcon color={"error"}/>
                                  </IconButton>
                              }>
                        {noti.tipo === "Amistad" || noti.tipo === "Solicitud" ? (
                            <ListItemAvatar>
                                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg"/>
                            </ListItemAvatar>
                        ) : (
                            <ListItemAvatar>
                                <IconButton disableRipple>
                                    <CalendarMonthIcon  sx={{ color: deepPurple[400] }}/>
                                </IconButton>
                            </ListItemAvatar>
                        )}
                        <ListItemText
                            primary={noti.tipoId}
                            secondary={
                                <React.Fragment>
                                    {mensajes[noti.tipo]}
                                </React.Fragment>
                            }
                        />

                    </ListItem>
                </Link>
                <Divider variant="middle" component="li"/>

            </Stack>
        );
    }
    const renderNotifications = (
        <Menu
            anchorEl={anchorNot}
            anchorOrigin={{
                vertical: "bottom",
                horizontal: 'left',
            }}
            id={notiId}
            keepMounted
            open={isNotificationsOpen}
            onClose={handleNotificationsClose}
        >
            <List sx={{
                width: '100%',
                minWidth: {xs: 350, sm: 450},
                maxWidth: 500,
                maxHeight: 450,
                bgcolor: 'background.paper'
            }}>
                {notif.length !== 0 ? (
                    <Stack>
                        <Divider variant="middle" component="li"/>
                        {notif
                            .sort((a, b) => b.fecha - a.fecha)
                            .map(notifItem)}
                    </Stack>
                ) : (
                    <Stack sx={{justifyContent: 'center', alignItems: 'center'}}>
                        <Typography
                            component="span"
                            variant="h6"
                            sx={{color: 'text.primary', display: 'inline'}}
                        > No tienes Notificaciones</Typography>
                    </Stack>
                )}

            </List>
        </Menu>
    );

    const toggleDrawer = (newOpen) => () => {
        setState(newOpen);
    };

    const list = () => (
        <Box
            sx={{width: 250}}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
        >
            <List>
                {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                {index % 2 === 0 ? <InboxIcon/> : <MailIcon/>}
                            </ListItemIcon>
                            <ListItemText primary={text}/>
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Divider/>
            <List>
                {['All mail', 'Trash', 'Spam'].map((text, index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                {index % 2 === 0 ? <InboxIcon/> : <MailIcon/>}
                            </ListItemIcon>
                            <ListItemText primary={text}/>
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
                    <Link to="/">
                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            onClick={() => {
                                setActiveItem("")
                            }}
                            className="logo"
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
                    </Link>

                    <Box sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}}}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={toggleDrawer(true)}
                            color="inherit"
                        >
                            <MenuIcon/>
                        </IconButton>
                        <SwipeableDrawer
                            anchor={"left"}
                            open={state}
                            onClose={toggleDrawer(false)}
                            onOpen={toggleDrawer(true)}
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
                            <Link to={page === "Inicio" ? "/" : `/${page}`} key={page}>
                                <Button
                                    className={`${activeItem === page ? "active" : ""}`}
                                    onClick={() => handleItemClick(page)}
                                    sx={{my: 2, color: 'white', display: 'block'}}
                                >
                                    {page}
                                </Button>
                            </Link>
                        ))}
                    </Box>
                    <Box sx={{flexGrow: 0}}>
                        {userData.name !== '' ? (
                            <Box>
                                <IconButton size="large" aria-label="show 4 new mails" color="inherit" to={"/Mensajes"} component={Link}>
                                    <Badge color="secondary" variant="dot" invisible={false}>
                                        <MailIcon/>
                                    </Badge>
                                </IconButton>
                                <IconButton
                                    size="large"
                                    aria-controls={notiId}
                                    aria-label="show 17 new notifications"
                                    onClick={handleNotificationsOpen}
                                    color="inherit"
                                >
                                    <Badge color="secondary" variant="dot" invisible={!hasUnreadNotifications()}>
                                        <NotificationsIcon/>
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
                                    <Avatar
                                        sx={{bgcolor: deepPurple[400]}}
                                        alt={userData.name}
                                        src="/static/images/avatar/1.jpg"
                                    >
                                        {userData.name.charAt(0)}
                                    </Avatar>
                                </IconButton>
                            </Box>
                        ) : (
                            <Button href={"/auth"} variant="contained" className={"login"}>
                                Entrar
                            </Button>
                        )}
                    </Box>
                </Toolbar>
            </Container>
            {renderMenu}
            {renderNotifications}
        </AppBar>
    );
};

export default Header;