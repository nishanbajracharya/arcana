import { NextRequest } from 'next/server';
import easyDB from "easy-db-node";
import { NextApiRequest } from 'next';
import { useParams } from 'next/navigation';
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
    const data = await req.json();
    await update('orchestras', params.id, data);
    return Response.json(data);
}

export async function DELETE (
    req: NextRequest, { params }: { params: { id: string } }
) {
    await remove('orchestras', params.id);
    return Response.json({id: params.id});
}
