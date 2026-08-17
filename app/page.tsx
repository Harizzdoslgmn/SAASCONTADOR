import { readFileSync } from "node:fs";
import { join } from "node:path";
import { LandingEnhancements } from "./landing-enhancements";

function readLandingMarkup() {
  const exportedPage = readFileSync(join(process.cwd(), "index.html"), "utf8");
  const main = exportedPage.match(/<main>[\s\S]*?<\/main>/i);

  if (!main) {
    throw new Error("A composição principal da landing não foi encontrada.");
  }

  return main[0];
}

export default function Home() {
  return (
    <>
      <LandingEnhancements />
      <div dangerouslySetInnerHTML={{ __html: readLandingMarkup() }} />
    </>
  );
}
