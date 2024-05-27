import { User } from "./../src/models/index";
import { api } from "./../services/api";

export async function deleteUser(dataUser: User) {
  try {
    await api.delete(`usuarios/${dataUser.id}`);
  } catch (error) {
    throw new Error("Erro ao tentar excluir o usuário.");
  }
}
