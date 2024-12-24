import React, {useEffect, useState} from 'react';
import './Form.css';
import { MdChevronRight } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import {Bounce, toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {useUserContext} from "../../Context/UserContext";

const RegistroCiudad = () => {

    const { userData, setUserData } = useUserContext();
    const [showForm, setShowForm] = useState(false);
    const [selectedCity, setSelectedCity] = useState(null);

    useEffect(() => {
        setTimeout(() => {
            setShowForm(true);
        },100);
    }, []);

    const navigate = useNavigate();
    const handleButtonClick = () => {
        if (selectedCity==null) {
            toast.error('Debes seleccionar una ciudad', {
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
            setUserData({ ...userData, ciudad: selectedCity });
            navigate('/auth/registro-intereses');
        }
    };

    const ciudades = [
        "Bogotá", "Medellín", "Cartagena", "Santa Marta", "Villavicencio",
        "San Gil", "Barranquilla", "Tunja", "Manizales", "Pereira",
        "Neiva", "Armenia", "Cali", "Ibague", "Bucaramanga", "Valledupar"
    ];

    const handleCitySelect = (ciudad) => {
        setSelectedCity(ciudad);
    };

    return (
        <div className={`form-container ${showForm ? 'show' : ''}`}>
            <div className="form-question">
                <h2>¿De qué ciudad eres?</h2>
            </div>
            <div className="city-grid">
                {ciudades.map((ciudad, index) => (
                    <button
                        key={index}
                        className={`city-button ${selectedCity === ciudad ? 'selected' : ''}`}
                        onClick={() => handleCitySelect(ciudad)}
                    >{ciudad}</button>
                ))}
            </div>
            <MdChevronRight className="arrow" onClick={handleButtonClick}/>

        </div>
    );
};

export default RegistroCiudad;