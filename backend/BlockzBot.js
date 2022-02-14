const fetch = require('node-fetch')


const message = (message) => {
    try {
        fetch(`http://localhost:3435/message`, {
          method: "POST",
          body: JSON.stringify(message),
          headers: { "Content-Type": "application/json"}
        })
    } catch {
        console.log("Error communicating with Blockz bot")
    }
}

const crashReport = (err) => {
    try {
        fetch(`http://localhost:3435/notifycrash`, {
          method: "POST",
          body: JSON.stringify(err),
          headers: { "Content-Type": "application/json"}
        })
    } catch {
        console.log("Error communicating with Blockz bot")
    }
}

module.exports = {message, crashReport}