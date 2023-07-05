const { expect } = require('chai');
const { ethers, waffle } = require('hardhat');

describe('ProductContract', () => {
  let productContractInstance;
  let accounts;

  beforeEach(async () => {
    accounts = await ethers.getSigners();

    const ProductContract = await ethers.getContractFactory('ProductContract');
    productContractInstance = await ProductContract.deploy();
    await productContractInstance.deployed();
  });

  describe('publishProduct', () => {
    it('should publish a new product', async () => {
      const productName = 'Test Product';
      const imageUrl = 'https://example.com/image.png';

      await productContractInstance.publishProduct(productName, imageUrl);

      const productsByManufacturer =
        await productContractInstance.getProductsByManufacturer(
          accounts[0].address
        );
      const productsByFranchisee =
        await productContractInstance.getProductsByFranchisee(
          accounts[0].address
        );

      expect(productsByManufacturer.length).to.equal(1);
      expect(productsByManufacturer[0].name).to.equal(productName);
      expect(productsByManufacturer[0].imageUrl).to.equal(imageUrl);

      expect(productsByFranchisee.length).to.equal(1);
      expect(productsByFranchisee[0].name).to.equal(productName);
      expect(productsByFranchisee[0].imageUrl).to.equal(imageUrl);
    });
  });

  // Add more test cases for other functions if needed
});
