import Avatar from "@mui/material/Avatar";
import {deepPurple} from "@mui/material/colors";
import IconButton from "@mui/material/IconButton";
import * as React from "react";
import Typography from "@mui/material/Typography";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import Button from "@mui/material/Button";
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import {useState} from "react";
import ChatIcon from '@mui/icons-material/Chat';
import {
    Chip, Dialog, DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Divider,
    Stack,
    useMediaQuery,
    useTheme
} from "@mui/material";
import {useUserContext} from "../../Context/UserContext";
import {Bounce, toast} from "react-toastify";
import {useLocation} from "react-router-dom";


const PerfilUsuario = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const userName = queryParams.get("name");

    const [user,setUser] = useState({
        name: userName || 'Daniel Alejandro Varón Rojas',
        description: 'Descripción para usuario nuevo Describiendo sus pasatiempos.',
        city: 'Bogotá',
        interests: ["Restaurantes", "Motociclismo", "Senderismo"],
        amigo: true
    });
    const {userData} = useUserContext();

    const currentUserInterest = userData.interests;

    const info = (
        <Stack>
            <Typography color={"textPrimary"} variant="overline">
                {user.city}
            </Typography>
            <Typography color={"textPrimary"} variant="caption" sx={{fontWeight: 'bold'}}>
                Sobre mi
            </Typography>
            <Typography color={"textPrimary"} variant="body2">
                {user.description}
            </Typography>
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
        </Stack>
    );

    const [deleteOpen, setDeleteOpen] = React.useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const handleDeleteFriend = () => {
        handleCloseDelete();
        setUser({...user, amigo:false});
        toast.success('Amigo eliminado', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce
        });
    };

    const handleClickOpenDelete = () => {
        setDeleteOpen(true);
    };

    function handleCloseDelete() {
        setDeleteOpen(false);
    }

    return (
        <Stack>
            <Stack direction={{sm: "row"}} sx={{
                justifyContent: "center",
                alignItems: "center",
            }}>
                <IconButton
                    edge="end"
                    aria-label="account of current user"
                    aria-haspopup="true"
                    color="inherit"
                >
                    <Avatar
                        sx={{width: {xs: 100, md: 150}, height: {xs: 100, md: 150}, bgcolor: deepPurple[400]}}
                        alt={user.name}
                        src="https://raw.githubusercontent.com/mdn/learning-area/master/html/multimedia-and-embedding/images-in-html/dinosaur_small.jpg"
                    >
                        <Typography sx={{
                            fontSize: {xs: '2rem', md: '3rem'}
                        }}>
                            A
                            {/*{userData.name.charAt(0).toUpperCase()}*/}
                        </Typography>
                    </Avatar>
                </IconButton>
                <Stack sx={{marginLeft: 2, marginTop: {xs: 1, md: 0}}}>
                    <Stack direction={{sm: "row"}} spacing={6} sx={{
                        minWidth: {xs: 200, sm: 500},
                        maxWidth: {xs: 350, sm: 700},
                        justifyContent: "space-between"
                    }}>
                        <Stack>
                            <Typography color={"textPrimary"} sx={{
                                fontSize: {xs: '1.5rem', md: '2rem'},
                            }}>
                                {user.name}
                            </Typography>
                        </Stack>

                        {user.amigo ? (
                            <Stack direction="row" sx={{
                                justifyContent: "center",
                                alignItems: "center",
                            }}>
                                <Button
                                    variant="contained"
                                    color="error"
                                    onClick={handleClickOpenDelete}
                                >
                                    <PersonRemoveIcon/>
                                </Button>
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
                            </Stack>
                        ) : (
                            <Stack sx={{
                                justifyContent: "center",
                                alignItems: "center",
                            }}>
                                <Button
                                    sx={{marginLeft: 2, marginRight: {xs: 2, md: 0}}}
                                    component="label"
                                    role={undefined}
                                    variant="contained"
                                    startIcon={<PersonAddIcon/>}
                                >
                                    Añadir
                                </Button>
                            </Stack>
                        )}


                    </Stack>
                    <Stack sx={{display: {xs: 'none', sm: 'block'}}}>
                        {info}
                    </Stack>
                </Stack>
                <Stack sx={{display: {xs: 'block', sm: 'none'}, marginLeft: 1, marginRight: 1}}>
                    {info}
                </Stack>
                <Dialog
                    fullScreen={fullScreen}
                    open={deleteOpen}
                    onClose={handleCloseDelete}
                    aria-labelledby="responsive-dialog-title"
                >
                    <DialogTitle id="responsive-dialog-title">
                        {`Eliminar a ${user.name} de tu lista de amigos`}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            ¿Confirmas que quieres eliminar a {user.name} de tu lista de
                            amigos?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button autoFocus onClick={handleCloseDelete}>
                            Cancelar
                        </Button>
                        <Button onClick={handleDeleteFriend} autoFocus>
                            Confirmar
                        </Button>
                    </DialogActions>
                </Dialog>
            </Stack>

            <Divider variant="middle" sx={{marginTop: 1}}/>

            <Stack sx={{
                justifyContent: "center",
                alignItems: "center",
            }}>
                <Typography color={"textPrimary"} variant={"h6"}>
                    Este usuario no ha creado eventos
                </Typography>
            </Stack>
        </Stack>
    );
}

export default PerfilUsuario;