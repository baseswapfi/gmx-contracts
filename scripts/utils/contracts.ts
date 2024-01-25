import { ethers } from 'hardhat';
import {
  FastPriceEvents__factory,
  FastPriceFeed__factory,
  GlpManager__factory,
  MintableBaseToken__factory,
  PositionRouter__factory,
  PositionUtils__factory,
  PriceFeed__factory,
  ReferralReader__factory,
  ReferralStorage__factory,
  RewardDistributor__factory,
  RewardRouterV2__factory,
  RewardTracker__factory,
  Router__factory,
  ShortsTracker__factory,
  TimeDistributor__factory,
  TokenManager__factory,
  Token__factory,
  USDD__factory,
  VaultPriceFeed__factory,
  Vault__factory,
  YieldTracker__factory,
} from '../../typechain';
import { sendTxn } from '../../scripts/shared/helpers';

export async function deployContract(name: string, args: any[], options = {}, libraries = {}) {
  const contractFactory = await ethers.getContractFactory(name, {
    libraries: {
      ...libraries,
    },
  });
  const contract = await contractFactory.deploy(...args, options);

  await contract.deployTransaction.wait();
  console.info(`Deploying ${name} ${contract.address}`);
  console.info(`${name} args: ${args.map((i) => `"${i}"`).join(' ')}`);
  console.info('... Completed!');
  console.log(`block number: ${await ethers.provider.getBlockNumber()}`);

  return contract;
}

export async function deployContractType<T>(name: string, args: any[], options = {}, libraries = {}) {
  const contractFactory = await ethers.getContractFactory(name, {
    libraries: {
      ...libraries,
    },
  });
  const contract = await contractFactory.deploy(...args, options);

  await contract.deployTransaction.wait();

  console.info(`Deploying ${name} ${contract.address}`);
  console.info(`${name} args: ${args.map((i) => `"${i}"`).join(' ')}`);
  console.info('... Completed!');
  console.log(`block number: ${await ethers.provider.getBlockNumber()}`);

  return contract as T;
}

export async function contractAt<T>(name: string, address: string) {
  const contractFactory = await ethers.getContractFactory(name);
  return (await contractFactory.attach(address)) as T;
}

// ==================== CORE ==================== //

export async function deployVault(args = []) {
  const contract = await deployContract('Vault', args);

  return Vault__factory.connect(contract.address, contract.signer);
}

export async function deployToken(args = []) {
  const contract = await deployContract('Token', args);

  return Token__factory.connect(contract.address, contract.signer);
}

export async function deployVaultPriceFeed(args = []) {
  const contract = await deployContract('VaultPriceFeed', args);

  return VaultPriceFeed__factory.connect(contract.address, contract.signer);
}

export async function deployUSDG(vault: string) {
  const contract = await deployContract('USDD', [vault]);

  return USDD__factory.connect(contract.address, contract.signer);
}

export async function deployRouter(args = []) {
  const contract = await deployContract('Router', args);

  return Router__factory.connect(contract.address, contract.signer);
}

export async function deployPositionRouter(args: any[]) {
  const positionUtils = await deployContract('PositionUtils', []);
  const contract = await deployContract(
    'PositionRouter',
    args,
    {},
    {
      PositionUtils: positionUtils.address,
    }
  );

  return PositionRouter__factory.connect(contract.address, contract.signer);
}

export async function deployPositionUtils() {
  const contract = await deployContract('PositionUtils', []);

  return PositionUtils__factory.connect(contract.address, contract.signer);
}

export async function deployGlpManager(args = []) {
  const contract = await deployContract('GlpManager', args);

  return GlpManager__factory.connect(contract.address, contract.signer);
}

export async function deployShortsTracker(vault: string) {
  const contract = await deployContract('ShortsTracker', [vault]);

  return ShortsTracker__factory.connect(contract.address, contract.signer);
}

// ==================== ORACLE ==================== //

export async function deployPriceFeed(args = []) {
  const contract = await deployContract('PriceFeed', args);

  return PriceFeed__factory.connect(contract.address, contract.signer);
}

// constructor(
//   uint256 _priceDuration,
//   uint256 _maxPriceUpdateDelay,
//   uint256 _minBlockInterval,
//   uint256 _maxDeviationBasisPoints,
//   address _fastPriceEvents,
//   address _tokenManager
// ) public {
export async function deployFastPriceFeed(args = []) {
  const contract = await deployContract('FastPriceFeed', args);

  return FastPriceFeed__factory.connect(contract.address, contract.signer);
}

export async function deployFastPriceEvents(args = []) {
  const contract = await deployContract('FastPriceEvents', args);

  return FastPriceEvents__factory.connect(contract.address, contract.signer);
}

// ==================== Referarals ==================== //

export async function deployReferrals() {
  const contract = await deployContract('ReferralStorage', []);
  const contract2 = await deployContract('ReferralReader', []);
  const referralStorage = ReferralStorage__factory.connect(contract.address, contract.signer);
  const referralReader = ReferralReader__factory.connect(contract2.address, contract2.signer);

  return {
    referralStorage,
    referralReader,
  };
}

// ==================== GMX ==================== //

// export async function deployGMX() {
//   const contract = await deployContract('DNK', []);

//   return DNK__factory.connect(contract.address, contract.signer);
// }

// export async function deployEscrowedGMX() {
//   const contract = await deployContract('EsDNK', []);

//   return EsDNK__factory.connect(contract.address, contract.signer);
// }

export async function deployGLP(args = []) {
  const contract = await deployContract('GLP', args);

  return GlpManager__factory.connect(contract.address, contract.signer);
}

// ================== STAKING ================= //

export async function deployRewardTracker(name: string, symbol: string) {
  const contract = await deployContract('RewardTracker', [name, symbol]);

  return RewardTracker__factory.connect(contract.address, contract.signer);
}

export async function deployRewardDistributor(rewardToken: string, rewardTracker: string) {
  const contract = await deployContract('RewardDistributor', [rewardToken, rewardTracker]);

  return RewardDistributor__factory.connect(contract.address, contract.signer);
}

export async function deployRewardRouterV2() {
  const contract = await deployContract('RewardRouterV2', []);

  return RewardRouterV2__factory.connect(contract.address, contract.signer);
}

export async function deployTokenManager(signers: string[]) {
  const _minAuthorizations = signers.length;
  const contract = await deployContract('TokenManager', [_minAuthorizations]);

  const tokenManager = TokenManager__factory.connect(contract.address, contract.signer);

  // const signers = [
  //   "0x45e48668F090a3eD1C7961421c60Df4E66f693BD", // Dovey
  //   "0xD7941C4Ca57a511F21853Bbc7FBF8149d5eCb398", // G
  //   "0x881690382102106b00a99E3dB86056D0fC71eee6", // Han Wen
  //   "0x2e5d207a4c0f7e7c52f6622dcc6eb44bc0fe1a13", // Krunal Amin
  //   "0x6091646D0354b03DD1e9697D33A7341d8C93a6F5", // xhiroz
  //   "0xd6D5a4070C7CFE0b42bE83934Cc21104AbeF1AD5" // Bybit Security Team
  // ]

  await sendTxn(tokenManager.initialize(signers), 'tokenManager.initialize');

  return tokenManager;
}

// export async function deployBonusGMX() {
//   const contract = await deployContract('MintableBaseToken', [`Bonus ${SYMBOL}`, `bn${SYMBOL}`, 0]);

//   return MintableBaseToken__factory.connect(contract.address, contract.signer);
// }

// ================== TOKENS ================= //

export async function deployYieldTracker(yieldToken: string) {
  const contract = await deployContract('YieldTracker', [yieldToken]);

  return YieldTracker__factory.connect(contract.address, contract.signer);
}

export async function deployTimeDistributor() {
  const contract = await deployContract('TimeDistributor', []);

  return TimeDistributor__factory.connect(contract.address, contract.signer);
}
