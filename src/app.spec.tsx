import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import App from "./App";

describe("Main entry point", () => {
  it("renders the App ", () => {
    const { container } = render(<App />);
    expect(container).toBeInTheDocument();
  });
});
