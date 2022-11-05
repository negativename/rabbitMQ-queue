const amqp = require('amqplib/callback_api');

const receive_msg = (logger) => {
    amqp.connect('amqp://localhost', function(error0, connection) {
        if (error0) {
            throw error0;
        }
        return connection.createChannel(function(error1, channel) {
            if (error1) {
                throw error1;
            }
            let queue = 'test-queue';

            channel.assertQueue(queue, {
                durable: false
            });
            
            
            logger.info(` [*] Waiting for messages in ${queue}. To exit press CTRL+C`);
            channel.consume(queue, (msg) => {
                logger.info(` [x] Received ${msg.content.toString()}`);
            }, {
                noAck: true
            });
        
            setTimeout(function() {
                logger.info(" [x] Connection closed for receiving");
                connection.close();
            }, 500);
        });
    });
}

module.exports = { receive_msg };
