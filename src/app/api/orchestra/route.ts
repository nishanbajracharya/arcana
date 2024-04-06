import { NextRequest } from 'next/server';
import easyDB from "easy-db-node";
const { insert, update } = easyDB({});
 
export async function POST(
  req: NextRequest,
) {
  const data = await req.json();
  const id = await insert('orchestras', data)
  return Response.json({id});
}
