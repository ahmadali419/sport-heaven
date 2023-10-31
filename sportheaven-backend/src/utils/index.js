const { validateData } = require('./validateData');
const { connectToDatabase, disconnectFromDatabase } = require('./db');
module.exports = {
  validateData,
  connectToDatabase,
  disconnectFromDatabase,
};
