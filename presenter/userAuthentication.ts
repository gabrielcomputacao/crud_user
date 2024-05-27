import { User } from "../src/models";

import { InputsForm } from "./../src/pages/Login/index";
import { getUsers } from "./getUsers";

export async function userAuthentication(dataInput: InputsForm) {
  try {
    const data = await getUsers();

    if (data.length > 0) {
      const userVerification = data.find(
        (value: User) =>
          value.senha === dataInput.password && value.nome === dataInput.user
      );

      return userVerification ? userVerification : ({} as User);
    }

    return {} as User;
  } catch (error) {
    throw new Error("Algo deu errado.Tente mais tarde.");
  }
}
