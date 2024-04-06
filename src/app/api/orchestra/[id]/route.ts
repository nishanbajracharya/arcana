import { NextRequest } from 'next/server';
import easyDB from "easy-db-node";
import { NextApiRequest } from 'next';
import { useParams } from 'next/navigation';
import GenAI from '../genAi';
const { select, update, remove } = easyDB({});

export async function GET (
    req: NextApiRequest, { params }: { params: { id: string } }
  ) {
    const data = await select('orchestras', params.id);
    return Response.json(data);
  }

export async function PUT (
    req: NextRequest, { params }: { params: { id: string } }
) {
    const {orch, nodeId, nodeName, nodeData} = await req.json();
    await update('orchestras', params.id, orch);
    const genAi = new GenAI();
    const terraformScript = await genAi.generateTerraform(nodeData);
    await update('terraforms', nodeId, {
        id: nodeId,
        moduleName: nodeName,
        data: terraformScript,
      })
    return Response.json(orch);
}

export async function DELETE (
    req: NextRequest, { params }: { params: { id: string } }
) {
    await remove('orchestras', params.id);
    return Response.json({id: params.id});
}
