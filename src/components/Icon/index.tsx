// @ts-nocheck
import PrivateSubnet from 'react-aws-icons/dist/aws/compute/VPN';
import PublicSubnet from 'react-aws-icons/dist/aws/compute/VPCSubnet';
import VPC from 'react-aws-icons/dist/aws/compute/VPC';
import EC2 from 'react-aws-icons/dist/aws/logo/EC2';
import ECS from 'react-aws-icons/dist/aws/logo/ECS';
import Lambda from 'react-aws-icons/dist/aws/iot/LambdaFunction';
import StepFunctions from 'react-aws-icons/dist/aws/logo/StepFunctions';
import S3 from 'react-aws-icons/dist/aws/logo/S3';
import RDS from 'react-aws-icons/dist/aws/logo/RDS';
import ElastiCache from 'react-aws-icons/dist/aws/logo/ElasticCache';
import DynamoDB from 'react-aws-icons/dist/aws/logo/DynamoDB';
import Route53 from 'react-aws-icons/dist/aws/logo/Route53';
import APIGW from 'react-aws-icons/dist/aws/logo/APIGateway';
import ELB from 'react-aws-icons/dist/aws/logo/ELB';
import NATGateway from 'react-aws-icons/dist/aws/compute/NATGateway';

interface IIcon {
  name?: string;
  size?: number;
}

const Icon = ({ name }: IIcon) => {

  switch (name) {
    case 'VPC': {
      return <VPC size={48} />
      break;
    }
    case 'EC2': {
      return <EC2 size={48} />
      break;
    }
    case 'ECS': {
      return <ECS size={48} />
      break;
    }
    case 'Route53': {
      return <Route53 size={48} />
      break;
    }
    case 'APIGW': {
      return <APIGW size={48} />
      break;
    }
    case 'ELB': {
      return <ELB size={48} />
      break;
    }
    case 'NATGateway': {
      return <NATGateway size={48} />
      break;
    }
    case 'Lambda': {
      return <Lambda size={48} />
      break;
    }
    case 'StepFunctions': {
      return <StepFunctions size={48} />
      break;
    }
    case 'S3': {
      return <S3 size={48} />
      break;
    }
    case 'RDS': {
      return <RDS size={48} />
      break;
    }
    case 'ElastiCache': {
      return <ElastiCache size={48} />
      break;
    }
    case 'DynamoDB': {
      return <DynamoDB size={48} />
      break;
    }
    case 'PublicSubnet': {
      return <PublicSubnet size={48} />
      break;
    }
    case 'PrivateSubnet': {
      return <PrivateSubnet size={48} />
      break;
    }
    default: {
      return <div>No Icon</div>
    }
  }
}

export default Icon;