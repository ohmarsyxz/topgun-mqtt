const mqtt = require("mqtt");
const express = require("express");
const mongoose = require("mongoose");
const messageModel = require("./Models/messageModel");

// Connect to the MQTT broker
const username = "username";
const password = "password";

const client = mqtt.connect("ws://172.21.236.10:9001", {
  username,
  password,
});
const topic = "test/topic";

// When a message is received
client.on("connect", () => {
  console.log("Connected to MQTT broker");

  client.subscribe(topic, (err) => {
    if (!err) {
      console.log(`Subscribed to topic: ${topic}`);
    } else {
      console.error("Subscription error:", err);
    }
  });
  client.on("message", (topic, message) => {
    console.log(`Message in topic ${topic} is: ${message}`);

    const data = JSON.parse(message.toString());
    console.log("Data:", data);

    const exampleEntry = new messageModel(data);
    exampleEntry
      .save()
      .then(() => console.log("Data saved"))
      .catch((err) => console.error("Save error:", err));

  });
});

// connect to mongodb
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome our chat app APIs");
  

});

const port = 5001;
const uri = "mongodb://seeit2024:seeit2024@localhost:27017/";

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
