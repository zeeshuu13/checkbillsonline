# Deploy checkbillsonline.com on Hostinger VPS

## 1. Server requirements

- Ubuntu 22.04/24.04 with SSH access
- Node.js 20 LTS
- Nginx as reverse proxy + Certbot for HTTPS
- PM2 process manager

## 2. One-time server setup

```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs nginx certbot python3-certbot-nginx
sudo npm install -g pm2
```

## 3. Clone and configure

```bash
cd /var/www
git clone https://github.com/zeeshuu13/checkbillsonline.git checkbillsonline
cd checkbillsonline

# Create production env file
nano .env.production
```

Minimum `.env.production` contents:

```env
NODE_ENV=production
NEXT_PUBLIC_SITE_URL=https://checkbillsonline.com
# Optional API keys (site works without them — images fall back to Picsum)
# UNSPLASH_ACCESS_KEY=your_key_here
# RAZORPAY_KEY_ID=your_key_here
# RAZORPAY_KEY_SECRET=your_key_here
```

## 4. Build and start

```bash
npm ci
npm run build:hostinger
pm2 start ecosystem.config.cjs
pm2 save
pm2 startup   # follow the printed command to auto-start on reboot
```

The app runs on **port 3100** (`0.0.0.0`).

## 5. Nginx virtual host

Create `/etc/nginx/sites-available/checkbillsonline`:

```nginx
server {
    listen 80;
    server_name checkbillsonline.com www.checkbillsonline.com;

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

Enable and get SSL:

```bash
sudo ln -s /etc/nginx/sites-available/checkbillsonline /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx
sudo certbot --nginx -d checkbillsonline.com -d www.checkbillsonline.com
```

## 6. After each git pull (updates)

```bash
cd /var/www/checkbillsonline
git pull
npm ci
npm run build:hostinger
pm2 restart checkbillsonline
```

## 7. Verify deployment

- `https://checkbillsonline.com` — home page loads
- `https://checkbillsonline.com/pakistan/mepco-bill-check` — MEPCO page with bill form
- `https://checkbillsonline.com/api/bill/pk?path=mepcobill&refno=TEST` — PITC API
- `https://checkbillsonline.com/sitemap.xml` — all 425+ URLs listed

## 8. Troubleshooting

| Issue | Fix |
|-------|-----|
| 502 Bad Gateway | `pm2 status`, `pm2 logs checkbillsonline`, confirm port 3100 |
| Wrong canonical URLs | Set `NEXT_PUBLIC_SITE_URL` in `.env.production`, rebuild |
| Images not loading | Normal without `UNSPLASH_ACCESS_KEY` — Picsum fallback is active |
| PITC bill lookup fails | Check outbound HTTPS from VPS: `curl -I https://bill.pitc.com.pk/mepcobill` |
