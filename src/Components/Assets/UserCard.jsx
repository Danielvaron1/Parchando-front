import React, {useState} from 'react';
import Avatar from "@mui/material/Avatar";
import {deepPurple} from "@mui/material/colors";
import Button from "@mui/material/Button";
import {
    Chip,
    Card,
    CardHeader,
    CardContent,
    CardActions,
    Stack,
    ListItemIcon,
} from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import ChatIcon from '@mui/icons-material/Chat';
import {Link} from 'react-router-dom';
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

const UserCard = ({user, currentUserInterest, handleClick, anchorEl, handleClose, handleClickOpenDelete}) => {


    return (
        <Card sx={{maxWidth: 345}}>
            <CardHeader
                avatar={
                    <Avatar alt={user.name} sx={{bgcolor: deepPurple[400]}} aria-label="recipe"
                            src="https://raw.githubusercontent.com/mdn/learning-area/master/html/multimedia-and-embedding/images-in-html/dinosaur_small.jp">
                        {user.name.charAt(0).toUpperCase()}
                    </Avatar>
                }
                action={
                    user.amigo ? (
                        <IconButton aria-label="settings" onClick={(event) => handleClick(event, user)}>
                            <MoreVertIcon/>
                        </IconButton>
                    ) : null
                }
                title={user.name}
                subheader={user.city}
                sx={{paddingBottom: 0}}
            />
            <CardContent sx={{paddingTop: 1, paddingBottom: 1}}>
                <Stack direction="row" spacing={1}>
                    {user.interests.map((interest) => {
                        const isInterestMatched = currentUserInterest.includes(interest);
                        return (
                            <Chip
                                key={interest}
                                label={interest}
                                size="small"
                                sx={{
                                    bgcolor: isInterestMatched ? deepPurple[400] : "default",
                                    color: isInterestMatched ? "white" : "inherit"
                                }}
                            />
                        );
                    })}
                </Stack>
            </CardContent>
            <CardActions>
                <Stack direction="row" sx={{
                    justifyContent: "space-between",
                    alignItems: "center",
                }}>
                    <Link to={`/Perfil?name=${user.name}`} style={{textDecoration: 'none'}}>
                        <Button
                            sx={{marginLeft: 2}}
                            component="label"
                            role={undefined}
                            variant="contained"
                            tabIndex={-1}
                            startIcon={<PersonIcon/>}
                        >
                            Ver Perfil
                        </Button>
                    </Link>
                    {
                        user.amigo ? (
                                <Button
                                    sx={{marginLeft: 2}}
                                    component="label"
                                    role={undefined}
                                    variant="contained"
                                    tabIndex={-1}
                                    startIcon={<ChatIcon/>}
                                >
                                    Mensaje
                                </Button>
                            ) :
                            <Button
                                sx={{marginLeft: 2}}
                                component="label"
                                role={undefined}
                                variant="contained"
                                tabIndex={-1}
                                startIcon={<PersonAddIcon/>}
                            >
                                Añadir
                            </Button>
                    }
                </Stack>
            </CardActions>
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: 'right',
                }}
            >
                <MenuItem onClick={handleClickOpenDelete}>
                    <ListItemIcon>
                        <PersonRemoveIcon fontSize="small"/>
                    </ListItemIcon>
                    Eliminar amigo
                </MenuItem>
            </Menu>
        </Card>
    );
};

export default UserCard;