import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

const fontUrl =
  "https://fonts.gstatic.com/s/russoone/v18/Z9XUDmZRWg6M1LvRYsH-yA.ttf";

export default async function AppleIcon() {
  const fontData = await fetch(fontUrl).then((res) => res.arrayBuffer());

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#37352f",
          borderRadius: 36,
          fontSize: 130,
          color: "#ffffff",
          fontFamily: "Russo One",
        }}
      >
        <span style={{ transform: "rotate(-12deg)" }}>S</span>
      </div>
    ),
    {
      ...size,
      fonts: [{ name: "Russo One", data: fontData, weight: 400 }],
    },
  );
}
