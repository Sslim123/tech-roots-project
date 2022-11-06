import React, { useState } from "react";
import "./LaptopForm.css";

function LaptopForm() {
	const [firstName, setFirst] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [phoneNumber, setNumber] = useState("");

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
		});
	}
	function messageAlert() {
		alert(
			"thank you for your completing the request form. your request have been recived "
		);
	}
	return (
		<div className="form-card">
			<form onSubmit={submitForm} className="form">
			<div className="form-conatiner">
			<label>First Name</label>
				<input 
				    required
					type="text"
					value={firstName}
					name="firstName"
					placeholder="first name"
					className="firstInput"
					onChange={handleClick}
				/>
				<label>Last Name</label>
				<input 
				    required
					type="text"
					value={lastName}
					name="lastName"
					placeholder="lastName"
					className="firstInput"
					onChange={handleClick}
				/>
				<label>Email address</label>
				<input
				    required
					type="text"
					value={email}
					name="email"
					placeholder="email"
					className="firstInput"
					onChange={handleClick}
				/>
				<label>Phone Number</label>
				<input
				    required
					type="number"
					value={phoneNumber}
					name="phoneNumber"
					placeholder="phon number"
					className="firstInput"
					onChange={handleClick}
				/>
				<button type="submit"
				onClick={messageAlert}
				className="btn1">
					Submit
				</button>
				</div>
			</form>
		</div>
	);
}

export default LaptopForm;
