import supertest from 'supertest';
import User from '../../types/user.type';
import app from '../../index';
import UserModel from '../../models/user.model';
import jwt from 'jsonwebtoken';
import configEnv from '../../configEnv';
import Product from '../../types/products.type';

const userModel = new UserModel();
const request = supertest(app);
let token: string = '';

describe('Product API Endpoints', () => {
  const user = {
    email: 'testProduct@gmail.com',
    user_name: 'testProduct',
    first_name: 'testProduct',
    last_name: 'le',
    password: '123',
  } as User;

  const product = {
    name: 'ip16',
    price: 3000,
    category: 'iphone',
  } as Product;

  beforeAll(async () => {
    await userModel.create(user);
    token = jwt.sign({ user }, configEnv.TOKEN_SECRET as unknown as string);
  });

  describe('Test CRUD API methods', () => {
    it('should create product', async () => {
      const res = await request
        .post(`/api/products`)
        .set('Authorization', `Bearer ${token}`)
        .send(product);
      product.id = res.body.data.product.id;
      expect(res.status).toBe(200);
      expect(res.body.data.product.name).toBe('ip16');
      expect(res.body.data.product.price).toBe(3000);
      expect(res.body.data.product.category).toBe('iphone');
    });

    it('should get product info', async () => {
      const res = await request
        .get(`/api/products/${product.id}`)
        .set('Authorization', `Bearer ${token}`);
      expect(res.status).toBe(200);
      expect(res.body.data.product.name).toBe('ip16');
      expect(res.body.data.product.price).toBe(3000);
      expect(res.body.data.product.category).toBe('iphone');
    });

    it('should get list of products', async () => {
      const res = await request
        .get('/api/products/')
        .set('Authorization', `Bearer ${token}`);
      expect(res.status).toBe(200);
    });

    it('should update product info', async () => {
      const res = await request
        .patch(`/api/products/${product.id}`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: 'ip10',
          price: 2000,
          category: 'iphoneX',
        });
      expect(res.status).toBe(200);

      const { name, price, category } = res.body.data.updateProduct;

      expect(name).toBe('ip10');
      expect(price).toBe(2000);
      expect(category).toBe('iphoneX');
    });

    it('should delete product', async () => {
      const res = await request
        .delete(`/api/products/${product.id}`)
        .set('Authorization', `Bearer ${token}`);
      expect(res.status).toBe(200);
    });
  });
});
