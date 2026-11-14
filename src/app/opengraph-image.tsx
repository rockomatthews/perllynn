import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";

export const alt = "Perllynn — Independent minds. Clearer decisions.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  const logo = await readFile(
    path.join(process.cwd(), "public/brand/perllynn-logo.jpg"),
  );
  return new ImageResponse(
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        width: "100%",
        height: "100%",
        background: "#000",
        color: "#fff",
        padding: "45px 70px",
      }}
    >
      {/* The original image is embedded so the preview also preserves the supplied mark. */}
      <img
        src={`data:image/jpeg;base64,${logo.toString("base64")}`}
        width={112}
        height={112}
        alt="Perllynn"
      />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          fontSize: 77,
          letterSpacing: "-4px",
          lineHeight: 1.12,
        }}
      >
        <span>Independent minds.</span>
        <span style={{ color: "#ffd21c" }}>Clearer decisions.</span>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          borderTop: "1px solid #fff",
          paddingTop: 25,
          fontSize: 18,
        }}
      >
        <span>Independent thinking. Unbiased advice.</span>
        <span>Chicago, Illinois</span>
      </div>
    </div>,
    size,
  );
}
