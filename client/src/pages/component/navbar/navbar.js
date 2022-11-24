import React, { useEffect, useState } from "react";
import svg from "./logo block.svg";
import { AiOutlineBars } from "react-icons/ai";
import "./navbar.css";

import { Link } from "react-router-dom";

function Navbar(props) {
	/*I am using props to change the color of the navbar when the user vists a different page page*/

	return (
		<header className="header">
			<img src={svg} alt="logo" />
			<nav className="navbar navbar-light  justify-content-centre">
				<button className="nav-btn" id="Page-home-bt">
				<button
					className={props.isActive === "homePage" ? "active" : undefined}
				>
					<Link className="link1" to="/">
						Home page
					</Link>
				</button>
				<button className="nav-btn" id="Meet-home-bt">
					<Link className="link1" to="/meet-the-team">
						Meet the Team
					</Link>
				</button>
				<button className="nav-btn" id="Donate-home-bt">
					<Link
						className="link1"
						to="/create-donator-requests
"
					>
				<button
					className={props.isActive === "meetTheTeam" ? "active" : undefined}
				>
					<Link className="link1" to="/meet-team-request">
						Meet the Team
					</Link>
				</button>
				<button
					className={props.isActive === "donationPage" ? "active" : undefined}
				>
					<Link className="link1" to="/create-donator-requests">
						Donate
					</Link>
				</button>

				<button className="nav-btn" id="Register-home-bt">
<button
					className={props.isActive === "requestPage" ? "active" : undefined}
				>
					<Link className="link1" to="/create-laptop-requests">
						Request
					</Link>
				</button>
			</nav>
			<AiOutlineBars className="nav-icon" />
		</header>
	);
}

export default Navbar;
