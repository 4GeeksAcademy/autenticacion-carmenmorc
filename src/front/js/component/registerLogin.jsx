import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";

export const RegisterLogin = () => {

    const [store, actions] = useContext(Context);

    const [formData, setFormData] = useState({
        email: '',
        password:''
    })

    const [login, setLogin] = useState(true)

    const handleChange = e => {
        const [name, value] = e.target
        setFormData({...formData, [name]: value})
    }
    
    const handleSubmit = e => {
        e.preventDefault();
        if (login) actions.login(formData)
        actions.register(formData)
    }
    
    return (
        <form onSubmit={handleSubmit}>

            <input type="text" name="E-Mail" onChange={handleChange}/>
            <input type="password" name="Password" onChange={{handleChange}}/>
            <input type="submit" value={`${login? 'Login' : 'Sign Up'}`}/>

            <p>¿Ya tienes una cuenta? <span onClick={()=>setLogin(!login)}>Inicia Sesión</span></p>
            {login? 'login' : 'register'}

        </form>
    )
}