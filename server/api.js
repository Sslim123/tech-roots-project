import { Router } from "express";
import db from "./db";

import logger from "./utils/logger";

const router = Router();

router.get("/", (_, res) => {
	logger.debug("Welcoming everyone...");
	res.json({ message: "Hello, world!" });
});
router.post("/laptop_request", (req, res) => {
	let firstName = req.body.First_Name;
	let lastName = req.body.Last_Name;
	let email = req.body.Email_Address;
	let phoneNumber = req.body.Phone_Number;
	const query =
		" insert into laptop_request (First_Name, Last_Name, Email_Address, Phone_Number) values ($1, $2, $3, $4)";
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
				firstName: row.First_Name,
				lastName: row.Last-Name,
				email: row.Email_Address,
				phoneNumber: row.Phone_Number,
			};
		});
		res.json(laptopRequests);
	} catch (e) {
		console.error(e);
		res.sendStatus(400);
	}
});

export default router;
