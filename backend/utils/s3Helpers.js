import { PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import s3Client from "../config/s3.js";
import { v4 as uuidv4 } from "uuid";

/**
 * Uploads a file buffer to AWS S3.
 * @param {Buffer} fileBuffer 
 * @param {string} mimeType 
 * @param {string} originalName 
 * @returns {Promise<{ imageUrl: string, imageKey: string }>}
 */
export const uploadToS3 = async (fileBuffer, mimeType, originalName) => {
  // If in a mock mode (e.g. for initial testing without valid credentials),
  // we can mock the upload if needed, but let's implement standard S3 calls.
  if (process.env.AWS_ACCESS_KEY_ID === "mock_aws_access_key") {
    console.log("[S3 MOCK] Mock upload for file:", originalName);
    const uuid = uuidv4();
    const ext = originalName.split(".").pop() || "png";
    const key = `placements/${uuid}.${ext}`;
    const baseUrl = (process.env.AWS_PUBLIC_BASE_URL || "https://mock.s3.amazonaws.com").replace(/\/$/, "");
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

  const baseUrl = (process.env.AWS_PUBLIC_BASE_URL || "").replace(/\/$/, "");
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
