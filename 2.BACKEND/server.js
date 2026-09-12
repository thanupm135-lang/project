const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// Demo username and password
const USERNAME = "Thanu";
const PASSWORD = "12345";

// Login API
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (username === USERNAME && password === PASSWORD) {
    return res.json({
      success: true,
      message: "Login successful",
    });
  }

  return res.status(401).json({
    success: false,
    message: "Invalid username or password",
  });
});

app.listen(5000, () => {
  console.log("Backend server running on http://localhost:5000");
});