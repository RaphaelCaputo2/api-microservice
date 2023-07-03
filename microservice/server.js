const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const rabbitmq = require('./helpers/rabbitmq');
const db = require('./db/config');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/users', userRoutes);

const startServer = async () => {
  try {
    await db.connect();
    console.log('Database connected successfully');

    await rabbitmq.connect();
    console.log('RabbitMQ connected successfully');

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

startServer();