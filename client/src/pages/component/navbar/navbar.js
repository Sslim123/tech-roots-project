import React, { useState } from "react";
import "./navbar.css";
import { NavLink, Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import svg from "./logo block.svg";

const Navbar = (props) => {
	const [Mobile, setMobile] = useState(false);
	return (
		<>
			<nav className="navbar">
				<img className="logo" src={svg} alt="logo" />

				<ul
					className={Mobile ? "nav-links-mobile" : "nav-links"}
					onClick={() => setMobile(false)}
				>
					<NavLink
						exact
						to="/"
						className="home"
						activeClassName={
							props.isActive === "homePage" ? "active" : undefined
						}
					>
						<li>Home</li>
					</NavLink>
					<NavLink
						to="/create-donator-requests"
						className="about"
						activeClassName="active-nav-links"
					>
						<li>Donate</li>
					</NavLink>
					<NavLink
						to="/create-laptop-requests"
						className="services"
						activeClassName="active-nav-links"
					>
						<li>Requests</li>
					</NavLink>
					<NavLink
						to="/meat-the-team"
						className="skills"
						activeClassName="active-nav-links"
					>
						<li>Meet the team</li>
					</NavLink>
				</ul>

				<button className="mobile-menu-icon" onClick={() => setMobile(!Mobile)}>
					{Mobile ? <ImCross /> : <FaBars />}
				</button>
			</nav>
		</>
	);
};
export default Navbar;
