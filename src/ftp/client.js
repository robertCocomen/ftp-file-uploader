import ftp from "basic-ftp";
import { logger } from "../utils/logger.js";

export async function createFtpClient({ host, port, username, password }) {
const client = new ftp.Client();
client.ftp.verbose = false;

try {
await client.access({
host,
port: port || 21,
user: username,
password,
secure: false
});
logger.info(`Connected to FTP: ${host}:${port || 21}`);
return client;
} catch (err) {
logger.error(`Failed to connect to FTP: ${err.message}`);
throw err;
}
}