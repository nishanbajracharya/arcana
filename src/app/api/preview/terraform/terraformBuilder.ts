import fs from 'fs/promises';
import TerraformGenerator, { TerraformData } from './TerraformGenerator';
import TerraformDAO from './terraformDAO';
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
  projectName: string = '';
  folderPath: string = '';
  vpcNode: any = null;
  terraformGenerator: TerraformGenerator;

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
    this.projectName = `terraform-bundle`;
    this.folderPath = `${currentDirectory}/../${this.projectName}`;;
   this.terraformGenerator = new TerraformGenerator(this.terraformData);

  }

  createBaseRepo = async () => {
    try {
      const projectName = this.projectName;
      const folderPath = this.folderPath;
      await fs.mkdir(folderPath);
      await fs.mkdir(`${folderPath}/modules`);

      await this.createModules();
      this.terraformGenerator.setTerraformData(this.terraformData);
      const terraformScript: string = await this.terraformGenerator.generateTerraformScript();
      await fs.writeFile(`${folderPath}/main.tf`, terraformScript, 'utf8');

    } catch (error) {
      console.log('Err', error);
      throw error;
    }
  }

  createModules = async () => {
    const moduleMapper = {
      VPC: { name: "vpc", source: "./modules/VPC/" },
      SG: { name: "web_server_sg", source: "./modules/security_group/", vpc_id: "module.vpc.vpc_id", vpc_cidr_block: "module.vpc.vpc_cidr_block" },
      EC2: { name: "ec2-instance", source: "./modules/EC2/", subnet_id: "module.vpc.public_subnet_id", security_group: "module.web_server_sg.security_group_id" },
      S3: { name: "S3", source: "./modules/S3/" },
      Amplify: { name: "Amplify", source: "./modules/Amplify/" }
  }
  const modules: any = [];
  const terraformDao = new TerraformDAO();
  await terraformDao.setTerraformDataFromDB();
  await Promise.all(this.canvasData.map(async awsService => {

    switch(awsService.name) {
      case 'VPC': {
        const vpc = moduleMapper['VPC'];
        modules.push(vpc);
        modules.push(moduleMapper['SG'])

        const terraformNode = terraformDao.getTerraformDataById(awsService.id)
        const terraformScript = this.terraformGenerator.generateModuleTerraformScript(terraformNode, false);
        this.vpcNode = terraformScript;
        await this.createVpcModule(`${this.folderPath}/modules`, `${currentDirectory}/template/modules`);
       
        break;
      }
      default: {
        if(awsService.name !== 'PublicSubnet' || awsService.name !== 'PrivateSubnet' || awsService.name !== 'VPC') {
          //@ts-ignore
          const service = moduleMapper[awsService.name];
          modules.push(service);
          const pathName = `${this.folderPath}/modules`
          await fs.mkdir(`${pathName}/${awsService.name}`);
          const terraformNode = terraformDao.getTerraformDataById(awsService.id)
          if(terraformNode) {
            const withVar = awsService.name === 'EC2' ? true : false;
          const terraformScript = this.terraformGenerator.generateModuleTerraformScript(terraformNode, withVar);
          fs.writeFile(`${pathName}/${awsService.name}/main.tf`, terraformScript, 'utf8');
          }
        }
      }
    }
  }))

  //@ts-ignore
  this.terraformData.modules = modules.filter(item => item !== undefined);

  }

  createVpcModule = async (projectDirectory: string, templatePath: string) => {
    const templateDir = await fs.readdir(templatePath);
    templateDir.forEach(async file => {
      const stats = await fs.stat(`${templatePath}/${file}`);
  
      if(stats.isFile()) {
        const fileData = await fs.readFile(`${templatePath}/${file}`, 'utf8');
        const writePath = `${projectDirectory}/${file}`;
        const data = projectDirectory.includes('VPC') && file == 'main.tf' ? this.vpcNode : fileData
  
        await fs.writeFile(writePath, data, 'utf8');
      }
      else if(stats.isDirectory()) {
        await fs.mkdir(`${projectDirectory}/${file}`);
        await this.createVpcModule(`${projectDirectory}/${file}`, `${templatePath}/${file}`);
      }
    })
  }

}

export default TerraformBuilder;