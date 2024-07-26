import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { RegisterLogin } from "../component/registerLogin.jsx";
import { Link, useNavigate } from "react-router-dom";

export const Home = () => {
	const { store, actions } = useContext(Context);
	const navigate = useNavigate();
	
	const handleLogout = () => {
		actions.logout();
		navigate('/');
	};

	// Check if there is a token in the store or localStorage
	const isLoggedIn = store.token && localStorage.getItem('token');

	return (
		<div className="text-center mt-5">
			<RegisterLogin />
			{isLoggedIn ? (
				<>
					<p>Se inició sesión</p>
					<Link to={'/demo'}>Navega</Link>
					
					<button onClick={handleLogout} className="btn btn-light">Cierra Sesión</button>
				</>
			) : (
				<p>No estás loggeado</p>
			)}
		</div>
	);
};