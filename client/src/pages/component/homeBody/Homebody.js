import React from "react";
import "./Homebody.css";
import { Link } from "react-router-dom";

function Homebody() {
	return (
		<div className="homebody-container">
			<div className="body-main-container">
				<div className="body-main-card">
					<p className="Home-main-text">Give a second life to your laptop</p>
					<p className="text-home-2">
						You have an extra laptop - we have those who need it. <br />
						Donate a laptop, get a thank you. It's simple!
					</p>
					<div className="home-bt-card">
						<Link className="home-link" to="/create-laptop-requests">
							<button className="home-bt" id="home-left-bt">
								I need a laptop
							</button>
						</Link>

						<Link className="home-link" to="/create-donator-requests">
							<button className="home-bt" id="home-right-bt">
								I want to donate a laptop
							</button>
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Homebody;
