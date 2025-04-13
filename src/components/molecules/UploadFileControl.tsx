import { FC } from "react";
import UploadFileInput from "../atoms/UploadFileInput";

interface UploadFileControlProps {
  onChange: (contract: any) => void;
  title: string;
  description: string;
  loading: boolean;
  error: string | null;
  id?: string;
  name?: string;
  value?: any;
  setError: (error: string) => void;
}

const UploadFileControl: FC<UploadFileControlProps> = ({
  onChange,
  title,
  description,
  loading,
  id,
  name,
  error,
  value,
  setError,
}) => {
  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const selectedFile = event.target.files?.[0];
    try {
      if (selectedFile && selectedFile.type === "application/json") {
        const text = await selectedFile.text();
        const jsonObject = JSON.parse(text);
        onChange(jsonObject);
        return;
      }
      throw new Error("Por favor, selecciona un archivo JSON válido");
    } catch (error) {
      setError(
        "Error al leer el archivo JSON. Asegúrate de que el archivo sea válido.",
      );
    }
  };

  return (
    <label
      htmlFor="file-upload"
      className="w-full relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500"
    >
      {value && <p>Archivo cargado</p>}
      {loading && (
        <div className="flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
            <p className="mt-4 text-sm text-gray-600">Procesando archivo...</p>
          </div>
        </div>
      )}
      {!loading && !value && (
        <UploadFileInput
          handleFileChange={handleFileChange}
          title={title}
          description={description}
          id={id}
          name={name}
        />
      )}
      {error && <p className="text-red-500">{error}</p>}
    </label>
  );
};

export default UploadFileControl;
