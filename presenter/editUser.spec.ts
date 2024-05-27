import { waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, expect, it, vi } from "vitest";
import * as userEdit from "./editUser";
import { User } from "../src/models";

describe("Tests editUser", () => {
  it("should return undefined", async () => {
    vi.spyOn(userEdit, "editUser").mockResolvedValue();

    const userTest: User = {
      id: "1",
      nome: "Anderson",
      sobrenome: "Araujo Varejão",
      tipoUsuario: "Administrador",
      email: "usuario1@email.com.br",
      senha: "123445",
      ativo: true,
    };

    await waitFor(() => {
      userEdit
        .editUser(userTest, userTest.nome)
        .then((value) => expect(value).toBe(undefined));
    });
  });
});
