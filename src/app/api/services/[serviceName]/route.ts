import { NextRequest } from 'next/server';
import easyDB from "easy-db-node";
import { NextApiRequest } from 'next';
import { useParams } from 'next/navigation';
const { select } = easyDB({});

export async function GET(
  req: NextApiRequest, { params }: { params: { serviceName: string } }
) {
  const service = await select('services', params.serviceName);
  return Response.json({ service });
}
