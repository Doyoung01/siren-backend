const express = require("express");
const mongoose = require("mongoose");
const router = require("./routes/users");
const errorHandler = require("./middlewares/errorHandle");

const app = express();
const port = 8000;

// connect to MongoDB
mongoose.connect("mongodb+srv://jjyo0108:jiNd9acsdx0hV32T@siren.5hpctnk.mongodb.net/UnityLogin?retryWrites=true&w=majority&appName=Siren")
    .then(() => console.log("DB connected with server well"))
    .catch(error => console.log(error));

app.use(express.json());

// routes
app.use("/", router);

// error handling
app.use(errorHandler);

app.listen(port, () => {
    console.log("server is running on", port);
});
