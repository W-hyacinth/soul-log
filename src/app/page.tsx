import { Suspense } from "react";
import { getAllPosts } from "@/lib/posts";
import { Container } from "@/components/layout/Container";
import { SearchBar } from "@/components/posts/SearchBar";

export default function HomePage() {
  const posts = getAllPosts();

  return (
    <Container>
      <section className="py-10">
        <h1 className="text-3xl font-bold tracking-tight text-notion-text mb-6">
          Posts
        </h1>
        <Suspense>
          <SearchBar posts={posts} />
        </Suspense>
      </section>
    </Container>
  );
}
