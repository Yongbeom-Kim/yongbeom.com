.PHONY: test

backend_aws_iam_tfstate_file := ./terraform/upload_bucket/terraform.tfstate
backend_aws_iam_access_key := $(shell terraform output -raw -state=$(backend_aws_iam_tfstate_file) backend_iam_access_key)
backend_aws_iam_secret_key := $(shell terraform output -raw -state=$(backend_aws_iam_tfstate_file) backend_iam_secret_key)

flask:
	@ set -a && . ./.env.deploy && set +a && \
		flask --app src.app:app run
dev:
	$(MAKE) docker_run

test: 
	COMMAND="pytest" $(MAKE) docker_run_cmd

## Docker

docker_build:
	@ set -a && . ./.env.deploy && set +a && \
		pip freeze > requirements.txt && \
		docker build \
				-t $${DOCKER_IMAGE_TAG} \
				-f lambda.Dockerfile \
				--build-arg="aws_public_key=$(backend_aws_iam_access_key)" \
				--build-arg="aws_secret_key=$(backend_aws_iam_secret_key)" \
				.

docker_run: docker_build
	@ set -a && . ./.env.deploy && set +a && \
		docker run -p 5000:8080 $${DOCKER_IMAGE_TAG}

docker_run_cmd: docker_build
	@ set -a && . ./.env.deploy && set +a && \
		docker run -it $${DOCKER_IMAGE_TAG} $(COMMAND)

docker_run_bash: 
	COMMAND=/bin/bash $(MAKE) docker_run_cmd


docker_login:
	@ set -a && . ./.env.deploy && set +a && \
		aws ecr get-login-password --region $${AWS_REGION} | docker login --username AWS --password-stdin $${AWS_ACCOUNT_ID}.dkr.ecr.$${AWS_REGION}.amazonaws.com

docker_push: docker_login docker_build
	@ set -a && . ./.env.deploy && set +a && \
		docker push $${DOCKER_IMAGE_TAG}

docker_image_digest = $(shell set -a && . ./.env.deploy && set +a && docker inspect $${DOCKER_IMAGE_TAG} | jq ".[0].Id")

## Terraform

tf:
	@ set -a && . ./.env.deploy && set +a && \
		export TF_VAR_backend_lambda_container_digest=$(docker_image_digest) && \
		cd $(DIR) && \
		terraform $(TF_ACTION)

init:
	DIR=terraform/lambda_ecr TF_ACTION=init $(MAKE) tf
	DIR=terraform/upload_bucket TF_ACTION=init $(MAKE) tf
	DIR=terraform TF_ACTION=init $(MAKE) tf

plan:
	DIR=terraform/lambda_ecr TF_ACTION=plan $(MAKE) tf
	DIR=terraform/upload_bucket TF_ACTION=plan $(MAKE) tf
	DIR=terraform TF_ACTION=plan $(MAKE) tf

apply:
	DIR=terraform/lambda_ecr TF_ACTION="apply -auto-approve" $(MAKE) tf
	DIR=terraform/upload_bucket TF_ACTION="apply -auto-approve" $(MAKE) tf
	$(MAKE) docker_push
	DIR=terraform TF_ACTION="apply -auto-approve" $(MAKE) tf

destroy:
	DIR=terraform/lambda_ecr TF_ACTION="destroy -auto-approve" $(MAKE) tf
	DIR=terraform/upload_bucket TF_ACTION="destroy -auto-approve" $(MAKE) tf
	DIR=terraform TF_ACTION="destroy -auto-approve" $(MAKE) tf

## Utils

fmt:
	terraform fmt -recursive