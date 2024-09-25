import supertest from 'supertest';
import User from '../../types/user.type';
import app from '../../index';
import UserModel from '../../models/user.model';
import jwt from 'jsonwebtoken';
import configEnv from '../../configEnv';
import Product from '../../types/products.type';
import ProductModel from '../../models/product.model';
import Order from '../../types/orders.type';

const userModel = new UserModel();
const productModel = new ProductModel();
const request = supertest(app);
let token: string = '';

describe('Orders API Endpoints', () => {
  const user = {
    email: 'testOrder@gmail.com',
    user_name: 'testOrder',
    first_name: 'testOrder',
    last_name: 'le',
    password: '123',
  } as User;

  const product = {
    name: 'mazda3',
    price: 13000,
    category: 'car',
  } as Product;

  const order = {
    quantity: 1,
    status: 'pending',
  } as Order;

  beforeAll(async () => {
    const userCreated = await userModel.create(user);
    user.id = userCreated.id;
    const productCreated = await productModel.create(product);
    product.id = productCreated.id;
    token = jwt.sign({ user }, configEnv.TOKEN_SECRET as unknown as string);
    order.product_id = product.id as string;
    order.user_id = user.id as string;
  });

  describe('Test CRUD API methods', () => {
    it('should create order', async () => {
      const res = await request
        .post(`/api/orders`)
        .set('Authorization', `Bearer ${token}`)
        .send(order);

      order.id = res.body.data.order.id;
      expect(res.status).toBe(200);
      expect(res.body.data.order.quantity).toBe(1);
      expect(res.body.data.order.status).toBe('pending');
    });

    it('should get order info', async () => {
      const res = await request
        .get(`/api/orders/${order.id}`)
        .set('Authorization', `Bearer ${token}`);
      expect(res.status).toBe(200);
      expect(res.body.data.order.quantity).toBe(1);
      expect(res.body.data.order.status).toBe('pending');
    });

    it('should get list of orders', async () => {
      const res = await request
        .get('/api/orders/')
        .set('Authorization', `Bearer ${token}`);
      expect(res.status).toBe(200);
    });

    it('should update order info', async () => {
      const res = await request
        .patch(`/api/orders/${order.id}`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          quantity: 2,
          status: 'completed',
        });
      expect(res.status).toBe(200);

      const { quantity, status } = res.body.data.updateOrder;

      expect(quantity).toBe(2);
      expect(status).toBe('completed');
    });

    it('should delete order', async () => {
      const res = await request
        .delete(`/api/orders/${order.id}`)
        .set('Authorization', `Bearer ${token}`);
      expect(res.status).toBe(200);
    });
  });
});
