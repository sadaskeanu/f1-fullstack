import { render, screen } from "@testing-library/react";
import Layout from "../Layout/Layout";

describe("Layout component", () => {
  it("renders children inside the layout", () => {
    render(
      <Layout>
        <h1>F1 Champions</h1>
      </Layout>
    );

    expect(screen.getByText("F1 Champions")).toBeInTheDocument();
  });

  it("applies the layout class from CSS module", () => {
    const { container } = render(
      <Layout>
        <div>Content</div>
      </Layout>
    );

    const layoutDiv = container.firstChild as HTMLElement;
    expect(layoutDiv.className).toContain("layout");
  });
});
