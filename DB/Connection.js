const mongoose = require("mongoose");

const db = "mongodb://Portfolio:2580@ac-zcpg4j5-shard-00-00.8hw1b0f.mongodb.net:27017,ac-zcpg4j5-shard-00-01.8hw1b0f.mongodb.net:27017,ac-zcpg4j5-shard-00-02.8hw1b0f.mongodb.net:27017/Portfolio?ssl=true&replicaSet=atlas-96oudn-shard-0&authSource=admin&retryWrites=true&w=majorityz";

mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connection Start"))
  .catch((error) => console.log(error.message));
