console.log("start");

// Get a reference to the database service
var database = firebase.database();

var ACTIVE_UID = -1;
if(getParameterByName("usn") != null){
  authenticateUser(getParameterByName("usn"), getParameterByName("hash"));
}

function signInUser(username){
  $("#si").text(" "+username);
  $("#li").text(" Logout");
  ACTIVE_UID = username;
}

function signOutUser(){
  $("#si").text(" Sign Up");
  $("#li").text(" Login");
  ACTIVE_UID = -1;
}

$("#li").click(function(){
  if(ACTIVE_UID != -1){
    signOutUser();
  }
});

$("#si").click(function(){
  if(ACTIVE_UID != -1){
    window.location.href = 
  }
});

console.log(getJourneyPageInfo("90001"));

// Parse the URL parameter
function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

// Writes a new post
function writeNewPost(userid, uploadDate, imageUrl, journeyId, body) {

  // Get a key for a new Post.
  var newPostKey = database.ref().child('posts').push().key;

  // A post entry.
  var postData = {
    id: newPostKey,
    body: body,
    upload_date: uploadDate,
    image_url: imageUrl,
    user_id: userId,
    journey_id: journeyId,
  };











  // Write the new post's data simultaneously in the posts list and the user's post list.

  var updates = {};
  updates['/posts/' + newPostKey] = postData;
  updates['/users/' + userId + '/posts/' + newPostKey] = newPostKey;
  updates['/journeys/' + journeyId + '/posts/' + newPostKey] = newPostKey;

  return database.ref().update(updates);
}

// Allows a user to join a journey
function joinJourney(userId, journeyId) {
  var updates = {};
  updates['/users/' + userId + '/journey_ids/' + journeyId] = journeyId;
  updates['/journeys/' + journeyId + '/users/' + userId] = userId;

  return database.ref().update(updates);
}

// Gets the information needed to populate the Journey Page
function getJourneyPageInfo(journeyId) {
  var journey_title = database.ref().child('journeys').child(journeyId).child('title');
  var journey_description = database.ref().child('journeys').child(journeyId).child('description');
  var ratings = database.ref().child('journeys').child(journeyId).child('ratings');
  var background_image = database.ref().child('journeys').child(journeyId).child('background_image');
  var posts = database.ref().child('journeys').child(journeyId).child('posts');
  return JSON.stringify(journey_description);
}

// Gets the information needed to populate the Profile Page
function getProfilePageInfo(userId) {
  var profile_name = database.ref().child('users').child(userId).child('name');
  var posts = database.ref().child('users').child(userId).child('posts');
  var profile_picture = database.ref().child('users').child(userId).child('profile_picture');
  var journeys = database.ref().child('users').child(userId).child('journeys');
}

// Takes in a JSON of posts and formats them to be populated
function getPosts(posts) {
  console.log(posts);
}


// Authenticates a user's email and password to be logged in or created
function authenticateUser(email, password) {
  // If the user has already used the system, they are signed into their account
  //console.log( database.ref().child('users').child(email));
  if(database.ref().child('users')) {
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      return errorMessage;
    });
    if(email.trim() != "" && password != "" && password != "0"){
      signInUser(email);
    }
    return "Authenticated.";

    // If the user hasn't used the system before, it puts them into the system
  } else {

    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      return errorMessage;
    });
    database.ref().child('users').child(email).child('email') = email;
    return "Added.";
  }
}




console.log("finish");
