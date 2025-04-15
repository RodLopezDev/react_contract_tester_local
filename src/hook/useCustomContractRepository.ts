import { v4 as uuidv4 } from "uuid";

import {
  CreateCustomContractDto,
  CustomContract,
  CustomContractDetail,
  CustomContractView,
  UpdateCustomContractDto,
} from "../types/CustomContract";

const useCustomContractRepository = () => {
  const save = (contract: CreateCustomContractDto): string => {
    const contracts = getAll();

    const id = uuidv4();
    const newContract: CustomContract = {
      id,
      name: contract.name,
    };

    const newArray = [...contracts, newContract];

    const contractDetail: CustomContractDetail = {
      abi: contract.abi,
      address: contract.address,
    };

    localStorage.setItem("contracts", JSON.stringify(newArray));
    localStorage.setItem(id, JSON.stringify(contractDetail));

    return id;
  };

  const getAll = (): CustomContract[] => {
    const contracts = localStorage.getItem("contracts");
    if (!contracts) return [];
    return JSON.parse(contracts) as CustomContract[];
  };

  const getById = (id: string): CustomContractView | null => {
    const contracts = getAll();
    const contract = contracts.find((c) => c.id === id);
    if (!contract) return null;

    const contractDetail = localStorage.getItem(id);
    if (!contractDetail) return null;

    const contractDetailParsed = JSON.parse(
      contractDetail,
    ) as CustomContractDetail;

    return { ...contract, ...contractDetailParsed };
  };

  const update = (
    id: string,
    contract: UpdateCustomContractDto,
  ): CustomContractView => {
    const contracts = getAll();
    const newContracts = contracts.map((c) =>
      c.id === id ? { id: c.id, name: contract.name } : c,
    );

    const contractDetail: CustomContractDetail = {
      abi: contract.abi,
      address: contract.address,
    };

    localStorage.setItem("contracts", JSON.stringify(newContracts));
    localStorage.setItem(id, JSON.stringify(contractDetail));

    return { ...contract, ...contractDetail } as CustomContractView;
  };

  const remove = (id: string): boolean => {
    const contracts = getAll();
    const newContracts = contracts.filter((c) => c.id !== id);

    localStorage.setItem("contracts", JSON.stringify(newContracts));
    localStorage.removeItem(id);

    return true;
  };

  return { save, getAll, getById, update, remove };
};

export default useCustomContractRepository;
