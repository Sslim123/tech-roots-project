import React, { useEffect, useState } from "react";

function FormSubmit() {
	const [firstName, setFirst] = useState("");
	const [secondName, setSecond] = useState("");
	const [email, setEmail] = useState("");
	const [phonNumber, setNumber] = useState("");

	useEffect(() => {
		fetch("seekLaptop", {
			method: "POST",
			body: JSON.stringify({
				firstName: firstName,
				secondName: secondName,
				email: email,
				phonnumber: phonNumber,
			}),
			headers: { "content-type": "application/json" },
		});
	}, []);
	function handleClick(e) {
		if (e.target.name === "firstName") {
			setFirst(e.target.value);
		} else if (e.target.name === "secondName") {
			setSecond(e.target.value);
		} else if (e.target.name === "email") {
			setEmail(e.target.value);
		} else if (e.target.name === "phonNumber") {
			setNumber(e.target.value);
		} else {
			return null;
		}
	}
	function submitForm(e) {
		e.preventDefault();
		setNumber("");
		setFirst("");
		setSecond("");
		setEmail("");
		a;
	}
	function messageAlert() {
		alert(
			"thank you for your completing the request form. your request have been recived "
		);
	}
	return (
		<div className="theForm">
			<form onSubmit={submitForm} className="form">
				<input
					type="text"
					value={firstName}
					name="firstName"
					placeholder="first name"
					className="firstInput"
					onChange={handleClick}
				/>
				<input
					type="text"
					value={secondName}
					name="secondName"
					placeholder="second name"
					className="firstInput"
					onChange={handleClick}
				/>
				<input
					type="text"
					value={email}
					name="email"
					placeholder="email"
					className="firstInput"
					onChange={handleClick}
				/>
				<input
					type="number"
					value={phonNumber}
					name="phonNumber"
					placeholder="phon number"
					className="firstInput"
					onChange={handleClick}
				/>
				<button onClick={messageAlert} className="btn1">
					request
				</button>
			</form>
		</div>
	);
}
export default FormSubmit;
