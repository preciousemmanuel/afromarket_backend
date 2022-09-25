const { Router } = require("express");
const users = require("./user/user.route");
const merchants = require('./merchant/merchant.route');
const products = require('./product/product.route')
const orders = require('./order/order.route')
const inventories = require('./inventory/inventory.route')



module.exports = () => {
  const router = Router();
  
  router.use("/user", users);
  router.use("/merchant", merchants)
  router.use('/product', products)
  router.use("/order", orders)
  router.use('/inventory', inventories)

  return router;
};
