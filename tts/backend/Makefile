.PHONY: test

dev:
	@ set -a && . ./.env.prod && set +a && \
		flask --app src.app:app run --reload

test:
	@ set -a && . ./.env.prod && set +a && \
		pytest

## Docker

docker_build:
	@ set -a && . ./.env.deploy && set +a && \
		pip freeze > requirements.txt && \
		docker build -t $${DOCKER_IMAGE_TAG} -f lambda.Dockerfile .

docker_run:
	@ set -a && . ./.env.deploy && set +a && \
		docker run -p 8080:8080 $${DOCKER_IMAGE_TAG}

docker_login:
	@ set -a && . ./.env.deploy && set +a && \
		aws ecr get-login-password --region $${AWS_REGION} | docker login --username AWS --password-stdin $${AWS_ACCOUNT_ID}.dkr.ecr.$${AWS_REGION}.amazonaws.com

docker_push:
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
	DIR=terraform TF_ACTION=init $(MAKE) tf

plan:
	DIR=terraform/lambda_ecr TF_ACTION=plan $(MAKE) tf
	$(MAKE) docker_build
	DIR=terraform TF_ACTION=plan $(MAKE) tf

apply:
	DIR=terraform/lambda_ecr TF_ACTION="apply -auto-approve" $(MAKE) tf
	$(MAKE) docker_build
	$(MAKE) docker_push
	DIR=terraform TF_ACTION="apply -auto-approve" $(MAKE) tf

destroy:
	DIR=terraform/lambda_ecr TF_ACTION="destroy -auto-approve" $(MAKE) tf
	DIR=terraform TF_ACTION="destroy -auto-approve" $(MAKE) tf

## Utils

fmt:
	DIR=terraform/lambda_ecr TF_ACTION="fmt" $(MAKE) tf
	DIR=terraform TF_ACTION="fmt" $(MAKE) tf