import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import MainLayout from "../components/layout/MainLayout";
import { CustomContract } from "../types/CustomContract";
import useCustomContractRepository from "../hook/useCustomContractRepository";

interface PageLayoutProps {
  children: React.ReactNode;
}

function PageLayout({ children }: PageLayoutProps) {
  const navigate = useNavigate();
  const repository = useCustomContractRepository();
  const [contratos, setContratos] = useState<CustomContract[]>([]);

  useEffect(() => {
    const contracts = repository.getAll();
    setContratos(contracts);
  }, []);

  const goToContract = (id: string) => {
    navigate(`/contract/${id}`);
  };

  return (
    <MainLayout
      Sidebar={() => (
        <>
          {contratos.map((contrato) => (
            <li
              key={contrato.id}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => goToContract(contrato.id)}
            >
              {contrato.name}
            </li>
          ))}
        </>
      )}
    >
      {children}
    </MainLayout>
  );
}

export default PageLayout;
