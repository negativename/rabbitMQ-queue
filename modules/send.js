const amqp = require('amqplib/callback_api');

const send_msg = (msg, logger) => {
    amqp.connect('amqp://localhost', function(error0, connection) {
        if (error0) {
            throw error0;
        }
        connection.createChannel(function(error1, channel) {
            if (error1) {
                throw error1;
            }
            let queue = 'test-queue';
        
            channel.assertQueue(queue, {
                durable: false
            });
        
            channel.sendToQueue(queue, Buffer.from(msg));
            logger.info(` [x] Sent ${msg}`);
        });

        setTimeout(function() {
            logger.info(" [x] Connection closed for sending");
            connection.close();
        }, 500);
    });
}

module.exports = { send_msg };
