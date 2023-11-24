import { LCDClient, MnemonicKey, MsgRegisterFeeShare } from "@terra-money/feather.js";

// Prepare environment clients, accounts and wallets
const lcd = new LCDClient({
    'phoenix-1': {
        chainID: 'phoenix-1',
        lcd: 'https://terra-api.polkachu.com',
        gasAdjustment: 1.75,
        gasPrices: {
            uluna: 0.015,
        },
        prefix: 'terra',
    },
});

// add the mnemonic of the admin address
const accounts = new MnemonicKey({
    mnemonic: "seed phrase"
});
const wallet = lcd.wallet(accounts);
// admin address
const deployerAddr = mnemonic.accAddress("terra");
// withdrawer address (will receive the Luna)
const withdrawerAddr =  mnemonic.accAddress("terra");
// contract address
const contract = "address";



(async () => {
    try {
        // Submit a transaction to register the feeshare 
        let tx = await wallet.createAndSignTx({
            msgs: [new MsgRegisterFeeShare(
                contract,
                deployerAddr,
                withdrawerAddr,
            ),],
            chainID: "phoenix-1",
            memo: "Register feeshare for Contract",
        });
        let result = await lcd.tx.broadcastSync(tx, "phoenix-1");

        console.log("Transaction Hash", result.txhash)
    }
    catch (e) {
        console.log(e)
    }
})()
