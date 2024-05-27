import { User } from "./../src/models/index";
import { api } from "./../services/api";
import { compareSimilarUsersWithExcess } from "./compareSimilarUsers";

export async function editUser(dataUser: User, userExcess: string) {
  try {
    const hasSimilarUsers = await compareSimilarUsersWithExcess(
      dataUser,
      userExcess
    );

    if (hasSimilarUsers) {
      throw new Error("Já existe um usuário com esse nome.");
    }

    await api.patch(`usuarios/${dataUser.id}`, dataUser);
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
