const { deleteFile } = require("@admoni/upload-module");
const createError = require("../helpers/createError");
const models = require("../db/models");

const { AdvertMeta } = models;

exports.augmentAdvert = async (req, res, next) => {
  try {
    const results = await AdvertMeta.findOne({
      where: { key: "impression_meta" },
      raw: true,
    });

    if (!results) {
      throw new Error("Can not retrieve impression cost from db");
    }

    if (results) {
      //req.body.impression_cost = results.impression_cost;
      req.body.click_cost = results.click_cost;
      req.body.video_cost = results.video_cost;
      req.body.impression_limit = results.impression_limit;
      req.body.impression_time = results.impression_time;
      req.body.spending_percentage = results.spending_percentage;
    }
    next();
  } catch (err) {
    console.log(err)
    console.log(err.response.data || err);
    if (req.files && req.files.length) {
      const files = req.files.map((item) => {
        return {
          Key: item.key,
        };
      });
      deleteFile(process.env.S3_ID, process.env.S3_SECRET, files);
    }

    next(createError.InternalServerError(err.response.data || err));
  }
};
