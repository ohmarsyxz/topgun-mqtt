const express = require("express");
const mongoose = require("mongoose");
const messageModel = require("./Models/messageModel")

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome our chat app APIs");
  const exampleEntry = new messageModel({ msg: 'John Doe' });
  exampleEntry.save()
    .then(() => console.log('Data saved'))
    .catch(err => console.error('Save error:', err));
});


const port = 5001;
const uri =
  "mongodb://username:password@localhost:27017/";

app.listen(port, "0.0.0.0", (req, res) => {
  console.log(`Server running on port: ${port}`);
});

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connection established"))
  .catch((err) => console.log("MongoDB connection failed: ", err.message));
