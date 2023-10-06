const { deployContract, contractAt, sendTxn, writeTmpAddresses } = require('../shared/helpers');
const { expandDecimals } = require('../../test/shared/utilities');

const network = process.env.HARDHAT_NETWORK || 'mainnet';
const tokens = require('./tokens')[network];

async function main() {
  const { nativeToken } = tokens;

  // const orderBook = await deployContract('OrderBook', []);
  const orderBook = await contractAt('OrderBook', '0x96E73B10d0f4b7180c7C89456E984dFF6C73EB3f');

  // Arbitrum mainnet addresses
  await sendTxn(
    orderBook.initialize(
      '0x94265f90728993A3f7089049045ceef566A36bB9', // router
      '0xaB1E8868FEe285cF5F379aCF61ae4D65211fc6FE', // vault
      nativeToken.address, // weth
      '0xba3FeA4Fe91de455164Fb9979B834ce4E11f274b', // usdg
      '10000000000000000', // _minExecutionFee 0.01 Native ETH/AVAX
      expandDecimals(10, 30) // min purchase token amount usd
    ),
    'orderBook.initialize'
  );

  writeTmpAddresses({
    orderBook: orderBook.address,
  });
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
