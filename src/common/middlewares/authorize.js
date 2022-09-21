const KEYS = require("../config/keys");
const models = require('../../db/models')
const { HTTP } = require("../constants/http");
const { RESPONSE } = require("../constants/response");
const createError = require("../helpers/createError");
const {jwtVerify} = require('../helpers/token')
const {Merchant} = models

exports.authorize = () => async (req, _, next) => {
  const token =
    req.headers.authorization && req.headers.authorization.split(" ")[1];
  if (!token) {
    next(
      createError(HTTP.BAD_REQUEST, [
        {
          status: RESPONSE.ERROR,
          message: "Authorization token is missing.",
          statusCode: HTTP.UNAUTHORIZED,
        },
      ])
    );
  }
  try {
    const {id} = await jwtVerify(token)
    const merchant = await Merchant.findOne({
    where:{id}
    });

    if (!merchant) {
      return next(
        createError(HTTP.UNAUTHORIZED, [
          {
            status: RESPONSE.ERROR,
            message: response.data.message,
            statusCode: HTTP.UNAUTHORIZED,
          },
        ])
      );
    }
    if (merchant) {
      console.log(merchant);
      req.userId = merchant.id;
      req.user = merchant;
      next();
    } else {
      next(
        createError(HTTP.BAD_REQUEST, [
          {
            status: RESPONSE.ERROR,
            message: "Invalid auth token.",
            statusCode: HTTP.UNAUTHORIZED,
          },
        ])
      );
    }
  } catch (err) {
    console.log(err);
    next(
      createError(HTTP.BAD_REQUEST, [
        {
          status: err.response.data.status || RESPONSE.ERROR,
          message: err.response.data.message || err.message,
          statusCode: err.response.data.code || HTTP.UNAUTHORIZED,
        },
      ])
    );
  }
};
