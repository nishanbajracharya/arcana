'use client';

import React from 'react';
import { RiLoader4Line } from "react-icons/ri";

export default function ServiceCost({config}: {config: object}) {
  const [cost, setCost] = React.useState(null);
  if (!config) return null;


  const serviceName = config.name;

  const serviceConfig = {};

  if (config.data) {
    for(let data of config.data) {
      serviceConfig[data.name] = data.value;
    }
  }

  async function fetchCost() {
    const response = await fetch('http://127.0.0.1:11434/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "model": "aws-assist",
        "prompt":"Give quick very short numerical estimation in cost for aws platform with following services: "+ JSON.stringify({serviceName, ...serviceConfig}, null, 2),
        "stream": false,
        "format": "json",
      })
    });
    const data = await response.json();

    return data;
  }

  React.useEffect(() => {

    fetchCost().then(data => {
      try {
      const response = JSON.parse(data.response);
      setCost(response.services[0].cost)
      } catch(e) {

      }
    });
  }, [config.data]);

  if (!cost) return <><strong>Cost</strong> <RiLoader4Line className='rotating'/></>;

  return <><strong>Cost</strong> {cost}</>;
}
