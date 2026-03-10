// this file defines the routes for all requests related to 'friends' 

// this line imports the express package, which is a popular web framework for Node.js that allows us to
// easily create a backend server and define routes for handling HTTP requests
const express = require("express");


// this line creates a new router object using the express.Router() function, which allows us to define routes
// for handling requests related to friends in a modular way. We can then export this router and use it in our main app file (index.js)
// to handle requests to the '/friends' path.
const router = express.Router();


// this line imports the 'friends' data from the '../models/friends' file, which is an array of friend objects that we can use to respond to requests in our routes
const friends = require('../models/friends')


// default endpoint, gets all friends
router.get('/', (req, res) => {
    res.json(friends)
})


// QUESTION 1: Add support to the 'filter' endpoint for a new query parameter 'letter' which filters friends by starting letter of their name

// 1. Filter endpoint, gets friends matching the gender from 'gender' query parameter ie. /friends/filter?gender=male
// add support to also filter by a starting 'letter' query parameter ie. /friends/filter?letter=R

/*
router.get('/filter', (req, res) => {
    console.log(req.query)
    let filterGender = req.query.gender;
    let matchingFriends = [...friends];

    if (filterGender) {
        matchingFriends = matchingFriends.filter(friend => friend.gender == filterGender);
    }
    
    if (matchingFriends.length > 0) {
        // return valid data when the gender matches 
        res.status(200).json(matchingFriends)
    } else {
        // and an error response when there are no matches
        res.status(404).json({error: "No friends matching gender "+filterGender})
    }  
})
*/

router.get('/filter', (req, res) => {
    console.log(req.query)
    let filterGender = req.query.gender;
    let filterLetter = req.query.letter;
    let matchingFriends = [...friends];

    if (filterGender) {
        matchingFriends = matchingFriends.filter(friend => friend.gender == filterGender);
    }

    if (filterLetter) {
        matchingFriends = matchingFriends.filter(friend => friend.name.startsWith(filterLetter));
    }

    if (matchingFriends.length > 0) {
        // return valid data when the gender matches 
        res.status(200).json(matchingFriends)
    } else {
        // and an error response when there are no matches
        res.status(404).json({error: "No friends matching the given criteria"})
    }  
})  

// Questions 1a: test this by going to Thunder Client and making a GET request to http://localhost:3000/friends/filter?gender=male



// QUESTION 2: Modify the 'info' route to only return the user-agent, content-type and accept header data

// 2. Get information about this request from the headers

/*
router.get('/info', (req, res) => {
    console.log(req.headers)

    // Modify this response to just return info on the user-agent, content-type and accept headers
    res.json(req.headers)  
})
*/

router.get('/info', (req, res) => {
    const { 'user-agent': userAgent, 'content-type': contentType, accept } = req.headers;
    res.json({ userAgent, contentType, accept });
});

// Question 2b: test this by going to Thunder Client and making a GET request to http://localhost:3000/friends/info and checking the response data and the console logs
// NB: most people can't get contenttype header to show up in the request - this is not important, just check that the user-agent and accept headers are being logged and returned in the response




// QUESTION 3: Modify the dynamic GET route to return a single friend object matching the dynamic 'id' request parameter
// Modify this function to find and return the friend matching the given ID, or a 404 if not found
// Modify this response with the matched friend, or a 404 if not found

// 3. Dynamic request param endpoint - get the friend matching the specific ID ie. /friends/3

/*
router.get('/:id', (req, res) => {
    console.log(req.params)
    let friendId = req.params.id; // 'id' here will be a value matching anything after the / in the request path
    res.json({result: 'Finding friend with ID ' + friendId})
})
*/

router.get('/:id', (req, res) => {
    let friendId = parseInt(req.params.id);
    let friend = friends.find(f => f.id === friendId);

    if (friend) {
        res.status(200).json(friend);
    } else {
        res.status(404).json({error: 'Friend with ID ' + friendId + ' not found'});
    }
})

// Question 3a: test this by going to Thunder Client and making a GET request to http://localhost:3000/friends/3 and checking the response data and the console logs

// Question 3b: also test with an ID that doesn't exist to check the 404 response, for example http://localhost:3000/friends/9999



// POST request with data sent in the body of the request, representing a new friend to add to our list
router.post('/', (req, res) => {
    let newFriend = req.body; // FIRST add this line to index.js: app.use(express.json());
    console.log(newFriend) // 'body' will now be an object containing data sent via the request body

    // we can add some validation here to make sure the new friend object matches the right pattern
    if (!newFriend.name || !newFriend.gender) {
        res.status(500).json({error: 'Friend object must contain a name and gender'});
        return;
    }
    else if (!newFriend.id) {
        newFriend.id = friends.length + 1; // generate an ID if one is not present
    }

    // if the new friend is valid, add them to the list and return the successfully added object
    friends.push(newFriend)
    res.status(200).json(newFriend)
})

// Question 3c: test above by going to Thunder Client and making a POST request to http://localhost:3000/friends with a JSON body like this:

/*
{
    "name": "Rachel",
    "gender": "female"
}
*/


// QUESTION 4. Complete this new route for a PUT request which will update data for an existing friend

/*
router.put('/:id', (req, res) => {
    let friendId = req.params.id;
    let updatedFriend = req.body;

    // Replace the old friend data for friendId with the new data from updatedFriend

    
    // Modify this response with the updated friend, or a 404 if not found
    res.json({result: 'Updated friend with ID ' + friendId, data: updatedFriend})
})
*/

router.put('/:id', (req, res) => {
    let friendId = parseInt(req.params.id);
    let updatedFriend = req.body;

    let friendIndex = friends.findIndex(f => f.id === friendId);

    if (friendIndex !== -1) {
        // Update the existing friend data with the new data from updatedFriend
        friends[friendIndex] = { ...friends[friendIndex], ...updatedFriend, id: friendId };
        res.status(200).json(friends[friendIndex]);
    } else {
        res.status(404).json({error: 'Friend with ID ' + friendId + ' not found'});
    }
})

// Question 4a: test above by going to Thunder Client and making a PUT request to http://localhost:3000/friends/3 with a JSON body like this:

/*
{
    "name": "Updated Name",
    "gender": "other"
}
*/  





// QUESTION 5ext: this is just an extension for myself that I will do at the end of the Module

// Move all logic out into a controller with functions for finding, filtering, info, adding and updating

// To do this, we first need to create a new file in the 'controllers' folder called 'friendController.js'
// We move all the logic for handling the routes into functions in that file. 

// Then we can import those functions into this router file and use them as the route handlers instead of defining the logic directly in the route definitions here.
// This will help to keep our code organized and make it easier to maintain as our application grows.




// TODO - #5: Move all logic out into a controller with functions for finding, filtering, info, adding and updating

// This line exports the router object so that it can be imported and used in other files, such as our main app file (index.js) 
// where we will use it to handle requests to the '/friends' path.

/*

const calculator = require ('../controllers/friendController');

// these lines define the routes and use the functions from the controller as the route handlers for each route
router.get('/filter', calculator.filterFriends);
router.get('/info', calculator.getFriendInfo);
router.get('/:id', calculator.getFriendById);
router.post('/', calculator.addFriend);
router.put('/:id', calculator.updateFriend);

*/














module.exports = router;





