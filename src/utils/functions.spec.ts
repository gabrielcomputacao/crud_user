import { describe, expect, it } from "vitest";
import {
  compareSimilarUsersInLocalStorage,
  compareSimilarUsersWithExcessInLocalStorage,
  findElementInArray,
  objectLengthVerification,
} from "./functions";
import { User } from "../models";

describe("tests Functions", () => {
  const userTest: User[] = [
    {
      id: "1",
      nome: "Anderson",
      sobrenome: "Araujo Varejão",
      tipoUsuario: "Administrador",
      email: "usuario1@email.com.br",
      senha: "123445",
      ativo: true,
    },
    {
      id: "2",
      nome: "João",
      sobrenome: "Pedro Silva",
      tipoUsuario: "Administrador",
      email: "usuario2@email.com.br",
      senha: "123445",
      ativo: true,
    },
    {
      id: "3",
      nome: "Diane",
      sobrenome: "Pacheco",
      tipoUsuario: "Usuário padrão",
      email: "usuario3@email.com.br",
      senha: "123445",
      ativo: true,
    },
    {
      id: "4",
      nome: "Andreia",
      sobrenome: "Silveira Souza",
      tipoUsuario: "Usuário padrão",
      email: "usuario4@email.com.br",
      senha: "123445",
      ativo: false,
    },
  ];

  const user: User = {
    id: "4",
    nome: "Andreia",
    sobrenome: "Silveira Souza",
    tipoUsuario: "Usuário padrão",
    email: "usuario4@email.com.br",
    senha: "123445",
    ativo: false,
  };

  it("should return true", () => {
    const value = objectLengthVerification({ id: "teste", nome: "teste12" });

    expect(value).toBe(true);
  });
  it("should return false", () => {
    const value = objectLengthVerification({});

    expect(value).toBe(false);
  });
  it("should return User", () => {
    const value = findElementInArray(userTest, user);

    expect(value).toEqual(user);
  });
  it("should return true in compare similar user", () => {
    const value = compareSimilarUsersInLocalStorage(userTest, user);

    expect(value).toBe(true);
  });

  it("should return true in compare similar user with excess", () => {
    const value = compareSimilarUsersWithExcessInLocalStorage(
      userTest,
      user,
      "teste2"
    );

    expect(value).toBe(true);
  });
});
