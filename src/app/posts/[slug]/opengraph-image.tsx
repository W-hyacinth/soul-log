import { ImageResponse } from "next/og";
import { getPostBySlug, getAllSlugs } from "@/lib/posts";
import { SITE_CONFIG } from "@/lib/constants";

export const alt = "Post thumbnail";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export default async function OgImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  const title = post?.title ?? "Post Not Found";
  const tags = post?.tags ?? [];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "60px 80px",
          backgroundColor: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            justifyContent: "center",
          }}
        >
          <div
            style={{
              fontSize: 48,
              fontWeight: 700,
              color: "#37352f",
              lineHeight: 1.3,
              letterSpacing: "-0.02em",
              marginBottom: 24,
            }}
          >
            {title}
          </div>
          {tags.length > 0 && (
            <div style={{ display: "flex", gap: 8 }}>
              {tags.map((tag) => (
                <div
                  key={tag}
                  style={{
                    fontSize: 20,
                    color: "#787774",
                    backgroundColor: "#f7f6f3",
                    padding: "6px 14px",
                    borderRadius: 6,
                  }}
                >
                  {tag}
                </div>
              ))}
            </div>
          )}
        </div>
        <div
          style={{
            fontSize: 24,
            color: "#787774",
            borderTop: "1px solid #e5e4e0",
            paddingTop: 24,
          }}
        >
          {SITE_CONFIG.title}
        </div>
      </div>
    ),
    { ...size },
  );
}
