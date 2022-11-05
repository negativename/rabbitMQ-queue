const express = require("express");
const bodyParser = require("body-parser");
const { createLogger, format, transports } = require("winston");

const { send_msg } = require("./modules/send");
const { receive_msg } = require("./modules/receive");

const app = express();

const logger = createLogger({
    format: format.combine(format.timestamp(), format.json()),
    transports: [new transports.Console({})],
});

app.use(
    express.urlencoded({
      extended: true,
    })
);
app.use(bodyParser.json());

app.set("view engine", "hbs");

app.post('/send_msg', async (req, res) => {
    logger.info(`Sending new msg.`);
    send_msg(req.body.msg, logger);
    res.send(`Сообщение было отправлено в очередь`);
});

app.get('/receive_msg', async (req, res) => {
    logger.info(`Getting msg from queue.`);
    receive_msg(logger);
    res.send(`Сообщение было получено из очереди`);
});

app.listen(3000, function(){
    logger.info("Starting Node.js server");
});