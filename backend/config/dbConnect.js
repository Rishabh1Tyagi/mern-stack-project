const mongoose = require("mongoose");

const dbConnect = () => {
  // connect DB
  mongoose
    .connect(
      `mongodb+srv://Rishabh:f905V3WjcYlsLVpg@cluster0.cu8gn.mongodb.net/MERN-STACK-PROJECT?retryWrites=true&w=majority`,
      {
        useUnifiedTopology: true,
        useNewUrlParser: true,
      }
    )
    .then(() => {
      console.log(`Database Connected Successfully in MongoDb`);
    })
    .catch((err) => {
      console.log(`NO Connetion in DB`, err);
    });
};

module.exports = dbConnect;
