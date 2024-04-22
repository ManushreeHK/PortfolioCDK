#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { PipelineStack } from '../lib/pipeline-stack/pipline-stack';

const app = new cdk.App();

new PipelineStack(app, 'CdkPipeline', {
  env: { account: '905418415909', region: 'us-east-1' }
});

