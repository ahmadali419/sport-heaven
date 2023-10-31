require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const { authRoutes, dashboardRoutes } = require('./src/routes');
const { connectToDatabase } = require('./src/utils');
// parse application/x-www-form-urlencoded middleware
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json middleware
app.use(bodyParser.json());
app.use(cors());

app.use('/api', authRoutes);
app.use('/api', dashboardRoutes);
connectToDatabase().then(() => {
  app.listen(process.env.PORT, () => {
    console.log(
      `CORS enabled sport heaven server is running on ${process.env.PORT}`,
    );
  });
});

