import { VercelRequest, VercelResponse } from '@vercel/node';
import { sql } from '@vercel/postgres';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // GET: En yüksek 10 skoru getir
  if (req.method === 'GET') {
    try {
      const { rows } = await sql`
        SELECT player_name, score, created_at 
        FROM leaderboard 
        ORDER BY score DESC 
        LIMIT 10
      `;
      return res.status(200).json(rows);
    } catch (error) {
      return res.status(500).json({ error: 'Liderlik tablosu alınamadı.' });
    }
  }

  // POST: Yeni skor kaydet
  if (req.method === 'POST') {
    const { player_name, score } = req.body;
    if (!player_name || score === undefined) {
      return res.status(400).json({ error: 'Eksik bilgi.' });
    }

    try {
      await sql`
        INSERT INTO leaderboard (player_name, score) 
        VALUES (${player_name}, ${score})
      `;
      return res.status(201).json({ message: 'Skor başarıyla kaydedildi.' });
    } catch (error) {
      return res.status(500).json({ error: 'Skor kaydedilemedi.' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
