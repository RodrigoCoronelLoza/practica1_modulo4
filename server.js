const mongoose = require("mongoose");
process.on("uncaughtException", (err) => {
  console.log("uncaught exception", err);
  console.log("Shutting down");
  process.exit(1);
});
const Product = require("./models/Product");
const app = require("./app");
const port = process.env.PORT;

mongoose.connect(process.env.DATABASE, {}).then((con) => {
  console.log("Connected to mongo");
  // const p = new Product({productName:"product 2",price: 10});
  // p.save().then(()=>{
  //   console.log("saved");
  // })
});
const server = app.listen(port, () => {
  console.log(`App running on port ${port}`);
});

process.on("unhandledRejection", (err) => {
  console.log("unhandledRejection", err);
  console.log("Shutting down");
  server.close(() => {
    process.exit(1);
  });
});
// manejo de errores a nivel de la aplication(fuera de express) el primero y el ultimo
