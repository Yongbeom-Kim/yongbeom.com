backend_tfstate_path:=../backend/terraform/terraform.tfstate
backend_path:=$(shell terraform output -raw -state=$(backend_tfstate_path) backend_lambda_url)

dev:
	yarn run dev

build:
	@ printf "VITE_BACKEND_ROUTE=$(backend_path)" > .env.production
	@ yarn run build --mode production

# Terraform

init:
	@ set -a && . ./.env.terraform && set +a && \
	cd terraform && terraform init

plan: init
	@ set -a && . ./.env.terraform && set +a && \
	cd terraform && terraform plan

apply: init build
	@ set -a && . ./.env.terraform && set +a && \
	cd terraform && terraform apply
