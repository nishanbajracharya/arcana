import { NextRequest } from 'next/server';
import TerraformExecutioner from './TerraformExecutioner';
import {resolve} from 'path';

export async function POST(
  req: NextRequest,
) {
  const terraformExecutioner = new TerraformExecutioner(resolve(__dirname,'../../../../../../terraform-bundle'));
  terraformExecutioner.changeDirectory();
  await terraformExecutioner.init();
  const autoApply = true;
  await terraformExecutioner.apply(autoApply);

  return Response.json({message:"Architecture Deployed to AWS Successfully"});
}
