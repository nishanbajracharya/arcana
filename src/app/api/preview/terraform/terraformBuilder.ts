import fs from 'fs/promises';
import TerraformGenerator, { TerraformData } from './TerraformGenerator';
const currentDirectory = process.cwd();

interface Position {
  x: number;
  y: number;
}

interface Size {
  width: number;
  height: number;
}

interface AwsService {
  id: string;
  name: string;
  displayName: string;
  position: Position;
  size: Size;
  data?: any;
}

class TerraformBuilder {
  canvasData:Array<AwsService> = [];
  terraformData: TerraformData = {
    terraform: {
      required_version: ">= 1.4.0",
      required_providers: {
        aws: {
          source: "hashicorp/aws",
          version: ">= 5.0.0"
        }
      }
    },
    providers: {
      aws: {
        region: "us-east-1"
      }
    },
    modules: [
    
    ]
  };

  constructor(canvasData: Array<AwsService>) {
    this.canvasData = canvasData;
  }

  createBaseRepo = async () => {
    try {
      const projectName = `terraform-bundle-${Date.now()}`;
      const folderPath = `${currentDirectory}/../${projectName}`;
      await fs.mkdir(folderPath);
      await fs.mkdir(`${folderPath}/modules`);

      this.createModules();
      const terraformGenerator = new TerraformGenerator(this.terraformData);
      const terraformScript: string = await terraformGenerator.generateTerraformScript();
      await fs.writeFile(`${folderPath}/main.tf`, terraformScript, 'utf8');


    } catch (error) {
      console.log('Err', error);
    }
  }

  createModules = async () => {
    const moduleMapper = {
      VPC: { name: "vpc", source: "./modules/vpc/" },
      SG: { name: "default-security-group", source: "./modules/security_group/", vpc_id: "module.vpc.vpc_id", vpc_cidr_block: "module.vpc.vpc_cidr_block" },
      EC2: { name: "EC2", source: "./modules/ec2/", subnet_id: "module.vpc.public_subnet_id", security_group: "module.web_server_sg.security_group_id" },
      S3: { name: "S3", source: "./modules/s3/" },
      Amplify: { name: "Amplify", source: "./modules/amplify/" }
  }
  const modules: any = [];
  this.canvasData.forEach(awsService => {

      switch(awsService.name) {
        case 'VPC': {
          const vpc = moduleMapper['VPC'];
          modules.push(vpc);
          modules.push(moduleMapper['SG'])
          break;
        }
        default: {
          //@ts-ignore
          const service = moduleMapper[awsService.name];
          modules.push(service);
        }
      }

      this.terraformData.modules = modules;

    })

  }


}

export default TerraformBuilder;