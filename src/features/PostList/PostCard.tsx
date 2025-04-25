import { PostModel } from "./PostModel";

interface PostCardProps {
  post: PostModel;
}

export function PostCard({ post }: PostCardProps) {
  return (
    <div className="bg-sky-50 p-4 rounded-lg shadow-md mb-4">
      <h2 className="text-2xl first-letter:capitalize mb-4">{post.title}</h2>
      <p className="first-letter:capitalize">{post.body}</p>
    </div>
  );
}
