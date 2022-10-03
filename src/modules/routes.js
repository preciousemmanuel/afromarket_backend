const { Router } = require("express");
const users = require("./user/user.route");
const merchants = require('./merchant/merchant.route');
const products = require('./product/product.route')
const orders = require('./order/order.route')
const inventories = require('./inventory/inventory.route')
const disputes = require('./dispute/dispute.route')
const ordered_item = require('./ordered_item/ordered_item.route')
const categories = require('./category/category.route')
const adminUsers = require('./admin/admin-user/admin-user.route')



module.exports = () => {
  const router = Router();
  
  router.use("/user", users);
  router.use("/merchant", merchants)
  router.use('/product', products)
  router.use("/order", orders)
  router.use('/inventory', inventories)
  router.use('/dispute', disputes)
  router.use('/cart', ordered_item)
  router.use('/category', categories)
  router.use('/admin', adminUsers)

  return router;
};
