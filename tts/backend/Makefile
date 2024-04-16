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
	terraform init

plan:
	terraform plan

apply:
	terraform apply