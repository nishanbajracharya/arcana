// import PrivateSubnet from 'react-aws-icons/dist/aws/compute/VPN';
// import PublicSubnet from 'react-aws-icons/dist/aws/compute/VPCSubnet';
// import VPC from 'react-aws-icons/dist/aws/compute/VPC';
// import EC2 from 'react-aws-icons/dist/aws/logo/EC2';
// import ECS from 'react-aws-icons/dist/aws/logo/ECS';
// import Lambda from 'react-aws-icons/dist/aws/iot/LambdaFunction';
// import StepFunctions from 'react-aws-icons/dist/aws/logo/StepFunctions';
// import S3 from 'react-aws-icons/dist/aws/logo/S3';
// import RDS from 'react-aws-icons/dist/aws/logo/RDS';
// import ElastiCache from 'react-aws-icons/dist/aws/logo/ElasticCache';
// import DynamoDB from 'react-aws-icons/dist/aws/logo/DynamoDB';
// import Route53 from 'react-aws-icons/dist/aws/logo/Route53';
// import APIGW from 'react-aws-icons/dist/aws/logo/APIGateway';
// import ELB from 'react-aws-icons/dist/aws/logo/ELB';
// import NATGateway from 'react-aws-icons/dist/aws/compute/NATGateway';

import EC2 from 'aws-react-icons/lib/icons/ArchitectureAmazonEC2';
import ELB from 'aws-react-icons/lib/icons/ArchitectureAWSElasticBeanstalk';
import VPC from 'aws-react-icons/lib/icons/ArchitectureAmazonVirtualPrivateCloud';
import ECS from 'aws-react-icons/lib/icons/ArchitectureAmazonElasticContainerService';
import Lambda from 'aws-react-icons/lib/icons/ArchitectureAWSLambda';
import S3 from 'aws-react-icons/lib/icons/ArchitectureAmazonSimpleStorageService';
import APIGW from 'aws-react-icons/lib/icons/ArchitectureAmazonAPIGateway';
import Route53 from 'aws-react-icons/lib/icons/ArchitectureAmazonRoute53';
import RDS from 'aws-react-icons/lib/icons/ArchitectureAmazonRDS';
import ElastiCache from 'aws-react-icons/lib/icons/ArchitectureAmazonElastiCache';
import DynamoDB from 'aws-react-icons/lib/icons/ArchitectureAmazonDynamoDB';
import NATGateway from 'aws-react-icons/lib/icons/ResourceAmazonVPCNATGateway';
import StepFunctions from 'aws-react-icons/lib/icons/ArchitectureAWSStepFunctions';
import PrivateSubnet from 'aws-react-icons/lib/icons/ArchitectureAWSClientVPN';
import PublicSubnet from 'aws-react-icons/lib/icons/ArchitectureAWSClientVPN';
import Amplify from 'aws-react-icons/lib/icons/ArchitectureAWSAmplify';

interface IIcon {
  name?: string;
  size?: number;
  style?: object;
  className?: string;
}

const Icon = ({ name, size = 48, style = {}, className }: IIcon) => {
  switch (name) {
    case 'VPC': {
      return <VPC size={size} style={style} className={className} />;
      break;
    }
    case 'EC2': {
      return <EC2 size={size} style={style} className={className} />;
      break;
    }
    case 'ECS': {
      return <ECS size={size} style={style} className={className} />;
      break;
    }
    case 'Route53': {
      return <Route53 size={size} style={style} className={className} />;
      break;
    }
    case 'APIGW': {
      return <APIGW size={size} style={style} className={className} />;
      break;
    }
    case 'ELB': {
      return <ELB size={size} style={style} className={className} />;
      break;
    }
    case 'NATGateway': {
      return <NATGateway size={size} style={style} className={className} />;
      break;
    }
    case 'Lambda': {
      return <Lambda size={size} style={style} className={className} />;
      break;
    }
    case 'StepFunctions': {
      return <StepFunctions size={size} style={style} className={className} />;
      break;
    }
    case 'S3': {
      return <S3 size={size} style={style} className={className} />;
      break;
    }
    case 'RDS': {
      return <RDS size={size} style={style} className={className} />;
      break;
    }
    case 'ElastiCache': {
      return <ElastiCache size={size} style={style} className={className} />;
      break;
    }
    case 'DynamoDB': {
      return <DynamoDB size={size} style={style} className={className} />;
      break;
    }
    case 'PublicSubnet': {
      return <PublicSubnet size={size} style={style} className={className} />;
      break;
    }
    case 'PrivateSubnet': {
      return <PrivateSubnet size={size} style={style} className={className} />;
      break;
    }
    case 'Amplify': {
      return <Amplify size={size} style={style} className={className} />;
      break;
    }
    default: {
      return <div>No Icon</div>;
    }
  }
};

export default Icon;
