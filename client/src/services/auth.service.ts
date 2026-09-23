import { api } from "../api/api";

export const login = async (payload: { email: string; password: string }) => {
  const response = await api.post("auth/login", payload);
  return response.data;
};

export const signup = async (payload: {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}) => {
  const response = await api.post("/auth/signup", payload);
  return response.data;
};
