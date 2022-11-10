import { Router } from "express";
import db from "./db";

import logger from "./utils/logger";

const router = Router();

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
		" insert into laptop_request (firstname, lastname, email, phonenumber) values ($1, $2, $3, $4)";
	db.query(query, [firstName, lastName, email, phoneNumber])
		.then(() => res.send("result.rows"))
		.catch((error) => {
			console.error(error);
			res.status(400).json({ success: " was not   success" });
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

export default router;
