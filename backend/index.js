const express = require("express");
const todoRoute = require('./routes/todo')
const cors = require('cors')
const { connectMongodb } = require("./connnect");

require('dotenv').config(); 

const app = express();

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

//Connect mongodb
connectMongodb(MONGO_URI)
  .then(() => console.log("Mongodb connected"))
  .catch((err) => console.log(err));

// Middlewares _default
app.use(express.json())
app.use(cors({
  origin: "http://localhost:5173", // allow  frontend
  methods: ["GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS"], // allow required methods
  credentials: true // if using cookies or authentication
}));

app.get("/", (req, res) => {
  res.send("Hello World!");
}); 

//Routes
app.use('/todo' , todoRoute)

app.listen(PORT, () => {
  console.log("Server is running at http://localhost:" + PORT);
});
