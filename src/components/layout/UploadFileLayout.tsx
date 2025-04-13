import { FC, PropsWithChildren } from "react";

const UploadFileLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
        {children}
      </div>
    </div>
  );
};
export default UploadFileLayout;
