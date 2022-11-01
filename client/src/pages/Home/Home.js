import React from "react";
import { Link } from "react-router-dom";

import "./Home.css";

export function Home() {
	return (
		<>
			<div>
				<nav class="navbar navbar-light bg-light justify-content-between">
					<a class="navbar-brand">Home page</a>

					<div class="form-inline">
						<button
							class="btn btn-outline-success my-2 my-sm-0"
							id="laptop-home-bt"
						>
							<a>
								<Link to="/create-laptop-requests"> Register for a laptop</Link>
							</a>
						</button>
						<button
							id="Donator-home-bt"
							class="btn btn-outline-success my-2 my-sm-0"
						>
							<a>
								<Link to="/create-donator-requests">Donate a laptop</Link>
							</a>
						</button>
					</div>
				</nav>
			</div>
			<h4>to see  list-request page: type in the url (/list-requests)</h4>
		</>
	);
}

export default Home;
