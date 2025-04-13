import { Contract } from "web3";

export interface CustomContract {
  abi: any;
  address?: string;
  contract: Contract<any>;
}

export interface ContractStore {
  account: string | null;

  contract: CustomContract | null;
  loading: boolean;
  error: string | null;

  addAccount: (account: string) => void;
  initLoading: () => void;
  addContract: (contract: any) => void;
  setError: (error: string) => void;
}
