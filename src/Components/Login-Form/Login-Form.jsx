import React, { useEffect, useState} from 'react';
import './Form.css';
import { Button, Link} from "@nextui-org/react";
import Password from "../Assets/Password";
import InputForm from "../Assets/InputForm";
import {getUsersParams, postLogin} from "../../Api/UsuariosApi";
import {Bounce, toast} from "react-toastify";
import {useUserContext} from "../../Context/UserContext";
import {useNavigate} from "react-router-dom";

const Form = () => {
    const {setUserData,setToken} = useUserContext();
    const [email, setEmail] = useState('');
    const [isInvalid, setIsInvalid] = useState(false);
    const [password, setPassword] = useState('');
    const [showForm, setShowForm] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        setTimeout(() => {
            setShowForm(true);
        }, 1000);
    }, []);

    const handleButtonClick = async () => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(email)) {
            setIsInvalid(true);
        } else {
            try {
                const token = await postLogin(email, password);
                setToken(token.token);
                const user = await getUsersParams({ correo: email }, token.token);
                if (user.intereses) {
                    user.intereses = user.intereses.replace(/'/g, "").split(",").map(interest => interest.trim());
                }
                setUserData(user);
                navigate("/");
            } catch (error) {
                toast.error('Credenciales invalidas', {
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

    return (
        <div className={`form-container ${showForm ? 'show' : ''}`} >
            <form>
                <div
                    className="text-white focus:border-white form-input">
                    <InputForm label={"Correo"} value={email} setValue={setEmail} isInvalid={isInvalid} type={"email"} error={"Por favor ingrese un correo valido"}/>
                    <br/>
                    <Password label={"Contraseña"} password={password} setPassword={setPassword} error={"No es valida su contraseña"} />
                </div>
                <br/>

                <br/>
                <Link href="#" underline="always" color="secondary" className="align-right">¿Has olvidado tu
                    contraseña?</Link>
                <br/>
                <br/>
                <br/>
                <br/>
                <Button className="boton" size="lg" color="secondary" onPress={handleButtonClick}>
                    Conectate
                </Button>
                <br/>
                <br/>
                <p>¿No tienes cuenta? <Link href="/auth/registro" underline="always" color="secondary">Registrate</Link></p>
            </form>
        </div>
    );
};

export default Form;