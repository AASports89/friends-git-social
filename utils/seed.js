const connection = require("../config/connection");
const { Users, Thoughts } = require("../models");
const users = require("./data");

connection.on("error", (err) => err);

connection.once("open", async () => {
    console.log("Connected");

    await User.deleteMany({});

    await User.insertMany(users);

    console.info("Seeding complete");
    process.exit(0);
});