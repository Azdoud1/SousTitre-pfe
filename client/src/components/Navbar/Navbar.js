
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Link, NavLink } from 'react-router-dom';
import { BsPersonCircle} from 'react-icons/bs';
import { FaVideo} from 'react-icons/fa';
import axios from 'axios';


const Navbar = () => {

		const handleSignOut = () => {
			axios.post('http://localhost:3000/api/signout')
				.then(response => {
					// Supprimer le token d'accès du stockage local et rediriger vers la page de connexion
					localStorage.removeItem('JWTPRIVATEKEY');
					window.location.href = '/login';
				})
				.catch(error => {
					console.log(error);
				});
		}



	return (
		<nav className="navbar navbar-expand-lg   fixed-top">
			<div className="container">
				<Link className="navbar-brand" to="/user/"> <FaVideo className="icon1 " /> Sous Titre</Link>
				<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
					<div className="navbar-nav">
						<React.Fragment>
							<NavLink className="nav-item nav-link " to="/user/" exact="true">Home</NavLink>
							<NavLink className="nav-item nav-link" to="/user/upload/">Upload</NavLink>
							<NavLink className="nav-item nav-link" to="/user/videos/">Videos</NavLink>
							<NavLink className="nav-item nav-link" to="/" onClick={handleSignOut}>Sign Out</NavLink>
							<li className="nav-item">
								<NavLink className="nav-link" to="/user/update/" activeClassName="active">
									<BsPersonCircle className="mr-5 icon" />
								</NavLink>
							</li>
						</React.Fragment>
					</div>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;