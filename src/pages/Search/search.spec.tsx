import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { UserContext } from "../../context";
import { User } from "../../models";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { act } from "react";
import * as users from "../../../presenter/getUsers";

import { Search } from ".";

interface LocalStorageMock {
  [key: string]: string | null;
}

interface LocalStorage {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  clear(): void;
  removeItem(key: string): void;
}

const handleSetObjMessage = vi.fn();
const renderComponent = () => {
  act(() => {
    render(
      <UserContext.Provider
        value={{
          user: {
            id: "1",
            nome: "Anderson",
            sobrenome: "Araujo Varejão",
            tipoUsuario: "Administrador",
            email: "usuario1@email.com.br",
            senha: "123445",
            ativo: true,
          } as User,
          handleSetIsUserActive: vi.fn(),
          handleSetObjectMessage: handleSetObjMessage,
          handleSetUserActive: vi.fn(),
          handleSetIsLoading: vi.fn(),
          isLoading: false,
          isUserActive: true,
          objectMessage: {
            page: "login",
            status: "error",
            text: "error testing",
          },
        }}
      >
        <MemoryRouter initialEntries={["/search"]}>
          <Routes>
            <Route path="/search" element={<Search />} />
          </Routes>
        </MemoryRouter>
      </UserContext.Provider>
    );
  });
};

describe("Tests Search", () => {
  beforeEach(() => {
    const localStorageMock: LocalStorage = (() => {
      let store: LocalStorageMock = {
        users: JSON.stringify([
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
        ]),
      };

      return {
        getItem: (key: string): string | null => store[key] || null,
        setItem: (key: string, value: string): void => {
          store[key] = value.toString();
        },
        clear: (): void => {
          store = {};
        },
        removeItem: (key: string): void => {
          delete store[key];
        },
      };
    })();

    Object.defineProperty(window, "localStorage", {
      value: localStorageMock,
      writable: true,
    });
  });

  it("should render Search component ", async () => {
    renderComponent();

    await act(() => expect(screen.getByText("Excluir")).toBeInTheDocument());
  });
  it("should render Search component with elements list", async () => {
    vi.spyOn(users, "getUsers").mockReturnValue(
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
    renderComponent();

    await waitFor(() => {
      expect(users.getUsers).toBeCalled();
    });
  });
});
