BASH_ENV := .env
ENV := .env

dotenv: # Import dotenv variables
	@ set -a && \
		. ./.env && \
		set +a && \
		$${SHELL}

dev:
	flask --app src.app:app run --reload


init:
	cd terraform && terraform init

plan:
	cd terraform && terraform plan

apply:
	cd terraform && terraform apply