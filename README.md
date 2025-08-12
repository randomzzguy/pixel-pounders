# Pixel Pounders - World ID Integration

A countdown website with World ID authentication integration for the Pixel Pounders NFT project.

## 🚀 Quick Start

### Production Deployment (Vercel)

1. **Deploy to Vercel**
   ```bash
   npm install -g vercel
   vercel
   ```

2. **Set Environment Variables**
   In Vercel Dashboard → Project Settings → Environment Variables:
   ```
   WORLDID_CLIENT_ID=your_app_id_here
   WORLDID_CLIENT_SECRET=your_client_secret_here
   ```

3. **Custom Domain Setup**
   - Add your custom domain in Vercel
   - The redirect URI is hardcoded to: `https://pixelpounders.xyz/callback.html`

## 🔧 World ID Developer Portal Setup

1. **Create/Edit App**
   - Go to: https://developer.worldcoin.org/
   - Create new app or edit existing
   - Note your `App ID` and `Client Secret`

2. **Configure Redirect URI**
   Add this URL to your app settings:
   - **Production**: `https://pixelpounders.xyz/callback.html`

3. **App Settings**
   - **App Type**: Web App
   - **Verification Level**: Device (recommended)
   - **Action**: Custom (e.g., "connect_wallet")

## 📁 Project Structure

```
├── .env.local              # Environment variables
├── .env.example            # Environment template
├── README.md               # This file
├── vercel.json             # Vercel deployment config
├── index.html              # Main countdown page
├── callback.html           # World ID OAuth callback

├── api/
│   ├── exchange-token.js   # Token exchange endpoint
│   └── verify.js           # Verification endpoint
└── assets/                 # Static assets
```

## 🔒 Security Notes

- Never commit `.env.local` to version control
- Redirect URI is hardcoded to production URL
- HTTPS required for World ID authentication

## 🌐 URLs

### Production
- **Site**: `https://pixelpounders.xyz`
- **Callback**: `https://pixelpounders.xyz/callback.html`

## 🐛 Troubleshooting

### Common Issues

1. **403 Forbidden Error**
   - Check redirect URI in World ID Developer Portal
   - Ensure exact match: `https://pixelpounders.xyz/callback.html`
   - Wait 1-2 minutes after updating settings

2. **redirect_uri_mismatch**
   - Verify URL in Developer Portal matches hardcoded URI
   - Check for typos in domain

3. **Environment Variables**
   - Verify `.env.local` exists and has correct values
   - Check Vercel environment variables

### Debug Tools

- Check browser console for detailed logs
- Use Network tab to inspect API calls
- Verify environment variables in Vercel Dashboard

### Support

- World ID Documentation: https://docs.worldcoin.org/
- Developer Portal: https://developer.worldcoin.org/
- Community Discord: https://discord.gg/worldcoin