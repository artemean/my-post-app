import { useQuery } from "@tanstack/react-query";
import { PostCard } from "./PostCard";
import { postsQueryOptions } from "./postService";
import { Link } from "@tanstack/react-router";

export function PostList() {
  const { data, error, isLoading } = useQuery(postsQueryOptions);

  return (
    <div>
      <h1 className="text-lg text-sky-50">Post List</h1>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {data && (
        <>
          {data.map((post) => (
            <>
              <Link
                key={post.id}
                to="/posts/$postId"
                params={{
                  postId: `${post.id}`,
                }}
              >
                <PostCard post={post} />
              </Link>
            </>
          ))}
        </>
      )}
    </div>
  );
}
