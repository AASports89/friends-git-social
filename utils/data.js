const usernames =
[
  "da_real_mj23",
  "mvp_kb",
  "vip_kg",
  "ray_allen",
  "tim_duncan",
  "steve_nash",
  "finals_mvp",
  "floor_general",
  "superman_34",
  "mr_clutch",
  "allen_iverson",
  "robert_horry",
  "clay_matthews",
  "mr_wonderful",
  "big_shot_bob",
  "wilt_da_stilt",
  "byron_scott",
  "dennis_rodman",
  "ben_wallace",
  "david_robinson",
];

const emails =
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

const friends = 
[
  "shaq_34",
  "lbj_06",
  "tony_parker",
  "steph_curry",
  "jason_will",
  "webber_04",
  "divac_33",
  "penny_01",
  "chuck_barkley",
  "s_pippen33",
  "kobe_08",
  "black_mamba",
  "kareem_33",
  "baylor_23",
  "aaron_rodgers",
  "matthew_staff",
  "beast_mode",
  "russell_wilson",
  "patriot_tom",
  "dallas_cowboy",
]

const reactions = 
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
  "Very good...!",
  "Foolish...!",
  "Contemporary...!",
  "Correct...!",
  "Wrong reaction...!",
  "Fancy...!",
  "Dull...!",
  "Creepy...!",
  "Constructive...!",
  "Critical...!",
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
  "Tomorrow's event will be great...!",
  "How long is the event going to last...?",
  "Thoughts are important...!",
  "How many reactions did you see...?",
  "Events are the perfect places for networking...!",
  "Combine the thoughts with reactions...!",
  "Interpret the reactions as you please...!",
  "How many events will there be...?",
  "Congratulations on the win...!",
  "Why did they lose yesterday...?",
];

//GET RANDOM ITEM GIVEN AN ARRAY//
const getRandomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

//GET RANDOM USERNAME + EMAIL --> USERS//
const getRandomUser = () =>
  `${getRandomArrItem(usernames)} ${getRandomArrItem(emails)}`;

//GET RANDOM THOUGHTS --> USER OBJECT//
const getRandomThoughts = () =>
  `${getRandomArrItem(thoughts)}`;

//GET RANDOM FRIENDS --> USER OBJECT//
const getFriends = () =>
  `${getRandomArrItem(friends)}`;

//GENERATE RANDOM FRIENDS --> USER OBJECT//
const getRandomFriends = (int) => {
  const results = [];
    for (let i = 0; i < int; i++) {
      results.push({
        friends: getRandomArrItem(friends),
      });
    }
    return results;
  };

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
      reactionBody: getRandomArrItem(reactions),
    });
  }
  return results;
};

// Export the functions for use in seed.js
module.exports = { getRandomUser, getFriends, getRandomFriends, getRandomThought, getRandomThoughts, getRandomReactions };