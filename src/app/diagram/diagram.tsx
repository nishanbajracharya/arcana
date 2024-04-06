import React, { useState } from 'react';
import { Stage, Layer, Line } from 'react-konva';
import { KonvaEventObject } from 'konva/lib/Node';

import './diagram.css';

import ServicePane from '../../components/ServicePane';
import NodeFactory from '../../components/NodeFactory';
import { generateRandomString } from '../../utils/utils';
import { Node } from '@/types';

const HEIGHT = window.innerHeight;
const WIDTH = window.innerWidth - 360;

const App = () => {
  const [nodes, setNodes] = useState<Node[]>([]);
  const grid = [];
  const gridSize = 30;

  for (let i = 0; i < WIDTH / gridSize; i++) {
    grid.push(
      <Line key={`line-h-${i}`} points={[i * gridSize, 0, i * gridSize, WIDTH]} stroke={'#ccc'} strokeWidth={0.5} />
    );

    grid.push(
      <Line key={`line-w-${i}`} points={[0, i * gridSize, WIDTH, i * gridSize]} stroke={'#ccc'} strokeWidth={0.5} />
    );
  }

  const getServiceNodeSize = (name: string) => {
    switch (name) {
      case 'VPC':
        return {
          width: 960,
          height: 800,
        };
      case 'PublicSubnet':
        return {
          width: 400,
          height: 640,
        };
      case 'PrivateSubnet':
        return {
          width: 400,
          height: 640,
        };
      default:
        return {
          width: 88,
          height: 88,
        };
    }
  };

  const handleServiceClick = (e: React.MouseEvent, name: string, displayName: string) => {
    const node: Node = {
      id: generateRandomString(8),
      name: name,
      displayName: displayName,
      position: {
        x: 200,
        y: 300,
      },
      size: getServiceNodeSize(name),
    };
    setNodes([...nodes, node]);
  };

  const handleNodeDragEnd = (node: Node, e: KonvaEventObject<DragEvent>) => {
    console.log('Handle Drag End', node, e);
  };

  return (
    <div className="container-app">
      <ServicePane onClick={handleServiceClick} />
      <Stage height={HEIGHT} width={WIDTH}>
        <Layer>
          {grid}
          {nodes.map((node, key) => (
            <NodeFactory
              key={key}
              node={node}
              onDragEnd={(e) => {
                handleNodeDragEnd(node, e);
              }}
            />
          ))}
        </Layer>
      </Stage>
    </div>
  );
};

export default App;
