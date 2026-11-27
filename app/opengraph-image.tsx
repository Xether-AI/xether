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
          background:
            "linear-gradient(135deg, #f8fafc 0%, #ecfdf5 55%, #e0f2fe 100%)",
          color: "#0f172a",
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
            color: "#0ea57a",
            fontWeight: 700,
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
            color: "#0f172a",
          }}
        >
          Reliable Data, Ready for AI
        </div>
        <div
          style={{
            fontSize: "28px",
            color: "#475569",
            maxWidth: "820px",
            lineHeight: 1.4,
          }}
        >
          Automate data cleaning, dataset versioning, synthetic augmentation,
          and governance.
        </div>
      </div>
    ),
    { ...size },
  );
}
