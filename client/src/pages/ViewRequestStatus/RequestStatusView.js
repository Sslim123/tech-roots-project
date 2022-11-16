import React, { useEffect, useState } from "react";
// import { Navigate } from "react-router-dom";

import { useParams } from "react-router-dom";
import ButtonComponent from "./ButtonComponent";

export function RequestStatus() {
	const [request, setRequest] = useState(null);
	const [donation, setDonation] = useState(null);
	const [needsReloading, setNeedsReloading] = useState(false);

	// this helps get the id from the router
	const { id } = useParams();

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
			method: "delete",
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

	if (request !== null) {
		if (request.status === "WAITING") {
			return (
				<>
					<div>
						Thank you for your laptop request. You are on the waiting list. We
						will send you an notification when this changes
					</div>
					<button onClick={cancelRequest}>Cancel my request</button>
				</>
			);
		}
		if (donation !== null) {
			if (request.status === "ASSIGNED") {
				if (donation.deliveryOption === "SHIP") {
					return (
						<>
							<div>
								You have been assigned a laptop. Please confirm your address can
								be shared so it can be sent to you.
								<div>
									<ButtonComponent
										handleClick={acceptRequest}
										command="Yes please!"
									/>
									<ButtonComponent
										handleClick={rejectRequest}
										command="No thank you!"
									/>
								</div>
							</div>
						</>
					);
				}
				if (donation.deliveryOption === "PICK UP") {
					return (
						<>
							<div>
								You have been assigned a laptop. Please confirm you can pick it
								up at {donation.address}.
								<div>
									<ButtonComponent
										command="Yes please!"
										handleClick={acceptRequest}
									/>
									<ButtonComponent
										handleClick={rejectRequest}
										command="No thank you!"
									/>
								</div>
							</div>
						</>
					);
				}
			}
			if (request.status === "ACCEPTED") {
				return (
					<>
						<p>
							Please let us know
							{donation.deliveryOption === "SHIP"
								? " when you have received your laptop at " +
								  request.requestAddress
								: " when you have picked up your laptop from " +
								  donation.address}
						</p>
						<ButtonComponent
							command="Thanks, I've got it"
							handleClick={receivedRequest}
						/>
					</>
				);
			}
			if (request.status === "FULFILLED") {
				return (
					<>
						Sweet! You now have your laptop. Time to start working on your
						application to Code Your Future?
					</>
				);
			}
		}
		if (request.status === "CANCELLED") {
			return (
				<>
					<p>This request has been cancelled, as requested.</p>
				</>
			);
		}
	} else {
		return <>Oops, something went wrong.../ this request doesn't exist</>;
	}
}

export default RequestStatus;
