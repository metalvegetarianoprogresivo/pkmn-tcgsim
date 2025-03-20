import "./App.css"
import { BoardStateUpdate } from "./boardstate/boardStateUpdate"
import { GameboardPlayerA } from "./boardstate/gameboardPlayerA"
import { Home } from "./home/home"

// We need to create the websocket server.
const socket = new WebSocket("ws://localhost:8080");

// Connection opened
socket.addEventListener("open", event => {
  socket.send(JSON.stringify({ message: "Connection established" }))
});

// Listen for messages
socket.addEventListener("message", event => {
  console.log("Message from server ", event.data)
});

const App = () => {
  return (
    <Home socket={socket}></Home>
  )
}

export default App;
