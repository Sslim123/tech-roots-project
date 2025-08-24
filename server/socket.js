/* eslint-disable prettier/prettier */
import { Server } from "socket.io";
import logger from "./utils/logger";

export const getRequestRoomName = (requestUuid) => {
	return "laptop_request:" + requestUuid;
};

export let io = null;
export const initSocket = (server) => {
	io = new Server(server, { path: "/api/socket.io" });
	io.on("connection", (socket) => {
		socket.on("laptop_request:subscribe", function ({ requestId }) {
			socket.join(getRequestRoomName(requestId));
			logger.info("received" + requestId);
		});
	});
};
