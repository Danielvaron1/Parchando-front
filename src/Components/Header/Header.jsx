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
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ComforterBrush from '../../Resources/ComforterBrush-Regular.ttf';
import {useEffect, useState} from "react";
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
import {deleteNotificaciones, getNotificaciones, getUsersParams, readNotificaciones} from "../../Api/UsuariosApi";

import LoginIcon from '@mui/icons-material/Login';
import HomeIcon from '@mui/icons-material/Home';
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import InfoIcon from "@mui/icons-material/Info";
import PersonIcon from "@mui/icons-material/Person";




const Header = () => {
    const {userData, handleLogout, token} = useUserContext();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [anchorNot, setAnchorNot] = React.useState(null);
    const [activeItem, setActiveItem] = useState("");
    const [state, setState] = React.useState(false);
    const [notif, setNotif] = React.useState([]);

    const [userPhotos, setUserPhotos] = useState({});

    const pages = userData.nombre ? ['Inicio', 'Eventos', 'Mis Eventos', 'Acerca De'] : ['Inicio', 'Eventos', 'Acerca De'];
    useEffect(() => {
        const fetchNotificaciones = async () => {
            try {
                const fetchedNotificaciones = await getNotificaciones(userData.id, token);
                setNotif(fetchedNotificaciones);
            } catch (error) {
                console.error("Error al obtener las notificaciones:", error);
            }
        };

        fetchNotificaciones();
    }, []);

    useEffect(() => {
        const fetchUserPhotos = async () => {
            const userPhotosMap = {};
            for (const noti of notif) {
                if (noti.tipo === "amistad" || noti.tipo === "solicitud") {
                    try {
                        const fetchedUser  = await getUsersParams({ usuarioId: noti.tipoId }, token);
                        userPhotosMap[noti.id] = fetchedUser.fotos;
                    } catch (error) {
                        console.error("Error al obtener el usuario:", error);
                    }
                }
            }
            setUserPhotos(userPhotosMap);
        };

        fetchUserPhotos();
    }, [notif]);


    const handleItemClick = (item) => {
        setActiveItem(item);
    };

    const menuId = 'primary-search-account-menu';

    const notiId = 'notifications-menu';

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleNotificationsOpen = async (event) => {
        setAnchorNot(event.currentTarget);
        try {
            const fetchedNotificaciones = await readNotificaciones(userData.id, token);
            setNotif(fetchedNotificaciones);
        } catch (error) {
            console.error("Error al obtener las notificaciones:", error);
        }
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

    function handleLogoutClick() {
        handleLogout();
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
            <Link to={"/Perfil?id="+userData.id}><MenuItem onClick={handleMenuClose}>
                <ListItemIcon>
                    <PersonIcon fontSize="small"/>
                </ListItemIcon>
                Mi Perfil
            </MenuItem></Link>
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
            <Link to={"/"}><MenuItem onClick={handleLogoutClick} sx={{ color: "error.main" }}>
                <ListItemIcon>
                    <Logout color={"error"} fontSize="small"/>
                </ListItemIcon>
                Salir
            </MenuItem></Link>
        </Menu>
    );

    function notifItem(noti) {
        const mensajes = {
            "amistad": "Acepto tu solicitud de amistad",
            "solicitud": "Te envió una solicitud de amistad",
            "cancelado": "El evento fue cancelado",
            "comentario": "Tiene un nuevo comentario",
            "asistente": "Una persona se inscribió a tu evento",
            "salio": "Una persona se salió de tu evento",
            "editado": "El evento fue editado",
        };
        const path = {
            "amistad": "/Perfil",
            "solicitud": "/Perfil",
            "cancelado": "/Eventos",
            "comentario": "/Evento",
            "asistente": "/Evento",
            "salio": "/Evento",
            "editado": "/Evento"
        };

        function handleNotificationRead(id) {
            setNotif((prevNotif) => prevNotif.filter((noti) => noti.id !== id));
            deleteNotificaciones(id, token);
        }

        const notificationPath = `${path[noti.tipo]}?id=${noti.tipoId}`;

        return (
            <Stack key={noti.id}>
                <ListItem key={noti.id} alignItems="flex-start">
                    <Link to={notificationPath} onClick={handleNotificationsClose} style={{ flexGrow: 1 ,display:"flex"}}>
                        {noti.tipo === "amistad" || noti.tipo === "solicitud" ? (
                            <ListItemAvatar>
                                <Avatar
                                    sx={{bgcolor: deepPurple[400]}}
                                    alt={noti.nombre}
                                    src={userPhotos[noti.id]}
                                />
                            </ListItemAvatar>
                        ) : (
                            <ListItemAvatar>
                                <IconButton disableRipple>
                                    <CalendarMonthIcon sx={{color: deepPurple[400]}}/>
                                </IconButton>
                            </ListItemAvatar>
                        )}
                        <ListItemText
                            primary={noti.nombre}
                            secondary={
                                <React.Fragment>
                                    {mensajes[noti.tipo]}
                                </React.Fragment>
                            }
                        />
                    </Link>
                    <IconButton edge="end" aria-label="read"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleNotificationRead(noti.id);
                                }}>
                        <DeleteForeverIcon color={"error"}/>
                    </IconButton>
                </ListItem>
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

    const listItems = userData.nombre ? [
        { text: "Inicio", icon: <HomeIcon />, to: "/" },
        { text: "Eventos", icon: <CalendarMonthIcon />, to: "/Eventos" },
        { text: "Mis Eventos", icon: <EventAvailableIcon />, to: "/Mis Eventos" },
        { text: "Acerca De", icon: <InfoIcon />, to: "/Acerca De" },
        { text: "Mi Perfil", icon: <PersonIcon />, to: "/PerfilUpdate" },
        { text: "Perfil", icon: <Settings />, to: "/PerfilUpdate" },
        { text: "Amigos", icon: <People />, to: "/Amigos" },
        { text: "Mensajes", icon: <MailIcon />, to: "/Mensajes" },
        { text: "Salir", icon: <Logout color={"error"} />, to: "/", isLogout: true }
    ] : [
        { text: "Inicio", icon: <HomeIcon />, to: "/" },
        { text: "Eventos", icon: <CalendarMonthIcon />, to: "/Eventos" },
        { text: "Acerca De", icon: <InfoIcon />, to: "/Acerca De" },
        { text: "Entrar", icon: <LoginIcon />, to: "/auth" }
    ];

    const list = () => (
        <Box
            sx={{ width: 250 }}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
        >
            {listItems.map((item, index) => (
                <React.Fragment key={item.text}>
                    <List>
                        <ListItem disablePadding>
                            <ListItemButton
                                component={Link}
                                to={item.to}
                                onClick={item.isLogout ? handleLogoutClick : undefined}
                            >
                                <ListItemIcon>
                                    {item.icon}
                                </ListItemIcon>
                                <ListItemText primary={item.text} sx={item.isLogout ? { color: "error.main" } : {}} />
                            </ListItemButton>
                        </ListItem>
                    </List>
                    {index === 3 && <Divider />}
                    {index === 7 && <Divider />}
                </React.Fragment>
            ))}
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
                            Parchando
                        </Typography>
                    </Link>

                    <Box sx={{display: {xs: 'flex', md: 'none'}}}>
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
                    <Box sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}, justifyContent: 'center'}}>
                        <Link to="/">
                            <Typography
                                variant="h5"
                                noWrap
                                className="logo"
                                sx={{
                                    color: 'inherit',
                                    textDecoration: 'none',
                                }}
                            >
                                Parchando
                            </Typography>
                        </Link>
                    </Box>
                    <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex', justifyContent: 'center'}}}>
                        {pages.map((page) => (
                            <Link to={page === "Inicio" ? "/" : `/${page}`} key={page} onClick={() => handleItemClick(page)}>
                                <Button
                                    className={`${activeItem === page ? "active" : ""}`}
                                    sx={{my: 2, color: 'white', display: 'block'}}
                                >
                                    {page}
                                </Button>
                            </Link>
                        ))}
                    </Box>
                    <Box sx={{flexGrow: 0}}>
                        {userData.nombre !== '' ? (
                            <Box>
                                <IconButton size="large" aria-label="show 4 new mails" color="inherit" to={"/Mensajes"}
                                            component={Link}>
                                    <Badge color="secondary" variant="dot" invisible={true}>
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
                                        alt={userData.nombre}
                                        src={userData.fotos}
                                    >
                                        {userData.nombre.charAt(0)}
                                    </Avatar>
                                </IconButton>
                            </Box>
                        ) : (
                            <Button to={"/auth"} component={Link} variant="contained" className={"login"}>
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