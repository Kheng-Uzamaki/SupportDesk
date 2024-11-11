import express from "express";
const noteRouter = express.Router({ mergeParams: true });

import { protect } from "../middleware/authMiddleware.js";
import { getNotes, addNote } from "../controllers/noteController.js";

noteRouter.route("/").get(protect, getNotes).post(protect, addNote);

export default noteRouter;
