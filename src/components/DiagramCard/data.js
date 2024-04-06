export const data = [
  {
    name: "Diagram 1",
    id: "RandomId",
    graph: [
      {
        id: "Hi3CP7e3",
        name: "VPC",
        displayName: "VPC",
        position: {
          x: 200,
          y: 300,
        },
        size: {
          width: 960,
          height: 800,
        },
      },
      {
        id: "PAuL1pf2",
        name: "PublicSubnet",
        displayName: "Public Subnet",
        position: {
          x: 200,
          y: 300,
        },
        size: {
          width: 400,
          height: 640,
        },
      },
      {
        id: "wkOqt6UK",
        name: "EC2",
        data: {
          region: "us-east-1",
          availabilityZone: "us-east-1a",
          name: "my-vpc",
          cidr: "10.1.1.0/16",
          pubicSubnet: ["10.0.101.0/24"],
          privateSubnet: ["10.0.1.0/24"],
          enableNatGateway: true,
          enableVpnGateway: true,
          tags: {
            terraform: "true",
            environment: "dev",
          },
        },
        displayName: "EC2",
        position: {
          x: 200,
          y: 300,
        },
        size: {
          width: 88,
          height: 88,
        },
      },
      {
        id: "8rvwIDCQ",
        name: "S3",
        displayName: "S3",
        position: {
          x: 200,
          y: 300,
        },
        size: {
          width: 88,
          height: 88,
        },
      },
    ],
  },
  {
    name: "Diagram 2",
    id: "RandomId2",
    graph: [
      {
        id: "Hi3CP7e3",
        name: "VPC",
        displayName: "VPC",
        position: {
          x: 200,
          y: 300,
        },
        size: {
          width: 960,
          height: 800,
        },
      },
      {
        id: "PAuL1pf2",
        name: "PublicSubnet",
        displayName: "Public Subnet",
        position: {
          x: 200,
          y: 300,
        },
        size: {
          width: 400,
          height: 640,
        },
      },
      {
        id: "wkOqt6UK",
        name: "EC2",
        data: {
          region: "us-east-1",
          availabilityZone: "us-east-1a",
          name: "my-vpc",
          cidr: "10.1.1.0/16",
          pubicSubnet: ["10.0.101.0/24"],
          privateSubnet: ["10.0.1.0/24"],
          enableNatGateway: true,
          enableVpnGateway: true,
          tags: {
            terraform: "true",
            environment: "dev",
          },
        },
        displayName: "EC2",
        position: {
          x: 200,
          y: 300,
        },
        size: {
          width: 88,
          height: 88,
        },
      },
      {
        id: "8rvwIDCQ",
        name: "S3",
        displayName: "S3",
        position: {
          x: 200,
          y: 300,
        },
        size: {
          width: 88,
          height: 88,
        },
      },
    ],
    nodes: [
      {
          "id": "5Z7W6a2U",
          "name": "Lambda",
          "displayName": "Lambda",
          "position": {
              "x": 200,
              "y": 300
          },
          "size": {
              "width": 88,
              "height": 88
          }
      }
    ]
  },
];