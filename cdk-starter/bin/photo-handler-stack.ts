import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Code, Function as LambdaFunction, Runtime } from 'aws-cdk-lib/aws-lambda';


interface PhotoHandlerStackProps extends cdk.StackProps {
  targetBucketArn: string;
}

export class PhotoHandlerStack extends cdk.Stack {


  constructor(scope: Construct, id: string, props: PhotoHandlerStackProps) {
    super(scope, id, props);


    new LambdaFunction(this, 'PhotoHandler',
      {
        runtime: Runtime.NODEJS_16_X,
        handler: 'index.handlers',
        code: Code.fromInline(`
          export.handler = async (event) => {
            console.log("hellow!: " + process.env.TARGET_BUCKET)
          };
         `),
        environment: {
          TARGET_BUCKET: props.targetBucketArn
        }
      }
    )

  }
}