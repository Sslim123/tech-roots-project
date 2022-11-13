import React, { useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import ButtonComponent from "./ButtonComponent";

export function RequestStatus() {
	const [request, setRequest] = useState(null);
	// this helps get the id from the router
	const { id } = useParams();

	useEffect(() => {
		fetch(`/api/laptop-request-status/${id}`)
			.then((res) => res.json())
			.then((data) => setRequest(data));
	}, []);

	console.log(request);
	if (request !== null) {
		if (request.status === "WAITING") {
			return (
				<>
					<div>
						Thank you for your laptop request. You are on the waiting list. We
						will send you an notification when this changes
					</div>
					<button>Cancel my request</button>
				</>
			);
		} else if (request.status === "ASSIGNED") {
			if(request.laptopAssignment.deliveryOption === "ship"){
				return (
					<>
						<div>
							You have been assigned a laptop. Please confirm your address can
							be shared so it can be sent to you.
							<div>
								
								<ButtonComponent command="Yes please!" />
								<ButtonComponent command="No thank you!" />
								
							</div>
						</div>
					</>
				);
			}
			return (
				<>
					You have been assigned a laptop. Please confirm you can pick it up at{" "}
					<strong> {request.laptopAssignment.address}</strong> .
					<ButtonComponent command="Yes please!" />
					<ButtonComponent command="No thank you!" />
				</>
			);
		} else if (request.status === "ACCEPTED") {
			return (
				<>
					<p>
						Please let us know when you have received your laptop / when you
						have picked up your laptop at{" "}
						<strong>
							{request.laptopAssignment.deliveryOption === "ship"
								? request.requestAddress
								: request.laptopAssignment.address}
							.
						</strong>
					</p>
				</>
			);
		} else if (request.status === "CANCELLED") {
			return <>"This request has been cancelled, as requested."</>;
		} else if (request.status === "FULLFILLED") {
			return (
				<>
					Sweet! You now have your laptop. Time to start working on your
					application to Code Your Future?
				</>
			);
		}
	} else {
		return <>Oops, something went wrong.../ this request doesn't exist</>;
	}
}

export default RequestStatus;
