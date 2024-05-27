import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { UserContext } from "../../context";
import { User } from "../../models";
import { AppRoutes } from "../../routes/Routes";

const mockFN = vi.fn();
vi.useFakeTimers();

describe("Tests Message", () => {
  it("should render message component", () => {
    render(
      <UserContext.Provider
        value={{
          user: {} as User,
          handleSetIsUserActive: vi.fn(),
          handleSetObjectMessage: mockFN,
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
        <AppRoutes />
      </UserContext.Provider>
    );

    const message = screen.getByText("error testing");

    expect(message).toBeInTheDocument();
  });

  it("should activate the function after 5000 milliseconds", async () => {
    render(
      <UserContext.Provider
        value={{
          user: {} as User,
          handleSetIsUserActive: vi.fn(),
          handleSetObjectMessage: mockFN,
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
        <AppRoutes />
      </UserContext.Provider>
    );

    vi.advanceTimersByTime(5000);

    expect(mockFN).toHaveBeenCalled();
  });
});
