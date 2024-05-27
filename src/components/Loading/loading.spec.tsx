import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Loading } from ".";

describe("Tests Loading", () => {
  it("should render Loading component", () => {
    render(<Loading />);
    const circle = screen.getByTestId("circle");

    expect(circle).toBeInTheDocument();
  });
});
