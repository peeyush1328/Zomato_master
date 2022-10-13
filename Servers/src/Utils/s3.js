import aws from "aws-sdk";
import dotenv from "dotenv";


dotenv.config();

const s3Bucket = new aws.S3({
  accessKeyId: process.env.AWSACCESS_KEY,
  secretAccessKey: process.env.AWSSECRET_KEY,
  region: "ap-south-1",
});

export const s3Upload = (options) => {
  return new Promise((resolve, reject) =>
    s3Bucket.upload(options, (error, data) => {
      if (error) return reject(error);
      return resolve(data);
    })
  );
};
