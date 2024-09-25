import ProductModel from '../../models/product.model';

const productModel = new ProductModel();

describe('Product CRUD', () => {
  describe('Methods exists', () => {
    it('Get All Products', () => {
      expect(productModel.getProducts).toBeDefined;
    });
    it('Get Product by id', () => {
      expect(productModel.getProduct).toBeDefined;
    });
    it('Create Product', () => {
      expect(productModel.create).toBeDefined;
    });
    it('Update Product', () => {
      expect(productModel.update).toBeDefined;
    });
    it('Delete Product', () => {
      expect(productModel.deleteProduct).toBeDefined;
    });
  });
});
