variable "backend_lambda_container_ecr_name" {
  type        = string
  description = "The name of the ECR repository for the backend lambda container."
}

resource "aws_ecr_repository" "backend_lambda_container_repo" {
  name                 = var.backend_lambda_container_ecr_name
  image_tag_mutability = "MUTABLE"

  image_scanning_configuration {
    scan_on_push = true
  }
}