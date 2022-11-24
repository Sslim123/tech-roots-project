import React, { useEffect, useState } from "react";
import svg from "./logo block.svg";
import "./navbar.css";

import { Link } from "react-router-dom";

function Navbar(props) {
	/*I am using props to change the color of the navbar when the user vists a different page page*/

	return (
		<header className="header">
			<img src={svg} alt="logo" />
			<nav className="navbar navbar-light  justify-content-centre">
				<button id={props.isActive === "homePage" ? "active" : undefined}>
					<Link className="link1" to="/">
						Home page
					</Link>
				</button>
				<button id={props.isActive === "meetTheTeam" ? "active" : undefined}>
					<Link className="link1" to="/meet-team-request">
						Meet the Team
					</Link>
				</button>
				<button id={props.isActive === "donationPage" ? "active" : undefined}>
					<Link className="link1" to="/create-donator-requests">
						Donate
					</Link>
				</button>

				<button id={props.isActive === "requestPage" ? "active" : undefined}>
					<Link className="link1" to="/create-laptop-requests">
						Request
					</Link>
				</button>

				<button id={props.isActive === "contactUs" ? "contactUs" : undefined}>
					<Link className="link1" to="/meet-team-request">
						Contact us
					</Link>
				</button>
			</nav>
		</header>
	);
}

export default Navbar;
