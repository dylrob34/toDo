const fetch = require('node-fetch')


const message = (message) => {
    fetch(`http://localhost:3435/message`, {
      method: "POST",
      body: JSON.stringify({message}),
      headers: { "Content-Type": "application/json"}
    })
    .catch((error) => {
        console.log("Error communicating with Blockz bot")
    })
}

const crashReport = (err) => {
    
    fetch(`http://localhost:3435/notifycrash`, {
      method: "POST",
      body: JSON.stringify({message: err}),
      headers: { "Content-Type": "application/json"}
    })
    .catch((error) => {
        console.log("Error communicating with Blockz bot")
    })
}

module.exports = {message, crashReport}