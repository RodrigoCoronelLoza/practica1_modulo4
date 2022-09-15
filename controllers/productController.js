const fs = require("fs");
const Product = require("../models/Product");
const catchAsync = require("../utils/catchAsync");

exports.getAllProducts = catchAsync(async (req, res) => {
  const products = await Product.find();

  res.status(200).json({
    status: "success",
    timeOfRequest: req.requestTime,
    results: products.length,
    data: {
      products,
    },
  });
});

exports.addProduct = catchAsync(async (req, res) => {
  const newProduct = await Product.create(req.body);
  res.status(200).json({
    status: "success",
    data: {
      product: newProduct,
    },
  });
});

exports.getProductById = catchAsync(async (req, res) => {
  console.log("Estoy aqui get by ID");
  const foundProduct = await Product.findById(req.params.id);
  console.log("carajillo");
  if (foundProduct) {
    console.log("Estoy aqui get by ID2");
    res.status(200).json({
      status: "success",
      data: {
        product: foundProduct,
      },
    });
  } else {
    console.log("Estoy aqui get by ID3");
    res.status(404).json({
      status: "not found",
    });
  }
});
// ProductFindByIdAndUpdate (id,body,{new:true});
// ProductFindByIdAndDelete (id);

exports.deleteProductById = (req, res) => {
  const products = JSON.parse(
    fs.readFileSync(`${__dirname}/../data/products.json`)
  );

  const foundProduct = products.find((p) => p.id == req.params.id);
  if (foundProduct) {
    products.splice(products.indexOf(foundProduct), 1);
    fs.writeFileSync(
      `${__dirname}/../data/products.json`,
      JSON.stringify(products)
    );
    res.status(200).json({
      status: "delete success",
      data: {
        product: foundProduct,
      },
    });
  } else {
    res.status(404).json({
      status: "not found",
    });
  }
};

exports.replaceProductById = (req, res) => {
  const products = JSON.parse(
    fs.readFileSync(`${__dirname}/../data/products.json`)
  );

  const foundProduct = products.find((p) => p.id == req.params.id);

  if (foundProduct) {
    products[products.indexOf(foundProduct)] = req.body;
    fs.writeFileSync(
      `${__dirname}/../data/products.json`,
      JSON.stringify(products)
    );
    res.status(200).json({
      status: "replacement success",
      data: {
        product: foundProduct,
      },
    });
  } else {
    res.status(404).json({
      status: "not found",
    });
  }
};
