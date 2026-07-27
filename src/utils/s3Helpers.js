import { PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import s3Client from "./s3.js";
import { v4 as uuidv4 } from "uuid";

/**
 * Normalizes AWS S3 URLs from virtual-host style (bucket.s3.region.amazonaws.com)
 * to path style (s3.region.amazonaws.com/bucket) to resolve SSL certificate mismatch
 * when bucket names contain dots.
 * 
 * Example:
 *   Current:  https://assets.academically.com.s3.ap-south-1.amazonaws.com/placements/test.webp
 *   Replace:  https://s3.ap-south-1.amazonaws.com/assets.academically.com/placements/test.webp
 * 
 * @param {string} url
 * @returns {string}
 */
export const formatS3Url = (url) => {
  if (!url || typeof url !== "string") return url;

  const virtualHostRegex = /^https?:\/\/([^\/]+)\.s3[\.\-]([a-z0-9\-]+)\.amazonaws\.com\/(.+)$/i;
  const match = url.match(virtualHostRegex);

  if (match) {
    const [, bucket, region, key] = match;
    return `https://s3.${region}.amazonaws.com/${bucket}/${key}`;
  }

  return url;
};

/**
 * Uploads a file buffer to AWS S3.
 * @param {Buffer} fileBuffer 
 * @param {string} mimeType 
 * @param {string} originalName 
 * @returns {Promise<{ imageUrl: string, imageKey: string }>}
 */
export const uploadToS3 = async (fileBuffer, mimeType, originalName) => {
  if (process.env.AWS_ACCESS_KEY_ID === "mock_aws_access_key") {
    console.log("[S3 MOCK] Mock upload for file:", originalName);
    const uuid = uuidv4();
    const ext = originalName.split(".").pop() || "png";
    const key = `placements/${uuid}.${ext}`;
    const rawBaseUrl = process.env.AWS_PUBLIC_BASE_URL || "https://mock.s3.amazonaws.com";
    const baseUrl = formatS3Url(rawBaseUrl).replace(/\/$/, "");
    return {
      imageUrl: `${baseUrl}/${key}`,
      imageKey: key,
    };
  }

  const extension = originalName.split(".").pop() || "png";
  const uuid = uuidv4();
  const key = `placements/${uuid}.${extension}`;

  const params = {
    Bucket: process.env.AWS_S3_BUCKET,
    Key: key,
    Body: fileBuffer,
    ContentType: mimeType,
    CacheControl: "public, max-age=31536000",
  };

  await s3Client.send(new PutObjectCommand(params));

  const rawBaseUrl = process.env.AWS_PUBLIC_BASE_URL || `https://s3.${process.env.AWS_REGION || "ap-south-1"}.amazonaws.com/${process.env.AWS_S3_BUCKET || "assets.academically.com"}`;
  const baseUrl = formatS3Url(rawBaseUrl).replace(/\/$/, "");
  const imageUrl = `${baseUrl}/${key}`;

  return {
    imageUrl,
    imageKey: key,
  };
};

/**
 * Deletes an object from AWS S3 using its key.
 * @param {string} key 
 */
export const deleteFromS3 = async (key) => {
  if (process.env.AWS_ACCESS_KEY_ID === "mock_aws_access_key") {
    console.log("[S3 MOCK] Mock delete for key:", key);
    return;
  }

  const params = {
    Bucket: process.env.AWS_S3_BUCKET,
    Key: key,
  };

  await s3Client.send(new DeleteObjectCommand(params));
};
