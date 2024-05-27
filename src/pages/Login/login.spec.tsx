import "@testing-library/jest-dom";

import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { UserProvider } from "../../context";
import { AppRoutes } from "../../routes/Routes";

describe("Tests Login", () => {
  it("should render login", () => {
    const { getByText } = render(
      <UserProvider>
        <AppRoutes></AppRoutes>
      </UserProvider>
    );

    expect(getByText("Entrar")).toBeInTheDocument();
  });
});
