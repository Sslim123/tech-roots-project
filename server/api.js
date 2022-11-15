import { request } from "express";
import { Router } from "express";
import db from "./db";

import logger from "./utils/logger";

const router = Router();

let fakeLaptopAssign = [
	{
		laptopId: 1,
		laptopName: "Dell",
		deliveryOption: "pickup",
		address: "donator address: 123 main st",
	},
	{
		laptopId: 2,
		laptopName: "Mac",
		deliveryOption: "ship",
		address: "donator address: 124 main st",
	},
];

let fakeRequests = [
	{
		id: 100,
		firstName: "bob",
		lastName: "the builder",
		email: "email@email.com",
		phoneNumber: "073820384924",
		status: "WAITING",
		laptopAssignment: {},
		requestAddress: "",
	},
	{
		id: 110,
		firstName: "hulk",
		lastName: "the smasher",
		email: "email@email.com",
		phoneNumber: "073820384924",
		status: "ASSIGNED",
		laptopAssignment: fakeLaptopAssign[1],
		requestAddress: " users address : 123 south street",
	},
	{
		id: 111,
		firstName: "tony",
		lastName: "stack",
		email: "email@email.com",
		phoneNumber: "073820384924",
		status: " ",
		laptopAssignment: fakeLaptopAssign[0],
		requestAddress: "users address : 123 south street",
	},
	{
		id: 120,
		firstName: "silver",
		lastName: "surfer",
		email: "email@email.com",
		phoneNumber: "073820384924",
		status: "ACCEPTED",
		laptopAssignment: fakeLaptopAssign[1],
		requestAddress: "users address : 123 south street",
	},

	{
		id: 121,
		firstName: "silver",
		lastName: "surfer",
		email: "email@email.com",
		phoneNumber: "073820384924",
		status: "ACCEPTED",
		laptopAssignment: fakeLaptopAssign[0],
		requestAddress: "users address : 123 south street",
	},

	{
		id: 130,
		firstName: "hulk",
		lastName: "the smasher",
		email: "email@email.com",
		phoneNumber: "073820384924",
		status: "CANCELLED",
		laptopAssignment: {},
		requestAddress: "",
	},
	{
		id: 140,
		firstName: "Don",
		lastName: "Yen",
		email: "email@email.com",
		phoneNumber: "073820384924",
		status: "FULLFILLED",
	},
];

router.get("/laptop_donation/:id", async (req, res) => {
	try {
		const result = await db.query(
			"SELECT * from laptop_donation WHERE id = $1",
			[req.params.id]
		);
		let id = result.rows[0].id;
		let name = result.rows[0].name;
		let address = result.rows[0].address;
		let numberOfLaptops = result.rows[0].number_of_laptops;
		let phoneNumber = result.rows[0].phone_number;
		let email = result.rows[0].email;
		let deliveryOption = result.rows[0].delivery_option;
		let laptopDonation = {
			id: id,
			name: name,
			address: address,
			numberOfLaptops: numberOfLaptops,
			phoneNumber: phoneNumber,
			email: email,
			deliveryOption: deliveryOption,
		};
		res.json(laptopDonation);
	} catch (e) {
		console.error(e);
		res.sendStatus(400);
	}
});

router.get("/laptop_request/:id", async (req, res) => {
	try {
		const result = await db.query(
			"SELECT * from laptop_request WHERE id = $1",
			[req.params.id]
		);
		// let id = result.rows[0].id;
		let laptopRequest = {
			firstName: result.rows[0].firstname,
			lastName: result.rows[0].lastname,
			email: result.rows[0].email,
			phoneNumber: result.rows[0].phonenumber,
			status: result.rows[0].laptop_request_status,
		};

		if (laptopRequest.status === "ACTIVE") {
			const laptopAssignmentResult = await db.query(
				"SELECT * from laptop_assignment WHERE laptop_request_id = $1",
				[req.params.id]
			);

			let laptopAssignment = {};

			if (laptopAssignmentResult.rows.length > 0) {
				laptopAssignment = {
					status: laptopAssignmentResult.rows[0].status,
					assignmentId: laptopAssignmentResult.rows[0].id,
					donationID: laptopAssignmentResult.rows[0].laptop_donation_id,
					requestId: laptopAssignmentResult.rows[0].laptop_request_id,
				};
			} else {
				laptopAssignment = {
					status: "WAITING",
					assignmentId: null,
					donationID: null,
					requestId: null,
				};
			}
			laptopRequest.donationID = laptopAssignment.donationID;
			laptopRequest.assignmentId = laptopAssignment.assignmentId;
			laptopRequest.status = laptopAssignment.status;
		}

		res.send(laptopRequest);
	} catch (e) {
		console.error(e);
		res.sendStatus(400);
	}
});

router.get("/", (_, res) => {
	logger.debug("Welcoming everyone...");
	res.json({ message: "Hello, world!" });
});

router.post("/laptop_request", (req, res) => {
	let firstName = req.body.firstName;
	let lastName = req.body.lastName;
	let email = req.body.email;
	let phoneNumber = req.body.phoneNumber;
	const query =
		" insert into laptop_request (firstname, lastname, email, phonenumber) values ($1, $2, $3, $4) returning id";
	db.query(query, [firstName, lastName, email, phoneNumber])
		.then((queryResult) => res.send(queryResult.rows[0]))
		.catch((error) => {
			console.error(error);
			res.status(400).json({ success: " was not success" });
		});
}); //console.lo

router.get("/laptop_request", async (req, res) => {
	try {
		const result = await db.query("SELECT * from laptop_request");
		const laptopRequests = result.rows.map((row) => {
			return {
				firstName: row.firstname,
				lastName: row.lastname,
				email: row.email,
				phoneNumber: row.phonenumber,
			};
		});

		res.json(laptopRequests);
	} catch (e) {
		console.error(e);
		res.sendStatus(400);
	}
});

router.post("/laptop_donation", (req, res) => {
	// create a database table for
	let name = req.body.name;
	let address = req.body.address;
	let numberOfLaptops = req.body.numberOfLaptops;
	let phoneNumber = req.body.phoneNumber;
	let email = req.body.email;
	let deliveryOption = req.body.deliveryOption;

	const query =
		" insert into laptop_donation (name, address, number_of_laptops, phone_number, email, delivery_option) values ($1, $2, $3, $4, $5, $6)";

	db.query(query, [
		name,
		address,
		numberOfLaptops,
		phoneNumber,
		email,
		deliveryOption,
	])
		.then(() => res.send("result.rows"))
		.catch((error) => {
			console.error(error);
			res.status(400).json({ success: " was not   success" });
		});
});

router.get("/laptop_donation", async (req, res) => {
	try {
		const result = await db.query("SELECT * from laptop_donation");

		const laptopDonation = result.rows.map((row) => {
			return {
				name: row.name,
				address: row.address,
				numberOfLaptops: row.number_of_laptops,
				phoneNumber: row.phone_number,
				email: row.email,
				deliveryOption: row.delivery_option,
			};
		});
		res.json(laptopDonation);
	} catch (e) {
		console.error(e);
		res.sendStatus(400);
	}
});

// post laptop assignment
router.post("/laptop_assignment", (req, res) => {
	let laptopRequestId = req.body.laptop_request_id;
	let laptopDonationId = req.body.laptop_donation_id;
	let status = req.body.status;

	const query =
		" insert into laptop_assignment (laptop_request_id, laptop_donation_id, status) values ($1, $2, $3 ) returning id";

	db.query(query, [laptopRequestId, laptopDonationId, status])
		.then((queryResult) => res.send(queryResult.rows[0]))
		.catch((error) => {
			console.error(error);
			res.status(400).json({ success: " was not success" });
		});
});

router.put("/laptop_assignment/:assignmentId", async (req, res) => {
	const assignmentId = req.params.assignmentId;
	const newStatus = req.body.status;
	console.log;

	db.query("UPDATE laptop_assignment SET status = $1 WHERE id = $2", [
		newStatus,
		assignmentId,
	])
		.then(() => res.send(`status ${assignmentId} updated!`))
		.catch((e) => {
			console.error(e);
			res.status(404).send("status not found");
		});
});

router.delete("/laptop_assignment/:assignmentId", function (request, response) {
	const assignmentId = request.params.assignmentId;

	db.query("DELETE FROM laptop_assignment WHERE id=$1", [assignmentId])
		.then(() => response.send("removed"))
		.catch((e) => console.error(e));
});

export default router;
