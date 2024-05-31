const multer = require("multer");
const multerS3 = require("multer-s3");
const moment = require("moment");
const { S3 } = require("aws-sdk");

const s3 = new S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const upload = multer({ storage: multer.memoryStorage() });

const uploadMdware = async (file) => {
  if (!file) return null;
  return new Promise((resolve, reject) => {
    s3.upload(
      {
        Bucket: process.env.AWS_BUCKET,
        Key: `${moment().format("YYYYMMDDHHmmss")}_${file.originalname}`,
        Body: file.buffer,
        ACL: "public-read-write",
        ContentDisposition: "inline",
        ContentType: file.mimetype,
      },
      (err, data) => {
        if (err) {
          console.error(err);
          reject(err);
        }
        resolve(data);
      }
    );
  });
};

module.exports = { upload, uploadMdware };
