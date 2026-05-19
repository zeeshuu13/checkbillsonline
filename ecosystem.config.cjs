/**
 * PM2 process file for Hostinger VPS (or any Linux server).
 * 1. npm ci && npm run build:hostinger
 * 2. pm2 start ecosystem.config.cjs && pm2 save && pm2 startup
 */
const path = require("path");

const root = __dirname;
const standaloneDir = path.join(root, ".next", "standalone");

module.exports = {
  apps: [
    {
      name: "checkbillsonline",
      cwd: standaloneDir,
      script: "server.js",
      instances: 1,
      exec_mode: "fork",
      env: {
        NODE_ENV: "production",
        PORT: "3100",
        HOSTNAME: "0.0.0.0",
      },
    },
  ],
};
