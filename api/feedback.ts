import { VercelRequest, VercelResponse } from '@vercel/node';
import { sql } from '@vercel/postgres';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'POST') {
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ error: 'Mesaj boş olamaz.' });
    }

    try {
      await sql`
        INSERT INTO feedback (message) 
        VALUES (${message})
      `;
      return res.status(201).json({ message: 'Geri bildirim alındı.' });
    } catch (error) {
      return res.status(500).json({ error: 'Geri bildirim kaydedilemedi.' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
