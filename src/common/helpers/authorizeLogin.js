let validator = require("email-validator");
const { HTTP } = require("../constants/http");
const { RESPONSE } = require("../constants/response");
const createError = require("../helpers/createError");
const User = require("../modules/user/user.model");

exports.authorizeLogin = async (req, _, next) => {
  let email = String(req.body.email);
  let { platform } = req.query;
  if (validator.validate(email)) {
    email = req.body.email.toLowerCase();
  }
  try {
    let user = null;
    if (String(platform) === "web") {
      user = await User.findOne({
        $and: [
          { type: "advertiser" },
          {
            $or: [
              { phone_number: String(email) },
              { username: String(email) },
              { email: String(email) },
            ],
          },
        ],
      });

      if (!user) {
        return next(
          createError(HTTP.OK, [
            {
              status: RESPONSE.ERROR,
              message: `User does not Exist`,
              code: HTTP.BAD_REQUEST,
            },
          ])
        );
      } else {
        req.user = user;
        next();
      }
    } else if(String(platform) === "android" || String(platform) === "ios"){
      user = await User.findOne({
        $and: [
          { type: "user" },
          {
            $or: [
              { phone_number: String(email) },
              { username: String(email) },
              { email: String(email) },
            ],
          },
        ],
      });

      if (!user) {
        return next(
          createError(HTTP.OK, [
            {
              status: RESPONSE.ERROR,
              message: `User does not Exist`,
              code: HTTP.BAD_REQUEST,
            },
          ])
        );
      } else {
        req.user = user;
        next();
      }
    } else {
      return next(
        createError(HTTP.OK, [
          {
            status: RESPONSE.ERROR,
            message: `Unknown Error`,
            code: HTTP.BAD_REQUEST,
          },
        ])
      );
    }
  } catch (err) {
    console.error(err);
    return next(createError.InternalServerError(err));
  }
};
