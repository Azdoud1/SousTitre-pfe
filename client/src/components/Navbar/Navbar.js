import "./Navbar.css";
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, NavLink } from 'react-router-dom';
import { BsPersonCircle } from 'react-icons/bs';
import axios from 'axios';
import customIcon from '../../image/design-removebg-preview.png';

const Navbar = () => {
	const handleSignOut = () => {
		// send a sign-out request to the backend API
		axios.post('http://localhost:3000/api/signOut')
			.then(response => {
				console.log(response)
				window.location.href = '/';
			})
			.catch(error => {
				console.log(error);
			});
	};

	return (
		<nav className="navbar navbar-expand-lg ">
			<img src={customIcon} style={{ width: '45px', height: '40px', transform: 'scale(2)', marginLeft: '145px' }} />
			<div className="container">
				<Link className="navbar-brand text-black" to="/user/upload"><b>SUBTITLE</b></Link>
				<button
					className="navbar-toggler"
					type="button"
					data-toggle="collapse"
					data-target="#navbarNav"
					aria-controls="navbarNav"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse justify-content-end" id="navbarNav">
					<ul className="navbar-nav">
						<li className="nav-item">
							<NavLink className="nav-link text-black" to="/user/upload"><b>Upload</b></NavLink>
						</li>
						<li className="nav-item">
							<NavLink className="nav-link text-black" to="/user/videos"><b>Videos</b></NavLink>
						</li>
						<li className="nav-item">
							<NavLink className="nav-link text-black" to="/" onClick={handleSignOut}><b>Sign-Out</b></NavLink>
						</li>
						<li className="nav-item">
							<NavLink className="nav-link" to="/user/update">
								<BsPersonCircle className="mr-5 icon" />
							</NavLink>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
