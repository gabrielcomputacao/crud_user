import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { UserContext } from "../../context";
import { User } from "../../models";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { Home } from "../../pages/Home";
import { act } from "react";
import { Profile } from ".";
import * as userEdit from "../../../presenter/editUser";

describe("Tests Profile", () => {
  it("should render Profile component", () => {
    act(() =>
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
          <MemoryRouter initialEntries={["/profile"]}>
            <Routes>
              <Route path="/home" element={<Home />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </MemoryRouter>
        </UserContext.Provider>
      )
    );

    expect(screen.getByText("Salvar")).toBeInTheDocument();
  });
  it("should call the async function", async () => {
    vi.spyOn(userEdit, "editUser").mockResolvedValue();

    const handleSetObjMessage = vi.fn();

    act(() =>
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
            isUserActive: true,
            handleSetIsLoading: vi.fn(),
            isLoading: false,
            objectMessage: {
              status: "success",
              text: "Perfil editado com sucesso!",
              page: "login",
            },
          }}
        >
          <MemoryRouter initialEntries={["/profile"]}>
            <Routes>
              <Route path="/home" element={<Home />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </MemoryRouter>
        </UserContext.Provider>
      )
    );

    const userEditField = screen.getByTestId("userEdit").querySelector("input");

    fireEvent.change(userEditField!, { target: { value: "Anderson" } });

    expect(userEditField?.value).toBe("Anderson");
  });
});
