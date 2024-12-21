import * as React from "react";
import Button from "@mui/material/Button";
import {useState} from "react"
import {
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


const Amigos = () => {
    const [users] = useState([
        {
            name: 'Daniel Alejandro Varón Rojas',
            description: 'Descripción para usuario nuevo Describiendo sus pasatiempos.',
            city: 'Bogotá',
            interests: ["Restaurantes", "Motociclismo", "Senderismo"],
            amigo: true
        },
        {
            name: 'Pepito Perez',
            description: 'Descripción para usuario nuevo Describiendo sus pasatiempos.',
            city: 'Bogotá',
            interests: ["Restaurantes", "Motociclismo", "Senderismo"],
            amigo: true
        },
        {
            name: 'Donatelo Angelo',
            description: 'Descripción para usuario nuevo Describiendo sus pasatiempos.',
            city: 'Bogotá',
            interests: ["Restaurantes", "Motociclismo", "Senderismo"],
            amigo: false
        }
    ]);
    const {userData} = useUserContext();

    const currentUserInterest = userData.interests;


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
        if (selectedUser) {
            console.log("Amigo eliminado:", selectedUser.name);
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
        }
    };

    const handleClickOpenDelete = () => {
        setDeleteOpen(true);
    };

    function handleCloseDelete() {
        setDeleteOpen(false);
    }

    return (
        <Stack direction="row" spacing={2}
               sx={{justifyContent: "center", marginTop: '15px', marginLeft: '15px', flexWrap: 'wrap'}} useFlexGap>
            {users.map((user) => (
                <UserCard
                      key={user.name}
                      user={user}
                      currentUserInterest={currentUserInterest}
                      handleClick={handleClick}
                      anchorEl={anchorEl}
                      handleClose={handleClose}
                      handleClickOpenDelete={handleClickOpenDelete}

                />
            ))}
            <Dialog
                fullScreen={fullScreen}
                open={deleteOpen}
                onClose={handleCloseDelete}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">
                    {`Eliminar a ${selectedUser ? selectedUser.name : null} de tu lista de amigos`}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        ¿Confirmas que quieres eliminar a {selectedUser ? selectedUser.name : null} de tu lista de
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
    );
}

export default Amigos;