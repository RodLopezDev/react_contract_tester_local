export interface CustomContractDetail {
  abi: any;
  address: string;
}

export interface CustomContract {
  id: string;
  name: string;
}

export type CustomContractView = CustomContract & CustomContractDetail;

export type CreateCustomContractDto = Omit<CustomContract, "id"> &
  CustomContractDetail;
export type UpdateCustomContractDto = CustomContract & CustomContractDetail;
