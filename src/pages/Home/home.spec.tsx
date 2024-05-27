import "@testing-library/jest-dom";
import { describe, expect, it, vi } from "vitest";
import { UserProvider } from "../../context";
import { AppRoutes } from "../../routes/Routes";
import * as apiUser from "../../../presenter/getUsers";

import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";

describe("tests Home", () => {
  it("render Home component", async () => {
    localStorage.setItem(
      "usersLocalStorage",
      JSON.stringify({
        users: [
          {
            id: 1,
            nome: "Anderson",
            sobrenome: "Araujo Varejão",
            tipoUsuario: "Administrador",
            email: "usuario1@email.com.br",
            senha: "123445",
            ativo: true,
          },
          {
            id: 2,
            nome: "João",
            sobrenome: "Pedro Silva",
            tipoUsuario: "Administrador",
            email: "usuario2@email.com.br",
            senha: "123445",
            ativo: true,
          },
          {
            id: 3,
            nome: "Diane",
            sobrenome: "Pacheco",
            tipoUsuario: "Usuário padrão",
            email: "usuario3@email.com.br",
            senha: "123445",
            ativo: true,
          },
        ],
      })
    );

    vi.spyOn(apiUser, "getUsers").mockReturnValue(
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
      ])
    );

    act(() =>
      render(
        <UserProvider>
          <AppRoutes />
        </UserProvider>
      )
    );

    const inputUsuario = screen.getByTestId("usuario").querySelector("input");
    const inputPassword = screen.getByTestId("password").querySelector("input");

    fireEvent.change(inputUsuario!, { target: { value: "Anderson" } });

    fireEvent.change(inputPassword!, { target: { value: "123445" } });

    expect(inputUsuario?.value).toBe("Anderson");
    expect(inputPassword?.value).toBe("123445");

    fireEvent.click(screen.getByText("Entrar"));

    await waitFor(() =>
      expect(screen.getByText("Gestão de usuários")).toBeInTheDocument()
    );
  });
});
