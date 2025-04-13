import Web3, { Contract } from "web3";

import ContractView from "./ContractView";
import UploadABIForm from "./UploadABIForm";

import { useContractStore } from "../../store";

function UploadABIView() {
  const { addContract, initLoading, contract, setError, loading } =
    useContractStore();

  const handleFileChange = async (abi: any, address: string) => {
    initLoading();
    try {
      const web3 = new Web3((window as any).ethereum);
      const contract: Contract<any> = new web3.eth.Contract(abi.abi, address);

      addContract({ abi, address, contract });
    } catch (error: any) {
      console.log(error);
      setError(error.message);
    }
  };

  if (contract) {
    return <ContractView />;
  }
  return <UploadABIForm isLoading={loading} onChange={handleFileChange} />;
}

export default UploadABIView;
