import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import List from "../List/List";

describe("List", () => {
  it("renders a <ul> with children", () => {
    render(
      <List>
        <li>Item 1</li>
        <li>Item 2</li>
      </List>
    );

    const list = screen.getByRole("list");
    expect(list).toBeInTheDocument();

    const items = screen.getAllByRole("listitem");
    expect(items).toHaveLength(2);
    expect(items[0]).toHaveTextContent("Item 1");
    expect(items[1]).toHaveTextContent("Item 2");
  });
});
