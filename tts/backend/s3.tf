resource "aws_s3_bucket" "upload_bucket" {
  bucket = var.s3_bucket_name

  tags = {
    Managed_By  = "Terraform"
    Environment = "Production"
  }
}