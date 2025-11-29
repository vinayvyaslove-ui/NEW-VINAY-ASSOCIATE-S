import formidable from 'formidable'
import fs from 'fs'
import type { NextApiRequest, NextApiResponse } from 'next'

export const config = {
  api: {
    bodyParser: false,
  }
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') return res.status(405).end()
  const form = new formidable.IncomingForm()
  form.parse(req, (err, fields, files) => {
    if (err) {
      console.error(err)
      return res.status(500).json({ error: 'Upload error' })
    }
    // For now just return uploaded file info (store permanently in production)
    return res.status(200).json({ fields, files })
  })
}

export default handler
