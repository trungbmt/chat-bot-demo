import { BASE_URL_WS } from "@config/axios";
import { io } from "socket.io-client";

const socket = io(BASE_URL_WS);

export { socket };
