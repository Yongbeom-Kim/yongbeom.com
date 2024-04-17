BASH_ENV := .env
ENV := .env

dotenv: # Import dotenv variables
	@ set -a && . ./.env && set +a && \
		$${SHELL}

dev:
	@ set -a && . ./.env && set +a && \
		flask --app src.app:app run --reload


init:
	set -a && . ./.env && set +a && \
		cd terraform && terraform init

plan:
	set -a && . ./.env && set +a && \
		cd terraform && terraform plan

apply:
	set -a && . ./.env && set +a && \
		cd terraform && terraform apply