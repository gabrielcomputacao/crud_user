import { User } from "../src/models";
import { api } from "./../services/api";

export async function getSpecificUsers(value: string) {
  try {
    const { data } = await api.get<User[]>(`usuarios?nome_like=^${value}`);

    if (data.length > 0) {
      return data;
    }

    return [];
  } catch (error) {
    throw new Error("Erro ao tentar buscar os dados.");
  }
}
