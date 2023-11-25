import {
  LCDClient,
  MnemonicKey,
  MsgExecuteContract,
  MsgRegisterFeeShare,
} from '@terra-money/feather.js';

async function main(): Promise<void> {
  const terra = new LCDClient({
    'phoenix-1': {
      chainID: 'phoenix-1',
      lcd: 'https://phoenix-lcd.terra.dev',
      gasAdjustment: 1.75,
      gasPrices: {
        uluna: 0.015,
      },
      prefix: 'terra',
    },
  });

  const mk = new MnemonicKey({
    mnemonic:
      '',
  });
  const wallet = terra.wallet(mk);
  const deployerAddr = 'address';
  const withdrawerAddr = 'address';

  const contractAddr =
    'address';

  // custom functions
  async function queryContract(
    terra: LCDClient,
    contractAddress: string,
    query: any
  ): Promise<any> {
    return await terra.wasm.contractQuery(contractAddress, query);
  }

  function toEncodedBinary(object: any): string {
    return Buffer.from(JSON.stringify(object)).toString('base64');
  }

  // execute and broadcast proposal
  let msg = new MsgRegisterFeeShare(
    contractAddr,
    deployerAddr,
    withdrawerAddr
  );

  // execute and broadcast proposal
  let execute = new MsgRegisterFeeShare(
    contractAddr,
    deployerAddr,
    withdrawerAddr
  );

  let executeTx = await wallet.createAndSignTx({
    msgs: [execute],
    chainID: 'phoenix-1',
  });
  const result = await terra.tx.broadcast(executeTx,'phoenix-1');
  console.log('TX', result.txhash);
  const log = JSON.parse(result.raw_log);
}

main().catch(console.error);
