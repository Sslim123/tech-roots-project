import React, { useEffect, useState } from "react";
import "./StatusView.css";
import { Link, useParams } from "react-router-dom";
import BackgroundImage from "../component/BackgroundImageComponent/BackgroundImage";

function DonationRequestStatues() {
	const [donation, setDonation] = useState("");

	const { id } = useParams();

	useEffect(() => {
		fetch(`/api/laptop_donation/${id}`)
			.then((res) => {
				console.log(res);
				if (res.status === 404) {
					setDonation(null);
					return;
				} else {
					return res.json();
				}
			})
			.then((donation) => {
				console.log(donation);
				setDonation(donation);
			});
	}, [id]);
	console.log(donation);

	if (donation === null || donation === undefined || donation === "") {
		return donation === "" ? (
			<div>
				<BackgroundImage primaryText="loading..." />
			</div>
		) : (
			<div>
				<BackgroundImage primaryText="Oops, seems the donation doesn't exist" />
			</div>
		);
	}
	return (
		<div>
			<BackgroundImage primaryText="Thank you for your donation!" />

			<div className="text-status">
				<h1>
					Thank you for your donation. We will notify you when you have been
					matched with someone who has requested a laptop.
				</h1>
			</div>
			<div className="status-bt">
				<Link to="/">
					<button>Back Home</button>
				</Link>
			</div>
		</div>
	);
}

export default DonationRequestStatues;
