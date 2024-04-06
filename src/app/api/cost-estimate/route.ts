import { NextRequest } from 'next/server';
const axios = require('axios');

export async function POST(
  req: NextRequest,
) {
  const data = await req.json();
  try {
    const services = data.services.join(",")
    console.log(services)
    const response = await axios.post('http://127.0.0.1:11434/api/generate',{
      "model": "aws-assist",
      "prompt":"Give quick very short numerical estimation in cost for aws platform with following services: "+services,
      "stream": false,
      "format": "json",
    })
    return Response.json({response:JSON.parse(response.data.response)});
  } catch (ex) {
    console.log(ex)
    return Response.json({error: ex});
  }
}
