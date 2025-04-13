import { FC } from "react";

import { useContractStore } from "../../store";
import UploadFileLayout from "../layout/UploadFileLayout";
import UploadFileControl from "../molecules/UploadFileControl";

interface UploadABIViewProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const UploadABIView: FC<UploadABIViewProps> = ({ onChange }) => {
  const { loading, error } = useContractStore();
  return (
    <UploadFileLayout>
      <div className="text-center">
        <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">
          Sube tu ABI Contract
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          Selecciona un archivo JSON que contenga el ABI de tu contrato
        </p>
      </div>

      <div className="mt-8">
        <div className="flex flex-col items-center justify-center">
          <label
            htmlFor="file-upload"
            className="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500"
          >
            <UploadFileControl
              id="file-upload"
              name="file-upload"
              loading={loading}
              handleFileChange={onChange}
              title="Subir ABI Contract"
              description="JSON hasta 10MB"
            />
            {error && <p className="text-red-500">{error}</p>}
          </label>
        </div>
      </div>
    </UploadFileLayout>
  );
};

export default UploadABIView;
