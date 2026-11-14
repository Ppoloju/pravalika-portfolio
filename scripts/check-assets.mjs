import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../", import.meta.url));
const readSource = (file) => readFileSync(resolve(root, file), "utf8");
const references = [];

const portfolio = readSource("data/portfolio.ts");
const resumeFile = portfolio.match(
  /resumePath:\s*toPublicAssetUrl\(`\/resume\/\$\{encodeURIComponent\("([^"]+)"\)\}`\)/
);

if (resumeFile) {
  references.push(`public/resume/${resumeFile[1]}`);
} else {
  console.error("Could not find the resume asset reference in data/portfolio.ts.");
  process.exitCode = 1;
}

for (const fileName of readSource("constants/certifications.ts").matchAll(
  /certificateUrl\("([^"]+)"\)/g
)) {
  references.push(`public/certificates/${fileName[1]}`);
}

for (const fileName of readSource("constants/projects.ts").matchAll(
  /documentUrl:.*?encodeURIComponent\("([^"]+)"\)/g
)) {
  references.push(`public/certificates/${fileName[1]}`);
}

const missing = references.filter(
  (reference) => !existsSync(resolve(root, reference))
);

if (missing.length > 0) {
  console.error("Missing referenced public assets:");
  for (const reference of missing) console.error(`- ${reference}`);
  process.exitCode = 1;
} else if (process.exitCode !== 1) {
  console.log(`Verified ${references.length} referenced public assets.`);
}
