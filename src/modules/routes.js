const { Router } = require("express");
const users = require("./user/user.route");
const merchants = require('./merchant/merchant.route');
const products = require('./product/product.route')



module.exports = () => {
  const router = Router();
  
  router.use("/user", users);
  router.use("/merchant", merchants)
  router.use('/product', products)

  return router;
};
