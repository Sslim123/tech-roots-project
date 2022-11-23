import { Server } from "socket.io";
import logger from "./utils/logger";

export let io = null;
export const initSocket = (server) => {
	io = new Server(server, { path: "/api/socket.io" });
	io.on("connection", (socket) => {
		socket.on("test", function ({ requestId }) {
			logger.info("received" + requestId);
		});
	});
};
