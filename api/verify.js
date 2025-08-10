// api/verify.js
export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })
  try {
    const { proof, merkle_root, nullifier_hash, verification_level, action } = req.body

    // app id configured as environment variable in Vercel dashboard
    const APP_ID = process.env.WORLDID_APP_ID
    if (!APP_ID) return res.status(500).json({ error: 'Missing WORLDID_APP_ID env var' })

    const verifyResp = await fetch(`https://developer.worldcoin.org/api/v2/verify/${APP_ID}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nullifier_hash,
        merkle_root,
        proof,
        verification_level,
        action
      })
    })

    const payload = await verifyResp.json()
    if (verifyResp.ok && payload.success) {
      // PRODUCTION NOTE: Store nullifier_hash in your DB to prevent reuse (replay). See docs.
      return res.status(200).json({ success: true, payload })
    } else {
      return res.status(400).json({ success: false, payload })
    }
  } catch (err) {
    console.error(err)
    return res.status(500).json({ error: String(err) })
  }
}
