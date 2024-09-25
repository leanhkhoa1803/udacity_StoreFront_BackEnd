import UserModel from '../../models/user.model';
import User from '../../types/user.type';
import db from '../../database';

const userModel = new UserModel();

describe('User CRUD', () => {
  describe('Methods exists', () => {
    it('Get All Users', () => {
      expect(userModel.getUsers).toBeDefined;
    });
    it('Get user by id', () => {
      expect(userModel.findUser).toBeDefined;
    });
    it('Create user', () => {
      expect(userModel.create).toBeDefined;
    });
    it('Update Users', () => {
      expect(userModel.update).toBeDefined;
    });
    it('Delete Users', () => {
      expect(userModel.deleteUser).toBeDefined;
    });
  });

  // describe('Test Login', () => {
  //   const user = {
  //     email: 'khoa@gmail.com',
  //     user_name: 'khoala8',
  //     first_name: 'khoa',
  //     last_name: 'le',
  //   } as User;

  //   afterAll(async () => {
  //     const connection = await db.connect();
  //     const sql = `DELETE FROM users`;
  //     await connection.query(sql);
  //     connection.release();
  //   });

  //   it('Create User should return a new user', async () => {
  //     const creareUser = await userModel.create({
  //       email: 'khoa@gmail.com',
  //       user_name: 'khoala8',
  //       first_name: 'khoa',
  //       last_name: 'le',
  //       password: '123',
  //     } as User);

  //     user.id = creareUser.id;
  //     expect(creareUser).toEqual(user);
  //   });

  //   it('Get All user', async () => {
  //     const users = await userModel.getUsers();
  //     expect(users.length).toBe(1);
  //   });

  //   it('Find one user', async () => {
  //     const findUser = await userModel.findUser(user?.id as string);

  //     expect(findUser?.email).toBe(user.email);
  //     expect(findUser?.user_name).toBe(user.user_name);
  //     expect(findUser?.first_name).toBe(user.first_name);
  //     expect(findUser?.last_name).toBe(user.last_name);
  //   });

  //   it('Update user', async () => {
  //     const updateUser = await userModel.update({
  //       ...user,
  //       user_name: 'test update',
  //       first_name: 'test update first_name',
  //       last_name: 'test update last_name',
  //     });

  //     expect(updateUser?.id).toBe(user.id);
  //     expect(updateUser?.email).toBe(user.email);
  //     expect(updateUser?.user_name).toBe('test update');
  //     expect(updateUser?.first_name).toBe('test update first_name');
  //     expect(updateUser?.last_name).toBe('test update last_name');
  //   });

  //   it('Delete user', async () => {
  //     const deleteUser = await userModel.deleteUser(user.id as string);
  //     expect(deleteUser.id).toBe(user.id);
  //   });
  // });
});
