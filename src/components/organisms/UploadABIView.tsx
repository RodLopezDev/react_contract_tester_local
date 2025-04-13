import ContractView from "./ContractView";
import UploadABIForm from "./UploadABIForm";

import { useContractStore } from "../../store";

function UploadABIView() {
  const { addContract, initLoading, contract, setError, loading } =
    useContractStore();

  const handleFileChange = async (abi: any, address: string) => {
    initLoading();
    try {
      addContract({ abi, address });
    } catch (error: any) {
      setError(error.message);
    }
  };

  if (contract) {
    return <ContractView />;
  }
  return <UploadABIForm isLoading={loading} onChange={handleFileChange} />;
}

export default UploadABIView;
