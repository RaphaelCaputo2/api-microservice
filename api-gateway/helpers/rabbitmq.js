const amqp = require('amqplib/callback_api');

const sendToQueue = (queue, message) => {
  amqp.connect('amqp://localhost', (error0, connection) => {
    if (error0) {
      throw error0;
    }
    connection.createChannel((error1, channel) => {
      if (error1) {
        throw error1;
      }

      channel.assertQueue(queue, {
        durable: false
      });

      channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)));
      console.log(" [x] Sent %s", message);
    });
    setTimeout(() => {
      connection.close();
    }, 500);
  });
};

module.exports = {
  sendToQueue
};