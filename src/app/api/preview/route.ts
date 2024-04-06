import { NextRequest } from 'next/server';

export async function POST(
  req: NextRequest,
) {
  const data = await req.json();
  console.log(data);
  // TODO: Call generate terraform data
  return Response.json({message:"Preview terraform data here"});
}
