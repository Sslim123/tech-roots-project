import Table from "react-bootstrap/Table";
import React, { useState, useEffect } from "react";

function LaptopTable() {
	const [laptopRequests, setLaptopRequests] = useState([]);

	useEffect(() => {
		fetch("/api/laptop_request")
			.then((res) => res.json())
			.then((data) => setLaptopRequests(data));
	}, []);

	const tableRows = laptopRequests.map((item) => {
		return (
			<tr>
				<th>{item.firstName}</th>
				<th>{item.lastName}</th>
				<th>{item.email}</th>
				<th>{item.phoneNumber}</th>
			</tr>
		);
	});

	return (
		<Table striped bordered hover size="sm">
			<thead>
				<tr>
					<th>First Name</th>
					<th>Last Name</th>
					<th>Email Address</th>
					<th>Phone Number</th>
				</tr>
			</thead>
			<tbody>{tableRows}</tbody>
		</Table>
	);
}

export default LaptopTable;
