const mongoose = require("mongoose");
const databaseConnectionString = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@kachabazar.voz4kmc.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

const connectionDB = () => {
  return mongoose
    .connect(`${databaseConnectionString}`)
    .then(() => console.log(`db connection successfull`))
    .catch((err) => console.log(err));
};

module.exports = connectionDB;
