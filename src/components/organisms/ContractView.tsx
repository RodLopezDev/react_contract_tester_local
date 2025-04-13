import { useEffect, useState } from "react";
import Web3, { Contract } from "web3";

import ContractRunner from "./ContractRunner";
import { useContractStore } from "../../store";

const ContractView = () => {
  const { contract, account } = useContractStore();
  const [state, setState] = useState<{
    functions: any[];
    contract?: Contract<any>;
  }>({ functions: [] });

  useEffect(() => {
    processContract();
  }, []);

  const processContract = async () => {
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
  };

  if (!state?.contract || !account) {
    return <>Procesando...</>;
  }

  return (
    <ContractRunner account={account} contract={state.contract} functions={state.functions} />
  );
};

export default ContractView;
