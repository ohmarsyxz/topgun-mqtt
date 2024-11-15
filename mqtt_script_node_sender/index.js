const mqtt = require("mqtt");

const username = "username";
const password = "password";

// Connect to the MQTT broker
const client = mqtt.connect("mqtt://172.21.236.10:1883", { username, password });

// When the client connects
client.on("connect", () => {
  console.log("Connected to MQTT broker");

  // Subscribe to a test topic
  const topic = "test/topic";
  client.subscribe(topic, (err) => {
    if (!err) {
      console.log(`Subscribed to topic: ${topic}`);

      // Publish a test message to the same topic

      setInterval(() => {
        client.publish(topic, JSON.stringify({'msg': 'Hello Nodejs'}));
        console.log("Message published");
      }, 10000);
    } else {
      console.error("Subscription error:", err);
    }
  });
});

// When a message is received
client.on("message", (topic, message) => {
  console.log(`Message received on topic '${topic}': ${message.toString()}`);
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
