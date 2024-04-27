variable "backend_lambda_container_ecr_name" {
  type        = string
  description = "The name of the ECR repository for the backend lambda container."
}

resource "aws_ecr_repository" "backend_lambda_container_repo" {
  name                 = var.backend_lambda_container_ecr_name
  image_tag_mutability = "MUTABLE"
  force_delete = true
  image_scanning_configuration {
    scan_on_push = true
  }
}

data "archive_file" "src" {
  type        = "zip"
  source_dir = "${path.module}/../src"
  output_path = "${path.module}/../src.zip"
  
}


### Build and push docker


resource "null_resource" "docker_build_and_push" {
    provisioner "local-exec" {
        command = "make docker_push"
        working_dir = "${path.module}/../.." # This is the root of the project.
    }

    provisioner "local-exec" {
        command = "rm ./src.zip"
        working_dir = "${path.module}/../.." # This is the root of the project.
    }

    triggers = {
      checksum = data.archive_file.src.output_base64sha256
    }

    # Can only push docker after creating ECR repo.
    depends_on = [ aws_ecr_repository.backend_lambda_container_repo ]
}