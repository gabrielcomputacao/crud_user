import { User } from "../src/models";
import { api } from "./../services/api";

export async function getUsers() {
  try {
    const { data } = await api.get<User[]>("usuarios");

    if (data.length > 0) {
      return data;
    }

    return [];
  } catch (error) {
    throw new Error("Erro ao tentar buscar os dados.");
  }
}
