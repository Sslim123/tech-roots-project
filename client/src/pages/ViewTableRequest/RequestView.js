import React from "react";
import { Link } from "react-router-dom";

import "./RequestView.css";

export function RequestView() {
	return (
		<>
			<div>
				<nav class="navbar navbar-light bg-light justify-content-between">
					<a class="navbar-brand">View list table requests</a>

					<div class="form-inline">
						<button
							class="btn btn-outline-success my-2 my-sm-0"
							id="laptop-list-bt"
						>
							<a>
								<Link to="/list-laptop-requests"> Laptop List Table</Link>
							</a>
						</button>
						<button
							id="Donator-list-bt"
							class="btn btn-outline-success my-2 my-sm-0"
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
