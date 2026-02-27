import Link from "next/link";
import { Container } from "@/components/layout/Container";

export default function NotFound() {
  return (
    <Container>
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <h1 className="text-6xl font-bold text-notion-text-light">404</h1>
        <p className="mt-4 text-lg text-notion-text-light">
          페이지를 찾을 수 없습니다.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex px-4 py-2 rounded-md text-sm font-medium text-notion-link hover:bg-notion-bg-hover transition-colors duration-150"
        >
          홈으로 돌아가기
        </Link>
      </div>
    </Container>
  );
}
