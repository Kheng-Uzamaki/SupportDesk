import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import Ticket from "../models/ticketModel.js";

// @desc Get user tickets
// @route GET /api/tickets
// @access Private
const getTickets = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(404);
    throw new Error("User not found!");
  }

  const tickets = await Ticket.find({ user: req.user.id });
  res.status(200).json(tickets);
});

// @desc Get single ticket
// @route GET /api/tickets/:id
// @access Private
const getTicket = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(404);
    throw new Error("User not found!");
  }

  const ticket = await Ticket.findById(req.params.id);

  if (!ticket) {
    res.status(404);
    throw new Error("Ticket not found!");
  }

  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Unauthorized to view this ticket!");
  }
  res.status(200).json(ticket);
});

// @desc Create new ticket
// @route POST /api/tickets
// @access Private
const createTicket = asyncHandler(async (req, res) => {
  const { product, description } = req.body;

  if (!product || !description) {
    res.status(400);
    throw new Error("Product and description are required!");
  }

  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(404);
    throw new Error("User not found!");
  }

  const ticket = await Ticket.create({
    product,
    description,
    user: req.user.id,
    status: "new",
  });

  res.status(201).json(ticket);
});

// @desc Delete ticket
// @route DELETE /api/tickets/:id
// @access Private
const deleteTicket = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(404);
    throw new Error("User not found!");
  }

  const ticket = await Ticket.findById(req.params.id);

  if (!ticket) {
    res.status(404);
    throw new Error("Ticket not found!");
  }

  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Unauthorized to delete this ticket!");
  }

  await ticket.deleteOne();
  res.status(200).json({ success: true });
});

// @desc Update ticket
// @route PUT /api/tickets/:id
// @access Private
const updateTicket = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(404);
    throw new Error("User not found!");
  }

  const ticket = await Ticket.findById(req.params.id);

  if (!ticket) {
    res.status(404);
    throw new Error("Ticket not found!");
  }

  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Unauthorized to update this ticket!");
  }

  const updatedTicket = await Ticket.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.status(200).json(updatedTicket);
});

export { getTickets, createTicket, getTicket, updateTicket, deleteTicket };
