const { MongoClient } = require("mongodb");

// Use the hostname of the MongoDB service in your Docker network.
// Replace 'mongo' with the service name of your MongoDB container if it's different.
const Db = process.env.MONGO_URI;
const client = new MongoClient(Db);

let _db;

module.exports = {
  connectToMongoDB: async function () {
    try {
      // Connect to the MongoDB server
      await client.connect();
      _db = client.db("employees");  // Connect to the "employees" database
      console.log("Successfully connected to MongoDB.");
    } catch (error) {
      console.error("Error connecting to MongoDB:", error);
      throw error;  // Throw the error to be handled by the caller
    }
  },

  getDb: function () {
    if (!_db) {
      throw new Error("Database not initialized. Call connectToMongoDB first.");
    }
    return _db;
  },

  closeMongoDB: async function () {
    try {
      await client.close();
      console.log("MongoDB connection closed.");
    } catch (error) {
      console.error("Error closing MongoDB connection:", error);
    }
  }
};
