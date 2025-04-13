import { FC } from "react";
import UploadFileInput from "../atoms/UploadFileInput";

interface UploadFileControlProps {
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  title: string;
  description: string;
  loading: boolean;
  id?: string;
  name?: string;
}

const UploadFileControl: FC<UploadFileControlProps> = ({
  handleFileChange,
  title,
  description,
  loading,
  id,
  name,
}) => {
  if (loading) {
    return (
      <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-sm text-gray-600">Procesando archivo...</p>
        </div>
      </div>
    );
  }
  return (
    <UploadFileInput
      handleFileChange={handleFileChange}
      title={title}
      description={description}
      id={id}
      name={name}
    />
  );
};

export default UploadFileControl;
