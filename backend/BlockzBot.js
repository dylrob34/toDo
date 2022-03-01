const fetch = require('node-fetch')

let url;

if (process.env.NODE_ENV === "production") {
    url = "http://beermethatpenta.com:3435";
} else if (process.env.NODE_ENV === "piproduction") {
    url = "http://localhost:3435";
} else {
    url = "http://192.168/127.134:3435";
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
    
    fetch(`${url}/notifycrash`, {
      method: "POST",
      body: JSON.stringify({message: err}),
      headers: { "Content-Type": "application/json"}
    })
    .catch((error) => {
        console.log("Error communicating with Blockz bot")
    })
}

module.exports = {message, crashReport}