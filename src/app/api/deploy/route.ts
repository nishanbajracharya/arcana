import { NextRequest } from 'next/server';

export async function POST(
  req: NextRequest,
) {
  const data = await req.json();
  console.log(data);
  // TODO: Call deploy function
  return Response.json({message:"Deployed"});
}
