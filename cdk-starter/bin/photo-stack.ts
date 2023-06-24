import * as cdk from 'aws-cdk-lib';
import { Bucket, CfnBucket } from 'aws-cdk-lib/aws-s3';
import { Construct } from 'constructs';


export class PhotoStack extends cdk.Stack {

  private stackSuffix: string;
  public readonly photoBucketArn: string;
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    this.initSuffix();

    const photoBucket = new Bucket(this, 'photoBucket', {
      bucketName: `photo-bucket-${this.stackSuffix}`
    })

    this.photoBucketArn = photoBucket.bucketArn;
  }

  private initSuffix() {
    const shortStackId = cdk.Fn.select(2, cdk.Fn.split('/', this.stackId))
    this.stackSuffix = cdk.Fn.select(4, cdk.Fn.split('-', shortStackId))
  }
}