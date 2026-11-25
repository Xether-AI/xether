import { ImageResponse } from "next/og";

export const alt = "Xether AI - Data Infrastructure for AI";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "72px",
          background: "linear-gradient(135deg, #0b1116 0%, #0f1c22 55%, #0a2926 100%)",
          color: "#e7eceb",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "28px",
            fontSize: "24px",
            color: "#78fcd6",
            fontWeight: 600,
          }}
        >
          <span>Xether AI</span>
        </div>
        <div
          style={{
            fontSize: "64px",
            fontWeight: 700,
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            marginBottom: "24px",
            maxWidth: "900px",
          }}
        >
          Reliable Data, Ready for AI
        </div>
        <div
          style={{
            fontSize: "28px",
            color: "#9aa6a3",
            maxWidth: "820px",
            lineHeight: 1.4,
          }}
        >
          Automate data cleaning, dataset versioning, synthetic augmentation, and governance.
        </div>
      </div>
    ),
    { ...size },
  );
}
