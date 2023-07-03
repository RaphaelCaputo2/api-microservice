const express = require('express');
const userRoutes = require('./routes/userRoutes');
const validateRequest = require('./middlewares/validateRequest');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(validateRequest);

app.use('/api/users', userRoutes);

app.listen(port, () => {
  console.log(`API Gateway listening at http://localhost:${port}`);
});

module.exports = app;