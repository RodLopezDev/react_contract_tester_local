import web3 from "web3";
import { Controller, useForm } from "react-hook-form";

import Spacer from "../components/atoms/Spacer";
import IUploadABIForm from "../types/UploadABIForm.type";
import UploadFileLayout from "../components/layout/UploadFileLayout";
import UploadFileControl from "../components/molecules/UploadFileControl";
import useCustomContractRepository from "../hook/useCustomContractRepository";

const HomePage = () => {
  const repository = useCustomContractRepository();

  const form = useForm<IUploadABIForm>({
    defaultValues: {
      abi: null,
      address: "",
    },
  });

  const onSubmit = (data: IUploadABIForm) => {
    if (!data.abi?.abi || !data.abi?.metadata) {
      form.setError("abi", { message: "El formato del archivo no es válido" });
      return;
    }
    repository.save({ abi: data.abi, address: data.address, name: data.name });
    window.location.reload();
  };

  return (
    <UploadFileLayout>
      <form onSubmit={form.handleSubmit(onSubmit)}>
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
            <Controller
              control={form.control}
              name="name"
              rules={{
                required: "Nombre del contrato es requerido",
              }}
              render={({ field, fieldState }) => (
                <div className="w-full max-w-md">
                  <label
                    htmlFor="contract-address"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Nombre del Contrato
                  </label>
                  <input
                    type="text"
                    id="contract-address"
                    name="contract-address"
                    value={field.value}
                    onChange={field.onChange}
                    placeholder="Lending demo"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  {fieldState.error && (
                    <p className="text-red-500 font-medium">
                      {fieldState.error.message}
                    </p>
                  )}
                </div>
              )}
            />

            <Spacer height={4} />
            <Controller
              control={form.control}
              name="address"
              rules={{
                required: "Dirección del contrato es requerida",
                validate: (value) => {
                  if (!web3.utils.isAddress(value)) {
                    return "Dirección ingresada no es válida";
                  }
                  return true;
                },
              }}
              render={({ field, fieldState }) => (
                <div className="w-full max-w-md">
                  <label
                    htmlFor="contract-address"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Dirección del Contrato
                  </label>
                  <input
                    type="text"
                    id="contract-address"
                    name="contract-address"
                    value={field.value}
                    onChange={field.onChange}
                    placeholder="0x..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  {fieldState.error && (
                    <p className="text-red-500 font-medium">
                      {fieldState.error.message}
                    </p>
                  )}
                </div>
              )}
            />

            <Spacer height={4} />

            <Controller
              control={form.control}
              name="abi"
              rules={{ required: "El ABI es requerido" }}
              render={({ field, fieldState }) => (
                <UploadFileControl
                  id="file-upload"
                  name="file-upload"
                  value={field.value}
                  error={fieldState.error?.message ?? null}
                  loading={false}
                  onChange={field.onChange}
                  setError={(error) => form.setError("abi", { message: error })}
                  title="Subir ABI Contract"
                  description="JSON hasta 10MB"
                />
              )}
            />

            <Spacer height={4} />

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
            >
              Subir
            </button>
          </div>
        </div>
      </form>
    </UploadFileLayout>
  );
};

export default HomePage;
