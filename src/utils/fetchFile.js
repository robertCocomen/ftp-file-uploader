import fs from "fs";
import path from "path";
import axios from "axios";
import { fileURLToPath } from "url";
import { logger } from "./logger.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function fetchFile(url) {
try {
const fileName = path.basename(url.split("?")[0]);
const tempFile = path.join(__dirname, `../../temp_${Date.now()}_${fileName}`);

const response = await axios.get(url, { responseType: "arraybuffer" });
fs.writeFileSync(tempFile, response.data);

logger.info(`Fetched remote file: ${url}`);

return {
filePath: url,
tempFile
};
} catch (err) {
logger.error(`Failed to fetch ${url}: ${err.message}`);
throw err;
}
}