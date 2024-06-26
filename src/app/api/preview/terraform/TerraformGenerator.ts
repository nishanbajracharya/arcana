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

  public setTerraformData = (jsonData: TerraformData) => {
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

  public generateModuleTerraformScript(moduleData: any, withVar: boolean): string {
    let tfScript = '';

    if (withVar && moduleData.moduleName === 'EC2') {
      // Add variables at the top of the file
      tfScript += `variable "subnet_id" {}\n`;
      tfScript += `variable "security_group" {}\n`;
      // Add more variables as needed
      tfScript += `\n`; // Add an empty line before module declaration
    }

    if (withVar && moduleData.moduleName === 'web_server_sg') {
      // Add variables at the top of the file
      tfScript += `variable "vpc_id" {}\n`;
      tfScript += `variable "vpc_cidr_block" {}\n`;
      // Add more variables as needed
      tfScript += `\n`; // Add an empty line before module declaration
    }
  
    tfScript += `module "${moduleData.moduleName === 'EC2' ? 'ec2-instance' : moduleData.moduleName === 'VPC' ? 'vpc' : moduleData.moduleName}" {\n`;
  
    // Loop through dynamic values and add them to the Terraform script
    if(moduleData?.data?.module) {
      Object.entries(moduleData.data.module).forEach(([key, value]) => {
        // Convert boolean values to string
        let strValue:any = `"${value}"`;
        if(typeof value === 'boolean') {
          strValue = Boolean(value)
        }else if (Array.isArray(value)) {
          strValue = JSON.stringify(value)
        }
        tfScript += `  ${key} = ${strValue}\n`;
      });
    }

    if(moduleData?.data?.data?.module) {
      Object.entries(moduleData.data.data.module).forEach(([key, value]) => {
        // Convert boolean values to string
        const strValue = typeof value === 'boolean' ? Boolean(value) : `"${value}"`;
        tfScript += `  ${key} = ${strValue}\n`;
      });
    }

    if(moduleData.moduleName === 'EC2') {
      tfScript += `vpc_security_group_ids =[var.security_group]\n`
      tfScript += `subnet_id =var.subnet_id\n`
    }
  
    tfScript += `}\n`;
  
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

