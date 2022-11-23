import React from "react";
import svg from "./logo block.svg";
import "./navbar.css";

import { Link } from "react-router-dom";

function Navbar() {
	return (
		<header className="header">
			<img src={svg} />
			<nav className="navbar navbar-light  justify-content-centre">
				<button id="Page-home-bt">
					<Link className="link1" to="/">
						Home Page
					</Link>
				</button>
				<button id="Meet-home-bt">
					<Link className="link1" to="/meet-the-team">
						Meet the Team
					</Link>
				</button>
				<button id="Donate-home-bt">
					<Link
						className="link1"
						to="/create-donator-requests
"
					>
						Donate
					</Link>
				</button>

				<button id="Register-home-bt">
					<Link className="link1" to="/create-laptop-requests">
						Request
					</Link>
				</button>
			</nav>
		</header>
	);
}

export default Navbar;
