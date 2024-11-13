import "./App.css";
import mqtt from "mqtt";
import { useEffect, useState } from "react";

function App() {
  const [mqttData, setMqttData] = useState([]);
  const [listeningTopic, setListeningTopic] = useState("");
  const [inputTopic, setInputTopic] = useState("");
  const [listening, setListening] = useState(false);

  const username = "username";
  const password = "password";

  useEffect(() => {
    const client = mqtt.connect("ws://172.21.236.10:9001", {
      username: username,
      password: password,
    });

    console.log("Connecting to MQTT broker...");

    client.on("connect", () => {
      console.log("Connected to MQTT broker");

      if (listeningTopic) {
        client.subscribe(listeningTopic, (err) => {
          if (!err) {
            console.log(`Subscribed to topic: ${listeningTopic}`);
          } else {
            console.error("Subscription error:", err);
          }
        });
      }
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
  }, [listeningTopic]);

  const handleButtonClick = () => {
    if (inputTopic.trim() !== "") {
      setListeningTopic(inputTopic);
      setListening(true);
      setMqttData([]);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h1>
        {listening ? `Listening to ${listeningTopic}` : "Set Listening Topic"}
      </h1>
      <input
        type="text"
        id="topic"
        name="topic"
        placeholder="Type your topic"
        value={inputTopic}
        onChange={(e) => setInputTopic(e.target.value)}
      />
      <button type="button" onClick={handleButtonClick}>
        {listening ? "Listening ..." : "Start Listening"}
      </button>
      {mqttData.map((data, index) => (
        <div key={index}>
          <p>{data.msg}</p>
        </div>
      ))}
    </div>
  );
}

export default App;
