import dotenv from 'dotenv';

dotenv.config();

interface Config {
  port: number,
  environ: string,
}

const config: Config = {
  port: Number(process.env.PORT) || 3000,
  environ: process.env.NODE_ENV || 'development',
}

export default config;
