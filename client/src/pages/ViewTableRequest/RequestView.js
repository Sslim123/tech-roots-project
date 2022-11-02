import React from "react";
import { Link } from "react-router-dom";

import "./RequestView.css";

export function RequestView() {
	return (
		<>
			<div>
				<nav className="navbar navbar-light bg-light justify-content-between">
					<i className="navbar-brand">View list table requests</i>

					<div className="form-inline">
						<button
							className="btn btn-outline-success my-2 my-sm-0"
							id="laptop-list-bt"
						>
							<a>
								<Link to="/list-laptop-requests"> Laptop List Table</Link>
							</a>
						</button>
						<button
							id="Donator-list-bt"
							className="btn btn-outline-success my-2 my-sm-0"
						>
							<a>
								<Link to="/list-donator-requests">Donator List Table</Link>
							</a>
						</button>
					</div>
				</nav>
			</div>
		</>
	);
}

export default RequestView;
