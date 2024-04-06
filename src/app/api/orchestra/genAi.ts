import axios from 'axios';

class GenAI {
  constructor() {

  }

  generateTerraform = async (promptdata: object): Promise<string> => {
    const response =  await axios.post('http://127.0.0.1:11434/api/generate',{
      "model": "terraform-builder",
      "prompt":"Quickly generate terraform file for: "+JSON.stringify(promptdata),
      "stream": false,
      "format": "json",
    })

    return JSON.parse(response.data.response);

  }
}

export default GenAI;