const mqtt = require("mqtt");

// Connect to the MQTT broker
const username = "username";
const password = "password";

const client = mqtt.connect("ws://172.21.236.6:9001", {
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
  });
});

// Handle errors
client.on("error", (err) => {
  console.error("Connection error:", err);
});

// Close the client after a delay (optional)
// setTimeout(() => {
//   client.end();
//   console.log("Disconnected from MQTT broker");
// }, 5000);
