# FeeShare-Register
Prepare register.js
mnemonic = Your seed phrase that the admin waller used
contractAddress: The address of the deployed contract.
deployerAddress: The address of the deployer of the contract.
withdrawerAddress: An address to which the portion of the fee revenue will be sent.

# Running
```
npm init -y
npm install @terra-money/feather.js
```
Open the package.json file in a code editor and add 'type': 'module',.
```
{
  // ...
  "type": "module"
  // ...
}
```
Run code
```
node register.js
```
