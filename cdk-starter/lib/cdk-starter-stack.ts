import * as cdk from 'aws-cdk-lib';
import { Bucket, CfnBucket } from 'aws-cdk-lib/aws-s3';
import { Construct } from 'constructs';
// import * as sqs from 'aws-cdk-lib/aws-sqs';


class L3Bucket extends Construct {
  constructor(scope: Construct, id: string, expiration: number) {
    super(scope, id);

    new Bucket(this, 'L3Bucket', {
      lifecycleRules: [{
        expiration: cdk.Duration.days(expiration)
      }]
    })
  }
}
export class CdkStarterStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);


    new CfnBucket(this, 'L1Bucket', {
      lifecycleConfiguration: {
        rules: [{
          expirationInDays: 1,
          status: "Enabled"
        }]
      }
    })

    const duration = new cdk.CfnParameter(this, 'duration', {
      default: 1,
      maxValue: 1,
      minValue: 0,
      type: 'Number'
    })

    const l2Bucket = new Bucket(this, 'L2Bucket', {
      lifecycleRules: [{
        expiration: cdk.Duration.days(duration.valueAsNumber)
      }]
    })

    new cdk.CfnOutput(this, 'l2BucketName', {
      value: l2Bucket.bucketName
    })

    new L3Bucket(this, "L3Bucket", 1)






  }

}
