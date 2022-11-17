import { request } from "express";
import { Router } from "express";
import db from "./db";

import logger from "./utils/logger";

const router = Router();

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
		} else {
			laptopRequest.donationID = null;
			laptopRequest.assignmentId = null;
			laptopRequest.status = "CANCELLED";
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

router.post("/laptop_request", async (req, res) => {
	let firstName = req.body.firstName;
	let lastName = req.body.lastName;
	let email = req.body.email;
	let phoneNumber = req.body.phoneNumber;

	let laptopDonationResult = await db.query(
		"SELECT * FROM laptop_donation d WHERE (SELECT COUNT(*) FROM laptop_assignment a WHERE a.laptop_donation_id = d.id) < d.number_of_laptops ORDER BY d.id LIMIT 1"
	);
	let laptopDonation = {};
	if (laptopDonationResult.rows.length > 0) {
		laptopDonation = {
			id: laptopDonationResult.rows[0].id,
		};
	}
	const query =
		" insert into laptop_request (firstname, lastname, email, phonenumber) values ($1, $2, $3, $4) returning id";
	db.query(query, [firstName, lastName, email, phoneNumber])
		.then((queryResult) => {
			if (laptopDonation.id) {
				const assignmentQuery =
					" insert into laptop_assignment (laptop_donation_id, laptop_request_id) values ($1, $2)";
				db.query(assignmentQuery, [laptopDonation.id, queryResult.rows[0].id]);
			}
			res.send(queryResult.rows[0]);
		})
		.catch((error) => {
			console.error(error);
			res.status(400).json({ success: " was not success" });
		});
});

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
		" insert into laptop_donation (name, address, number_of_laptops, phone_number, email, delivery_option) values ($1, $2, $3, $4, $5, $6) returning id, number_of_laptops";

	db.query(query, [
		name,
		address,
		numberOfLaptops,
		phoneNumber,
		email,
		deliveryOption,
	])
		.then(async (queryResult) => {
			const requestIDResult = await db.query(
				"SELECT id FROM laptop_request  WHERE id NOT IN (SELECT laptop_request_id FROM laptop_assignment)"
			);

			let numberOfLaptops = queryResult.rows[0].number_of_laptops;
			/* comparing the number of requests to the number of laptops donated 
			Then mapping the number of requests the available laptops*/
			if (requestIDResult.rows.length > 0) {
				requestIDResult.rows.map((row) => {
					if (numberOfLaptops > 0) {
						const assignmentQuery =
							" insert into laptop_assignment (laptop_donation_id, laptop_request_id) values ($1, $2)";
						db.query(assignmentQuery, [queryResult.rows[0].id, row.id]);
						numberOfLaptops--;
					}
				});
				res.status(200).json({ success: " was success" });
			} else {
				res.status(404).json({ success: "No unassigned laptop_requests" });
			}
		})
		.catch((error) => {
			console.error(error);
			res.status(400).json({ success: " was not success" });
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

router.put("/laptop_request/:id", async (req, res) => {
	const laptopRequest = {
		id: req.params.id,
		status: "CANCELLED",
	};

	db.query(
		"UPDATE laptop_request SET laptop_request_status = $1 WHERE id = $2",
		[laptopRequest.status, laptopRequest.id]
	)
		.then(() => res.send(`status ${laptopRequest.id} updated!`))
		.catch((e) => {
			console.error(e);
			res.status(404).send("Request not found");
		});
});

router.delete("/laptop_assignment/:assignmentId", async (request, response) => {
	const assignmentId = request.params.assignmentId;

	db.query("DELETE FROM laptop_assignment WHERE id=$1", [assignmentId])
		.then(() => response.send("removed"))
		.catch((e) => console.error(e));
});

export default router;
