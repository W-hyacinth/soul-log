import type { PostMeta } from "@/types/index";
import { PostCard } from "@/components/posts/PostCard";

export function PostList({ posts, onClick }: { posts: PostMeta[]; onClick?: () => void }) {
  if (posts.length === 0) {
    return (
      <p className="py-12 text-center text-notion-text-light">
        아직 작성된 글이 없습니다.
      </p>
    );
  }

  return (
    <div className="divide-y divide-notion-border">
      {posts.map((post) => (
        <PostCard key={post.slug} post={post} onClick={onClick} />
      ))}
    </div>
  );
}
