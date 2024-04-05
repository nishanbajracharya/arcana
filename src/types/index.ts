import { KonvaEventObject } from 'konva/lib/Node';

export type Node = {
  id: string;
  name: string;
  displayName: string;
  position: {
    x: number;
    y: 300;
  };
  size: {
    width: number;
    height: number;
  };
};

export type AWSComponent = { node: Node; onDragEnd: (e: KonvaEventObject<DragEvent>) => void };
