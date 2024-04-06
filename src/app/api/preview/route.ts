import axios from 'axios';
import { NextRequest } from 'next/server';

export async function POST(
  req: NextRequest,
) {
  const data = await req.json();
  try {
    const response = await axios.post('http://127.0.0.1:11434/api/generate',{
      "model": "terraform-builder",
      "prompt":"Quickly generate terraform file for: "+JSON.stringify(data),
      "stream": false,
      "format": "json",
    })
    return Response.json(JSON.parse(response.data.response));
  } catch (ex) {
    console.log(ex)
    return Response.json({error: ex});
  }
}
