const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
    {
      msg: { type: String, required: true, minlength: 3, maxlength: 30 },
    },
    {
      timestamps: true,
    }
  );
  
  const messageModel = mongoose.model("Messages", messageSchema)
  
  module.exports = messageModel
  