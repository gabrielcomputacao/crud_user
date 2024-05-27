import { waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, expect, it, vi } from "vitest";
import * as userSpecific from "./getSpecificUsers";

describe("Tests getSpecificUsers", () => {
  it("should return array", async () => {
    vi.spyOn(userSpecific, "getSpecificUsers").mockResolvedValue([
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
    ]);

    await waitFor(() => {
      userSpecific
        .getSpecificUsers("useradmin22")
        .then((value) => expect(value).toHaveLength(3));
    });
  });
});
