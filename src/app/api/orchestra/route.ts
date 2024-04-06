import { NextRequest } from 'next/server';
import easyDB from "easy-db-node";
import GenAI from './genAi';
const { insert, select } = easyDB({});

export async function POST(
  req: NextRequest,
) {
  const {orch, nodeId, nodeData} = await req.json();
  const id = await insert('orchestras', orch)
  const genAi = new GenAI();
  const terraformScript = await genAi.generateTerraform(nodeData);
  await insert('terraforms', {
    id: nodeId,
    orchId: orch.id,
    data: terraformScript,
  })

  return Response.json({id});
}

export async function GET(
) {
  const data = await select('orchestras');
  return Response.json({data});
}
