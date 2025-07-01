import { config } from '@repo/jest-config/nest';
module.exports = {
  env: {
    JWT_SECRET: process.env.JWT_SECRET,
    DATABASE_URL: 'postgresql://postgres:mysecretpassword@localhost:5432/challenge_1.0?schema=public'
  },
  ...config
};
