import { useQuery } from "@tanstack/react-query";
import { PostModel } from "./PostModel";
import { PostCard } from "./PostCard";

const getPosts = async (): Promise<PostModel[]> => {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

export function PostList() {
  const { data, error, isLoading } = useQuery<PostModel[]>({
    queryKey: ["posts"],
    queryFn: getPosts,
  });

  return (
    <div>
      <h1 className="text-lg text-sky-50">Post List</h1>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {data && (
        <>
          {data.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </>
      )}
    </div>
  );
}
