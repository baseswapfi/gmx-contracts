import { ethers } from 'hardhat';
import { deployContract, deployTokenManager, deployVault, deployVaultPriceFeed } from '../test/shared/fixtures';
import { expandDecimals } from '../test/shared/utilities';
import { sendTxn } from './shared/helpers';

const VAULT = '';
const VAULT_PRICE_FEED = '';
const USDG = '';
const WETH = '0x4200000000000000000000000000000000000006'; // TODO: WETH?
const SHORTS_TRACKER = '';
const GLP = '';
const GLP_MANAGER = '';
const ORDER_BOOK = '';
const ROUTER = '';
const POSITION_UTILS = '';
const FAST_PRICE_EVENTS = '';
const TOKEN_MANAGER = '';

async function main() {
  try {
    const signer = (await ethers.getSigners())[0];
  } catch (error) {
    console.error(error);
    process.exitCode = 1;
  }
}

main();
