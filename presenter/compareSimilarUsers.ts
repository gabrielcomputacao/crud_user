import { User } from "./../src/models/index";
import { getUsers } from "./getUsers";

export async function compareSimilarUsers(dataUser: User) {
  try {
    const data = await getUsers();

    const hasEqualsUserName = data.filter(
      (value: User) => value.nome === dataUser.nome
    );

    if (hasEqualsUserName.length > 0) {
      return true;
    }

    return false;
  } catch (error) {
    throw new Error("Erro ao tentar editar o usuário.");
  }
}
export async function compareSimilarUsersWithExcess(
  dataUser: User,
  userExcess: string
) {
  try {
    const data = await getUsers();

    if (dataUser.nome === userExcess) {
      return false;
    }

    const hasEqualsUserName = data.filter(
      (value: User) => value.nome === dataUser.nome
    );

    if (hasEqualsUserName.length > 0) {
      return true;
    }

    return false;
  } catch (error) {
    throw new Error("Erro ao tentar editar o usuário.");
  }
}
