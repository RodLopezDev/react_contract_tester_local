import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ContractStore } from "./contractStore";

export const useContractStore = create<ContractStore>()(
  persist(
    (set) => ({
      account: null,
      contract: null,
      loading: false,
      error: null,

      initLoading: () => set({ loading: true }),
      addContract: (contract) => set({ contract, loading: false }),
      setError: (error) => set({ error, loading: false, contract: null }),
      addAccount: (account) => set({ account }),
      removeContract: () => set({ contract: null }),
    }),
    {
      name: "contract-storage",
      partialize: (state) => ({
        account: state.account,
        contract: state.contract,
      }),
    },
  ),
);
