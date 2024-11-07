import mongoose from "mongoose";

const ticketSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    product: {
      type: String,
      required: [true, "Please Select a product"],
      enum: ["iphone", "Macbook Pro", "iMac", "ipad"],
    },
    description: {
      type: String,
      required: [true, "Please enter a description of issue"],
    },
    status: {
      type: String,
      required: true,
      enum: ["new", "open", "closed"],
      default: "new",
    },
  },
  {
    timestamps: true,
  }
);

// Create and export the Ticket model
const Ticket = mongoose.model("Ticket", ticketSchema);
export default Ticket;
