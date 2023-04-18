const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apiFeatures");

// create product --admin
exports.createProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    product
  })
})

//update product --admin
exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
  // console.log(req.params.id)
  let product = await Product.findById(req.params.id);
  // console.log(product)
  if (!product) {
    return next(new ErrorHandler("product not found", 404))
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true, useFindAndModify: false })

  res.status(200).json({
    success: true,
    product
  })
})

// get single product
exports.getOneProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id)
  if (!product) {
    return next(new ErrorHandler("product not found", 404))
  }
  res.status(200).json({
    success: true,
    product
  })
})

//delete product
exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id)
  if (!product) {
    return next(new ErrorHandler("product not found", 404))
  }

  await product.deleteOne();
  res.status(200).json({
    success: true,
    message: "product deleted"
  })
})


// all product
exports.getAllProducts = catchAsyncErrors(async (req, res) => {
  const apiFeature = new ApiFeatures(Product.find(), req.query).search();
  const products = await apiFeature.query;
  res.status(200).json({
    success: true,
    products
  })
});
