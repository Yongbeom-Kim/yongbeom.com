variable "aws_region" {
  type = string
}

variable "s3_bucket_name" {
  type = string
}

output "s3_bucket_url" {
    value = "https://${var.aws_region}.console.aws.amazon.com/s3/buckets/${var.s3_bucket_name}"
}