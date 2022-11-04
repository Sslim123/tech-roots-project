import { Router } from "express";
import db from "./db";

import logger from "./utils/logger";

const router = Router();

router.get("/", (_, res) => {
	logger.debug("Welcoming everyone...");
	res.json({ message: "Hello, world!" });
});
router.post("/laptop_request", (req, res) => {
	let firstOne = req.body.firstName;
	let secondOne = req.body.secondName;
	let emailOne = req.body.email;
	let phonOne = req.body.phoneNumber;
	const query =
		" insert into laptop_request (firstname, lastname, email, phonenumber) values ($1, $2, $3, $4)";
	db.query(query, [firstOne, secondOne, emailOne, phonOne])
		.then(() => res.send("result.rows"))
		.catch((error) => {
			console.error(error);
			res.status(400).json({ success: " was not   success" });
		});
}); //console.lo

export default router;
