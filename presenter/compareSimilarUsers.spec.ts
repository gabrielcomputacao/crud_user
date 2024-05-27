import { waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, expect, it, vi } from "vitest";
import * as useGet from "./getUsers";

import {
  compareSimilarUsers,
  compareSimilarUsersWithExcess,
} from "./compareSimilarUsers";
import { User } from "../src/models";

describe("Tests compareSimilarUsers", () => {
  it("should return true", async () => {
    vi.spyOn(useGet, "getUsers").mockReturnValue(
      Promise.resolve([
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
      ])
    );

    const userTest: User = {
      id: "4",
      nome: "Andreia",
      sobrenome: "Silveira Souza",
      tipoUsuario: "Usuário padrão",
      email: "usuario4@email.com.br",
      senha: "123445",
      ativo: false,
    };

    compareSimilarUsers(userTest).then((value) => expect(value).toBe(true));
  });
  it("should compareSimilarUsersWithExcess return false", async () => {
    vi.spyOn(useGet, "getUsers").mockResolvedValue([
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
    ]);

    const userTest: User = {
      id: "4",
      nome: "Andreia",
      sobrenome: "Silveira Souza",
      tipoUsuario: "Usuário padrão",
      email: "usuario4@email.com.br",
      senha: "123445",
      ativo: false,
    };

    await waitFor(async () => {
      const test = await compareSimilarUsersWithExcess(userTest, "Andreia");
      expect(test).toBe(false);
    });

    expect(useGet.getUsers).toBeCalled();
  });
});
