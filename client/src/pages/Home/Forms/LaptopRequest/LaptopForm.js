import React, { useState } from "react";
import Navbar from "../../../component/navbar/navbar";
import { Navigate } from "react-router-dom";
import "./LaptopForm.css";
import BackgroundImage from "../../../component/BackgroundImageComponent/BackgroundImage";
import ButtonComponent from "../../../component/ButtonComponent/ButtonComponent";
import Footer from "../../../component/footer/Footer";

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
	const isRequired = (value) => {
		if (value === "") {
			return false;
		}
		return true;
	};

	const isEmail = (value) => {
		const emailRegex =
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return emailRegex.test(value);
	};

	const isPhoneNumber = (value) => {
		const phoneNumberRegex = /^\d{10,}$/;
		return phoneNumberRegex.test(value);
	};

	function submitForm(e) {
		e.preventDefault();
		if (
			!(
				isRequired(firstName) &&
				isRequired(lastName) &&
				isRequired(email) &&
				isRequired(phoneNumber) &&
				isEmail(email) &&
				isPhoneNumber(phoneNumber)
			)
		) {
			if (!isRequired(firstName)) {
				document.getElementById("firstName").style.borderColor = "red";
				return;
			}
			if (!isRequired(lastName)) {
				document.getElementById("lastName").style.borderColor = "red";
				return;
			}
			if (!isEmail(email)) {
				alert("Please enter a valid email address");
				document.getElementById("email").style.borderColor = "red";
				return;
			}
			if (!isPhoneNumber(phoneNumber)) {
				alert("Please enter a valid phone number");
				document.getElementById("phoneNumber").style.borderColor = "red";
				return;
			}
		}

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
	console.log(requestId);

	return (
		<>
			<Navbar isActive="requestPage" />
			<BackgroundImage primaryText="Request a laptop" />
			{navigate ? (
				<Navigate to={`/laptop-request-status/${requestId}`} />
			) : (
				<div className="form-card">
					<form onSubmit={submitForm} className="form" name="laptopRequestForm">
						<div className="form-container">
							<div>
								<label htmlFor="label1">
									First Name <em>*</em>
								</label>
								<input
									required
									id="firstName"
									type="text"
									value={firstName}
									name="firstName"
									placeholder="Enter your first name"
									className="input_field"
									onChange={handleClick}
								/>
							</div>
							<div>
								<label htmlFor="label2">
									Surname <em>*</em>
								</label>
								<input
									required
									type="text"
									value={lastName}
									id="lastName"
									name="lastName"
									placeholder="Enter your surname"
									className="input_field"
									onChange={handleClick}
								/>
							</div>
							<div>
								<label htmlFor="label3">
									Email address <em>*</em>
								</label>
								<input
									required
									type="text"
									value={email}
									id="email"
									name="email"
									placeholder="Enter your email address"
									className="input_field"
									onChange={handleClick}
								/>
							</div>
							<div>
								<label htmlFor="label4">
									Phone Number <em>*</em>
								</label>
								<input
									required
									type="number"
									value={phoneNumber}
									id="phoneNumber"
									name="phoneNumber"
									placeholder="Enter your phone number"
									className="input_field"
									onChange={handleClick}
								/>
							</div>
							<ButtonComponent handleClick={submitForm} text="Submit" />
						</div>
					</form>
				</div>
			)}
			<Footer />
		</>
	);
}
export default LaptopForm;
