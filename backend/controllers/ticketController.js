import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import Ticket from "../models/ticketModel.js";


// @desc Get user tickets
// @route GET/api/tickets
// @access Private
const getTickets = asyncHandler(async (req, res) => {
  res.status(200).json({message: 'tickets'});
});

// @desc create new ticket
// @route POST/api/tickets
// @access Priavte
const createTicket = asyncHandler(async (req, res) => {
  res.status(200).json({message: 'Create new ticket'});
});

export {getTickets, createTicket}