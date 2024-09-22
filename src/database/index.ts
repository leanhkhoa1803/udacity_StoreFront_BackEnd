import { Pool } from 'pg';
import configEnv from '../configEnv';

const pool = new Pool({
  host: configEnv.HOST,
  port: parseInt(configEnv.DBPORT as string),
  database: configEnv.DATABASE,
  user: configEnv.USER,
  password: configEnv.PASSWORD,
});

export default pool;
