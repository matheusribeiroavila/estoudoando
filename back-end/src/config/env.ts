import { z } from 'zod';

const envSchema = z.object({
  PORT: z.coerce.number().default(3000),
  TELEGRAM_BOT_TOKEN: z.string().min(1),
  GEMINI_API_TOKEN: z.string().min(1),
  FIREBASE_API_KEY: z.string().min(1),
  FIREBASE_PROJECT_ID: z.string().min(1),
  FIREBASE_APP_ID: z.string().min(1),
  FIREBASE_SENDER_ID: z.string().min(1),
  DB_URL: z.string().min(1),
  DB_NAME: z.string().min(1),
  REDIS_URL: z.string().min(1),
});

const _env = envSchema.safeParse(process.env);

if (_env.error) {
  console.log(_env.error.format());
  throw new Error('Variáveis de ambiente inválidas.');
}

const env = _env.data;

export { env };
