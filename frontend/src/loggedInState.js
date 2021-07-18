var updateStateCallback;
var token;

function setLoggedInCallback(callback) {
    updateStateCallback = callback;
}

function login(t) {
    token = t
    updateStateCallback(true);
}

function logout() {
    updateStateCallback(false);
}

function getToken() {
    return token;
}

export { setLoggedInCallback, login, logout, getToken }