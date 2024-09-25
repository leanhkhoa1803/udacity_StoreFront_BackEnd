import Product from '../types/products.type';
import db from '../database';
class ProductModel {
  async create(product: Product): Promise<Product> {
    try {
      const connection = await db.connect();
      const sql = `INSERT INTO products (name, price, category) values ($1,$2,$3) returning *`;

      const result = await connection.query(sql, [
        product.name,
        product.price,
        product.category,
      ]);

      connection.release();

      return result.rows[0];
    } catch (error) {
      throw new Error(`Unable to create (${product.name})`);
    }
  }

  async getProducts(): Promise<Product[]> {
    try {
      const connection = await db.connect();
      const sql = `SELECT * from products`;
      const result = await connection.query(sql);
      connection.release();
      return result.rows;
    } catch (error) {
      throw new Error(`Error is ${(error as Error).message}`);
    }
  }

  async getProduct(id: string): Promise<Product> {
    try {
      const connection = await db.connect();
      const sql = `SELECT * from products WHERE id = ($1)`;
      const result = await connection.query(sql, [id]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Error is ${(error as Error).message}`);
    }
  }

  async update(product: Product): Promise<Product> {
    try {
      const connection = await db.connect();
      const sql = `UPDATE products SET name = $1, price = $2, category = $3 WHERE id = ($4) RETURNING *`;
      const result = await connection.query(sql, [
        product.name,
        product.price,
        product.category,
        product.id,
      ]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Error is ${(error as Error).message}`);
    }
  }

  async deleteProduct(id: string): Promise<Product> {
    try {
      const connection = await db.connect();
      const sql = `DELETE FROM products WHERE id = ($1) RETURNING *`;
      const result = await connection.query(sql, [id]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Error is ${(error as Error).message}`);
    }
  }
}

export default ProductModel;
