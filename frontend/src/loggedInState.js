var updateStateCallback;
var token;
var loggedIn = false;

function setLoggedInCallback(callback) {
    updateStateCallback = callback;
}

function login(t) {
    token = t;
    loggedIn = true;
    updateStateCallback(true);
}

function logout() {
    loggedIn = false;
    updateStateCallback(false);
}

function getToken() {
    return token;
}

function getLoggedIn() {
    return loggedIn;
}

export { setLoggedInCallback, login, logout, getToken, getLoggedIn }