import {
  createFileRoute,
  ErrorComponent,
  ErrorComponentProps,
  useRouter,
} from "@tanstack/react-router";
import { PostCard } from "../features/PostList/PostCard";
import {
  PostNotFoundError,
  postQueryOptions,
} from "../features/PostList/postService";
import { useQueryErrorResetBoundary } from "@tanstack/react-query";
import { useEffect } from "react";

export const Route = createFileRoute("/posts/$postId")({
  loader: ({ context, params: { postId } }) => {
    return context.queryClient.ensureQueryData(postQueryOptions(postId));
  },
  component: PostComponent,
  errorComponent: PostErrorComponent,
  pendingComponent: () => <div>Loading...</div>,
});

function PostErrorComponent({ error }: ErrorComponentProps) {
  const router = useRouter();
  if (error instanceof PostNotFoundError) {
    return <div>{error.message}</div>;
  }
  const queryErrorResetBoundary = useQueryErrorResetBoundary();

  useEffect(() => {
    queryErrorResetBoundary.reset();
  }, [queryErrorResetBoundary]);

  return (
    <div>
      <button
        onClick={() => {
          router.invalidate();
        }}
      >
        retry
      </button>
      <ErrorComponent error={error} />
    </div>
  );
}

function PostComponent() {
  const post = Route.useLoaderData();

  return (
    <div className="p-8">
      <PostCard post={post} />
    </div>
  );
}
