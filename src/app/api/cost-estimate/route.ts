import { NextRequest } from 'next/server';
import easyDB from "easy-db-node";
const axios = require('axios');

let config = {
  method: 'post',
  maxBodyLength: Infinity,
  url: 'localhost:11434/api/generate',
  headers: { 
    'Content-Type': 'application/json'
  },
};


export async function POST(
  req: NextRequest,
) {
  const data = await req.json();
  try {
    const services = data.services.join(",")
    console.log(services)
    const response = await axios.post('http://127.0.0.1:11434/api/generate',{
      "model": "aws-assist",
      "prompt":"Give very short numerical estimation in cost range along with rate for aws platform with following services: "+services,
      "stream": false,
      "format": "json",
    })
    return Response.json({response:JSON.parse(response.data.response)});
  } catch (ex) {
    console.log(ex)
    return Response.json({error: ex});
  }
}
