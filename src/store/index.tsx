import { create } from "zustand";
import { ContractStore } from "./contractStore";

export const useContractStore = create<ContractStore>((set) => ({
  account: null,
  contract: null,
  loading: false,
  error: null,

  initLoading: () => set({ loading: true }),
  addContract: (contract) => set({ contract, loading: false }),
  setError: (error) => set({ error, loading: false, contract: null }),
  addAccount: (account) => set({ account }),
}));
