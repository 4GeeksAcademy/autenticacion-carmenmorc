import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";

export const RegisterLogin = () => {
    const { store, actions } = useContext(Context);

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const [login, setLogin] = useState(true);

    const handleChange = e => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = e => {
        e.preventDefault();
        console.log("Submitting formData:", formData); // Añadir log para depuración

        if (login) {
            actions.login(formData);
        } else {
            actions.register(formData);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="email" onChange={handleChange} placeholder="E-Mail" value={formData.email} />
            <input type="password" name="password" onChange={handleChange} placeholder="Contraseña" value={formData.password} />
            <input type="submit" value={login ? 'Inicia Sesión' : 'Regístrate'} />
            <p>
                ¿Ya tienes una cuenta? <span onClick={() => setLogin(!login)}>Inicia Sesión</span>
            </p>
        </form>
    );
};
