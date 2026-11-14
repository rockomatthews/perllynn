import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";

export const alt =
  "Perllynn. Independent minds. Clearer decisions. Chicago’s river and skyline.";
export const size = { width: 2400, height: 1260 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  const [logo, photo, sans, serif] = await Promise.all([
    readFile(path.join(process.cwd(), "public/brand/perllynn-logo.jpg")),
    readFile(path.join(process.cwd(), "public/brand/chicago-river.jpg")),
    readFile(path.join(process.cwd(), "src/assets/fonts/dm-sans-regular.ttf")),
    readFile(
      path.join(
        process.cwd(),
        "src/assets/fonts/cormorant-garamond-italic.ttf",
      ),
    ),
  ]);
  return new ImageResponse(
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
        background: "#000",
        color: "#fff",
        position: "relative",
        fontFamily: "DM Sans",
      }}
    >
      <img
        src={`data:image/jpeg;base64,${photo.toString("base64")}`}
        alt=""
        width={1320}
        height={1260}
        style={{
          position: "absolute",
          right: 0,
          top: 0,
          objectFit: "cover",
          objectPosition: "50% 40%",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: 2400,
          height: 1260,
          background:
            "linear-gradient(90deg, #000 0%, #000 35%, rgba(0,0,0,.8) 58%, rgba(0,0,0,.08) 100%)",
        }}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          position: "relative",
          padding: "70px 140px 150px",
          width: "100%",
          height: "100%",
        }}
      >
        <img
          src={`data:image/jpeg;base64,${logo.toString("base64")}`}
          width={300}
          height={300}
          alt="Perllynn"
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            letterSpacing: "-8px",
            lineHeight: 1.06,
          }}
        >
          <span style={{ fontSize: 170 }}>Independent minds.</span>
          <span
            style={{
              color: "#ffd21c",
              fontFamily: "Cormorant Garamond",
              fontStyle: "italic",
              fontSize: 214,
            }}
          >
            Clearer decisions.
          </span>
        </div>
      </div>
    </div>,
    {
      ...size,
      fonts: [
        { name: "DM Sans", data: sans, weight: 400, style: "normal" },
        {
          name: "Cormorant Garamond",
          data: serif,
          weight: 400,
          style: "italic",
        },
      ],
    },
  );
}
