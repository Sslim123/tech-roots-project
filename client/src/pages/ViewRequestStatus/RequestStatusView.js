import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import { Link } from "react-router-dom";
import BackgroundImage from "../component/BackgroundImageComponent/BackgroundImage";
import "./StatusView.css";
import { useParams } from "react-router-dom";
import ButtonComponent from "../component/ButtonComponent/ButtonComponent";

const socket = io(window.origin, { path: "/api/socket.io" });

export function RequestStatus() {
	const [request, setRequest] = useState(null);
	const [donation, setDonation] = useState(null);
	const [needsReloading, setNeedsReloading] = useState(false);
	const [laptopRequestAddress, setLaptopRequestAddress] = useState(null);

	// this helps get the id from the router
	const { id } = useParams();
	useEffect(() => {
		Notification.requestPermission();
		socket.on("connect", () => {
			console.log("connected");
		});
		socket.on(`laptop_request:statusChanged${id}`, ({ laptopRequestId }) => {
			setNeedsReloading((previousNeedsReloading) => {
				return (
					!previousNeedsReloading,
					new Notification("Good news, we've found you a laptop!")
				);
			});

			console.log("statusChanged", laptopRequestId);
		});
		socket.emit("test", { requestId: id });
		return () => {
			socket.off("connect");
			socket.off("laptop_request:statusChanged");
		};
	}, [id]);

	useEffect(() => {
		fetch(`/api/laptop_request/${id}`)
			.then((res) => res.json())
			.then((laptopRequest) => {
				setRequest(laptopRequest);
			});
	}, [id, needsReloading]);

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
		}).then(() => {
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

	if (request !== null) {
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
							<BackgroundImage primaryText="Good News" />
							<div className="text-status">
								<h1>
									You have been assigned a laptop. Please confirm your address
									can be shared so it can be sent to you.
								</h1>
							</div>
							<div style={{ display: "flex" }}>
								<label htmlFor="addressField">Please enter your address:</label>
								<input
									name="addressField"
									id="addressField"
									value={laptopRequestAddress}
									placeholder="Please enter your address"
									className="input_field"
									onChange={handleChange}
								/>
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
							<BackgroundImage primaryText="Good News" />
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
				return (
					<>
						<BackgroundImage primaryText="Thank You" />
						<div className="text-status">
							<h1>
								Please let us know
								{donation.deliveryOption === "SHIP"
									? " when you have received your laptop at " +
									  request.requestAddress
									: " when you have picked up your laptop from " +
									  donation.address}
							</h1>
						</div>
						<div className="status-bt">
							<Link className="status-but-link" to="/">
								<button id="tr">Back Home </button>
							</Link>

							<ButtonComponent
								text="Thanks, I've got it"
								handleClick={receivedRequest}
							/>
						</div>
					</>
				);
			}
			if (request.status === "FULFILLED") {
				return (
					<>
						<div className="status-thankYou-main-picture">
							<div className="thankYou-p">
								<h1>Thank you!</h1>
							</div>
						</div>
						<div className="text-status">
							<h1>
								Sweet! You now have your laptop. Time to start working on your
								application to Code Your Future?
							</h1>
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
		return (
			<>
				<BackgroundImage primaryText="Ops! this page does not exist " />

				<div className="status-bt">
					<Link className="status-but-link" to="/">
						<button id="tr">Back Home </button>
					</Link>
				</div>
			</>
		);
	}
}

export default RequestStatus;
