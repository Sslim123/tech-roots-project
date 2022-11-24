import React from "react";
import "./StatusView.css";
import { Link } from "react-router-dom";

function DonationRequestStatues() {
	return (
		<div>
			<div className="status-thankYou-main-picture">
				<div className="thankYou-p">
					<h1>Thank you!</h1>
				</div>
			</div>
			<div className="text-status">
				<h1>
					Thank you for your donation. We will notify you when you have been
					matched with someone who has requested a laptop.
				</h1>
			</div>
			<div className="status-bt">
				<button>
					<Link to="/">Back Home</Link>
				</button>
			</div>
		</div>
	);
}

export default DonationRequestStatues;
