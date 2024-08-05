import { ErrorResposne } from "@/api";
import { AxiosError } from "axios";

export const handleAxiosError = (error: AxiosError) => {
  const { response } = error as AxiosError<ErrorResposne>;
  if (response?.data.message) {
    return response?.data.message;
  } else {
    return "Something went wrong";
  }
};

export const handleAxiosErrorToString = (error: AxiosError) => {
  const { response } = error as AxiosError<ErrorResposne>;
  const message = response?.data.message;
  if (message) {
    if (typeof message === "string") {
      return message;
    } else {
      return message[Object.keys(message)[0]];
    }
  } else {
    return "Something went wrong";
  }
};
