import { inject, injectable } from "inversify";
import {
    S3Client,
    ListObjectsCommand,
    ListObjectsCommandOutput,
    PutObjectCommand,
    PutObjectCommandInput,
    PutObjectCommandOutput,
    GetObjectCommand,
    HeadObjectCommand,
    HeadObjectOutput,
  } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

import * as mime from 'mime-types';
import type {File} from '@koa/multer'
@injectable()
export class S3StorageService{
    private s3client: S3Client;
    private bucket: string;
    constructor(){
        console.log("S3StorageService constructor has been invoked")

        // Initialing S3 Compat R2 <cloudflare>
        // could change the environment prefix key to be just S3 for more generic decency
        this.s3client = new S3Client({
            endpoint: process.env.R2_ENDPOINT,
            region:'apac',
            credentials:{
                accessKeyId: process.env.R2_ACCESS_KEY_ID!,
                secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!
            }
        });
        this.bucket = process.env.R2_BUCKET_NAME!
    }

    /**
   * @NOTE testing purpose to see our bucket detail
   */
    public async listBucketDetail(): Promise<ListObjectsCommandOutput> {
        const command: ListObjectsCommand = new ListObjectsCommand({
          Bucket: this.bucket,
        });
        const response: ListObjectsCommandOutput = await this.s3client.send(command);
        return response;
    }

    public async uploadFile(file: File, filename: string, path: string, useExtensionFromMimeType = false): Promise<string> {
        const uploadParams: PutObjectCommandInput = {
          Bucket: this.bucket,
          Body: file.buffer,
          Key: path + '/' + filename,
        };
        if (useExtensionFromMimeType) {
          uploadParams.Key = uploadParams.Key + '.' + mime.extension(file.mimetype);
        }
        const command: PutObjectCommand = new PutObjectCommand(uploadParams);
        (await this.s3client.send(command)) as PutObjectCommandOutput; // if error it would throw it self
        return uploadParams.Key!;
    }

    public async createPresignedURLFromKey(key: string, expiresIn: number): Promise<string> {
        // Check if the key is really exist
        const headObjectCmd: HeadObjectCommand = new HeadObjectCommand({ Bucket: this.bucket, Key: key });
        (await this.s3client.send(headObjectCmd).catch(() => {
          console.warn('createPresignedURLFromKey warning');
        })) as HeadObjectOutput;
    
        // Signing process
        const getObjectCmd: GetObjectCommand = new GetObjectCommand({
          Bucket: this.bucket,
          Key: key,
        });
        const url: string = await getSignedUrl(this.s3client, getObjectCmd, {
          expiresIn,
        });
        return url;
      }
}