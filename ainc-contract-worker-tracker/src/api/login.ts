import { ContractService } from ".";

type LoginRequest = {
  email: string;
  password: string;
};

type LoginResponse = {
  token: string;
  user: {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    type: string;
    role: string;
    startDate: string;
    endDate: string;
    status: string;
  };
};

export const loginAPI = (loginRequest: LoginRequest) => {
  return ContractService.post<LoginResponse>("api/v1/auth/login", loginRequest);
};
