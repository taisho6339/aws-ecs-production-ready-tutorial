import * as ec2 from "@aws-cdk/aws-ec2";
import { SubnetType } from "@aws-cdk/aws-ec2";
import * as ecr from "@aws-cdk/aws-ecr";
import * as ecs from "@aws-cdk/aws-ecs";
import * as ecs_patters from "@aws-cdk/aws-ecs-patterns";
import * as cdk from "@aws-cdk/core";

export class FargateStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    const vpc = new ec2.Vpc(this, "fargate-vpc", {
      maxAzs: 2,
      natGateways: 0,
      subnetConfiguration: [
        {
          name: "application",
          cidrMask: 24,
          subnetType: SubnetType.PUBLIC,
        },
      ],
    });
    const cluster = new ecs.Cluster(this, "fargate-sample-cluster", {
      clusterName: "fargate-sample-cluster",
      vpc: vpc
    });
    const repository = ecr.Repository.fromRepositoryArn(
      this,
      "app-repository",
      "arn:aws:ecr:ap-northeast-1:745265301733:repository/app",
    );
    const fargateService = new ecs_patters.ApplicationLoadBalancedFargateService(this, "fargate-sample-service", {
      cluster: cluster,
      serviceName: "fargate-sample-service",
      assignPublicIp: true,
      memoryLimitMiB: 512,
      cpu: 256,
      desiredCount: 2,
      taskImageOptions: {
        image: ecs.ContainerImage.fromEcrRepository(repository, "7dc6c2d95ef3ba5be0979c2e0bd77ee611f1ee2d"),
        containerName: "ecs-sample-app",
        containerPort: 8080,
      },
    });
    const scaling = fargateService.service.autoScaleTaskCount({maxCapacity: 4});
    scaling.scaleOnCpuUtilization('CpuScaling', {
      targetUtilizationPercent: 50,
      scaleInCooldown: cdk.Duration.seconds(60),
      scaleOutCooldown: cdk.Duration.seconds(60)
    });
    new cdk.CfnOutput(this, 'LoadBalancerDNS', {value: fargateService.loadBalancer.loadBalancerDnsName});
  }
}
