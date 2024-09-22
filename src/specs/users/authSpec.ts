import UserModel from '../../models/user.model';
import db from '../../database';
import User from '../../types/user.type';

const userModel = new UserModel();

describe('Authentication', () => {
  describe('Methods exists', () => {
    it('should have mothod', () => {
      expect(userModel.authenticate).toBeDefined();
    });
  });

  describe('Methods logic', () => {
    const user = {
      email: 'khoa@gmail.com',
      user_name: 'khoala8',
      first_name: 'khoa',
      last_name: 'le',
      password: '123',
    } as User;

    beforeAll(async () => {
      const createUser = await userModel.create(user);
      user.id = createUser.id;
    });

    afterAll(async () => {
      const connection = await db.connect();
      const sql = `DELETE FROM users`;
      await connection.query(sql);
      connection.release();
    });

    it('return user', async () => {
      const authenticatedUser = await userModel.authenticate(
        user?.email,
        user?.password as string,
      );

      expect(authenticatedUser?.email).toBe(user.email);
      expect(authenticatedUser?.user_name).toBe(user.user_name);
      expect(authenticatedUser?.first_name).toBe(user.first_name);
      expect(authenticatedUser?.last_name).toBe(user.last_name);
    });

    it('return error', async () => {
      const authenticatedUser = await userModel.authenticate(
        'fake@gmail.com',
        'fakepassword123',
      );

      expect(authenticatedUser).toBe(null);
    });
  });
});
