import { exec } from 'child_process';

class TerraformExecutioner {
    private readonly terraformPath: string;

    constructor(terraformPath: string) {
        this.terraformPath = terraformPath;
    }

    private runCommand(command: string): Promise<string> {
        return new Promise((resolve, reject) => {
          console.log('Executing Command', command, process.cwd());
            exec(command, { cwd: this.terraformPath }, (error, stdout, stderr) => {
                if (error) {
                    console.log('ERR', error);
                    reject(error);
                    return;
                }
                console.log('Success');
                resolve(stdout ? stdout : stderr);
            });
        });
    }

    public async init(): Promise<string> {
        return this.runCommand('terraform init');
    }

    public async changeDirectory() {
      process.chdir(this.terraformPath);
    }

    public async apply(autoApprove: boolean = true): Promise<string> {
        const command = autoApprove ? 'terraform apply -auto-approve' : 'terraform apply';
        return this.runCommand(command);
    }

}



export default TerraformExecutioner;
