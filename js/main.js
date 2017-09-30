console.log("start");

// Get a reference to the database service
var database = firebase.database();

//Test data
var userIdx = "lj23";
var namex = "Lebron James";
var emailx = "lebron.james23@gmail.com";
var imageUrlx = "google.com";

function writeTestData(userId, name, email, imageUrl) {
  firebase.database().ref('tests/' + userId).set({
    username: name,
    email: email,
    profile_picture : imageUrl
  });
}

//writeTestData(userIdx, namex, emailx, imageUrlx);
/**
  * writes a new post
  */
function writePost(postId, userId, body, uploadDate, imageUrl, journeyId) {
  firebase.database().ref('posts/' + postId).set({
    username: name,
    email: email,
    profile_picture : imageUrl
  });
}


console.log("finish");
