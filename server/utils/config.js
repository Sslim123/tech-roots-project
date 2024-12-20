import "dotenv/config";

export default {
	dbUrl: createDatabaseUrl(),
	logLevel: process.env.LOG_LEVEL ?? "info",
	port: parseInt(process.env.PORT ?? "", 10),
	production: process.env.NODE_ENV === "production",
};

function createDatabaseUrl() {
	if (process.env.DATABASE_URL) {
		return process.env.DATABASE_URL;
	}
	const host = process.env.DB_HOST ?? "localhost";
	const name = process.env.DB_NAME ?? "cyf";
	const password = process.env.DB_PASS ?? process.env.DB_PASSWORD ?? "coder123";
	const port = process.env.DB_PORT ?? "5432";
	const username = process.env.DB_USER ?? process.env.DB_USERNAME ?? "postgres";
	return `postgres://${username}:${password}@${host}:${port}/${name}`;
}
