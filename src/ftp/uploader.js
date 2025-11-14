import path from "path";
import { createFtpClient } from "./client.js";
import { fetchFile } from "../utils/fetchFile.js";
import { logger } from "../utils/logger.js";

export async function uploadFilesToFtp({ host, port, username, password, folder, fileUrls }) {
const client = await createFtpClient({ host, port, username, password });

try {
await client.ensureDir(folder);
await client.clearWorkingDir();
} catch (err) {
logger.error(`Failed to prepare folder "${folder}": ${err.message}`);
throw err;
}

for (const fileUrl of fileUrls) {
try {
const { filePath, tempFile } = await fetchFile(fileUrl);

const destPath = path.join(folder, path.basename(filePath));
logger.info(`Uploading ${filePath} -> ${destPath}`);

await client.uploadFrom(tempFile, destPath);

logger.info(`Uploaded: ${path.basename(filePath)}`);
} catch (err) {
logger.error(`Upload failed for ${fileUrl}: ${err.message}`);
}
}

client.close();
}