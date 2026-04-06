import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

const fontUrl =
  "https://fonts.gstatic.com/s/russoone/v18/Z9XUDmZRWg6M1LvRYsH-yA.ttf";

export default async function Icon() {
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
          borderRadius: 8,
          fontSize: 24,
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
