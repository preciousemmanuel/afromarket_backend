const axios = require("axios");
const KEYS = require("../config/keys");
const { HTTP } = require("../constants/http");
const { RESPONSE } = require("../constants/response");
const createError = require("../helpers/createError");

exports.authorize = (role) => async (req, _, next) => {
  const token =
    req.headers.authorization && req.headers.authorization.split(" ")[1];
   console.log("Token From Adverts: ", token);
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
    const response = await axios.get(
      `${KEYS.authUri}/validate/${token}?platform=${req.query.platform}`
    );
    const result = response.data.data;
    console.log( "response:", result);
    if (response.data.status === "error") {
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
    if (
      result.user_type.toLowerCase() === role.toLowerCase() ||
      role === "both"
    ) {
      console.log(result.user_id);
      req.userId = result.user_id;
      req.user = result.user;
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
