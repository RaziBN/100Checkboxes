const express = require("express");
const path = require("path");
const http = require("http");
const socketIo = require("socket.io");
const { loadCheckboxStates, saveCheckboxStates } = require("./database"); // Import functions

const app = express();
const server = http.createServer(app);
const io = socketIo(server);
const PORT = process.env.PORT || 3000;

// Set EJS as the templating engine
app.set("view engine", "ejs");

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

// Route for the home page
app.get("/", (req, res) => {
  res.render("index");
});

// Initialize checkbox states
let checkboxStates = Array(100).fill(false);

// Load initial state from the database
loadCheckboxStates()
  .then((states) => {
    checkboxStates = states;
  })
  .catch((err) => {
    console.error("Error loading checkbox states:", err);
  });

// Handle socket connections
io.on("connection", (socket) => {
  console.log("New client connected");

  // Send current checkbox states to the new client
  socket.emit("initialState", checkboxStates);

  // Handle checkbox change
  socket.on("checkboxChange", async (data) => {
    checkboxStates[data.index] = data.checked;
    io.emit("checkboxUpdate", data); // Broadcast the change to all clients
    try {
      await saveCheckboxStates(checkboxStates); // Save the state to the database
    } catch (err) {
      console.error("Error saving checkbox states:", err);
    }
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
