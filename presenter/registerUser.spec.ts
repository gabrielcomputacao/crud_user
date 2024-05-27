import { waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, expect, it, vi } from "vitest";
import * as userRegister from "./registerUser";
import { User } from "../src/models";

describe("Tests registerUser", () => {
  it("should return undefined", async () => {
    vi.spyOn(userRegister, "registerUser").mockResolvedValue();

    const userTest: User = {
      id: "4",
      nome: "Andreia",
      sobrenome: "Silveira Souza",
      tipoUsuario: "Usuário padrão",
      email: "usuario4@email.com.br",
      senha: "123445",
      ativo: false,
    };

    await waitFor(() => {
      userRegister
        .registerUser(userTest)
        .then((value) => expect(value).toBe(undefined));
    });
  });
});
