const { Router } = require("express");
const users = require("./user/user.route");



module.exports = () => {
  const router = Router();
  
  router.use("/user", users);

  return router;
};
