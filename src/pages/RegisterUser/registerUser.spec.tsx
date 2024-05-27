import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { UserContext } from "../../context";
import { User } from "../../models";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { act } from "react";
import { RegisterUser } from ".";

const handleSetObjMessage = vi.fn();
const renderComponent = () => {
  act(() =>
    render(
      <UserContext.Provider
        value={{
          user: {} as User,
          handleSetIsUserActive: vi.fn(),
          handleSetObjectMessage: handleSetObjMessage,
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
        <MemoryRouter initialEntries={["/register"]}>
          <Routes>
            <Route path="/register" element={<RegisterUser />} />
          </Routes>
        </MemoryRouter>
      </UserContext.Provider>
    )
  );
};

describe("Tests Register", () => {
  it("should render Register component", () => {
    renderComponent();

    expect(screen.getByText("Cadastrar")).toBeInTheDocument();
  });
});
