import { create } from "zustand";
import { ContractStore } from "./contractStore";

export const useContractStore = create<ContractStore>((set) => ({
  contract: null,
  loading: false,
  error: null,
  initLoading: () => set({ loading: true }),
  addContract: (contract) => set({ contract, loading: false }),
  setError: (error) => set({ error, loading: false, contract: null }),

  removeContract: () => set({ contract: null }),
}));
