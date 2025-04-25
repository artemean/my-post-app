import { queryOptions } from "@tanstack/react-query";
import { PostModel } from "./PostModel";

export class PostNotFoundError extends Error {}

export const getPostById = async (postId: string) => {
  console.info(`Fetching post with id ${postId}...`);

  const post = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${postId}`,
  ).then((r) => {
    if (r.status === 404) {
      throw new PostNotFoundError(`Post with id "${postId}" not found!`);
    }
    if (!r.ok) {
      throw new Error(`Error fetching post with id "${postId}"`);
    }
    return r.json();
  });

  return post;
};

export const getPosts = async (): Promise<PostModel[]> => {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

export const postsQueryOptions = queryOptions({
  queryKey: ["posts"],
  queryFn: () => getPosts(),
});

export const postQueryOptions = (postId: string) =>
  queryOptions({
    queryKey: ["posts", { postId }],
    queryFn: () => getPostById(postId),
  });
