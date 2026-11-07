import fs from "node:fs";
import path from "node:path";

const distDir = path.resolve("dist");
fs.mkdirSync(distDir, { recursive: true });
const workerSrc = fs.readFileSync(path.resolve("src/worker.mjs"), "utf8");
fs.writeFileSync(path.join(distDir, "worker.mjs"), workerSrc, "utf8");
console.log("Built dist/worker.mjs (" + workerSrc.length + " bytes).");
