import { ImageResponse } from "next/og";
import { SITE_CONFIG } from "@/lib/constants";

export const alt = "SoulLog";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const fontUrl =
  "https://fonts.gstatic.com/s/russoone/v18/Z9XUDmZRWg6M1LvRYsH-yA.ttf";

export default async function OgImage() {
  const fontData = await fetch(fontUrl).then((res) => res.arrayBuffer());

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#37352f",
          fontFamily: "Russo One",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* 배경 장식 S */}
        <div
          style={{
            position: "absolute",
            right: -40,
            bottom: -80,
            fontSize: 480,
            color: "rgba(255, 255, 255, 0.04)",
            transform: "rotate(-12deg)",
          }}
        >
          S
        </div>

        {/* 메인 콘텐츠 */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 24,
          }}
        >
          <div
            style={{
              fontSize: 80,
              color: "#ffffff",
              letterSpacing: "-0.02em",
            }}
          >
            {SITE_CONFIG.title}
          </div>
          <div
            style={{
              fontSize: 28,
              color: "rgba(255, 255, 255, 0.5)",
              fontFamily: "sans-serif",
            }}
          >
            {SITE_CONFIG.description}
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [{ name: "Russo One", data: fontData, weight: 400 }],
    },
  );
}
