import "@testing-library/jest-dom";
import { act, fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { UserContext } from "../../context";
import { User } from "../../models";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { Home } from "../../pages/Home";
import { RegisterUser } from "../../pages/RegisterUser";
import { Search } from "../../pages/Search";

const renderFluxComponents = () => {
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

  render(
    <UserContext.Provider
      value={{
        user: {} as User,
        handleSetIsUserActive: vi.fn(),
        handleSetObjectMessage: vi.fn(),
        handleSetUserActive: vi.fn(),
        handleSetIsLoading: vi.fn(),
        isLoading: false,
        isUserActive: false,
        objectMessage: {
          page: "login",
          status: "error",
          text: "error testing",
        },
      }}
    >
      <MemoryRouter initialEntries={["/home"]}>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/register" element={<RegisterUser />} />
          <Route path="/search" element={<Search />} />
        </Routes>
      </MemoryRouter>
    </UserContext.Provider>
  );
};

describe("Tests Header", () => {
  it("should render Header component", () => {
    renderFluxComponents();
    const linkHeader = screen.getByText("Cadastrar usuário");

    expect(linkHeader).toBeInTheDocument();
  });
  it("should render Header component and click in the link Cadastrar usuário", async () => {
    renderFluxComponents();
    const linkHeader = screen.getByText("Cadastrar usuário");

    await act(() => {
      fireEvent.click(linkHeader);
    });

    const buttonCadastrar = screen.findByText("Cadastrar");
    expect(await buttonCadastrar).toBeInTheDocument();
  });
  it("should render Header component and click in the link Gestão de usuários", async () => {
    renderFluxComponents();

    const linkHeader = screen.getByText("Gestão de usuários");

    await act(() => {
      fireEvent.click(linkHeader);
    });

    const titleExcluir = screen.findByText("Excluir");
    expect(await titleExcluir).toBeInTheDocument();
  });
});
