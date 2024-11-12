import "./App.css";
import mqtt from "mqtt";
import { useEffect, useState } from "react";

function App() {
  const [mqttData, setMqttData] = useState([]);

  const username = "username";
  const password = "password";

  useEffect(() => {
    const client = mqtt.connect("ws://172.21.236.6:9001", {
      username: username,
      password: password,
    });
    console.log("hello", client);
    const topic = "test/topic";

    client.on("connect", () => {
      console.log("Connected to MQTT broker");

      client.subscribe(topic, (err) => {
        if (!err) {
          console.log(`Subscribed to topic: ${topic}`);
        } else {
          console.error("Subscription error:", err);
        }
      });
    });

    client.on("message", (topic, message) => {
      setMqttData((prevMessages) => [
        ...prevMessages,
        JSON.parse(message.toString()),
      ]);
    });

    return () => {
      client.end();
    };
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h1>Hello world</h1>
      {mqttData.map((data, index) => (
        <div key={index}>
          <p>{data.msg}</p>
        </div>
      ))}
    </div>
  );
}

export default App;
