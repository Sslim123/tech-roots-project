import Pool from "pg";
import config  from "./config";
import readFileSync from "fs";

const createSchema = readFileSync(require.resolve("./db_setup.sql"))
	.toString();
const populateDb = readFileSync(require.resolve("./db_populate.sql"))
	.toString();
const pool = new Pool(config);

queryDb(createSchema)
	.then(() => console.log("schema created successfully"))
	.then(() => queryDb(populateDb))
	.then(() => console.log("data populated successfully"))
	.then(() => process.exit(0));

function queryDb(query) {
	return pool.query(query).catch((error) => {
		console.log("error: ", error);
		process.exit(1);
		throw error;
	});
}
