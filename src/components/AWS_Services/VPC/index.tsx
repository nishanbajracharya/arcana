import { Html } from 'react-konva-utils';
import { Group as IGroup } from 'konva/lib/Group';
import { Rect, Group, Transformer } from 'react-konva';
import React, { useEffect, useRef, useState } from 'react';
import { Transformer as ITransformer } from 'konva/lib/shapes/Transformer';

import Icon from '../../Icon';

import './style.css';
import { AWSComponent } from '@/types';

const VPC = ({ node, onDragEnd, onClick }: AWSComponent) => {
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
          stroke={'#F58535'}
          strokeWidth={0.8}
          shadowBlur={10}
        />
        <Group x={node.position.x + 16} y={node.position.y + 16}>
          <Html>
            <div
              className="vpc-icon-container"
              onClick={() => {
                onClick(node.name, node.id);
              }}
            >
              <Icon size={48} name="VPC" />
              <div className="vpc-icon-text">Virtual Private Cloud</div>
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

export default VPC;
