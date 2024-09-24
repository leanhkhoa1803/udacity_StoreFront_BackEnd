import Product from '../types/products.type';
import db from '../database';
import Order from '../types/orders.type';
class OrderModel {
  async create(order: Order): Promise<Order> {
    try {
      const connection = await db.connect();
      const sql = `INSERT INTO orders (product_id, user_id, quantity, status) values ($1,$2,$3,$4) returning *`;

      const result = await connection.query(sql, [
        order.product_id,
        order.user_id,
        order.quantity,
        order.status,
      ]);
      const orderReult = result.rows[0];
      if (result.rows[0] !== null) {
        const sqlInserOrderProduct = `INSERT INTO order_product (order_id, product_id) values ($1,$2) returning *`;

        await connection.query(sqlInserOrderProduct, [
          orderReult.id,
          orderReult.product_id,
        ]);
      }
      connection.release();

      return orderReult;
    } catch (error) {
      console.log((error as Error).message);
      throw new Error(`Unable to create order`);
    }
  }

  async getOrders(): Promise<Order[]> {
    try {
      const connection = await db.connect();
      const sql = `SELECT * from orders`;
      const result = await connection.query(sql);
      connection.release();
      return result.rows;
    } catch (error) {
      throw new Error(`Error is ${(error as Error).message}`);
    }
  }

  async getOrder(id: string): Promise<Order> {
    try {
      const connection = await db.connect();
      const sql = `SELECT * from orders WHERE id = ($1)`;
      const result = await connection.query(sql, [id]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Error is ${(error as Error).message}`);
    }
  }

  async update(order: Order): Promise<Order> {
    try {
      const connection = await db.connect();
      const sql = `UPDATE orders SET quantity = $1, status = $2 WHERE id = ($3) RETURNING *`;
      const result = await connection.query(sql, [
        order.quantity,
        order.status,
        order.id,
      ]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Error is ${(error as Error).message}`);
    }
  }

  async deleteOrder(id: string): Promise<Product> {
    try {
      const connection = await db.connect();
      const sql = `DELETE FROM orders WHERE id = ($1) RETURNING *`;
      const result = await connection.query(sql, [id]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Error is ${(error as Error).message}`);
    }
  }
}

export default OrderModel;
