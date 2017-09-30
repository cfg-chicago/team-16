console.log("start");

// Get a reference to the database service
var database = firebase.database();

//Test data
var userIdx = "lj23";
var namex = "Lebron James";
var emailx = "lebron.james23@gmail.com";
var imageUrlx = "google.com";

function writeTestData(userId, name, email, imageUrl) {
  database.ref('tests/' + userId).set({
    username: name,
    email: email,
    profile_picture : imageUrl
  });
}
//writeTestData(userIdx, namex, emailx, imageUrlx);

/**
  * writes a new post
  */
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

function getJourneyPageInfo(journeyId) {
  var ratings = database.ref();
  var background_image;
  var posts;

}

function getJourneyPageInfo(journeyId) {
  var journey_title = database.ref().child('journeys').child(journeyId).child('title');
  var journey_description = database.ref().child('journeys').child(journeyId).child('description');
  var ratings = database.ref().child('journeys').child(journeyId).child('ratings');
  var background_image = database.ref().child('journeys').child(journeyId).child('background_image');
  var posts = database.ref().child('journeys').child(journeyId).child('posts');
}

function getProfilePageInfo(userId) {
  var profile_name = database.ref().child('users').child(userId).child('name');
  var journey_description = database.ref().child('journeys').child(journeyId).child('description');
  var ratings = database.ref().child('journeys').child(journeyId).child('ratings');
}

function getPosts() {

}






/**
 * Attempts to validate an account
 */
function attemptSignIn() {
    var message = document.getElementById("message-to-sign-in");
    message.innerHTML = "<img class='loading' src='img/loading.gif'></img>";
    var msgbox = document.getElementById("sign-in-box");
    var usernameInput = document.getElementById("username-sign-in-input");
    var usernameStorage = usernameInput.value;
    var passwordInput = document.getElementById("password-sign-in-input");
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            if (this.responseText == "valid") {
                document.getElementById("navbars").innerHTML = "&#9776; " + shorten(usernameStorage, 10);
                ACTIVE_UID = usernameStorage;
                usernameInput.value = '';
                passwordInput.value = '';
                msgbox.style.display = "none";
                document.getElementById("create-conversation-link").style.display = "block";
                toggleSignOutCreateLinks(true);
                updateMessageList();
                checkForEnableSubmit();
            } else {
                passwordInput.value = '';
                message.innerHTML = "Invalid account details!";
                checkForSignInSubmit();
                toggleSignOutCreateLinks(false);
            }
        }
    };
    xmlhttp.open("GET", "authenticateAccountHandler.php?u=" + usernameStorage + "&p=" + passwordInput.value, true);
    xmlhttp.send();
}

/**
 * Attempts to create an account
 */
function attemptCreate() {
    var message = document.getElementById("message-to-create-in");
    message.innerHTML = "<img class='loading' src='img/loading.gif'></img>";
    var msgbox = document.getElementById("create-in-box");
    var usernameInput = document.getElementById("username-create-in-input");
    var usernameStorage = usernameInput.value;
    var passwordInput = document.getElementById("password-create-in-input");
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            if (this.responseText == "created") {
                closeNav();
                document.getElementById("navbars").innerHTML = "&#9776; " + shorten(usernameStorage, 10);
                ACTIVE_UID = usernameStorage;
                usernameInput.value = '';
                passwordInput.value = '';
                msgbox.style.display = "none";
                updateUserList();
                document.getElementById("create-conversation-link").style.display = "block";
                toggleSignOutCreateLinks(true);
                updateMessageList();
                checkForEnableSubmit();
            } else {
                passwordInput.value = '';
                message.innerHTML = this.responseText;
                checkForCreateAccountSubmit();
                toggleSignOutCreateLinks(false);
            }
        }
    };
    xmlhttp.open("GET", "createAccountHandler.php?u=" + usernameInput.value + "&p=" + passwordInput.value, true);
    xmlhttp.send();
}

/**
 * Attempts to create a message
 */
function attemptCreateMessage() {
    document.getElementById("message-input-button").disabled = true;
    var message = document.getElementById("message-input");
    var content = message.value;
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            if (this.responseText == "created") {
                message.value = "";
                updateMessageList();
            } else {
                showErrorMessage(this.responseText);
            }
            checkForEnableSubmit();
        }
    };
    var conversation_id = document.getElementById(ACTIVE_CONVERSATION_ID).id;
    xmlhttp.open("GET", "createMessageHandler.php?c=" + content + "&u=" + ACTIVE_UID + "&i=" + conversation_id, true);
    xmlhttp.send();

}

/**
 * Display an error message to the user
 */
function showErrorMessage(message) {
    var msgbox = document.getElementById("error-message-box");
    var msgcontent = document.getElementById("message-to-error-out");
    message = "Sorry about that. We had an error.<br><br>" + message;
    var time = message.length * 20 + 300;
    msgcontent.innerHTML = message;
    msgbox.style.display = "block";
    window.setTimeout(function () {
        msgbox.style.display = "none";
        msgcontent.innerHTML = "";
    }, time);
}


console.log("finish");
