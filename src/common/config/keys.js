const dotenv = require("dotenv");
dotenv.config();

const KEYS = {
  appVersion: process.env.APP_VERSION,
  expiresIn: process.env.EXPIRES_IN,
  port: process.env.PORT,
  dbUrl: process.env.DB_URL,
  name: process.env.DB_NAME || "",
  host: process.env.DB_HOST || "",
  dbPort: +(process.env.DB_PORT || "") || 25,
  username: process.env.DB_USERNAME || "",
  password: process.env.DB_PASSWORD || "",
  JWTSecret:process.env.JWT_SECRET,
  cloudinaryName:process.env.CLOUDINARY_CLOUD_NAME ,
  cloudinaryApiSecret:process.env.CLOUDINARY_API_SECRET  ,
  cloudinaryApiKey:process.env.CLOUDINARY_API_KEY,
  cloudinaryUrl: process.env.CLOUDINARY_URL,
};

module.exports = KEYS;
