import fs from 'fs/promises';

export interface Module {
  name: string;
  source: string;
  vpc_id?: string;
  vpc_cidr_block?: string;
  subnet_id?: string;
  security_group?: string;
}

export interface Provider {
  aws: {
    region: string;
  };
}

export interface TerraformData {
  terraform: {
    required_version: string;
    required_providers: {
      aws: {
        source: string;
        version: string;
      };
    };
  };
  providers: Provider;
  modules: Module[];
}

class TerraformGenerator {
  private jsonData: TerraformData;

  constructor(jsonData: TerraformData) {
    this.jsonData = jsonData;
  }

  private async jsonToTerraform(): Promise<string> {
    let tfScript = '';

    // Terraform block for required version and providers
    tfScript += `terraform {\n`;
    tfScript += `  required_version = "${this.jsonData.terraform.required_version}"\n`;
    tfScript += `  required_providers {\n`;
    tfScript += `    aws = {\n`;
    tfScript += `      source  = "${this.jsonData.terraform.required_providers.aws.source}"\n`;
    tfScript += `      version = "${this.jsonData.terraform.required_providers.aws.version}"\n`;
    tfScript += `    }\n`;
    tfScript += `  }\n`;
    tfScript += `}\n\n`;

    // Provider block
    tfScript += `provider "aws" {\n`;
    tfScript += `  region = "${this.jsonData.providers.aws.region}"\n`;
    tfScript += `}\n\n`;

    // Module blocks
    for (const module of this.jsonData.modules) {
      tfScript += `module "${module.name}" {\n`;
      tfScript += `  source = "${module.source}"\n`;

      // Add module specific attributes if available
      if (module.vpc_id) {
        tfScript += `  vpc_id = ${module.vpc_id}\n`;
      }
      if (module.vpc_cidr_block) {
        tfScript += `  vpc_cidr_block = ${module.vpc_cidr_block}\n`;
      }
      if (module.subnet_id) {
        tfScript += `  subnet_id = ${module.subnet_id}\n`;
      }
      if (module.security_group) {
        tfScript += `  security_group = ${module.security_group}\n`;
      }

      tfScript += `}\n\n`;
    }

    return tfScript;
  }

  public async generateTerraformScript(): Promise<string> {
    try {
      const terraformScript = await this.jsonToTerraform();
      return terraformScript;
    } catch (err) {
      console.error('Error generating Terraform script:', err);
      return 'Error Generating Terraform Script';
    }
  }
}

export default TerraformGenerator
