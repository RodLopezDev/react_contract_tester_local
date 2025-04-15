import Web3, { Contract } from "web3";
import { useEffect, useState } from "react";

import ContractRunner from "./ContractRunner";
import { useContractStore } from "../../store";
import { CustomContractView } from "../../types/CustomContract";

interface ContractViewProps {
  contract: CustomContractView;
  onRemove: () => void;
}

const ContractView = ({ contract, onRemove }: ContractViewProps) => {
  const { account } = useContractStore();
  const [state, setState] = useState<{
    functions: any[];
    contract?: Contract<any>;
  }>({ functions: [] });

  useEffect(() => {
    processContract();
  }, []);

  const processContract = async () => {
    try {
      const web3 = new Web3((window as any).ethereum);
      const web3Contract: Contract<any> = new web3.eth.Contract(
        contract?.abi.abi,
        contract?.address,
      );

      const metadata = JSON.parse(contract?.abi.metadata);
      const output = metadata.output.abi;
      const functions = output.filter(
        (method: any) => method.type === "function",
      );

      setState({ functions, contract: web3Contract });
    } catch (error) {
      console.error("Error al procesar el contrato:", error);
    }
  };

  if (!state?.contract || !account) {
    return <>Procesando...</>;
  }

  return (
    <ContractRunner
      onRemove={onRemove}
      account={account}
      contract={state.contract}
      functions={state.functions}
    />
  );
};

export default ContractView;
