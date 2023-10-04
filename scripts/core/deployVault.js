const { deployContract, contractAt, sendTxn } = require('../shared/helpers');
const { expandDecimals } = require('../../test/shared/utilities');
const { toUsd } = require('../../test/shared/units');
const { errors } = require('../../test/core/Vault/helpers');

const network = process.env.HARDHAT_NETWORK || 'mainnet';
const tokens = require('./tokens')[network];

const VAULT_BASE_GOERLI = '0xaB1E8868FEe285cF5F379aCF61ae4D65211fc6FE';
const USDG_BASE_GOERLI = '0xba3FeA4Fe91de455164Fb9979B834ce4E11f274b';
const ROUTER_BASE_GOERLI = '0x94265f90728993A3f7089049045ceef566A36bB9';
const VAULT_PRICE_FEED_BASE_GOERLI = '0x3A9f10922eEb266f41551641140CF01B461D155c';
const FAST_PRICE_FEED_BASE_GOERLI = '';
const GLP_TESTNET = '0x688487605ebD93332756a69059324C12c1Ef5e3C';
const SHORTS_TRACKER_TESTNET = '0x49a3A5cf91DE1b78c43Dc1adD03E8A71f1Ea2e30';
const GLP_MANAGER_TESTNET = '0x05339f09375f2E74032617d4e44bd192ce596eCb';
const ERROR_CONTROLLER_TESTNET = '0xF74235f7Fd9eeFF44A78463fe72EA1B12C74EA92';
const VAULT_UTILS_TESTNET = '0x6b818C5D9104BaEC4c1C1Df599527B35bcBB2520';

const VAULT_ADDRESS = VAULT_BASE_GOERLI;
const USDG_ADDRESS = USDG_BASE_GOERLI;
const ROUTER_ADDRESS = ROUTER_BASE_GOERLI;
const VAULT_PRICE_FEED = VAULT_PRICE_FEED_BASE_GOERLI;
const FAST_PRICE_FEED = FAST_PRICE_FEED_BASE_GOERLI;
const GLP_ADDRESS = GLP_TESTNET;
const GLP_MANAGER = GLP_MANAGER_TESTNET;
const SHORTS_TRACKER = SHORTS_TRACKER_TESTNET;
const ERROR_CONTROLLER = ERROR_CONTROLLER_TESTNET;
const VAULT_UTILS = VAULT_UTILS_TESTNET;

async function main() {
  // const { nativeToken } = tokens;
  // const vault = await deployContract('Vault', []);
  const vault = await contractAt('Vault', VAULT_ADDRESS);
  // const usdg = await deployContract('USDD', [VAULT_ADDRESS]);
  // const usdg = await contractAt('USDD', USDG_ADDRESS);
  // const router = await deployContract('Router', [VAULT_ADDRESS, usdg.address, nativeToken.address]);
  // const router = await contractAt("Router", ROUTER_ADDRESS)
  //
  // const vaultPriceFeed = await deployContract('VaultPriceFeed', []);
  // const vaultPriceFeed = await contractAt('VaultPriceFeed', VAULT_PRICE_FEED);
  // TODO: const secondaryPriceFeed = await deployContract('FastPriceFeed', [5 * 60]);
  //
  // @note DONE - await sendTxn(
  //   vaultPriceFeed.setMaxStrictPriceDeviation(expandDecimals(1, 28)),
  //   'vaultPriceFeed.setMaxStrictPriceDeviation'
  // ); // 0.05 USD
  // @note DONE - await sendTxn(vaultPriceFeed.setPriceSampleSpace(1), 'vaultPriceFeed.setPriceSampleSpace');
  // @note DONE - await sendTxn(vaultPriceFeed.setIsAmmEnabled(false), 'vaultPriceFeed.setIsAmmEnabled');
  //
  // const glp = await deployContract('GLP', []);
  // @note DONE - await sendTxn(glp.setInPrivateTransferMode(true), 'glp.setInPrivateTransferMode');
  // const glp = await contractAt('GLP', GLP_ADDRESS);
  // const shortsTracker = await deployContract('ShortsTracker', [VAULT_ADDRESS]);
  // const glpManager = await deployContract('GlpManager', [
  //   VAULT_ADDRESS,
  //   USDG_ADDRESS,
  //   GLP_ADDRESS,
  //   SHORTS_TRACKER,
  //   15 * 60,
  // ]);
  // @note DONE - await sendTxn(glpManager.setInPrivateMode(true), 'glpManager.setInPrivateMode');
  // @note deployGlpManager.js also has these
  // TODO: await sendTxn(glp.setMinter(glpManager.address, true), "glp.setMinter")
  // TODO: await sendTxn(usdg.addVault(glpManager.address), "usdg.addVault")
  // TODO: await sendTxn(vault.setManager(glpManager.address, true), "vault.setManager")
  //
  //
  // @note DONE -await sendTxn(glp.setMinter(GLP_MANAGER, true), 'glp.setMinter');
  // @note DONE -await sendTxn(usdg.addVault(GLP_MANAGER), 'usdg.addVault(glpManager)');
  //
  // @note DONE - await sendTxn(
  //   vault.initialize(
  //     ROUTER_ADDRESS, // router
  //     USDG_ADDRESS, // usdg
  //     VAULT_PRICE_FEED, // priceFeed
  //     toUsd(2), // liquidationFeeUsd
  //     100, // fundingRateFactor
  //     100 // stableFundingRateFactor
  //   ),
  //   'vault.initialize'
  // );
  //
  // @note DONE - await sendTxn(vault.setFundingRate(60 * 60, 100, 100), 'vault.setFundingRate');
  //
  // @note DONE - await sendTxn(vault.setInManagerMode(true), 'vault.setInManagerMode');
  // @note DONE - await sendTxn(vault.setManager(GLP_MANAGER, true), 'vault.setManager');
  //
  // @note DONE - await sendTxn(
  //   vault.setFees(
  //     10, // _taxBasisPoints
  //     5, // _stableTaxBasisPoints
  //     20, // _mintBurnFeeBasisPoints
  //     20, // _swapFeeBasisPoints
  //     1, // _stableSwapFeeBasisPoints
  //     10, // _marginFeeBasisPoints
  //     toUsd(2), // _liquidationFeeUsd
  //     24 * 60 * 60, // _minProfitTime
  //     true // _hasDynamicFees
  //   ),
  //   'vault.setFees'
  // );
  //
  // const vaultErrorController = await deployContract('VaultErrorController', []);
  // @note DONE - await sendTxn(vault.setErrorController(ERROR_CONTROLLER), 'vault.setErrorController');
  // const vaultErrorController = await contractAt('VaultErrorController', ERROR_CONTROLLER);
  // @note DONE - await sendTxn(vaultErrorController.setErrors(VAULT_ADDRESS, errors), 'vaultErrorController.setErrors');
  //
  // const vaultUtils = await deployContract('VaultUtils', [VAULT_ADDRESS]);
  // @note DONE - await sendTxn(vault.setVaultUtils(VAULT_UTILS), 'vault.setVaultUtils');
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
