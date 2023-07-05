const hre = require('hardhat');

async function main() {
  // Deploy ProductContract
  const ProductContract = await hre.ethers.getContractFactory(
    'ProductContract'
  );
  const productContract = await ProductContract.deploy();
  await productContract.deployed();

  console.log('ProductContract deployed at:', productContract.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
