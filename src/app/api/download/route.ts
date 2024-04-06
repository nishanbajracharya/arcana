import { NextRequest } from 'next/server';

export async function POST(
  req: NextRequest,
) {
  const data = await req.json();
  console.log(data);
  // TODO: Zip the terraform dir
  return Response.json({message:"Zip file"});
}
