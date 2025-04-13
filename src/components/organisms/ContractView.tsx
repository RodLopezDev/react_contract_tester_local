import { useContractStore } from "../../store";

const ContractView = () => {
  const { contract } = useContractStore();
  const metadata = JSON.parse(contract?.abi.metadata);
  const output = metadata.output.abi;
  const functions = output.filter((method: any) => method.type === "function");
  console.log(functions);
  // console.log(contract?.contract.methods.getValue);
  // console.log(contract?.contract.methods.getValue());
  // console.log(contract?.contract.methods.setValue);
  //console.log(contract?.contract.methods.setValue());
  return (
    <div>
      <h1>Contract View</h1>
    </div>
  );
};

export default ContractView;
