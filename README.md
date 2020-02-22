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
- CircleCI Account
    - Set environments below in each context
        - AWS_ECR_ACCOUNT_URL
        - AWS_ACCESS_KEY_ID
        - AWS_SECRET_ACCESS_KEY
        - AWS_REGION_NAME 

## Create ECR

1. Create ECR
```
aws2 --profile taisho6339 \
cloudformation create-stack \
--stack-name ecs-study-ecr \
--template-body file://deployments/cloudformation/ec2-mode/create-ecr.yaml
```
