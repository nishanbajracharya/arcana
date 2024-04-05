import React, { useEffect, useRef, useState } from 'react';
import { Rect, Group, Transformer, Text } from 'react-konva';
import { Html } from 'react-konva-utils';

import Icon from '../../Icon';

import './style.css';
import { AWSComponent } from '@/types';
import { Group as IGroup } from 'konva/lib/Group';
import { Transformer as ITransformer } from 'konva/lib/shapes/Transformer';

const AWSService = ({ node, onDragEnd }: AWSComponent) => {
  const [enableResize, setEnableResize] = useState(false);
  const shapeRef = useRef<IGroup>(null);
  const transformerRef = useRef<ITransformer>(null);

  useEffect(() => {
    if (enableResize && transformerRef?.current && shapeRef?.current) {
      transformerRef.current.nodes([shapeRef.current]);
      transformerRef.current.getLayer()?.batchDraw();
    }
  }, [enableResize]);

  return (
    <>
      <Group
        ref={shapeRef}
        draggable={true}
        onTransformEnd={(e) => {
          console.log('Transformed', e);
          setEnableResize(false);
        }}
        onDragEnd={(e) => {
          setEnableResize(false);
          onDragEnd(e);
        }}
        onClick={() => {
          setEnableResize(true);
        }}
      >
        <Rect
          x={node.position.x}
          y={node.position.y}
          width={node.size.width}
          height={node.size.height}
          stroke={'#ccc'}
          strokeWidth={0.3}
          shadowBlur={10}
        />
        <Group x={node.position.x} y={node.position.y}>
          <Html>
            <div
              className="service-icon-container"
              onClick={() => {
                alert('Clicked');
              }}
            >
              <Icon name={node.name} />
              <Text>{node.displayName}</Text>
            </div>
          </Html>
        </Group>
      </Group>
      {enableResize && (
        <Transformer
          ref={transformerRef}
          flipEnabled={false}
          boundBoxFunc={(oldBox, newBox) => {
            // limit resize
            if (Math.abs(newBox.width) < 5 || Math.abs(newBox.height) < 5) {
              return oldBox;
            }
            return newBox;
          }}
        />
      )}
    </>
  );
};

export default AWSService;
