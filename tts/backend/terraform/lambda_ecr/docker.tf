data "archive_file" "src" {
  type        = "zip"
  source_dir = "${path.module}/src"
  output_path = "${path.module}/src.zip"
}


resource "null_resource" "docker_build_and_push" {
    provisioner "local-exec" {
        command = "make docker_push"
    }

    provisioner "local-exec" {
        command = "rm ${path.module}/src.zip"
    }

    triggers = {
      checksum = data.archive_file.src.output_base64sha256
    }

    # Can only push docker after creating ECR repo.
    depends_on = [ aws_ecr_repository.backend_lambda_container_repo ]
}