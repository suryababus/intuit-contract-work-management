import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ContractService } from "@/api";

export type Mock = {
  url: string;
  method: "get" | "post" | "put" | "delete" | "patch";
  response: any;
  status?: number;
};

interface AxiosMockProviderProps {
  children: React.ReactNode;
  mocks: Array<{
    url: string;
    method: "get" | "post" | "put" | "delete" | "patch";
    response: any;
    status?: number;
  }>;
}

const axiosMethodListenerMap = {
  get: "onGet",
  post: "onPost",
  put: "onPut",
  delete: "onDelete",
  patch: "onPatch",
} as const;

const AxiosMockProvider: React.FC<AxiosMockProviderProps> = ({
  children,
  mocks,
}) => {
  const mock = new MockAdapter(ContractService, {
    onNoMatch: "throwException",
    delayResponse: 10,
  });

  // Setup mocks
  mocks.forEach(({ url, method, response, status = 200 }) => {
    const mockMethod = axiosMethodListenerMap[method];
    mock[mockMethod](url).reply(status, response);
  });

  // Create a new QueryClient
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default AxiosMockProvider;
