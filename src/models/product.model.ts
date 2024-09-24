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
      console.log((error as Error).message);
      throw new Error(`Unable to create (${product.name})`);
    }
  }
}

export default ProductModel;
