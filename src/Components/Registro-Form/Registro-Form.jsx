import React, {useEffect, useState} from 'react';
import './Form.css';
import {Textarea} from "@nextui-org/react";
import { MdChevronRight } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import InputForm from "../Assets/InputForm";
import Password from "../Assets/Password";
import {Bounce, toast} from "react-toastify";
import {useUserContext} from "../../Context/UserContext";

const RegistroForm = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [date, setDate] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confPass, setConfPass] = useState('');
    const [descr, setDescr] = useState('');
    const { userData, setUserData } = useUserContext();

    const [errors, setErrors] = useState({
        name: '',
        email: '',
        date: '',
        phone: '',
        password: '',
        description: ''
    });

    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setShowForm(true);
        }, 1000);
    }, []);

    const [nameIsInvalid, setNameIsInvalid] = useState(false);
    const [emailIsInvalid, setEmailIsInvalid] = useState(false);
    const [dateIsInvalid, setDateIsInvalid] = useState(false);
    const [phoneIsInvalid, setPhoneIsInvalid] = useState(false);
    const [passIsInvalid, setPassIsInvalid] = useState(false);
    const [confPIsInvalid, setConfPIsInvalid] = useState(false);
    const [descrIsInvalid, setDescrIsInvalid] = useState(false);
    const validateForm = () => {
        setNameIsInvalid(false);
        setEmailIsInvalid(false);
        setDateIsInvalid(false);
        setPhoneIsInvalid(false);
        setPassIsInvalid(false);
        setConfPIsInvalid(false);
        setDescrIsInvalid(false);

        const errors = {
            name: '',
            email: '',
            date: '',
            phone: '',
            password: '',
            description: ''
        };

        if (name.trim() === '') {
            errors.name = 'El nombre no puede estar vacío';
            setNameIsInvalid(true);
        }

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(email)) {
            setEmailIsInvalid(true);
            errors.email = 'El correo electrónico no es válido';
        }

        const dateOfBirth = new Date(date);
        const today = new Date();
        const age = parseInt((today - dateOfBirth)/365/24/60/60/1000)
        if (age < 18) {
            errors.date = 'Debes tener al menos 18 años';
            setDateIsInvalid(true);
        } else if(date===''){
            errors.date = 'Debes introducir tu fecha de nacimiento';
            setDateIsInvalid(true);
        }
        const phoneRegex = /^[0-9]{10}$/;
        if (!phoneRegex.test(phone)) {
            errors.phone = 'El número de teléfono debe tener 10 dígitos';
            setPhoneIsInvalid(true);
        }

        if (password !== confPass) {
            errors.password = 'Las contraseñas no coinciden';
            setPassIsInvalid(true);
            setConfPIsInvalid(true);
        }

        if (descr.trim() === '') {
            errors.description = 'La descripción no puede estar vacía';
            setDescrIsInvalid(true);
        }
        setErrors(errors);
        let isValid=true;

        if (Object.values(errors).some((error) => error !== '')) {
            isValid=false;
            toast.error('Registro invalido', {
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
            return { isValid , errors };
        }

        return { isValid, errors };
    };

    const navigate = useNavigate();
    const handleButtonClick = () => {
        const { isValid } = validateForm();
        if (!isValid) {
        } else {
            setUserData(
                {
                    ...userData,
                    nombre: name,
                    correo: email,
                    fechaNacimiento: date,
                    telefono: phone,
                    contrasena: password,
                    descripcion: descr
                });
            navigate('/auth/registro-ciudad');
        }
    };

    return (
        <div className={`form-container ${showForm ? 'show' : ''}`}>
            <form>
                <section className="layout-registro text-white">
                    <div className="form-input div1">
                        <InputForm label={"Nombre"} isInvalid={nameIsInvalid} value={name} setValue={setName} type={"text"} error={errors.name} />
                    </div>
                    <div className="form-input div2">
                        <InputForm label={"Correo"} isInvalid={emailIsInvalid} value={email} setValue={setEmail} type={"email"} error={errors.email} />
                    </div>
                    <div className="form-input div3">
                        <InputForm label={"Fecha de nacimiento"} isInvalid={dateIsInvalid} value={date} setValue={setDate} type={"date"} error={errors.date} calendar={true}/>
                    </div>
                    <div className="form-input div4">
                        <InputForm label={"Teléfono"} isInvalid={phoneIsInvalid} value={phone} setValue={setPhone} type={"tel"} error={errors.phone} />
                    </div>
                    <div className="form-input div5">
                        <Password label={"Contraseña"} password={password} setPassword={setPassword} isInvalid={passIsInvalid} error={errors.password} />
                    </div>
                    <div className="form-input div6">
                        <Password label={"Confirma tu Contraseña"} password={confPass} setPassword={setConfPass} isInvalid={confPIsInvalid} />
                    </div>
                </section>
                <br/>
                <div className="form-input">
                    <Textarea
                        label="Descripción"
                        variant="bordered"
                        isInvalid={descrIsInvalid}
                        value={descr}
                        placeholder="Cuentanos sobre ti"
                        disableAnimation
                        onChange={(e) => setDescr(e.target.value)}
                        classNames={{
                            label: "text-white/90 form-label",
                            base: "text-white",
                            border: "border-white"
                        }}
                        errorMessage={errors.description}
                    />
                </div>
            </form>
            <MdChevronRight className="arrow" onClick={handleButtonClick}/>
        </div>
    );
};

export default RegistroForm;