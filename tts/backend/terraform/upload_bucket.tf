variable "s3_bucket_name" {
  type = string
}

resource "aws_s3_bucket" "upload_bucket" {
  bucket        = var.s3_bucket_name
  force_destroy = true
  tags = {
    Managed_By  = "Terraform"
    Environment = "Production"
  }
}

resource "aws_s3_bucket_cors_configuration" "example" {
  bucket = aws_s3_bucket.upload_bucket.id

  cors_rule {
    allowed_headers = ["*"]
    allowed_methods = ["POST"]
    allowed_origins = ["*"]
  }
}