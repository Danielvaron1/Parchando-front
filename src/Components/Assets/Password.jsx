import {Player} from "@lordicon/react";
import ICON from "../../Resources/eye.json";
import {Input} from "@nextui-org/react";
import React, {useEffect, useRef, useState} from "react";

/*
    Props:
    label
    password
    setPassword
    isInvalid
    error
 */
const Password = (props) => {

    const [isVisible, setIsVisible] = useState(false);

    //Visibilidad de contraseña
    const toggleVisibility = () => {
        setIsVisible(!isVisible);
        setDirection(direction === 1 ? -1 : 1);
    };

    //animacion password
    const playerRef = useRef(null);
    const [direction, setDirection] = useState(1);
    useEffect(() => {
        playerRef.current?.play();
    }, [direction]);

    return (
        <Input
            label={props.label}
            variant="bordered"
            isInvalid={props.isInvalid}
            value={props.password}
            onChange={(e) => props.setPassword(e.target.value)}
            endContent={
                <button className="focus:outline-none" type="button" onClick={toggleVisibility}
                        aria-label="toggle password visibility">
                    <Player
                        ref={playerRef}
                        icon={ICON}
                        size={26}
                        direction={direction}
                        state="morph-unlocked"
                    />
                </button>
            }
            type={isVisible ? "text" : "password"}
            classNames={{
                label: "text-white/90 form-label",
                input: "focus:ring-0 focus:border-white/90",
                wrapper: "focus-within:ring-0 focus-within:border-white/90",
            }}
            errorMessage={props.error}
        />
    )
}

export default Password;