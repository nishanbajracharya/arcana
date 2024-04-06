variable "vpc_id" {}
variable "vpc_cidr_block" {}

module "web_server_sg" {
  source = "terraform-aws-modules/security-group/aws//modules/http-80"

  name        = "default-security-group"
  description = "Security group for web-server with HTTP ports open within VPC"
  vpc_id      = var.vpc_id

  ingress_cidr_blocks = [var.vpc_cidr_block]
}