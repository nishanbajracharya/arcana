import VPC from "../AWS_Services/VPC";
import PublicSubnet from "../AWS_Services/PublicSubnet";
import AWSService from "../AWS_Services/GenericService";
import PrivateSubnet from "../AWS_Services/PrivateSubnet";

import { AWSComponent } from "@/types";

const NodeFactory = ({ node, onDragEnd, onClick }: AWSComponent) => {

  switch (node.name) {
    case 'VPC': {
      return <VPC node={node} onDragEnd={onDragEnd} onClick={onClick}/>
    }
    case 'PublicSubnet': {
      return <PublicSubnet node={node} onDragEnd={onDragEnd} onClick={onClick}/>
    }
    case 'PrivateSubnet': {
      return <PrivateSubnet node={node} onDragEnd={onDragEnd} onClick={onClick}/>
    }

    default: return <AWSService node={node} onDragEnd={onDragEnd} onClick={onClick} />
  }

}

export default NodeFactory;
