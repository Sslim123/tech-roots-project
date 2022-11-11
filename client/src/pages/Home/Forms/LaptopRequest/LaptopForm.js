import React, { useState } from "react";
import ButtonComponent from "./ButtonComponent";
import "./LaptopForm.css";

function LaptopForm() {
	const [firstName, setFirst] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [phoneNumber, setNumber] = useState("");
	const [formValidation, setFormValidation] = useState(false);

	function handleClick(e) {
		if (e.target.name === "firstName") {
			setFirst(e.target.value);
			validateForm();
		} else if (e.target.name === "lastName") {
			setLastName(e.target.value);
			validateForm();
		} else if (e.target.name === "email") {
			setEmail(e.target.value);
			validateForm();
		} else if (e.target.name === "phoneNumber") {
			setNumber(e.target.value);
			validateForm();
		} else {
			validateForm();
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

	function validateForm() {
		let form = document.laptopRequestForm;
		if (
			form.firstName.value.length > 0 &&
			form.lastName.value.length > 0 &&
			form.email.value.length > 0 &&
			form.phoneNumber.value.length > 0
		) {
			setFormValidation(true);
		}else{
			setFormValidation(false);
		}

		
		console.log(formValidation);
	}

	return (
		<div className="form-card">
			<form onSubmit={submitForm} className="form" name="laptopRequestForm">
				<div className="form-container">
					<label>First Name</label>
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
					<label>Last Name</label>
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
					<label>Email address</label>
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
					<label>Phone Number</label>
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

					<ButtonComponent validateForm = {formValidation}/>
				</div>
			</form>
		</div>
	);
}

export default LaptopForm;
