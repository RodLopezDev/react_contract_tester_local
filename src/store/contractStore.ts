export interface Contract {
  abi: any;
  name?: string;
  address?: string;
}

export interface ContractStore {
  contract: Contract | null;
  loading: boolean;
  error: string | null;

  initLoading: () => void;
  addContract: (contract: any) => void;
  setError: (error: string) => void;

  removeContract: () => void;
}
