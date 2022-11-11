import React from "react";
import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

const RequestStatusView = () => {
	const [status, setStatus] = useState(null);
	// this helps get the id from the router
	const { id } = useParams();

	useEffect(() => {
		fetch("/api/laptop-request-status/" + id)
			.then((res) => res.json())
			.then((data) => setStatus(data));
	}, []);

	// console.log(status);

	// if (status !== null) {
	// 	if (status === "WAITING") {
	// 		return (
	// 			<>
	// 				<div>
	// 					Thank you for your laptop request. You are on the waiting list. We
	// 					will send you an notification when this changes
	// 				</div>
	// 				<button>Cancel my request</button>
	// 			</>
	// 		);
	// 	} else if (status === "ASSIGNED") {
	// 		return (
	// 			<>
	// 				You have been assigned a laptop. Please confirm your address can be
	// 				shared so it can be sent to you."
	// 			</>
	// 		);
	// 	} else if (status === "ACCEPTED") {
	// 		return (
	// 			<>
	// 				Please let us know when you have received your laptop / when you have
	// 				picked up your laptop at address.
	// 			</>
	// 		);
	// 	} else if (status === "CANCELLED") {
	// 		return <>"This request has been cancelled, as requested."</>;
	// 	} else if (status === "FULLFILLED") {
	// 		return (
	// 			<>
	// 				Sweet! You now have your laptop. Time to start working on your
	// 				application to Code Your Future?
	// 			</>
	// 		);
	// 	}
	// } else {
	// 	return <>Oops, something went wrong.../ this request doesn't exist</>;
	// }
	return <div>RequestStatusView</div>;
};

export default RequestStatusView
