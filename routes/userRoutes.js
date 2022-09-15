const express = require("express");
const userController = require("./../controllers/userController");
const userRouter = express.Router();
//routes

userRouter.route("/").post(userController.addUser);
// productRouter
//   .route("/")
//   .get(productController.getAllProducts)
//   .post(productController.addProduct);
// productRouter
//   .route("/:id")
//   .get(productController.getProductById)
//   .delete(productController.deleteProductById)
//   .put(productController.replaceProductById);

module.exports = userRouter;
