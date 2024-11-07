import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { getTickets, createTicket } from "../controllers/ticketController.js";
const ticketRouter = express.Router();

ticketRouter.route("/").get(protect, getTickets).post(protect, createTicket);

export default ticketRouter;