import  "./Navbar.css";
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Link, NavLink } from 'react-router-dom';



const Navbar = () => {
	const handleLogout = () => {
		localStorage.removeItem("token");
		window.location.reload();
	};


	return (
		<nav className="navbar navbar-expand-lg   fixed-top">
			<div className="container">
				<Link className="navbar-brand" to="/user/">Sous Titre</Link>
				<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
					<div className="navbar-nav">
							<React.Fragment>
								<NavLink className="nav-item nav-link" to="/user/" exact="true">Home</NavLink>
								<NavLink className="nav-item nav-link" to="/user/upload/">Upload</NavLink>
								<NavLink className="nav-item nav-link" to="/user/videos/">Videos</NavLink>
								<NavLink className="nav-item nav-link" to="/user/signOut" onClick={handleLogout}>Sign Out</NavLink>
							</React.Fragment>

					</div>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
