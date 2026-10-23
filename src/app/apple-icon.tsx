import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 92,
          background: "#211612",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#FAF6EE",
          fontWeight: 800,
          fontFamily: "serif",
          borderRadius: 24,
        }}
      >
        AF
      </div>
    ),
    { ...size }
  );
}
