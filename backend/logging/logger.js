const winston = require("winston");
const { format } = require("logform");

const logger = winston.createLogger({
    legel: 'info',
    format: winston.format.json(),
    transports: [
        new winston.transports.File({filename: "./logging/logs/info.log", level: 'info'})
    ]
})

function logging(req, res, next) {
    if (process.env.NODE_ENV !== 'production') {
        console.log(req.url);
        console.log(req.body);
    }
  
    const user = req.authData === undefined ? 'none' : req.authData.user;
    logger.info(format.json().transform({
      url: req.url,
      method: req.method,
      user,
      body: req.body
    }));
    const oldJson = res.json;
    res.json = (body) => {
      logger.info(format.json().transform({
        url: req.url,
        method: req.method,
        user,
        resBody: body
      }))
      
      if (process.env.NODE_ENV !== 'production') {
        //console.log(body);
      }
      res.json = oldJson;
      return res.json(body);
    }
    
    next();
  
  }

module.exports = logging;