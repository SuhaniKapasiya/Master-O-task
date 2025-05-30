const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/connectDB");
const gameRoutes = require("./routes/gameRoutes");
const authRoutes = require('./routes/authRoutes');

dotenv.config();


connectDB();

const app = express();

app.use(cors(
  {
    origin: "**", 
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, 
  }
));
app.use(express.json());


app.use("/api", gameRoutes);
app.use('/api/auth', authRoutes);


app.get("/", (req, res) => {
  res.json({ message: "Server is running!" });
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
