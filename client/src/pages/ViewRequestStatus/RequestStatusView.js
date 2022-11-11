import React, { useEffect, useState } from "react";

import { useParams } from "react-router-dom";


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
			return (
				<>
					You have been assigned a laptop. Please confirm your address can be
					shared so it can be sent to you."
				</>
			);
		} else if (request.status === "ACCEPTED") {
			return (
				<>
					Please let us know when you have received your laptop / when you have
					picked up your laptop at address.
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
