import { render, screen } from "@testing-library/react";
import { PostList } from "./PostList";
import { vi } from "vitest";

// Mock useQuery from @tanstack/react-query
vi.mock("@tanstack/react-query", async () => {
  const actual = await vi.importActual<typeof import("@tanstack/react-query")>(
    "@tanstack/react-query",
  );
  return {
    ...actual,
    useQuery: vi.fn(),
  };
});

// Mock Link from @tanstack/react-router
vi.mock("@tanstack/react-router", () => ({
  Link: ({ children, to, params }: any) => (
    <a href={`/posts/${params.postId}`}>{children}</a>
  ),
}));

// Optionally mock PostCard
// vi.mock("./PostCard", () => ({
//   PostCard: ({ post }: any) => <div>{post.title}</div>,
// }));

import { useQuery } from "@tanstack/react-query";

describe("PostList", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("renders loading state", () => {
    (useQuery as any).mockReturnValue({
      data: undefined,
      error: null,
      isLoading: true,
    });

    render(<PostList />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("renders error state", () => {
    (useQuery as any).mockReturnValue({
      data: undefined,
      error: { message: "Failed to fetch" },
      isLoading: false,
    });

    render(<PostList />);
    expect(screen.getByText("Error: Failed to fetch")).toBeInTheDocument();
  });

  it("renders list of posts", () => {
    (useQuery as any).mockReturnValue({
      data: [
        { id: 1, title: "Post One" },
        { id: 2, title: "Post Two" },
      ],
      error: null,
      isLoading: false,
    });

    render(<PostList />);
    expect(screen.getByText("Post One")).toBeInTheDocument();
    expect(screen.getByText("Post Two")).toBeInTheDocument();

    const links = screen.getAllByRole("link");
    expect(links).toHaveLength(2);
    expect(links[0].getAttribute("href")).toBe("/posts/1");
    expect(links[1].getAttribute("href")).toBe("/posts/2");
  });
});
