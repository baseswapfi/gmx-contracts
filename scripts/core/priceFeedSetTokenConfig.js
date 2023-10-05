const {
  getFrameSigner,
  deployContract,
  contractAt,
  sendTxn,
  readTmpAddresses,
  callWithRetries,
} = require('../shared/helpers');
const { expandDecimals } = require('../../test/shared/utilities');
const { toChainlinkPrice } = require('../../test/shared/chainlink');
const { getChainAddresses } = require('../addresses');

const network = process.env.HARDHAT_NETWORK || 'mainnet';
const tokens = require('./tokens')[network];

async function main() {
  const signer = await getFrameSigner();
  const { VAULT_ADDRESS, VAULT_PRICE_FEED } = getChainAddresses(ethers.provider.network.chainId);

  const vault = await contractAt('Vault', VAULT_ADDRESS);

  const priceFeed = await contractAt('VaultPriceFeed', VAULT_PRICE_FEED);
  const priceFeedGov = await priceFeed.gov();
  const priceFeedTimelock = await contractAt('PriceFeedTimelock', priceFeedGov, signer);

  const priceFeedMethod = 'signalPriceFeedSetTokenConfig';
  // const priceFeedMethod = "priceFeedSetTokenConfig"

  console.log('vault', vault.address);
  console.log('priceFeed', priceFeed.address);
  console.log('priceFeedTimelock', priceFeedTimelock.address);
  console.log('priceFeedMethod', priceFeedMethod);

  const { usdc } = tokens;
  const tokenArr = [usdc];

  for (const token of tokenArr) {
    await sendTxn(
      priceFeedTimelock[priceFeedMethod](
        priceFeed.address, // _vaultPriceFeed
        token.address, // _token
        token.priceFeed, // _priceFeed
        token.priceDecimals, // _priceDecimals
        token.isStrictStable // _isStrictStable
      ),
      `priceFeed.${priceFeedMethod}(${token.name}) ${token.address}`
    );
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
