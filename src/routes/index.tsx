import { createFileRoute } from "@tanstack/react-router";
import { PostList } from "../features/PostList/PostList";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="p-8">
      <PostList />
    </div>
  );
}
