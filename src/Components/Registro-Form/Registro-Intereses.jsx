import React, {useEffect, useState} from 'react';
import './Form.css';
import {MdChevronRight} from "react-icons/md";
import {useNavigate} from 'react-router-dom';
import {Bounce, toast} from "react-toastify";
import {useUserContext} from "../../Context/UserContext";
import {postLogin, postUser} from "../../Api/UsuariosApi";

const RegistroIntereses = () => {

    const {userData, setUserData, setToken} = useUserContext();
    const [showForm, setShowForm] = useState(false);
    const [selectedInterest, setSelectedInterest] = useState([]);

    useEffect(() => {
        setTimeout(() => {
            setShowForm(true);
        }, 100);
    }, []);

    const navigate = useNavigate();
    const handleButtonClick = async () => {
        if (selectedInterest.length < 1) {
            toast.error('Debes seleccionar almenos 1 intereses', {
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
        } else {
            const formattedInterests = selectedInterest.map(interest => `'${interest}'`).join(',');
            const userDataToPost = {
                nombre: userData.nombre,
                correo: userData.correo,
                fechaNacimiento: userData.fechaNacimiento,
                telefono: userData.telefono,
                contrasena: userData.contrasena,
                descripcion: userData.descripcion,
                ciudad: userData.ciudad,
                intereses: formattedInterests,
                fotos: ''
            };

            try {
                const response = await postUser(userDataToPost);
                if (response.intereses) {
                    response.intereses = response.intereses.replace(/'/g, "").split(",").map(interest => interest.trim());
                }
                setUserData(response);
                const token = await postLogin(userDataToPost.correo, userDataToPost.contrasena);
                setToken(token.token);
                navigate('/');
            } catch (error) {
                toast.error('Error al registrar el usuario: ' + error.message, {
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
        }
    };

    const intereses = [
        "Viajar", "Musica", "Bicicleta", "Cine", "Museos",
        "Restaurantes", "Parques", "Senderismo", "Motociclismo", "Pintar",
        "Leer", "Deportes", "Gatos", "Perros", "Bailar", "Vitrinear"
    ];

    const handleInterestSelect = (interes) => {
        if (selectedInterest.includes(interes)) {
            setSelectedInterest(selectedInterest.filter((i) => i !== interes));
        } else if (selectedInterest.length < 3) {
            setSelectedInterest([...selectedInterest, interes]);
        } else {
            toast.warn('Solo puedes seleccionar 3 intereses', {
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

    return (
        <div className={`form-container ${showForm ? 'show' : ''}`}>
            <div className="form-question">
                <h2>Selecciona tus 3 intereses favoritos</h2>
            </div>
            <div className="city-grid">
                {intereses.map((interes, index) => (
                    <button
                        key={index}
                        className={`city-button ${selectedInterest.includes(interes) ? 'selected' : ''}`}
                        onClick={() => handleInterestSelect(interes)}
                    >{interes}</button>
                ))}
            </div>
            <MdChevronRight className="arrow" onClick={handleButtonClick}/>
        </div>
    );
};

export default RegistroIntereses;