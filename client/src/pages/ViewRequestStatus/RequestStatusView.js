import React, { useEffect, useState } from "react";
import QRCode from "react-qr-code";
import io from "socket.io-client";
import { Link } from "react-router-dom";
import BackgroundImage from "../component/BackgroundImageComponent/BackgroundImage";
import "./StatusView.css";
import { useParams } from "react-router-dom";
import ButtonComponent from "../component/ButtonComponent/ButtonComponent";

const socket = io(window.origin, { path: "/api/socket.io" });

export function RequestStatus() {
	const [request, setRequest] = useState("");
	const [donation, setDonation] = useState(null);
	const [needsReloading, setNeedsReloading] = useState(false);
	const [laptopRequestAddress, setLaptopRequestAddress] = useState(null);

	// this helps get the id from the router
	const { id } = useParams();
	useEffect(() => {
		if ("Notification" in window) {
			Notification.requestPermission();
		} else {
			alert(
				"This browser does not support desktop notifications, please keep your qr code to follow the status of your request"
			);
		}
		socket.on("connect", () => {
			console.log("connected");
		});
		socket.on(
			`laptop_request:statusChanged`,
			({ laptopRequestId, firstName }) => {
				setNeedsReloading((previousNeedsReloading) => !previousNeedsReloading);
				if ("Notification" in window && Notification.permission === "granted") {
					new Notification(`Good news ${firstName}, we've found you a laptop!`);
				}
				console.log("Notification sent to ", firstName);
				console.log("statusChanged", laptopRequestId);
			}
		);
		socket.emit("laptop_request:subscribe", { requestId: id });
		return () => {
			socket.off("connect");
			socket.off("laptop_request:statusChanged");
		};
	}, [id]);

	useEffect(() => {
		fetch(`/api/laptop_request/${id}`)
			.then((res) => {
				if (res.status === 404) {
					setRequest(null);
					return;
				}
				return res.json();
			})
			.then((laptopRequest) => {
				setRequest(laptopRequest);
			});
	}, [id, needsReloading]);
	console.log(request);

	// gets laptop donation from the request

	useEffect(() => {
		if (request != null && request.donationID != null) {
			fetch(`/api/laptop_donation/${request.donationID}`)
				.then((res) => res.json())
				.then((laptopDonation) => {
					setDonation(laptopDonation);
				});
		}
	}, [request]);

	const cancelRequest = () => {
		fetch(`/api/laptop_request/${id}`, {
			method: "PUT",
			body: JSON.stringify({
				status: "CANCELLED",
			}),
			headers: { "content-type": "application/json" },
		}).then(() => {
			setNeedsReloading(!needsReloading);
		});
	};

	const acceptRequest = () => {
		fetch(`/api/laptop_assignment/${request.assignmentId}`, {
			method: "PUT",
			body: JSON.stringify({
				status: "ACCEPTED",
			}),
			headers: { "content-type": "application/json" },
		}).then(() => {
			setNeedsReloading(!needsReloading);
		});
	};

	const rejectRequest = () => {
		fetch(`/api/laptop_assignment/${request.assignmentId}`, {
			method: "DELETE",
		}).then((res) => {
			if (res.status === 201) {
				if ("Notification" in window && Notification.permission === "granted") {
					new Notification("You have been assigned another available laptop");
				}
			} else {
				console.log("no new donation");
			}
			setNeedsReloading(!needsReloading);
		});
	};

	const receivedRequest = () => {
		fetch(`/api/laptop_assignment/${request.assignmentId}`, {
			method: "PUT",
			body: JSON.stringify({
				status: "FULFILLED",
			}),
			headers: { "content-type": "application/json" },
		}).then(() => {
			setNeedsReloading(!needsReloading);
		});
	};

	const handleChange = (event) => {
		setLaptopRequestAddress(event.target.value);
	};

	const submitAddress = () => {
		if (laptopRequestAddress != "") {
			fetch(`/api/laptop_request/${id}`, {
				method: "PUT",
				body: JSON.stringify({
					address: laptopRequestAddress,
				}),
				headers: { "content-type": "application/json" },
			});
			acceptRequest();
		} else {
			alert("Please enter an address");
		}
	};

	if (request !== null && request !== "" && request !== undefined) {
		if (request.status === "WAITING") {
			return (
				<div>
					<BackgroundImage primaryText="Thank you for your request" />
					<div className="text-status">
						<h1>
							Thank you for your laptop request. You are now on the waiting
							list. We will send you a notification when a laptop becomes
							available.
						</h1>
					</div>
					<div className="qrCode">
						<h2> Scan to follow up on your request</h2>
						<QRCode
							className="qrCoder"
							value={
								"https://laptop-loop.herokuapp.com/laptop-request-status/" + id
							}
							size={128}
						/>
					</div>
					<div className="status-bt">
						<Link className="status-but-link" to="/">
							<button id="tr">Back Home </button>
						</Link>

						<button onClick={cancelRequest}>Cancel my request</button>
					</div>
				</div>
			);
		}
		if (donation !== null) {
			if (request.status === "ASSIGNED") {
				if (donation.deliveryOption === "SHIP") {
					return (
						<>
							<BackgroundImage primaryText="Good News!!!" />
							<div className="text-status">
								<h1>
									You have been assigned a laptop. Please confirm your address
									can be shared so it can be sent to you.
								</h1>
							</div>
							<div className="address-field">
								<label htmlFor="addressField">
									Please enter your address:
									<input
										name="addressField"
										id="addressField"
										value={laptopRequestAddress}
										placeholder="Enter your address"
										className="input_field"
										onChange={handleChange}
									/>
								</label>
							</div>

							<div className="status-bt">
								<ButtonComponent
									handleClick={submitAddress}
									text="Yes please!"
								/>
								<ButtonComponent
									handleClick={rejectRequest}
									text="No thank you!"
								/>
							</div>
						</>
					);
				}
				if (donation.deliveryOption === "PICKUP") {
					return (
						<>
							<BackgroundImage primaryText="Good News!!!" />
							<div className="text-status">
								<h1>
									You have been assigned a laptop. Please confirm you can pick
									it up at {donation.address}.
								</h1>
							</div>
							<div className="status-bt">
								<ButtonComponent
									text="Yes please!"
									handleClick={acceptRequest}
								/>
								<ButtonComponent
									handleClick={rejectRequest}
									text="No thank you!"
								/>
							</div>
						</>
					);
				}
			}
			if (request.status === "ACCEPTED") {
				console.log(request);
				return (
					<>
						<BackgroundImage primaryText="Thank You!" />
						<div className="text-status">
							<h1>
								Please let us know
								{donation.deliveryOption === "SHIP"
									? " when you have received your laptop at " + request.address
									: " when you have picked up your laptop from " +
									  donation.address}
							</h1>
						</div>
						<div className="status-bt">
							<Link className="status-but-link" to="/">
								<button id="tr">Back Home </button>
							</Link>

							<ButtonComponent
								text="Yes, sure!"
								handleClick={receivedRequest}
							/>
						</div>
					</>
				);
			}
			if (request.status === "FULFILLED") {
				return (
					<>
						<BackgroundImage primaryText="Thank You!" />
						<div className="text-status">
							<h1>Sweet! Would you like to leave a Review for us?</h1>
						</div>
						<div className="review-bt">
							<div className="center-review">
								<label className="container">
									Yes
									<input type="radio" checked="checked" name="radio" />
									<span className="checkmark"></span>
								</label>
								<label className="container">
									No
									<input type="radio" name="radio" />
									<span className="checkmark"></span>
								</label>
							</div>
						</div>
						<div className="status-bt">
							<Link className="status-but-link" to="/">
								<button id="tr">Back Home </button>
							</Link>
						</div>
					</>
				);
			}
		}
		if (request.status === "CANCELLED") {
			return (
				<>
					<BackgroundImage primaryText="This request has been canceled" />
					<div className="text-status">
						<h1> This request has been cancelled, as requested.</h1>
					</div>
					<div className="status-bt">
						<Link className="status-but-link" to="/">
							<button id="tr">Back Home </button>
						</Link>
					</div>
				</>
			);
		}
	} else {
		return request === undefined ? (
			<>
				<BackgroundImage primaryText="Ops! this page does not exist " />
			</>
		) : (
			<div>
				<BackgroundImage primaryText="Loading..." />
			</div>
		);
	}
}

export default RequestStatus;
