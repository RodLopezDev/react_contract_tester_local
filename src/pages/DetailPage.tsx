import { Navigate, useNavigate, useParams } from "react-router-dom";
import useCustomContractRepository from "../hook/useCustomContractRepository";
import ContractView from "../components/organisms/ContractView";

const DetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const repository = useCustomContractRepository();
  const contract = repository.getById(String(id));
  if (!contract) {
    return <Navigate to="/" />;
  }

  const handleDelete = () => {
    try {
      repository.remove(contract.id);
      navigate("/");
    } catch (error) {
      console.error("Error al eliminar el contrato:", error);
    }
  };

  return <ContractView contract={contract} onRemove={handleDelete} />;
};

export default DetailPage;
