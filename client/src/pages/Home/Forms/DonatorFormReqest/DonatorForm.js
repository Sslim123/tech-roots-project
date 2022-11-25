import React from "react";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import BackgroundImage from "../../../component/BackgroundImageComponent/BackgroundImage";
import ButtonComponent from "../../../component/ButtonComponent/ButtonComponent";
import Footer from "../../../component/footer/Footer";
import Navbar from "../../../component/navbar/navbar";

import "./DonatorForm.css";

function DonatorForm() {
	const [name, setName] = useState("");
	const [address, setAddress] = useState("");
	const [numberOfLaptops, setNumberOfLaptops] = useState("");
	const [phoneNumber, setPhoneNumber] = useState("");
	const [email, setEmail] = useState("");
	const [deliveryOption, setDeliveryOption] = useState("PICKUP");

	const [navigate, setNavigate] = useState(false);
	const [donationId, setDonationId] = useState("");

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
			console.log(e.target.value);
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
		})
			.then((res) => res.json())
			.then((data) => {
				setDonationId(data.id);
				setNavigate(true);
			});
	}

	return (
		<>
			<Navbar isActive="donationPage" /> 
			<BackgroundImage primaryText="Donate a Laptop" />

			{navigate ? (
				<Navigate to={`/laptop-donation-status/${donationId}`} />
			) : (
				<div className="form-card">
					<form className="form" onSubmit={submitForm}>
						<div className="form-container">
							<div>
								<label htmlFor="label1">Name</label>
								<input
									placeholder="Enter your name"
									value={name}
									name="name"
									className="input_field"
									onChange={handleClick}
									required
								/>
							</div>
							<div>
								<label htmlFor="label2">Address</label>
								<input
									placeholder="Enter your address"
									value={address}
									name="address"
									className="input_field"
									onChange={handleClick}
								/>
							</div>
							<div>
								<label htmlFor="label3">Number of laptops</label>
								<input
									type="number"
									placeholder="0"
									value={numberOfLaptops}
									name="numberOfLaptops"
									className="input_field"
									onChange={handleClick}
									required
								/>
							</div>
							<div>
								<label htmlFor="label4">Contact number</label>
								<input
									placeholder="Enter your contact number"
									value={phoneNumber}
									name="phoneNumber"
									className="input_field"
									onChange={handleClick}
									required
								/>
							</div>
							<div>
								<label htmlFor="label5">Email</label>
								<input
									placeholder="Enter your email"
									value={email}
									name="email"
									className="input_field"
									onChange={handleClick}
									required
								/>
							</div>
							<div>
								<p>How would you like the laptop to be transferred?</p>
								<select name="deliveryOption" onChange={handleClick}>
									<option value="PICKUP" name="deliveryOption">
										Pick up at my address
									</option>
									<option value="SHIP" name="deliveryOption">
										Ship to receivers address
									</option>
								</select>
							</div>

							<ButtonComponent text="Donate" handleClick={submitForm} />
						</div>
					</form>
				</div>
			)}
			<Footer />
		</>
	);
}

export default DonatorForm;
