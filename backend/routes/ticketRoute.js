import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  getTickets,
  createTicket,
  getTicket,
  deleteTicket,
  updateTicket,
} from "../controllers/ticketController.js";
const ticketRouter = express.Router();

import noteRouter from "./noteRoute.js";

ticketRouter.use("/:ticketId/notes", noteRouter);
ticketRouter.route("/").get(protect, getTickets).post(protect, createTicket);

ticketRouter
  .route("/:id")
  .get(protect, getTicket)
  .delete(protect, deleteTicket)
  .put(protect, updateTicket);
export default ticketRouter;
