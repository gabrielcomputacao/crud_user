import "@testing-library/jest-dom";
import { waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import * as useGet from "./getUsers";
import { userAuthentication } from "./userAuthentication";

import { InputsForm } from "../src/pages/Login";

describe("Tests userAuthentication", () => {
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

    const userTest: InputsForm = {
      user: "Andreia",
      password: "123445",
    };

    await waitFor(async () => {
      const userResult = await userAuthentication(userTest);

      expect(userResult).toEqual({
        id: "4",
        nome: "Andreia",
        sobrenome: "Silveira Souza",
        tipoUsuario: "Usuário padrão",
        email: "usuario4@email.com.br",
        senha: "123445",
        ativo: false,
      });
    });
  });
});
