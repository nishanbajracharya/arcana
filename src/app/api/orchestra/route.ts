import { NextRequest } from 'next/server';
import easyDB from "easy-db-node";
const { insert, select } = easyDB({});

export async function POST(
  req: NextRequest,
) {
  const {orch, nodeId, nodeData} = await req.json();
  const id = await insert('orchestras', orch)
  await insert('terraforms', {
    id: nodeId,
    orchId: orch.id,
    data: nodeData,
  })

  return Response.json({id});
}

export async function GET(
) {
  const data = await select('orchestras');
  return Response.json({data});
}
