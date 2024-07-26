import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { RegisterLogin } from "../component/registerLogin.jsx";
import { Link, useNavigate } from "react-router-dom";

export const Home = () => {
	const { store, actions } = useContext(Context);
	const navigate = useNavigate()

	const handleLogout = () => {
		actions.logout()
		navigate('/')
	}

	return (
		<div className="text-center mt-5">
			<RegisterLogin />

			{store.token || localStorage.getItem('token') ? 

			<>
				<p>Se inció sesión</p>
				<Link to={'/demo'}>Ir a demo</Link>
				o
				<button onClick={handleLogout}>Log Out</button>
				</>
				:
				''
			}

		</div>
	);
};
