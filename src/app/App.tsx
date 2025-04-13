import { useContractStore } from "../store";

import UploadABIView from "../components/organisms/UploadABIView";
import { useEffect } from "react";
import Web3 from "web3";

function App() {
  const { account, addAccount } = useContractStore();

  useEffect(() => {
    if (!account) {
      getAccount();
    }
  }, [account]);

  async function getAccount() {
    if (typeof (window as any).ethereum !== "undefined") {
      const web3 = new Web3((window as any).ethereum);
      const accounts = await web3.eth.requestAccounts();
      addAccount(accounts[0]);
    }
  }

  if (!account) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="p-8 bg-white rounded-lg shadow-md text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            ¡Bienvenido!
          </h2>
          <p className="text-gray-600">
            Por favor selecciona una cuenta para continuar
          </p>
        </div>
      </div>
    );
  }
  return <UploadABIView />;
}

export default App;
