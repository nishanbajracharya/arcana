import easyDB from "easy-db-node";
const { select } = easyDB({});

type NodeData = {
  id: string;
  moduleName: string;
  data: {
    module: Record<string, string | boolean>;
  };
};

class TerraformDAO {
  terraformJson = {};

  setTerraformDataFromDB = async () => {
    const data = await select('terraforms');
    this.terraformJson = data;
  }

  getTerraformDataById = (nodeId: string) => {
    const data: Array<NodeData> = Object.values(this.terraformJson);

    const selectedNode = data.find(node => node.id === nodeId);

    return selectedNode || null;
  }

}