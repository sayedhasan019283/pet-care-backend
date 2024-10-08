import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  port: process.env.PORT,
  node_env: process.env.NODE_ENV,
  database_url: process.env.DATABASE_URL,
  salt_round: process.env.SALT_ROUND,
  jwt_access_token: process.env.JWT_ACCESS_TOKEN,
  jwt_access_expire_in: process.env.JWT_ACCESS_EXPIRE_IN,
  payment_url: process.env.PAYMENT_URL,
  signature_key: process.env.SIGNATURE_KYE,
  store_id: process.env.STORE_ID,
  payment_verify_url: process.env.PAYMENT_VERIFY_URL,
};
