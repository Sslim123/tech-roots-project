import React from "react";
import "./StatusView.css";
import { Link } from "react-router-dom";
import BackgroundImage from "../component/BackgroundImageComponent/BackgroundImage";

function DonationRequestStatues() {
	return (
		<div>
			<BackgroundImage
				primaryText="Thank you for your donation"
				secondaryText="You are on the waiting list"
			/>

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
