const express = require("express");
const cors = require("cors");
const jsonwebtoken = require("jsonwebtoken");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const mainRouter = require("./routes/mainRouter");
dotenv.config();
const port = process.env.PORT || 3001;
const hostname = process.env.HOSTNAME || "localhost";
const dbUrl = process.env.URL;

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const connection = mongoose.connection;
connection.once("open", () => {
    console.log("Database connected successfully");
});
// connection.on("Error", (err) => {
//     console.error("Error: ", err);
// });

app.get("/", (req, res) => {
    res.send("Its working");
});
app.use("/api/", mainRouter);

app.listen(port, hostname, () => {
    console.log(`Server is running on http://${hostname}:${port}`);
});
