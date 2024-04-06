import { NextRequest } from 'next/server';
import GenAI from './genAi';
import TerraformBuilder from './terraformBuilder';

export async function POST(
  req: NextRequest,
) {

    const data = await req.json();

  const terraformBuilder = new TerraformBuilder(data);
  await terraformBuilder.createBaseRepo();

  // const genAi = new GenAI();
  // const terraformData = genAi.generateTerraform()
  try {
    
    return Response.json({status: 'ok'})
  } catch (ex) {
    console.log(ex)
    return Response.json({error: ex});
  }
}
