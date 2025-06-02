"use server";
import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import {getSignedUrl as getPresignedUrl} from "@aws-sdk/s3-request-presigner";
export async function uploadOnAWS(file: File, purpose: string) {
  try {
    if (
      !process.env.AWS_SECRET_ACCESS_KEY ||
      !process.env.AWS_ACCESS_KEY_ID ||
      !process.env.AWS_REGION
    ) {
      throw new Error("AWS credentials are not set");
    }
    if (!file || !purpose) {
      throw new Error("No file or reason provided");
    }
    const buffer = await file.arrayBuffer();
    const bytes = new Uint8Array(buffer);
    const fileName = file.name;
    const timestamp = Date.now();
    let key;
    if (purpose === "avatar") {
      key = `avatars/${timestamp}-${fileName}`;
    } else if (purpose === "resume") {
      key = `resumes/${timestamp}-${fileName}`;
    } else if (purpose === "project") {
      key = `projectImages/${timestamp}-${fileName}`;
    } else {
      throw new Error("Invalid purpose provided");
    }
    const s3Client = new S3Client({
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      },
    });
    const command = new PutObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: key,
      Body: bytes,
      ContentType: file.type,
    });
    await s3Client.send(command);
    return { success: true, key };
  } catch (error) {
    throw new Error(
      `Failed to upload file: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
}

export async function getSignedUrl(key: string) {
  try {
    if (
      !process.env.AWS_SECRET_ACCESS_KEY ||
      !process.env.AWS_ACCESS_KEY_ID ||
      !process.env.AWS_REGION
    ) {
      throw new Error("AWS credentials are not set");
    }
    const s3Client = new S3Client({
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      },
    });
    const command = new GetObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: key,
    });
    const signedUrl = await getPresignedUrl(s3Client, command, {expiresIn: 3600});
    return signedUrl;
  } catch (error) {
    throw new Error(
      `Failed to get signed URL: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
}
