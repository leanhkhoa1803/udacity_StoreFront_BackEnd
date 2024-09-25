import supertest from 'supertest';
import db from '../../database';
import UserModel from '../../models/user.model';
import User from '../../types/user.type';
import app from '../../index';

const userModel = new UserModel();
const request = supertest(app);
let token: string = '';

describe('User API Endpoints', () => {
  const user = {
    email: 'khoala8@gmail.com',
    user_name: 'khoala8',
    first_name: 'khoa',
    last_name: 'le',
    password: '123',
  } as User;

  beforeAll(async () => {
    await userModel.create(user);
  });

  describe('Test Authenticate method', () => {
    it('should be able to authenticate to get token', async () => {
      const res = await request
        .post('/api/users/authenticate')
        .set('Content-type', 'application/json')
        .send({
          email: 'khoala8@gmail.com',
          password: '123',
        });
      expect(res.status).toBe(200);
      const { id, email, token: userToken } = res.body.data;
      user.id = id;
      expect(email).toBe('khoala8@gmail.com');
      token = userToken;
    });
  });

  describe('Test CRUD API methods', () => {
    it('should get user info', async () => {
      const res = await request
        .get(`/api/users/${user.id}`)
        .set('Authorization', `Bearer ${token}`);
      expect(res.status).toBe(200);
      expect(res.body.data.user.user_name).toBe('khoala8');
      expect(res.body.data.user.email).toBe('khoala8@gmail.com');
    });

    it('should get list of users', async () => {
      const res = await request
        .get('/api/users/')
        .set('Authorization', `Bearer ${token}`);
      expect(res.status).toBe(200);
      expect(res.body.data.users.length).toBe(1);
    });

    it('should update user info', async () => {
      const res = await request
        .patch(`/api/users/${user.id}`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          id: user.id,
          email: 'testupdate@gmail.com',
          user_name: 'testupdate',
          first_name: 'testupdate',
          last_name: 'testupdate',
          password: 'test123',
        });
      expect(res.status).toBe(200);
      console.log(res.body);

      const { email, user_name, first_name, last_name } =
        res.body.data.updateUser;

      expect(email).toBe('testupdate@gmail.com');
      expect(user_name).toBe('testupdate');
      expect(first_name).toBe('testupdate');
      expect(last_name).toBe('testupdate');
    });

    it('should delete user', async () => {
      const res = await request
        .delete(`/api/users/${user.id}`)
        .set('Authorization', `Bearer ${token}`);
      expect(res.status).toBe(200);
    });
  });
});
