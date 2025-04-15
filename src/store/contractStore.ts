//import { Contract } from "web3";

export interface CustomContract {
  abi: any;
  address?: string;
  //contract: Contract<any>;
}

export interface ContractStore {
  account: string | null;

  addAccount: (account: string) => void;
  removeAccount: () => void;
}
