// Run after `npm run build` and the backend's `python -m tests.manual_auth_server`.
// Only this child process uses the disposable authentication test backend.
import { spawn } from "node:child_process";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const server = spawn(process.execPath, [require.resolve("next/dist/bin/next"),
  "start", "--hostname", "127.0.0.2", "--port", "3001"], {
  stdio: "inherit",
  env: { ...process.env, BACKEND_API_URL: "http://127.0.0.1:8001/api/v1" },
});
server.on("exit", (code) => { process.exitCode = code ?? 1; });
process.on("SIGINT", () => server.kill("SIGINT"));
process.on("SIGTERM", () => server.kill("SIGTERM"));
