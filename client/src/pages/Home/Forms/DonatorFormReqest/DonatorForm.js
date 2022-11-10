import React from "react";
import { useState } from "react";
import "./DonatorForm.css";

function DonatorForm() {
	const [name, setName] = useState("");
	const [address, setAddress] = useState("");
	const [numberOfLaptops, setNumberOfLaptops] = useState("");
	const [phoneNumber, setPhoneNumber] = useState("");
	const [email, setEmail] = useState("");
	const [deliveryOption, setDeliveryOption] = useState("");

	function handleClick(e) {
		if (e.target.name === "name") {
			setName(e.target.value);
		} else if (e.target.name === "address") {
			setAddress(e.target.value);
		} else if (e.target.name === "email") {
			setEmail(e.target.value);
		} else if (e.target.name === "phoneNumber") {
			setPhoneNumber(e.target.value);
		} else if (e.target.name === "numberOfLaptops") {
			setNumberOfLaptops(e.target.value);
		} else if (e.target.name === "deliveryOption") {
			setDeliveryOption(e.target.value);
		} else {
			return null;
		}
	}

	function submitForm(e) {
		e.preventDefault();
		setName("");
		setEmail("");
		setAddress("");
		setPhoneNumber("");
		setNumberOfLaptops("");
		setDeliveryOption("");

		fetch("/api/laptop_donation", {
			method: "POST",
			body: JSON.stringify({
				name: name,
				email: email,
				address: address,
				phoneNumber: phoneNumber,
				numberOfLaptops: numberOfLaptops,
				deliveryOption: deliveryOption,
			}),
			headers: { "content-type": "application/json" },
		});
	}
	return (
		<div className="form-card">
			<form className="form" onSubmit={submitForm}>
				<div className="form-container">
					<input
						placeholder="Name"
						value={name}
						name="name"
						className="input_field"
						onChange={handleClick}
						required
					/>
					<input
						placeholder="Address"
						value={address}
						name="address"
						className="input_field"
						onChange={handleClick}
					/>
					<input
						type="number"
						placeholder="Amount of laptops"
						value={numberOfLaptops}
						name="numberOfLaptops"
						className="input_field"
						onChange={handleClick}
						required
					/>
					<input
						placeholder="Phone number"
						value={phoneNumber}
						name="phoneNumber"
						className="input_field"
						onChange={handleClick}
						required
					/>
					<input
						placeholder="Email"
						value={email}
						name="email"
						className="input_field"
						onChange={handleClick}
						required
					/>

					<p>How would you like the laptop to be transferred?</p>

					<div>
						<div className="radio-input">
							<input
								type="radio"
								name="deliveryOption"
								value="PICK UP"
								onChange={handleClick}
							/>
							<label>I would like someone to come pick it up</label>
						</div>
						<div className="radio-input">
							<input
								type="radio"
								name="deliveryOption"
								value="DROP OFF"
								onChange={handleClick}
							/>
							<label>I would like to drop it off at a collection point</label>
						</div>

						<div className="radio-input">
							<input
								type="radio"
								name="deliveryOption"
								value="SHIP"
								onChange={handleClick}
							/>
							<label>I would like to ship it via post/courier</label>
						</div>
					</div>

					<button>Donate</button>
				</div>
			</form>
		</div>
	);
}

export default DonatorForm;
