import Axios from "axios";

export const ContractService = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_BE_URL ?? "http://localhost:8080",
});

//- or after instance has been created
// ContractService.defaults.headers.common["Authorization"] = undefined;

//- or before a request is made
// using Interceptors
ContractService.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers["Authorization"] = "Bearer " + localStorage.getItem("token");
  }
  return config;
});

export type ErrorResposne = {
  status: number;
  message: string | Record<string, string>;
};
