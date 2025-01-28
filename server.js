const express = require("express");
const colors = require("colors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const connectDb = require("./config/db");
const path = require("path");
// rest object
const app = express();

// middleware
app.use(express.json());
app.use(morgan("dev"));

dotenv.config();

// mongoconnc
connectDb();
// routes
app.use("/api/v1/user", require("./routes/userRoutes"));
app.use("/api/v1/doctor", require("./routes/doctorRoutes"));
app.use("/api/v1/admin", require("./routes/adminRoutes"));
app.use("/api/v1/feedback", require("./routes/feedBackRoute"));
app.use("/uploads", express.static("uploads"));
// port

app.use(express.static(path.join(__dirname, "./client/build")));

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});
const port = process.env.PORT || 8080;

// listen the port
app.listen(port, () => {
  console.log(
    `Server running on development mode ${process.env.PORT}`.bgYellow.black
  );
});
