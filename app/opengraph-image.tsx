import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Sara da Silva — IT support engineer who builds";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0A0A0A",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          fontFamily: "monospace",
          position: "relative",
        }}
      >
        <div
          style={{
            color: "#CCFF00",
            fontSize: 14,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            marginBottom: 32,
          }}
        >
          BUILD WITH SDS
        </div>
        <div
          style={{
            color: "#F8F8F8",
            fontSize: 72,
            fontWeight: 700,
            lineHeight: 1.1,
            marginBottom: 16,
          }}
        >
          Sara da Silva
        </div>
        <div
          style={{
            color: "#6B6B6B",
            fontSize: 24,
            letterSpacing: "0.05em",
          }}
        >
          New Plymouth, NZ · GMT+13
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 80,
            left: 80,
            color: "#6B6B6B",
            fontSize: 14,
          }}
        >
          ISP support by day · shipping code by night
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 80,
            right: 80,
            color: "#6B6B6B",
            fontSize: 12,
            letterSpacing: "0.1em",
          }}
        >
          github/sara2023s
        </div>
      </div>
    ),
    { ...size }
  );
}
