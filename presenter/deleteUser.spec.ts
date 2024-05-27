import { waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, expect, it, vi } from "vitest";
import * as userDelete from "./deleteUser";
import { User } from "../src/models";

describe("Tests delete user", () => {
  it("should return undefined", async () => {
    vi.spyOn(userDelete, "deleteUser").mockResolvedValue();

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
      userDelete
        .deleteUser(userTest)
        .then((value) => expect(value).toBe(undefined));
    });
  });
});
