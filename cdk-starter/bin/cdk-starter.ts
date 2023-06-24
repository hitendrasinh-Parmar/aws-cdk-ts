#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { CdkStarterStack } from '../lib/cdk-starter-stack';
import { PhotoStack } from './photo-stack';
import { PhotoHandlerStack } from './photo-handler-stack';
import { BucketTagger } from './Tagger';

const app = new cdk.App();
// new CdkStarterStack(app, 'CdkStarterStack');
const photosStack = new PhotoStack(app, 'PhotoStack');
new PhotoHandlerStack(app, 'PhotoHandlerStack', {
  targetBucketArn: photosStack.photoBucketArn
});

const tagger = new BucketTagger('level', 'test');

cdk.Aspects.of(app).add(tagger);