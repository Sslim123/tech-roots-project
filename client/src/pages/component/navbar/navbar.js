import React, { useEffect, useState } from "react";
import svg from "./logo block.svg";
import "./navbar.css";

import { Link } from "react-router-dom";

function Navbar(props) {
	return (
		<header className="header">
			<img src={svg} />
			<nav className="navbar navbar-light  justify-content-centre">
				<button id={props.isActive === "homePage" && "active"}>
					<Link className="link1" to="/">
						Home page
					</Link>
				</button>
				<button id={props.isActive === "meetTheTeam" && "active"}>
					<Link className="link1" to="/meet-team-request">
						Meet the Team
					</Link>
				</button>
				<button id={props.isActive === "donationPage" && "active"}>
					<Link className="link1" to="/create-donator-requests">
						Donate
					</Link>
				</button>

				<button id={props.isActive === "requestPage" && "active"}>
					<Link className="link1" to="/create-laptop-requests">
						Request
					</Link>
				</button>

				<button id={props.isActive === "contactUs" && "contactUs"}>
					<Link className="link1" to="/meet-team-request">
						Contact us
					</Link>
				</button>
			</nav>
		</header>
	);
}

export default Navbar;
