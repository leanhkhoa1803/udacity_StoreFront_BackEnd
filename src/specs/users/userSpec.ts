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
});
