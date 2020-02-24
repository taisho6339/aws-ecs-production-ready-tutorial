# AWS ECS Tutorial to be production ready 
This repository basic tutorial for AWS ECS.
This contains some contents below.

1. EC2 Launch Mode ECS
2. Fargate Launch Mode ECS
3. How to build and release your app to ECS with CircleCI

## Requires
- AWS Account
- AWS S3 Bucket
    - use for cloudformation 
    - use for ecr
- AWS CLI Authenticate
- CircleCI Account
    - Set environments below in each context
        - AWS_ECR_ACCOUNT_URL
        - AWS_ECR_REPO_NAME 
        - AWS_ACCESS_KEY_ID
        - AWS_SECRET_ACCESS_KEY
        - AWS_REGION_NAME 

## 1. Create ECS Cluster

### EC2
1. Package templates in CloudFormation
```sh
aws2 --profile taisho6339 \
cloudformation package \
--s3-bucket ecs-sample-project \
--template-file deployments/ec2-cluster/cloudformation/bootstrap-template.yml \
--output-template-file deployments/ec2-cluster/cloudformation/bootstrap.yml   
```

2. Deploy stack in CloudFormation
```sh
aws2 --profile taisho6339 \
cloudformation deploy \
--template-file deployments/ec2-cluster/cloudformation/bootstrap.yml \
--stack-name ec2-sample-cluster \
--capabilities CAPABILITY_IAM \
--parameter-overrides ImageName=[YOUR_ECR_IMAGE_URI] 
```

### Fargate
1. Package templates in CloudFormation
```sh
aws2 --profile taisho6339 \
cloudformation package \
--s3-bucket ecs-sample-project \
--template-file deployments/fargate-cluster/cloudformation/bootstrap-template.yml \
--output-template-file deployments/fargate-cluster/cloudformation/bootstrap.yml   
```

2. Deploy stack in CloudFormation
```sh
aws2 --profile taisho6339 \
cloudformation deploy \
--template-file deployments/fargate-cluster/cloudformation/bootstrap.yml \
--stack-name fargate-sample-cluster \
--capabilities CAPABILITY_IAM 
```


## Create ECR

1. Create ECR
```
aws2 --profile taisho6339 \
cloudformation create-stack \
--stack-name ecs-study-ecr \
--template-body file://deployments/ecr/cloudformation/create-ecr.yaml
```
