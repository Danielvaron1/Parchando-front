import React, { useEffect, useState} from 'react';
import './Form.css';
import { Button, Link} from "@nextui-org/react";
import Password from "../Assets/Password";
import InputForm from "../Assets/InputForm";

const Form = () => {

    const [email, setEmail] = useState('');
    const [isInvalid, setIsInvalid] = useState(false);
    const [password, setPassword] = useState('');
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setShowForm(true);
        }, 1000);
    }, []);

    const handleButtonClick = () => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(email)) {
            setIsInvalid(true);
        } else {
            setIsInvalid(false);
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
                <Button className="boton" size="lg" color="secondary" onClick={handleButtonClick}>
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