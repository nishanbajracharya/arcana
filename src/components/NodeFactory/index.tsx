import VPC from "../AWS_Services/VPC";
import PublicSubnet from "../AWS_Services/PublicSubnet";
import AWSService from "../AWS_Services/GenericService";
import PrivateSubnet from "../AWS_Services/PrivateSubnet";

import { AWSComponent } from "@/types";

const NodeFactory = ({ node, onDragEnd }: AWSComponent) => {

  switch (node.name) {
    case 'VPC': {
      return <VPC node={node} onDragEnd={onDragEnd} />
    }
    case 'PublicSubnet': {
      return <PublicSubnet node={node} onDragEnd={onDragEnd} />
    }
    case 'PrivateSubnet': {
      return <PrivateSubnet node={node} onDragEnd={onDragEnd} />
    }

    default: return <AWSService node={node} onDragEnd={onDragEnd} />
  }

}

export default NodeFactory;
