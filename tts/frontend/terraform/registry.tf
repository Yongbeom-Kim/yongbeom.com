variable "aws_region" {
  type = string
}

terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "5.45.0"
    }
  }
}

provider "aws" {
  region = var.aws_region
}

locals {
  tag = {
    ManagedBy   = "Terraform"
    Application = "tts.yongbeom.com"
  }
}