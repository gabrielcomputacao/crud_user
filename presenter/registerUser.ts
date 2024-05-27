import { api } from "../services/api";
import { User } from "../src/models";
import { compareSimilarUsers } from "./compareSimilarUsers";

export async function registerUser(dataUser: User) {
  try {
    const hasSimilarUsers = await compareSimilarUsers(dataUser);

    if (hasSimilarUsers) {
      throw new Error("Já existe um usuário com esse nome.");
    }

    await api.post("/usuarios", dataUser);
  } catch (error) {
    if (
      error instanceof Error &&
      error.message === "Já existe um usuário com esse nome."
    ) {
      throw error;
    }
    throw new Error("Erro ao tentar registrar o usuário.");
  }
}
