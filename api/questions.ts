import { sql } from '@vercel/postgres';
import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(
  request: VercelRequest,
  response: VercelResponse
) {
  try {
    const { rows } = await sql`SELECT * FROM questions;`;
    
    // Veritabanından gelen verileri frontend'in beklediği formata dönüştürüyoruz
    const mappedQuestions = rows.map((q) => ({
      id: q.id,
      question_text: q.question_text,
      option_a: q.option_a,
      option_b: q.option_b,
      option_c: q.option_c,
      option_d: q.option_d,
      correct_option: q.correct_option,
      options: {
        A: q.option_a,
        B: q.option_b,
        C: q.option_c,
        D: q.option_d,
      },
    }));

    return response.status(200).json(mappedQuestions);
  } catch (error) {
    return response.status(500).json({ error: 'Sorular veritabanından çekilemedi.' });
  }
}