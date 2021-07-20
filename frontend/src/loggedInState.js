import cookie from "react-cookies";

var loggedInCallback;
var token;
var loggedIn = false;

function setLoggedInCallback(setLoggedIn) {
    loggedInCallback = setLoggedIn;
}

function login(t) {
    token = t;
    loggedIn = true;
    loggedInCallback(true);
}

function logout() {
    loggedIn = false;
    cookie.remove("jwt");
    loggedInCallback(false);
}

function getToken() {
    return token;
}

function getLoggedIn() {
    return loggedIn;
}

export { setLoggedInCallback, login, logout, getToken, getLoggedIn }