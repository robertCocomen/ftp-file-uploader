import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { uploadFilesToFtp } from "./ftp/uploader.js";
import { logger } from "./utils/logger.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load sample input for demo run
const samplePath = path.join(__dirname, "../data/sample-input.json");

async function main() {
try {
const config = JSON.parse(fs.readFileSync(samplePath, "utf-8"));
logger.info("Starting FTP upload process...");
await uploadFilesToFtp(config);
logger.info("All files uploaded successfully.");
} catch (err) {
logger.error(`Fatal error: ${err.message}`);
process.exit(1);
}
}

main();