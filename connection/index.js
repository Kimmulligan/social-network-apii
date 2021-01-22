const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://kiim:Chillyshark386@social-network-api.fblqv.mongodb.net/social-network-api?retryWrites=true&w=majority",
  {
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