const WebSocket = require("ws");

const ws = new WebSocket("ws://localhost:4455");

ws.on("open", () => {
  console.log("Connected to OBS WebSocket server!");
  // Request scenes
  ws.send(JSON.stringify({ "request-type": "GetSceneList", "message-id": "scenes" }));
});

ws.on("message", (data) => {
  console.log("Received message:", data.toString());
  const message = JSON.parse(data);

});