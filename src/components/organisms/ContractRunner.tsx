import { FC, useState } from "react";
import { Contract } from "web3";
import { useContractStore } from "../../store";

interface ContractRunnerProps {
  contract: Contract<any>;
  functions: any[];
  account: string;
}

const formatResult = (value: any): any => {
  if (typeof value === 'bigint') {
    return value.toString();
  }
  if (Array.isArray(value)) {
    return value.map(formatResult);
  }
  if (typeof value === 'object' && value !== null) {
    const formatted: any = {};
    for (const [key, val] of Object.entries(value)) {
      formatted[key] = formatResult(val);
    }
    return formatted;
  }
  return value;
};

const ContractRunner: FC<ContractRunnerProps> = ({ contract, functions, account }) => {
  const { removeContract } = useContractStore();

  const [expanded, setExpanded] = useState<number | null>(null);
  const [params, setParams] = useState<{ [key: string]: string[] }>({});

  const [result, setResult] = useState<any>(null);

  const handleParamChange = (methodName: string, index: number, value: string) => {
    setParams((prev) => ({
      ...prev,
      [methodName]: {
        ...prev[methodName],
        [index]: value,
      },
    }));
  };


  const callMethodOnContract = async (method: any, params: any[]) => {
    setResult(null);
    const functionToCall = functions.find((f) => f.name === method);
    if (!functionToCall) {
      console.error("Función no encontrada");
      return;
    }

    if (functionToCall.stateMutability === "view") {
      try {
        const tx = contract.methods[method](...params);
        const result = await tx.call()
        setResult(result);
      } catch (error) {
        console.error(error);
      }
      return;
    }

    try {
      const tx = contract.methods[method](...params);
      const result = await tx.send({ from: account });
      setResult(result);
    } catch (error) {
      console.error(error);
    }
  };

  console.log(functions);
  console.log(result);

  return (
    <div className="max-w-3xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Ejecutar Función</h2>
        <button
          onClick={removeContract}
          className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors flex items-center gap-2"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 7l-.5 12a2 2 0 01-2 2H7.5a2 2 0 01-2-2L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
          Borrar Contrato
        </button>
      </div>
      <p className="text-gray-600 mb-6">
        Dirección del contrato: {contract.options.address}
      </p>

      <div className="space-y-4">
        {functions.map((func, index) => (
          <div key={index} className="border rounded-lg overflow-hidden">
            <button
              className="w-full px-4 py-3 bg-gray-50 hover:bg-gray-100 flex justify-between items-center"
              onClick={() => setExpanded(expanded === index ? null : index)}
            >
              <span className="font-medium">{func.name}</span>
              <svg
                className={`w-5 h-5 transform transition-transform ${expanded === index ? "rotate-180" : ""
                  }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {expanded === index && (
              <div className="p-4 border-t">
                <div className="space-y-4">
                  {func.inputs.map((input: any, paramIndex: number) => (
                    <div key={paramIndex}>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {input.name} ({input.type})
                      </label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onChange={(e) => handleParamChange(func.name, paramIndex, e.target.value)}
                      />
                    </div>
                  ))}
                  <button
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                    onClick={() => {
                      const methodParams = func.inputs.map((_: any, i: number) => params[func.name]?.[i] || "");
                      callMethodOnContract(func.name, methodParams);
                    }}
                  >
                    Ejecutar
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {result && (
        <div className="mt-4">
          <h3 className="text-lg font-medium mb-2">Resultado</h3>
          <pre className="bg-gray-100 p-4 rounded-md">
            {typeof result === 'object' ? JSON.stringify(formatResult(result), null, 2) : result}
          </pre>
        </div>
      )}
    </div>
  );
};

export default ContractRunner;
