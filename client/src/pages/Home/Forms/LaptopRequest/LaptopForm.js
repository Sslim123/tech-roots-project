import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import "./LaptopForm.css";

function LaptopForm() {
	const [firstName, setFirst] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [phoneNumber, setNumber] = useState("");
	const [requestId, setRequestId] = useState("");
	const [navigate, setNavigate] = useState(false);

	function handleClick(e) {
		if (e.target.name === "firstName") {
			setFirst(e.target.value);
		} else if (e.target.name === "lastName") {
			setLastName(e.target.value);
		} else if (e.target.name === "email") {
			setEmail(e.target.value);
		} else if (e.target.name === "phoneNumber") {
			setNumber(e.target.value);
		} else {
			return null;
		}
	}

	function submitForm(e) {
		e.preventDefault();
		setFirst("");
		setLastName("");
		setEmail("");
		setNumber("");

		fetch("/api/laptop_request", {
			method: "POST",
			body: JSON.stringify({
				firstName: firstName,
				lastName: lastName,
				email: email,
				phoneNumber: phoneNumber,
			}),
			headers: { "content-type": "application/json" },
		})
			.then((response) => response.json())
			.then((data) => {
				setRequestId(data.id);
				setNavigate(true);
			});
	}

	return navigate ? (
		<Navigate to={`/laptop-request-status/${requestId}`} />
	) : (
		<div className="form-card">
			<form onSubmit={submitForm} className="form" name="laptopRequestForm">
				<div className="form-container">
					<label htmlFor="label1">First Name</label>
					<input
						required
						id="firstName"
						type="text"
						value={firstName}
						name="firstName"
						placeholder="First Name"
						className="input_field"
						onChange={handleClick}
					/>
					<label htmlFor="label2">Last Name</label>
					<input
						required
						type="text"
						value={lastName}
						id="lastName"
						name="lastName"
						placeholder="Last Name"
						className="input_field"
						onChange={handleClick}
					/>
					<label htmlFor="label3">Email address</label>
					<input
						required
						type="text"
						value={email}
						id="email"
						name="email"
						placeholder="Email Address"
						className="input_field"
						onChange={handleClick}
					/>
					<label htmlFor="label4">Phone Number</label>
					<input
						required
						type="number"
						value={phoneNumber}
						id="phoneNumber"
						name="phoneNumber"
						placeholder="Phone Number"
						className="input_field"
						onChange={handleClick}
					/>
					<button type="submit" className="btn1">
						Submit
					</button>
				</div>
			</form>
		</div>
	);
}
export default LaptopForm;
