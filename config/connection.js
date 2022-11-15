// Referencing code from Module 18 Activities

const { connect, connection } = require('mongoose');

// Node will look for this environment variable and if it exists, it will use it. Otherwise, it will assume that you are running this application locally
const connectionString =
  process.env.MONGODB_URI || 'mongodb://localhost:27017/social-network-api-db';

// Wrap Mongoose around local connection to MongoDB
connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

// Export connection 
module.exports = connection;
