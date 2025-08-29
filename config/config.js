import dotenv from "dotenv";
import path from "path";

const env = process.env.NODE_ENV || "local";

const envFilePath = path.resolve(`.env.${env}`);
dotenv.config({ path: envFilePath });

console.log(`Loading environment variables from ${process.env.NODE_ENV}`);

export default {
  port: process.env.PORT || 3000,
    host: process.env.HOST,
    mongodbUri: process.env.MONGODB_URI,
    jwtSecret: process.env.JWT_SECRET,
    jwtExpiresIn: process.env.JWT_EXPIRES_IN,
    emailHost: process.env.EMAIL_HOST,
    emailPort: process.env.EMAIL_PORT,
    emailUser: process.env.EMAIL_USER,
    emailPassword: process.env.EMAIL_PASSWORD,
    emailFrom: process.env.EMAIL_FROM,
    appUrl: process.env.APP_URL,
};