const mongoose = require("mongoose");


  mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/social-network-api', {
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

mongoose.set('debug', true);
const db = mongoose.connection;
db.on("error", () => {
  console.error("connection to database failed");
});
db.once("open", () => {
  console.log("successfully connected to database");
});


module.exports = db