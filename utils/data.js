const name =
[
  "darealmj23",
  "mvpkb",
  "vipkg",
  "rayallen",
  "timduncan",
  "stevenash",
  "finalsmvp",
  "floorgeneral",
  "superman34",
  "mrclutch",
  "alleniverson",
  "roberthorry",
  "claymatthews",
  "mrwonderful",
  "bigshotbob",
  "wiltdastilt",
  "byronscott",
  "dennisrodman",
  "benwallace",
  "davidrobinson",
];

const mail =
[
  "mj23@gmail.com",
  "kb24@gmail.com",
  "vip@gmail.com",
  "mvp@gmail.com",
  "mrclutch@gmail.com",
  "general@gmail.com",
  "bank@gmail.com",
  "dribble@gmail.com",
  "dunker@gmail.com",
  "deez@gmail.com",
  "timmy@gmail.com",
  "david@gmail.com",
  "bigshot@gmail.com",
  "allen@gmail.com",
  "wilt33@gmail.com",
  "bigben@gmail.com",
  "mrwonderful@gmail.com",
  "clutch@gmail.com",
  "scott@gmail.com",
  "rodman@gmail.com",
];

const reacts = 
[
  "Cool...!",
  "Interesting...!",
  "Incredible...!",
  "Boring...!",
  "Funny...!",
  "Fantastic...!",
  "Superb...!",
  "Scary...!",
  "Unpredictable...!",
  "Crazy...!",
  "Cool...!",
  "Interesting...!",
  "Incredible...!",
  "Boring...!",
  "Funny...!",
  "Fantastic...!",
  "Superb...!",
  "Scary...!",
  "Unpredictable...!",
  "Crazy...!",
]

const thoughts =
[
  "Check this out...!",
  "See me at the event tonight...!",
  "What time does the event start...?",
  "Make sure to leave a thought...!",
  "Create a link for the event...!",
  "Make sure to add me on your friend's list...!",
  "Post a reaction to the thoughts...!",
  "Look at all of the reactions...!",
  "Add a thought...then a reaction...!",
  "Looking forward to tonight's event...!",
];


//GET RANDOM ITEM GIVEN AN ARRAY//
const getRandomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

//GET RANDOM USERNAME + EMAIL --> USER INFO//
const getRandomUser = () =>
  `${getRandomArrItem(name)} ${getRandomArrItem(mail)}`;

//GET RANDOM FRIENDS --> USER OBJECT//
const getRandomFriends = () =>
  `${name}${Math.floor(Math.random() * (99 - 18 + 1) + 18)}`;

//GET RANDOM THOUGHTS --> USER OBJECT//
const getRandomThoughts = () =>
  `${getRandomArrItem(thoughts)}`;

//GET RANDOM REACTIONS --> THOUGHT OBJECT//
const getReactionBody = () =>
  `${getRandomArrItem(reacts)}`;

//GENERATE RANDOM THOUGHTS --> USER OBJECT//
const getRandomThought = (int) => {
    const results = [];
    for (let i = 0; i < int; i++) {
      results.push({
        thoughtText: getRandomArrItem(thoughts),
      });
    }
    return results;
  };
//GENERATE RANDOM REACTIONS --> THOUGHT OBJECT//
const getRandomReactions = (int) => {
  const results = [];
  for (let i = 0; i < int; i++) {
    results.push({
      reactionBody: getRandomArrItem(reacts),
    });
  }
  return results;
};

// Export the functions for use in seed.js
module.exports = { getRandomUser, getRandomFriends, getRandomThought, getRandomThoughts, getRandomReactions, getReactionBody };