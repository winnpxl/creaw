import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { site } from "@/content/site";

// Branded share card (Open Graph + Twitter), inherited by every page.
export const alt = `${site.name}: ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const INK = "#163300";
const GREEN = "#9FE870";

export default async function Image() {
  // Wordmark, recoloured to Forest Green.
  const svg = (await readFile(join(process.cwd(), "public/brand/creaw-logo.svg"), "utf8")).replace(
    /fill="black"/g,
    `fill="${INK}"`,
  );
  const logo = `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: GREEN,
          color: INK,
        }}
      >
        <img src={logo} width={330} height={56} alt="" />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 84, fontWeight: 700, letterSpacing: -3, lineHeight: 1 }}>
            Product design &amp; software
          </div>
          <div style={{ fontSize: 84, fontWeight: 700, letterSpacing: -3, lineHeight: 1.05 }}>
            development studio.
          </div>
          <div style={{ marginTop: 36, fontSize: 30, opacity: 0.8 }}>
            Websites · Web apps · Mobile apps · AI products
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 26, opacity: 0.8 }}>
          <span>{site.url.replace("https://", "")}</span>
          <span>{site.email}</span>
        </div>
      </div>
    ),
    size,
  );
}
