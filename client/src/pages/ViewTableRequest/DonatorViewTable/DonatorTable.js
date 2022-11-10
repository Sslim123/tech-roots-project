import Table from "react-bootstrap/Table";
import React, { useState, useEffect } from "react";

function DonatorTable() {
	const [donatorRequests, setDonatorRequests] = useState([]);

	useEffect(() => {
		fetch("/api/laptop_donation")
			.then((res) => res.json())
			.then((data) => setDonatorRequests(data));
	}, []);

	const tableRows = donatorRequests.map((item) => {
		return (
			<tr>
				<th>{item.name}</th>
				<th>{item.address}</th>
				<th>{item.numberOfLaptops}</th>
				<th>{item.phoneNumber}</th>
				<th>{item.email}</th>
				<th>{item.deliveryOption}</th>
			</tr>
		);
	});

	return (
		<Table striped bordered hover size="sm">
			<thead>
				<tr>
					<th>Name</th>
					<th>Address</th>
					<th>Number Of Laptops</th>
					<th>Phone Number</th>
					<th>Email Address</th>
					<th>Delivery Option</th>
				</tr>
			</thead>
			<tbody>{tableRows}</tbody>
		</Table>
	);
}

export default DonatorTable;
