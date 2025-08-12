export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { code } = req.body;
  if (!code) return res.status(400).json({ success: false, error: "Missing code" });

  const tokenResp = await fetch("https://id.worldcoin.org/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Authorization": "Basic " + Buffer.from(process.env.WORLDID_CLIENT_ID + ":" + process.env.WORLDID_CLIENT_SECRET).toString("base64")
    },
    body: new URLSearchParams({
      code,
      grant_type: "authorization_code",
      redirect_uri: 'https://pixelpounders.xyz/callback.html'
    })
  });

  if (!tokenResp.ok) {
    return res.status(500).json({ success: false, error: "Token exchange failed" });
  }

  const tokenData = await tokenResp.json();
  // You can verify the ID token here with jwt library
  res.status(200).json({ success: true, tokenData });
}
