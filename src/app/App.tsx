import { useContractStore } from "../store";
import ContractView from "../components/organisms/ContractView";
import UploadABIView from "../components/organisms/UploadABIView";

function App() {
  const { addContract, initLoading, contract, setError } =
    useContractStore();

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    initLoading();
    const selectedFile = event.target.files?.[0];
    try {
      if (selectedFile && selectedFile.type === "application/json") {
        const text = await selectedFile.text();
        const jsonObject = JSON.parse(text);
        addContract(jsonObject);
        return;
      }
      throw new Error("Por favor, selecciona un archivo JSON válido");
    } catch (error) {
      setError(
        "Error al leer el archivo JSON. Asegúrate de que el archivo sea válido.",
      );
    }
  };

  if (contract) {
    return <ContractView />;
  }
  return <UploadABIView onChange={handleFileChange} />;
}

export default App;
