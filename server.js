const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const restaurant_routes = require("./routes/restaurant.routes");

const connectionString = "mongodb+srv://shaily:shaily@upgradcluster.exw4wt8.mongodb.net/HackathonDB";

mongoose
    .connect(connectionString)
    .then((res) => console.log("Connected to db successfully"))
    .catch((ex) => console.log(ex));

const app = express();

const corsOptions = {
    exposedHeaders: ["x-auth-token", "Authorization"],
};

app.use(cors(corsOptions));

app.use(cors());
app.use(express.json());

restaurant_routes(app);

app.listen(3001, () => console.log("Listening on port 3001..."));