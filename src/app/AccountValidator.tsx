import { FC, useEffect } from "react";

import { useContractStore } from "../store";

interface AccountValidatorProps {
  render: () => React.ReactNode;
}

const AccountValidator: FC<AccountValidatorProps> = ({ render }) => {
  const { account, addAccount, removeAccount } = useContractStore();

  const getAccount = async () => {
    try {
      const account = await (window as any).ethereum.request({
        method: "eth_requestAccounts",
      });
      addAccount(account[0]);
    } catch (error) {
      console.error("Error conectando la cartera:", error);
    }
  };

  useEffect(() => {
    if (!!(window as any).ethereum) {
      const handleAccountsChanged = (accounts: string[]) => {
        if (accounts.length === 0) {
          removeAccount();
        } else {
          addAccount(accounts[0]);
        }
      };

      (window as any).ethereum.on("accountsChanged", handleAccountsChanged);

      return () => {
        (window as any).ethereum.removeListener(
          "accountsChanged",
          handleAccountsChanged,
        );
      };
    }
  }, []);

  if (!account) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8">
          <div className="flex items-center justify-center w-12 h-12 mx-auto bg-red-100 rounded-full">
            <svg
              className="w-6 h-6 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              ></path>
            </svg>
          </div>
          <h2 className="mt-6 text-center text-2xl font-bold text-gray-900">
            Conecta tu cartera
          </h2>
          <p className="mt-2 text-center text-gray-600">
            Necesitas conectar tu cartera MetaMask para continuar.
          </p>
          <div className="mt-8">
            <button
              onClick={getAccount}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Conectar Cartera
            </button>
          </div>
        </div>
      </div>
    );
  }

  return <>{render()}</>;
};

export default AccountValidator;
