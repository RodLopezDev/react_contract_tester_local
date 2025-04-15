import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ContractStore } from "./contractStore";

export const useContractStore = create<ContractStore>()(
  persist(
    (set) => ({
      account: null,

      addAccount: (account) => set({ account }),
      removeAccount: () => set({ account: null }),
    }),
    {
      name: "contract-storage",
      partialize: (state) => ({
        account: state.account,
      }),
    },
  ),
);
