# VPS Deployment Guide
## Hostinger VPS — Next.js Websites (checkbills.pk · checkbillsonline.com)

> **Plain-English walkthrough.** Every command is copy-paste ready.  
> Works for any Next.js project you deploy to this server in the future.

---

## Table of Contents

1. [What You Need Before You Start](#1-what-you-need-before-you-start)
2. [Connect to Your VPS via SSH](#2-connect-to-your-vps-via-ssh)
3. [One-Time Server Setup](#3-one-time-server-setup)
   - 3.1 Install Node.js 20
   - 3.2 Install Nginx
   - 3.3 Install PM2
   - 3.4 Install Certbot (SSL)
4. [Deploy a New Website](#4-deploy-a-new-website)
   - 4.1 Clone the repository
   - 4.2 Create the environment file
   - 4.3 Install dependencies
   - 4.4 Build the project
   - 4.5 Start with PM2
   - 4.6 Configure Nginx
5. [Connect a Domain Name](#5-connect-a-domain-name)
6. [Enable HTTPS / SSL Certificate](#6-enable-https--ssl-certificate)
7. [Update the Site After Code Changes](#7-update-the-site-after-code-changes)
8. [Manage Running Apps with PM2](#8-manage-running-apps-with-pm2)
9. [Current Sites on This Server](#9-current-sites-on-this-server)
10. [Troubleshooting](#10-troubleshooting)

---

## 1. What You Need Before You Start

| Item | Your Value |
|------|------------|
| VPS IP address | `72.61.235.15` |
| SSH username | `root` |
| SSH password | *(stored in your password manager)* |
| GitHub account | `zeeshuu13` |
| Hostinger control panel | [hpanel.hostinger.com](https://hpanel.hostinger.com) |

**Your computer needs:**
- A terminal app  
  - **Windows:** Windows Terminal, PowerShell, or PuTTY  
  - **Mac / Linux:** built-in Terminal

---

## 2. Connect to Your VPS via SSH

SSH is how you remotely control the server. Think of it as a remote keyboard for the server.

### Windows (PowerShell or Windows Terminal)

```powershell
ssh root@72.61.235.15
```

Type the password when asked. You will **not** see the password as you type — that is normal. Press Enter.

### Mac / Linux (Terminal)

```bash
ssh root@72.61.235.15
```

### First-time connection warning

The first time you connect you will see:

```
The authenticity of host '72.61.235.15' can't be established.
Are you sure you want to continue connecting? (yes/no)
```

Type `yes` and press Enter. This only happens once.

### You are connected when you see:

```
root@srv1684128:~#
```

The `#` means you are logged in as root (the admin user). Every command below is run at this prompt.

---

## 3. One-Time Server Setup

You only run these steps **once ever** — when the server is brand new. Skip any step if the tool is already installed.

### Check what is already installed

```bash
node --version       # should print v20.x.x
nginx -v             # should print nginx/1.x.x
pm2 --version        # should print a version number
git --version        # should print git version 2.x.x
certbot --version    # should print certbot 2.x.x
```

If a command prints a version number, that tool is already installed — skip to the next one.

---

### 3.1 Install Node.js 20

Node.js is the engine that runs Next.js apps.

```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt-get install -y nodejs
```

Verify:

```bash
node --version    # v20.x.x
npm --version     # 10.x.x
```

---

### 3.2 Install Nginx

Nginx is the web server that sits in front of your app. It handles traffic on port 80/443 and forwards it to your app.

```bash
apt-get install -y nginx
systemctl enable nginx
systemctl start nginx
```

Verify:

```bash
nginx -v
curl -s -o /dev/null -w "%{http_code}" http://localhost
# should print 200
```

---

### 3.3 Install PM2

PM2 keeps your app running in the background. If the app crashes, PM2 restarts it automatically.

```bash
npm install -g pm2
```

Make PM2 start automatically when the server reboots:

```bash
pm2 startup
```

That command will print one line starting with `sudo env PATH=...` — **copy and run that exact line**.

Verify:

```bash
pm2 --version
```

---

### 3.4 Install Certbot (SSL certificates)

Certbot gets you free HTTPS certificates from Let's Encrypt.

```bash
apt-get install -y certbot python3-certbot-nginx
```

Verify:

```bash
certbot --version
```

---

## 4. Deploy a New Website

Do these steps every time you add a **new** site to the server.

**Before you start**, make sure:
- The project has an `ecosystem.config.cjs` file in its root
- The project has `output: "standalone"` or a `build:hostinger` script in `package.json`
- The repo is pushed to GitHub

---

### 4.1 Clone the Repository

Each website lives in its own folder under `/var/www/`.

```bash
cd /var/www
git clone https://github.com/zeeshuu13/YOUR-REPO-NAME.git FOLDER-NAME
```

**Real examples:**

```bash
# checkbills.pk (MEPCO)
git clone https://github.com/zeeshuu13/CheckBills.pk.git checkbills

# checkbillsonline.com (international)
git clone https://github.com/zeeshuu13/checkbillsonline.git checkbillsonline
```

Verify the files are there:

```bash
ls /var/www/checkbillsonline
```

You should see folders like `app/`, `components/`, `lib/`, `package.json`, etc.

---

### 4.2 Create the Environment File

This file tells the app what domain it is running on and holds any secret API keys.

```bash
nano /var/www/checkbillsonline/.env.production
```

Paste this content (adjust the domain):

```env
NODE_ENV=production
NEXT_PUBLIC_SITE_URL=https://checkbillsonline.com

# Optional — site works without these (images use Picsum fallback)
# UNSPLASH_ACCESS_KEY=your_key_here
# RAZORPAY_KEY_ID=your_key_here
# RAZORPAY_KEY_SECRET=your_key_here
```

Save and exit nano: press `Ctrl+X`, then `Y`, then `Enter`.

---

### 4.3 Install Dependencies

```bash
cd /var/www/checkbillsonline
npm ci
```

`npm ci` is like `npm install` but uses the exact versions from `package-lock.json`. Always use `npm ci` on the server, not `npm install`.

This takes 1–3 minutes.

---

### 4.4 Build the Project

This compiles the Next.js app into a production bundle.

```bash
cd /var/www/checkbillsonline
BUILD_STANDALONE=1 npm run build
```

Then copy the static files into the standalone bundle:

```bash
cp -r public .next/standalone/
cp -r .next/static .next/standalone/.next/
```

The build takes **3–6 minutes** — the terminal will look frozen during this. That is normal.

When it finishes you will see something like:

```
Route (app)               Size    First Load JS
...
✓ Generating static pages (425/425)
✓ Finalizing page optimization
```

---

### 4.5 Start with PM2

```bash
cd /var/www/checkbillsonline
pm2 start ecosystem.config.cjs
pm2 save
```

Check it is running:

```bash
pm2 list
```

You should see your app in the list with status `online`.

Test the app responds locally (replace 3100 with your app's port):

```bash
curl -s -o /dev/null -w "%{http_code}" http://localhost:3100/
# should print 200
```

---

### 4.6 Configure Nginx

Nginx forwards internet traffic to your running app.

#### Create a config file for this site

```bash
nano /etc/nginx/sites-available/checkbillsonline
```

Paste this content (replace domain name and port number if different):

```nginx
server {
    listen 80;
    server_name checkbillsonline.com www.checkbillsonline.com;

    # Serve Next.js static assets directly (faster, no app involvement)
    location /_next/static/ {
        alias /var/www/checkbillsonline/.next/standalone/.next/static/;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    location /public/ {
        alias /var/www/checkbillsonline/public/;
        expires 7d;
    }

    # Forward everything else to the Next.js app
    location / {
        proxy_pass         http://127.0.0.1:3100;
        proxy_http_version 1.1;
        proxy_set_header   Upgrade $http_upgrade;
        proxy_set_header   Connection 'upgrade';
        proxy_set_header   Host $host;
        proxy_set_header   X-Real-IP $remote_addr;
        proxy_set_header   X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header   X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        proxy_read_timeout 300s;
        proxy_send_timeout 300s;
    }
}
```

Save and exit: `Ctrl+X` → `Y` → `Enter`.

#### Enable the site

```bash
ln -s /etc/nginx/sites-available/checkbillsonline /etc/nginx/sites-enabled/
nginx -t
systemctl reload nginx
```

`nginx -t` checks your config for errors. Only run `reload` if it says **test is successful**.

---

## 5. Connect a Domain Name

DNS tells the internet which server your domain points to.

### Where to make DNS changes

- If your domain was registered at **Hostinger**: log into [hpanel.hostinger.com](https://hpanel.hostinger.com) → Domains → Manage → DNS / Nameservers
- If your domain was registered at **GoDaddy / Namecheap / etc.**: log into that registrar and find DNS settings

### What records to add / update

| Type | Name | Value | TTL |
|------|------|-------|-----|
| A | `@` (or blank) | `72.61.235.15` | 3600 |
| A | `www` | `72.61.235.15` | 3600 |

**`@` means the root domain** (checkbillsonline.com itself).  
**`www` means the www subdomain** (www.checkbillsonline.com).

### How long does DNS take?

Usually **5–30 minutes**. Sometimes up to 24 hours on older registrars. You can check propagation at [dnschecker.org](https://dnschecker.org) — paste your domain and look for green checkmarks.

### Test DNS has propagated

Once the records are set, run this from your local machine:

```bash
ping checkbillsonline.com
```

If it shows `72.61.235.15`, DNS is working.

---

## 6. Enable HTTPS / SSL Certificate

**Do this only after DNS has propagated** (ping shows the right IP).

```bash
certbot --nginx -d checkbillsonline.com -d www.checkbillsonline.com
```

Certbot will ask a few questions:
1. Enter your email address (for renewal reminders)
2. Agree to terms of service: type `Y`
3. Whether to redirect HTTP to HTTPS: choose `2` (Redirect — recommended)

When it finishes, your site is live at `https://checkbillsonline.com`.

### Automatic renewal

Certbot sets up a cron job that renews certificates automatically every 90 days. You do not need to do anything.

Test the renewal process works:

```bash
certbot renew --dry-run
```

---

## 7. Update the Site After Code Changes

Every time you push new code to GitHub, run these commands on the server to deploy the update.

```bash
cd /var/www/checkbillsonline

# Pull latest code from GitHub
git pull

# Install any new dependencies
npm ci

# Rebuild
BUILD_STANDALONE=1 npm run build
cp -r public .next/standalone/
cp -r .next/static .next/standalone/.next/

# Restart the app (zero-downtime reload)
pm2 restart checkbillsonline
```

The whole process takes about 5–7 minutes (mostly the build step).

### Quick copy-paste update block

Save this somewhere handy — you will use it every time:

```bash
cd /var/www/checkbillsonline && git pull && npm ci && BUILD_STANDALONE=1 npm run build && cp -r public .next/standalone/ && cp -r .next/static .next/standalone/.next/ && pm2 restart checkbillsonline && echo "DEPLOY DONE"
```

When you see `DEPLOY DONE` the site is updated.

---

## 8. Manage Running Apps with PM2

### See all running apps

```bash
pm2 list
```

### View live logs (press Ctrl+C to stop watching)

```bash
pm2 logs checkbillsonline
pm2 logs checkbills           # the MEPCO site
```

### Restart an app

```bash
pm2 restart checkbillsonline
```

### Stop an app

```bash
pm2 stop checkbillsonline
```

### Start a stopped app

```bash
pm2 start checkbillsonline
```

### Delete an app from PM2 (does not delete the files)

```bash
pm2 delete checkbillsonline
```

### Monitor CPU and memory usage live

```bash
pm2 monit
```

Press `Ctrl+C` to exit.

---

## 9. Current Sites on This Server

| Website | Folder | Port | PM2 name | GitHub repo |
|---------|--------|------|----------|-------------|
| checkbills.pk | `/var/www/checkbills` | 3000 | `mepco-web` | CheckBills.pk |
| checkbillsonline.com | `/var/www/checkbillsonline` | 3100 | `checkbillsonline` | checkbillsonline |

When deploying a **third site** in the future:
1. Use a new folder name under `/var/www/`
2. Pick a new port number (e.g. 3200)
3. Update `ecosystem.config.cjs` in that project to use that port
4. Create a new Nginx config file pointing to that port
5. Get an SSL cert for the new domain

---

## 10. Troubleshooting

### App shows "502 Bad Gateway"

The app is not running. Check PM2:

```bash
pm2 list
pm2 logs checkbillsonline --lines 50
```

If the app is `errored`, restart it:

```bash
pm2 restart checkbillsonline
```

If it keeps crashing, check the logs for the error message.

---

### Site shows old content after a deploy

You did not rebuild after pulling. Run the full update block from Section 7.

Also clear Cloudflare cache if you use Cloudflare:  
Cloudflare dashboard → Caching → Purge Everything.

---

### nginx: configuration file test failed

You have a typo in the Nginx config. Check the error:

```bash
nginx -t
```

It will tell you exactly which line has the problem. Fix it with `nano /etc/nginx/sites-available/checkbillsonline`, then:

```bash
nginx -t && systemctl reload nginx
```

---

### Bill check API returns errors (PITC)

The PITC server (`bill.pitc.com.pk`) may be blocking the VPS IP or is slow. Check:

```bash
curl -I https://bill.pitc.com.pk/mepcobill
```

- If you get `200 OK` — the connection is fine; the issue is elsewhere (wrong reference number, etc.)
- If you get a timeout or `000` — PITC is blocking this VPS IP. Nothing you can do except wait or use a different VPS region.

---

### Disk full

Check disk usage:

```bash
df -h /
```

If `/` is over 90% full, clean up:

```bash
# Remove old PM2 logs
pm2 flush

# Remove npm cache
npm cache clean --force

# Remove old Next.js build artifacts
rm -rf /var/www/checkbillsonline/.next/cache
```

---

### SSL certificate expired or renewal failed

```bash
certbot renew
```

If that fails:

```bash
certbot certificates                    # shows expiry dates
certbot --nginx -d checkbillsonline.com -d www.checkbillsonline.com   # re-issue
```

---

### Forgot the server password

Log into [hpanel.hostinger.com](https://hpanel.hostinger.com) → VPS → Manage → Access → Reset root password.

---

## Quick Reference Card

```
CONNECT
  ssh root@72.61.235.15

CHECK EVERYTHING IS RUNNING
  pm2 list
  systemctl status nginx

DEPLOY NEW SITE
  cd /var/www
  git clone https://github.com/zeeshuu13/REPO.git FOLDER
  cd FOLDER
  nano .env.production          ← set NEXT_PUBLIC_SITE_URL
  npm ci
  BUILD_STANDALONE=1 npm run build
  cp -r public .next/standalone/
  cp -r .next/static .next/standalone/.next/
  pm2 start ecosystem.config.cjs
  pm2 save
  nano /etc/nginx/sites-available/SITENAME   ← paste Nginx config
  ln -s /etc/nginx/sites-available/SITENAME /etc/nginx/sites-enabled/
  nginx -t && systemctl reload nginx

CONNECT DOMAIN
  Add A record: @ → 72.61.235.15
  Add A record: www → 72.61.235.15

ENABLE SSL (after DNS)
  certbot --nginx -d domain.com -d www.domain.com

UPDATE SITE
  cd /var/www/FOLDER && git pull && npm ci
  BUILD_STANDALONE=1 npm run build
  cp -r public .next/standalone/
  cp -r .next/static .next/standalone/.next/
  pm2 restart APPNAME

VIEW LOGS
  pm2 logs APPNAME
```
