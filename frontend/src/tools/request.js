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
    return await res.json()
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
    return await res.json()
}

export { get, post }