import { LCDClient, MnemonicKey, MsgRegisterFeeShare } from "@terra-money/feather.js";

// Prepare environment clients, accounts and wallets
//const lcd = LCDClient.fromDefaultConfig("testnet");
const lcd = LCDClient.fromDefaultConfig("mainnet");
const mnemonic = new MnemonicKey({ mnemonic: "..." });
const deployerAddr = mnemonic.accAddress("terra");
const withdrawerAddr = mnemonic.accAddress("terra");
const wallet = lcd.wallet(mnemonic);
const contractAddr = "terra1eaxcahzxp0x8wqejqjlqaey53tp06l728qad6z395lyzgl026qkq20xj43";


(async () => {
    try {
        // Submit a transaction to register the feeshare 
        let tx = await wallet.createAndSignTx({
            msgs: [new MsgRegisterFeeShare(
                contractAddr,
                deployerAddr,
                withdrawerAddr,
            )],
            chainID: "phoenix-1",
            memo: "Registering feeshare #TerraDevs",
        });
        let result = await lcd.tx.broadcastSync(tx, "test-1");

        console.log("Transaction Hash", result.txhash)
    }
    catch (e) {
        console.log(e)
    }
})()
