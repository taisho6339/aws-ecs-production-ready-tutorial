#!/usr/bin/env node
import * as cdk from '@aws-cdk/core';
import 'source-map-support/register';
import { FargateStack } from '../lib/cdk-stack';

const app = new cdk.App();
new FargateStack(app, 'aws-ecs-sample-fargate');
app.synth();
