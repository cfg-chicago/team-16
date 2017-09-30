console.log("start");
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
