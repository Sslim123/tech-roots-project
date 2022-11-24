import React from "react";
import svg from "./logo block.svg";
import { AiOutlineBars } from "react-icons/ai";
import "./navbar.css";

import { Link } from "react-router-dom";

function Navbar() {
	return (
		<header className="header">
			<img src={svg} />
			<nav className="navbar navbar-light  justify-content-centre">
				<button className="nav-btn" id="Page-home-bt">
					<Link className="link1" to="/">
						Home Page
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
						Donate
					</Link>
				</button>

				<button className="nav-btn" id="Register-home-bt">
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
