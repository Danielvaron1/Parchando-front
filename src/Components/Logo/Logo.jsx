import React, { useState, useEffect } from 'react';
import './Logo.css';

const Logo = () => {
    const [animate, setAnimate] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setAnimate(true);
        }, 1000);
    }, []);

    return (
        <header className={`App-header ${animate ? 'animate' : ''}`}>
            <p className={`comforter-brush-regular`}>
                Parchando
            </p>
            <p>
                ¡La vida es demasiado corta para no disfrutarla al máximo!
            </p>
        </header>
    );
};

export default Logo;