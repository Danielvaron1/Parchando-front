import * as React from "react";
import Button from "@mui/material/Button";
import {useEffect, useState} from "react"
import {
    ButtonGroup,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Stack, useMediaQuery, useTheme
} from "@mui/material";
import {useUserContext} from "../../Context/UserContext";
import {Bounce, toast} from "react-toastify";
import UserCard from "../Assets/UserCard";
import {getUserAmigos, deleteAmigos} from "../../Api/UsuariosApi";
import Typography from "@mui/material/Typography";

const Amigos = () => {
    const {userData, token} = useUserContext();
    const [users, setUsers] = useState([]);
    const [filter, setFilter] = useState("aceptado");
    /*Amigo "aceptado" "pendiente" "solicitud" ""*/

    useEffect(() => {
        const fetchUserAmigos = async () => {
            try {
                const amigos = await getUserAmigos({usuarioId: userData.id, estado: filter}, token);
                const mappedUsers = amigos.map(amigo => ({
                    id: amigo.usuario2.id,
                    nombre: amigo.usuario2.nombre,
                    descripcion: amigo.usuario2.descripcion,
                    ciudad: amigo.usuario2.ciudad,
                    intereses: amigo.usuario2.intereses,
                    amigo: amigo.estado
                }));
                setUsers(mappedUsers);
            } catch (error) {
                console.log("Error al obtener amigos:", error.message);
            }
        };

        fetchUserAmigos();
    }, [filter]);

    const currentUserInterest = userData.intereses;

    const handleFilterChange = (newFilter) => {
        setFilter(newFilter);
    };

    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedUser, setSelectedUser] = useState(null);
    const [deleteOpen, setDeleteOpen] = React.useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const handleClick = (event, user) => {
        setAnchorEl(event.currentTarget);
        setSelectedUser(user);
    };

    const handleClose = () => {
        setAnchorEl(null);
        setSelectedUser(null);
    };

    const handleDeleteFriend = () => {
        handleClose();
        handleCloseDelete();
        deleteAmigos(userData.id, selectedUser.id, token).then(() => {
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
        })
    };

    const handleClickOpenDelete = () => {
        setDeleteOpen(true);
    };

    function handleCloseDelete() {
        setDeleteOpen(false);
    }

    return (
        <Stack>
            <Stack sx={{justifyContent: "center", alignItems: "center", marginTop: 1}}>
                <ButtonGroup>
                    <Button onClick={() => handleFilterChange("aceptado")}>Amigos</Button>
                    <Button onClick={() => handleFilterChange("solicitud")}>Solicitudes</Button>
                    <Button onClick={() => handleFilterChange("pendiente")}>Enviados</Button>
                </ButtonGroup>
            </Stack>
            <Stack direction="row" spacing={2}
                   sx={{justifyContent: "center", marginTop: '15px', marginLeft: '15px', flexWrap: 'wrap'}} useFlexGap>

                {users.length > 0 ? (
                    users.map((user) => (
                        <UserCard
                            key={user.id}
                            user={user}
                            currentUserInterest={currentUserInterest}
                            handleClick={handleClick}
                            anchorEl={anchorEl}
                            handleClose={handleClose}
                            handleClickOpenDelete={handleClickOpenDelete}
                        />
                    ))
                ) : (
                    <Typography color={"textPrimary"}>
                        {filter === "aceptado" ? "No tienes amigos en tu lista." :
                            filter === "solicitud" ? "No tienes solicitudes de amistad." :
                                filter === "pendiente" ? "No tienes solicitudes pendientes." :
                                    null}
                    </Typography>
                )}
                <Dialog
                    fullScreen={fullScreen}
                    open={deleteOpen}
                    onClose={handleCloseDelete}
                    aria-labelledby="responsive-dialog-title"
                >
                    <DialogTitle id="responsive-dialog-title">
                        {`Eliminar a ${selectedUser ? selectedUser.nombre : null} de tu lista de amigos`}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            ¿Confirmas que quieres eliminar a {selectedUser ? selectedUser.nombre : null} de tu lista de
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
        </Stack>
    );
}

export default Amigos;