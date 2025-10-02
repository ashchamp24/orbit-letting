# Orbit Lettings – Netlify Deploy Guide

**Detected framework:** Vite (likely React/Vue/Svelte)
**Build command:** npm run build
**Publish directory:** dist

## Quick steps
1. Create a new GitHub repo (e.g. `orbitletting`).
2. Push this folder.
3. In Netlify → Add new site → Import from Git → choose your repo.
4. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
5. Deploy, then add custom domain `orbitletting.co.uk` and `www.orbitletting.co.uk`.
6. Point GoDaddy DNS:
   - A records for apex (`@`) → 75.2.60.5 and 99.83.190.102
   - CNAME for `www` → your-site-name.netlify.app
7. Enable HTTPS.