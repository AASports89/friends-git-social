# **Friends Git Social** [![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](#isc-license)
---

## Overview
---
**Friends Git Social** utilizes ```MongoDB```, a popular choice for many social networks due to its speed with large amounts of data and flexibility with unstructured data. The technology behind **Friends Git Social** allows it to operate as a "full-stack" application. ```MongoDB``` centers on the movement of consistently changing data, thus it is a vital part of the functionality of **Friends Git Social**.

Through the use of a dynamic ```API``` **Friends Git Social** is an user-friendly and intuitive social network web application where users can share their thoughts, react to friends’ thoughts, and create a friend list. ```Express.js``` is utilized for routing, ```MongoDB``` as database, and ```Mongoose ODM``` to retrieve data linked to user activities. Lastly, dynamic ```JavaScript``` ensures that data is accurately and consistently dated.

> **Note**: For a more detailed insight into the functionality and capabilities of **Friends Git Social**, feel free to refer to the video walkthrough link provided below.

## Table of Contents
---

  * [Overview](#overview)
  * [User Story](#user-story)
  * [Acceptance Criteria](#acceptance-criteria)
  * [Getting Started](#getting-started)
  * [Installation and Running Locally](#installation-and-running-locally)
  * [Mock Up](#mock-up)
  * [Video Walkthrough](#video-walkthrough)
  * [GitHUB Repository](#github-repository)
  * [Evaluation Guideline](#evaluation-guideline)
  * [Questions](#questions)
  * [License](#isc-license)

## User Story
---

```md
AS A social media startup
I WANT an API for my social network that uses a NoSQL database
SO THAT my website can handle large amounts of unstructured data
```

## Acceptance Criteria
---
> **Note:** The following criteria is used to determine if the standards set for **Friends Git Social** have been met:

```md
GIVEN a social network API
WHEN I enter the command to invoke the application
THEN my server is started and the Mongoose models are synced to the MongoDB database
WHEN I open API GET routes in Insomnia for users and thoughts
THEN the data for each of these routes is displayed in a formatted JSON
WHEN I test API POST, PUT, and DELETE routes in Insomnia
THEN I am able to successfully create, update, and delete users and thoughts in my database
WHEN I test API POST and DELETE routes in Insomnia
THEN I am able to successfully create and delete reactions to thoughts and add and remove friends to a user’s friend list
```
## Getting Started
----

> **Important:** Be sure to have MongoDB installed on your machine. Follow the [MongoDB installation guide on The Full-Stack Blog](https://coding-boot-camp.github.io/full-stack/mongodb/how-to-install-mongodb) to install MongoDB locally.

Use the following guidelines to set up your models and ```API``` routes:

### Models

**User:**
```
* `username`
  * String
  * Unique
  * Required
  * Trimmed
```
```
* `email`
  * String
  * Required
  * Unique
  * Must match a valid email address (look into Mongoose's matching validation)
```
```
* `thoughts`
  * Array of `_id` values referencing the `Thought` model
```
```
* `friends`
  * Array of `_id` values referencing the `User` model (self-reference)
```

**Schema Settings:**

Create a virtual called ```friendCount``` that retrieves the length of the user's ```friends``` array field on query.

---

**Thought:**
```
* `thoughtText`
  * String
  * Required
  * Must be between 1 and 280 characters
```
```
* `createdAt`
  * Date
  * Set default value to the current timestamp
  * Use a getter method to format the timestamp on query
```
```
* `username` (The user that created this thought)
  * String
  * Required
```
```
* `reactions` (These are like replies)
  * Array of nested documents created with the `reactionSchema`
```

**Schema Settings:**

Create a virtual called ```reactionCount``` that retrieves the length of the thought's ```reactions``` array field on query.

---

**Reaction** (SCHEMA ONLY)
```
* `reactionId`
  * Use Mongoose's ObjectId data type
  * Default value is set to a new ObjectId
```
```
* `reactionBody`
  * String
  * Required
  * 280 character maximum
```
```
* `username`
  * String
  * Required
```
```
* `createdAt`
  * Date
  * Set default value to the current timestamp
  * Use a getter method to format the timestamp on query
```

**Schema Settings:**

This will not be a model, but rather will be used as the ```reaction``` field's subdocument schema in the ```Thought``` model.

### API Routes

**```/api/users```**

* ```GET``` all users

* ```GET``` a single user by its ```_id``` and populated thought and friend data

* ```POST``` a new user:

### Sample Data
---
```json
{
  "username": "lernantino",
  "email": "lernantino@gmail.com"
}
```

* ```PUT``` to update a user by its ```_id```

* ```DELETE``` to remove user by its ```_id```

**BONUS:** Remove a user's associated thoughts when deleted.

---

**```/api/users/:userId/friends/:friendId```**

* ```POST``` to add a new friend to a user's friend list

* ```DELETE``` to remove a friend from a user's friend list

---

**```/api/thoughts```**

* ```GET``` to get all thoughts

* ```GET``` to get a single thought by its ```_id```

* ```POST``` to create a new thought (don't forget to push the created thought's ```_id``` to the associated user's ```thoughts``` array field)

### Sample Data
---
```json
{
  "thoughtText": "Here's a cool thought...",
  "username": "lernantino",
  "userId": "5edff358a0fcb779aa7b118b"
}
```

* ```PUT``` to update a thought by its ```_id```

* ```DELETE``` to remove a thought by its ```_id```

---

**```/api/thoughts/:thoughtId/reactions```**

* ```POST``` to create a reaction stored in a single thought's ```reactions``` array field

* ```DELETE``` to pull and remove a reaction by the reaction's ```reactionId``` value

## Installation and Running Locally
---

> **Important:** Once, the source code has been cloned from the repository @https://github.com/AASports89/friends-git-social & the ```MongoDB``` database set up:

 Enter the following:

 ```
 npm i express
 ```
 -followed by-
 ```
 npm i mongoose
 ```
 -followed by-
 ```
 npm i nodemon
 ```
 -followed by-
 ```
 node seed/index.js
 ```
 -OR-
 ```
 npm run seed
 ```
 -followed by-
 ```
 node server.js
 ```
 -OR-
 ```
 npm run start
 ```
 in the terminal cmd to install required packages & run **Friends Git Social** locally for testing routes using ```Insomnia```.

## Mock-Up
---
> **Note:**  The following animation shows the application's ```GET```, ```POST```, ```PUT``` & ```DELETE``` routes associated with "api/users" using ```Insomnia```:

> **'GET', 'POST', 'PUT' & 'DELETE' "api/users" routes:** ![In ```Insomnia```, tests for the ```GET```, ```POST```, ```PUT``` & ```DELETE``` api/users routes are depicted.](./images/api-user-routes.gif)

> **Note:** The following animation shows the application's ```POST``` & ```DELETE``` routes associated with "api/user/friends" using ```Insomnia```:

> **'POST' & 'DELETE' "api/users/friends" routes:** ![In ```Insomnia```, tests for the ```POST``` & ```DELETE``` api/users/friends routes are depicted.](./images/api-user-friend-routes.gif)

> **Note:** The following animation shows the application's ```GET```, ```POST```, ```PUT``` & ```DELETE``` routes associated with "api/thoughts" using ```Insomnia```:

> **'GET', 'POST', 'PUT' & 'DELETE' "api/thoughts" routes:** ![In ```Insomnia```, tests for the ```GET```, ```POST```, ```PUT``` & ```DELETE``` api/thoughts routes are depicted.](./images/api-thoughts-routes.gif)

> **Note:** The following animation shows the application's ```POST``` & ```DELETE``` routes associated with "api/thoughts/reactions" using ```Insomnia```:

> **'POST' & 'DELETE' "api/thoughts/reactions" routes:** ![In ```Insomnia```, tests for the ```POST``` & ```DELETE``` api/thoughts/reactions routes are depicted.](./images/api-thoughts-reaction-routes.gif)

## Video Walkthrough
---
> **Note**: The following walkthrough video demonstrates the ```GET```,```POST```, ```PUT``` & ```DELETE``` routes for **"api/users"** & **"api/thoughts"** and the ```POST``` & ```DELETE``` routes for **"api/users/friends"** & **"api/thoughts/reactions"** all being tested in ```Insomnia```:

> https://aasports89.github.io/friends-git-social/

## GitHUB Repository
---
> https://github.com/AASports89/friends-git-social

## Evaluation Guideline
---
> **Note**: The following evaluation guideline is used to determine if **Friends Git Social** meets the requirements for a minimum viable product:

### Deliverables: 10%

* Your GitHub repository containing your application code.

### Walkthrough Video: 37%

* A walkthrough video that demonstrates the functionality of the social media API must be submitted, and a link to the video should be included in your README file.

  * The walkthrough video must show all of the technical acceptance criteria being met.

  * The walkthrough video must demonstrate how to start the application’s server.

  * The walkthrough video must demonstrate GET routes for all users and all thoughts being tested in Insomnia.

  * The walkthrough video must demonstrate GET routes for a single user and a single thought being tested in Insomnia.

  * The walkthrough video must demonstrate POST, PUT, and DELETE routes for users and thoughts being tested in Insomnia.

  * Walkthrough video must demonstrate POST and DELETE routes for a user’s friend list being tested in Insomnia.

  * Walkthrough video must demonstrate POST and DELETE routes for reactions to thoughts being tested in Insomnia.

### Technical Acceptance Criteria: 40%

* Satisfies all of the preceding acceptance criteria plus the following:

  * Uses the [Mongoose package](https://www.npmjs.com/package/mongoose) to connect to a MongoDB database.

  * Includes User and Thought models outlined in the Challenge instructions.

  * Includes schema settings for User and Thought models as outlined in the Challenge instructions.

  * Includes Reactions as the `reaction` field's subdocument schema in the Thought model.

  * Uses functionality to format queried timestamps properly.

### Repository Quality: 13%

* Repository has a unique name.

* Repository follows best practices for file structure and naming conventions.

* Repository follows best practices for class/id naming conventions, indentation, quality comments, etc.

* Repository contains multiple descriptive commit messages.

* Repository contains a high-quality README with description and a link to a walkthrough video.

### Bonus: +10 Points

* Application deletes a user's associated thoughts when the user is deleted.

## Questions
---
> **Note:** For any troubleshooting and/or functionality related questions, please visit my GitHUB @https://github.com/AASports89.

## **ISC License**
---
**Copyright © 2022 - AASports89**

Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.

---
---
