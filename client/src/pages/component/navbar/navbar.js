import React, { useState } from "react";
import "./navbar.css";
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { ImCross } from "react-icons/im";

const Navbar = () => {
	const [Mobile, setMobile] = useState(false);
	return (
		<>
			<nav className="navbar">
				<h3 className="logo">Logo</h3>

				<ul
					className={Mobile ? "nav-links-mobile" : "nav-links"}
					onClick={() => setMobile(false)}
				>
					<Link to="/" className="home">
						<li>Home</li>
					</Link>
					<Link to="/about" className="about">
						<li>Donate</li>
					</Link>
					<Link to="/services" className="services">
						<li>Requests</li>
					</Link>
					<Link to="/skills" className="skills">
						<li>Meet the team</li>
					</Link>
				</ul>

				<button className="mobile-menu-icon" onClick={() => setMobile(!Mobile)}>
					{Mobile ? <ImCross /> : <FaBars />}
				</button>
			</nav>
		</>
	);
};
export default Navbar;
