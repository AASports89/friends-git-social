const connection = require("../config/connection");
const { User, Thought } = require("../models");
const { getRandomUser, getRandomFriends, getRandomReactions, getRandomThoughts, getRandomThought } = require("./data");

connection.on("error", (err) => err);

connection.once("open", async () => {
    console.log("connected");
//DROP EXISTING USERS//
    await User.deleteMany({});
//DROP EXISTING THOUGHTS//
    await Thought.deleteMany({});
//EMPTY ARRAY TO HOLD USERS//
    const users = [];
    const thoughts = [];
//LOOP 5-TIMES --> ADD USERS TO USER ARRAY//
for (let i = 0; i < 3; i++) {
//GET SOME RANDOM THOUGHTS & REACTIONS USING HELPER FUNCTION --> IMPORTED VIA ./DATA//
const friends = getRandomFriends(3);
const reactions = getRandomReactions(3);
const thought = getRandomThought(3);
const user = getRandomUser();
const username = user.split(' ')[0];
const email = user.split(' ')[1];
    users.push({
        username,
        email,
        friends,
        thought,
        reactions,
    });
const thoughtText = getRandomThoughts();
    thoughts.push({
        username,
        thoughtText,
        reactions,
    });
}

//ADD USERS TO THE COLLECTION --> AWAIT RESULTS//
await User.collection.insertMany(users);

//THOUGHTS TO THE COLLECTION --> AWAIT RESULTS//
await Thought.collection.insertMany(thoughts);

//LOGOUT SEED DATA --> INDICATES WHAT SHOULD APPEAR//
    console.table(users);
    console.table(thoughts);
    console.info("Seeding complete✅🎄");
    process.exit(0);
});