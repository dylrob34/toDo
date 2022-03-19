const fetch = require('node-fetch')

let url;
let crashurl;

if (process.env.NODE_ENV === "production") {
    url = "http://beermethatpenta.com:3435";
    crashurl = "http://beermethatpenta.com:3435/prodcrash";
} else if (process.env.NODE_ENV === "piproduction") {
    url = "http://localhost:3435";
    crashurl = "http://beermethatpenta.com:3435/devcrash";
}

const message = (message) => {
    fetch(`${url}/message`, {
      method: "POST",
      body: JSON.stringify({message}),
      headers: { "Content-Type": "application/json"}
    })
    .catch((error) => {
        console.log("Error communicating with Blockz bot")
    })
}

const crashReport = (err) => {
    
    fetch(`${crashurl}`, {
      method: "POST",
      body: JSON.stringify({message: err}),
      headers: { "Content-Type": "application/json"}
    })
    .catch((error) => {
        console.log("Error communicating with Blockz bot")
    })
}

module.exports = {message, crashReport}