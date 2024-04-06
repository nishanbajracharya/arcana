import React, { useEffect, useState } from 'react';
import { Stage, Layer, Line } from 'react-konva';
import { KonvaEventObject } from 'konva/lib/Node';

import { IoMdDownload } from "react-icons/io";
import { GrDeploy } from "react-icons/gr";

import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@nextui-org/react";


import { Button } from '@nextui-org/button';
import { IoIosArrowBack } from 'react-icons/io';
import { IoIosPlay } from 'react-icons/io';

import './diagram.css';


import FormInputView from '../../components/formInputComponent';
import ConfigurationModal from '../../components/modal';
import ServicePane from '../../components/ServicePane';
import NodeFactory from '../../components/NodeFactory';
import { generateRandomString } from '../../utils/utils';
import { Node, ServiceConfig } from '@/types';
import { Link } from '@nextui-org/link';
import axios from 'axios';
import { config } from 'process';

const HEIGHT = window.innerHeight - 48;
const WIDTH = window.innerWidth - 360;

const App = () => {

  const [serviceConfigList, setServiceConfigList] = useState<ServiceConfig[]>([]);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [selectedService, setSelectedService] = useState<string>('');
  const [nodes, setNodes] = useState<Node[]>([]);
  const [orchData, setOrchData] = useState<{name: String, id?: String, nodes?:Node[]}>({
    name: "Flow",
  });
  const grid = [];
  const gridSize = 30;

  const [preview, setPreview] = useState(false);

  // useEffect(() => {
  //   axios.get("")
  // }, [nodes]);

  for (let i = 0; i < WIDTH / gridSize; i++) {
    grid.push(
      <Line key={`line-h-${i}`} points={[i * gridSize, 0, i * gridSize, WIDTH]} stroke={'#ccc'} strokeWidth={0.5} />
    );

    grid.push(
      <Line key={`line-w-${i}`} points={[0, i * gridSize, WIDTH, i * gridSize]} stroke={'#ccc'} strokeWidth={0.5} />
    );
  }

  const getServiceNodeSize = (name: string) => {
    switch (name) {
      case 'VPC':
        return {
          width: 960,
          height: 800,
        };
      case 'PublicSubnet':
        return {
          width: 400,
          height: 640,
        };
      case 'PrivateSubnet':
        return {
          width: 400,
          height: 640,
        };
      default:
        return {
          width: 88,
          height: 88,
        };
    }
  };

  const handleSave = async (selectedService: string) => {
    const newNodes = nodes.map(node => node.name === selectedService ? {...node, data: serviceConfigList} : node);
    setNodes(newNodes);

    const newOrch = {
      ...orchData,
      nodes: newNodes
    }
    if(!newOrch.id) {
      const {data} = await axios.post("/api/orchestra", newOrch)
      newOrch.id = data.id
    } else {
      const response = await axios.put(`/api/orchestra/${orchData.id}`, newOrch)
    }
    setOrchData(newOrch);
  }

  const handleServiceClick = (e: React.MouseEvent, name: string, displayName: string) => {
    const node: Node = {
      id: generateRandomString(8),
      name: name,
      displayName: displayName,
      position: {
        x: 200,
        y: 300,
      },
      size: getServiceNodeSize(name),
    };
    setNodes([...nodes, node]);
  };

  const handleNodeDragEnd = (node: Node, e: KonvaEventObject<DragEvent>) => {
    console.log('Handle Drag End', node, e);
  };


  const handleServiceConfiguration = (serviceName: string) => {
    axios.get(`/api/services/${serviceName.toLowerCase()}`)
      .then(function (response) {
        // handle success
        const selectedNode = nodes.find(node => node.name === serviceName);
        console.log(response.data);
        setServiceConfigList(selectedNode?.data || response.data.service)
        setOpenModal(true)
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {
        // always executed
      }
    );
  }

  const handleServiceConfigValueChange = (fieldName : string, fieldValue : string) => {
    const newConfig:ServiceConfig[] = serviceConfigList.map((config) => {
      if (config.name === fieldName)
        return {...config, value: fieldValue}
      else 
        return config
    })
    setServiceConfigList(newConfig)
    console.log("service config list", newConfig)
  }

  function showPreview() {
    setPreview(true);
  }

  return (
    <div>
      <header className="h-[48px] bg-[#efeff7] border-b-[1px] border-b-[#ddd] flex leading-[48px] px-[16px] justify-between">
        <div>
          <Link href="/">
            <Button variant="faded" className="bg-white">
              <IoIosArrowBack />
              <span>Back</span>
            </Button>
          </Link>
        </div>
        <strong>Diagram</strong>
        <div>
          <Button color="primary" onPress={() => showPreview()}>
            <IoIosPlay />
            <span>Run</span>
          </Button>
        </div>
      </header>
      <div className="container-app">
        <ServicePane onClick={handleServiceClick} />
        <Stage height={HEIGHT} width={WIDTH}>
          <Layer>
            {grid}
            {nodes.map((node, key) => (
              <NodeFactory
                key={key}
                node={node}
                onDragEnd={(e) => {
                  handleNodeDragEnd(node, e);
                }}
                onClick={(name)=> {
                  handleServiceConfiguration(name)
                  setSelectedService(name);
                }}
              />
            ))}
          </Layer>
        </Stage>
      </div>
      <ConfigurationModal 
        isOpen={openModal}
        title={selectedService}
        onSave={()=>{
          handleSave(selectedService);
          setOpenModal(false);
          setSelectedService("");
        }}
        onOpenChange={(i) => console.log("on open change", i)}
        onClose={() => setOpenModal(false)}
      >
        {serviceConfigList.map(config => (
            <FormInputView 
              label={config.label}
              value={config.value || config.defaultValue}
              inputType={config.componentType}
              onChange={(e) => handleServiceConfigValueChange(config.name, e.target.value)}
              placeholder={config.label}
            />
          ))}
      </ConfigurationModal>
      <Modal isOpen={preview} onOpenChange={() => null} size="5xl" hideCloseButton>
        <ModalContent>
            <>
              <ModalHeader className="flex flex-col">Preview</ModalHeader>
              <ModalBody>
                <div className="h-[70vh] overflow-y-auto">
                  Preview
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={() => setPreview(false)} className="mr-auto">
                  <span>Cancel</span>
                </Button>
                <Button color="primary" variant="light" onPress={() => setPreview(false)} className="border-primary">
                  <IoMdDownload /> <span>Download</span>
                </Button>
                <Button color="primary" onPress={() => setPreview(false)}>
                  <GrDeploy /><span>Deploy</span>
                </Button>
              </ModalFooter>
            </>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default App;
