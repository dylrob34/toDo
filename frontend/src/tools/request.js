import { domain } from "../App";
import { getToken } from '../context/loggedInState';

async function get(url) {
    const token = getToken();
    const res = await fetch(`${domain}${url}`, {
                method: "GET",
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
                  authorization: "bearer " + token,
                }
            })
    const response = await res.json();
    if (response.error === true) {
      if (!response.loggedIn && response.loggedIn !== undefined) {
        window.location.href = "/login";
      }
    }
    return response;
}

async function post(url, data) {
    const token = getToken();
    const res = await fetch(`${domain}${url}`, {
                method: "POST",
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
                  authorization: "bearer " + token,
                },
                body: JSON.stringify(data)
            })
    const response = await res.json();
    if (response.error === true) {
      if (!response.loggedIn && response.loggedIn !== undefined) {
        window.location.href = "/login";
      }
    }
    return response;
}

export { get, post }