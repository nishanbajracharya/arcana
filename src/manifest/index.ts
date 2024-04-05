const manifest = {
  title: 'AWS Services',
  sections: [
    {
      title: 'Container',
      services: [
        {
          name: 'VPC',
          type: 'container',
          displayName: 'VPC',
        },
        {
          name: 'PublicSubnet',
          type: 'container',
          displayName: 'Public Subnet',
        },
        {
          name: 'PrivateSubnet',
          type: 'container',
          displayName: 'Private Subnet',
        },
      ],
    },
    {
      title: 'Compute',
      services: [
        {
          name: 'EC2',
          type: 'service',
          displayName: 'EC2',
        },
        {
          name: 'ECS',
          type: 'service',
          displayName: 'ECS',
        },
        {
          name: 'Lambda',
          type: 'service',
          displayName: 'Lambda',
        },
        {
          name: 'StepFunctions',
          type: 'service',
          displayName: 'Step Functions',
        },
      ],
    },
    {
      title: 'Storage',
      services: [
        {
          name: 'S3',
          type: 'service',
          displayName: 'S3',
        },
        {
          name: 'RDS',
          type: 'service',
          displayName: 'RDS',
        },
        {
          name: 'DynamoDB',
          type: 'service',
          displayName: 'DynamoDB',
        },
        {
          name: 'ElastiCache',
          type: 'service',
          displayName: 'ElastiCache',
        },
      ],
    },
    {
      title: 'Network',
      services: [
        {
          name: 'Route53',
          type: 'service',
          displayName: 'Route53',
        },
        {
          name: 'APIGW',
          type: 'service',
          displayName: 'APIGW',
        },
        {
          name: 'ELB',
          type: 'service',
          displayName: 'ELB',
        },
        {
          name: 'NATGateway',
          type: 'service',
          displayName: 'NAT Gateway',
        },
      ],
    },
  ],
};

export default manifest;
