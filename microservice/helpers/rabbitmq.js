const amqp = require('amqplib/callback_api');

const rabbitmqConnection = {};

rabbitmqConnection.connect = (callback) => {
    amqp.connect('amqp://localhost', (err, conn) => {
        if (err) {
            console.error("[AMQP]", err.message);
            return setTimeout(start, 1000);
        }
        conn.on("error", (err) => {
            if (err.message !== "Connection closing") {
                console.error("[AMQP] conn error", err.message);
            }
        });
        conn.on("close", () => {
            console.error("[AMQP] reconnecting");
            return setTimeout(start, 1000);
        });
        console.log("[AMQP] connected");
        rabbitmqConnection.conn = conn;
        callback(conn);
    });
}

rabbitmqConnection.sendToQueue = (queue, message) => {
    rabbitmqConnection.conn.createChannel((err, ch) => {
        if (closeOnErr(err)) return;
        ch.on("error", (err) => {
            console.error("[AMQP] channel error", err.message);
        });
        ch.on("close", () => {
            console.log("[AMQP] channel closed");
        });
        ch.assertQueue(queue, { durable: true }, (err) => {
            if (closeOnErr(err)) return;
            ch.sendToQueue(queue, new Buffer.from(message), { persistent: true }, (err) => {
                if (closeOnErr(err)) return;
                console.log("[AMQP] message sent");
            });
        });
    });
}

function closeOnErr(err) {
    if (!err) return false;
    console.error("[AMQP] error", err);
    rabbitmqConnection.conn.close();
    return true;
}

module.exports = rabbitmqConnection;