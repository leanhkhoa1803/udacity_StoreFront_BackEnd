import User from '../types/user.type';
import db from '../database';
import configEnv from '../configEnv';
import bcrypt from 'bcrypt';

const hashPassword = (password: string) => {
  const salt = parseInt(configEnv.SALT as string, 10);
  return bcrypt.hashSync(`${password}${configEnv.BCRYPT}`, salt);
};

class UserModel {
  async create(user: User): Promise<User> {
    try {
      const connection = await db.connect();
      const sql = `INSERT INTO users (email, user_name, first_name, last_name, password) values ($1,$2,$3,$4,$5) returning id, email,user_name,first_name,last_name`;

      const result = await connection.query(sql, [
        user.email,
        user.user_name,
        user.first_name,
        user.last_name,
        hashPassword(user.password),
      ]);

      connection.release();

      return result.rows[0];
    } catch (error) {
      console.log((error as Error).message);
      throw new Error(`Unable to create (${user.user_name})`);
    }
  }

  async getUsers(): Promise<User[]> {
    try {
      const connection = await db.connect();
      const sql = `SELECT id, email, user_name, first_name, last_name from users`;
      const result = await connection.query(sql);
      connection.release();
      return result.rows;
    } catch (error) {
      throw new Error(`Error is ${(error as Error).message}`);
    }
  }

  async findUser(id: string): Promise<User> {
    try {
      const connection = await db.connect();
      const sql = `SELECT id, email, user_name, first_name, last_name from users WHERE id = ($1)`;
      const result = await connection.query(sql, [id]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Error is ${(error as Error).message}`);
    }
  }

  async update(user: User): Promise<User> {
    try {
      const connection = await db.connect();
      const sql = `UPDATE users SET email = $1, user_name = $2, first_name = $3, last_name = $4, password = $5 WHERE id = $6 RETURNING id, email, user_name, first_name, last_name`;
      const result = await connection.query(sql, [
        user.email,
        user.user_name,
        user.first_name,
        user.last_name,
        hashPassword(user.password),
        user.id,
      ]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Error is ${(error as Error).message}`);
    }
  }

  async deleteUser(id: string): Promise<User> {
    try {
      const connection = await db.connect();
      const sql = `DELETE FROM users WHERE id = ($1) RETURNING id, email, user_name, first_name, last_name`;
      const result = await connection.query(sql, [id]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Error is ${(error as Error).message}`);
    }
  }

  async authenticate(email: string, password: string): Promise<User | null> {
    try {
      const connection = await db.connect();
      const sql = `SELECT password FROM users WHERE email=$1`;
      const result = await connection.query(sql, [email]);
      if (result.rows.length) {
        const { password: hashPassword } = result.rows[0];
        const isPassword = bcrypt.compareSync(
          `${password}${configEnv.BCRYPT}`,
          hashPassword,
        );
        if (isPassword) {
          const sql = `SELECT id, email, user_name, first_name, last_name from users WHERE email =$1`;
          const user = await connection.query(sql, [email]);
          return user.rows[0];
        }
      }
      connection.release();
      return null;
    } catch (error) {
      throw new Error(`Error is ${(error as Error).message}`);
    }
  }
}

export default UserModel;
