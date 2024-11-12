const mqtt = require("mqtt");
const { Client } = require("pg");

// Connect to the MQTT broker
const username = "username";
const password = "password";

const client = mqtt.connect("ws://172.21.236.6:9001", {
  username,
  password,
});
const topic = "test/topic";
const pgClient = new Client({
  user: "user",
  host: "db",
  database: "mqtt_db",
  password: "password",
  port: 5432,
});
pgClient.connect();

pgClient.query(
  `
  CREATE TABLE IF NOT EXISTS messages (
    id SERIAL PRIMARY KEY,
    msg TEXT
  )
`,
  (err, res) => {
    if (err) {
      console.error("Error creating table:", err);
    } else {
      console.log("Table is ready");
    }
  }
);

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
    pgClient
      .query("INSERT INTO messages (msg) VALUES ($1)", [data.msg])
      .then((res) => {
        console.log("Data inserted successfully:", res);
      })
      .catch((err) => {
        console.error("Error inserting data:", err);
      });
  });
});
// Handle errors
client.on("error", (err) => {
  console.error("Connection error:", err);
});
