import { NextRequest } from 'next/server';
import TerraformBuilder from './terraform/terraformBuilder';

export async function POST(
  req: NextRequest,
) {

    const data = await req.json();


  try {
    
  const terraformBuilder = new TerraformBuilder(data.nodes);
  await terraformBuilder.createBaseRepo();
  
    return Response.json({status: 'ok'})
  } catch (ex) {
    console.log(ex)
    return Response.json({error: ex});
  }
}
