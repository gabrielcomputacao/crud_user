import "@testing-library/jest-dom";

import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import App from "./App";

describe("Main entry point", () => {
  it("renders the App without crashing", () => {
    const root = document.createElement("div");
    document.body.appendChild(root);

    expect(() => {
      render(<App />, { container: root });
    }).not.toThrow();
  });
});
