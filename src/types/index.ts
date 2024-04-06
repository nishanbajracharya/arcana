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
  data?: object[]
};

export type ServiceConfig = {
  name : string;
  componentType : "textField" | "numberField" ;
  label : string;
  defaultValue : string;
  required : boolean;
  value ?: string;
}

export type AWSComponent = { node: Node; onDragEnd: (e: KonvaEventObject<DragEvent>) => void, onClick: (name: string) => void };
