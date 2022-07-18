import { assert } from "chai";
import { ethers } from "ethers";
import fs from "fs";
import solc from "solc";

describe('Ethers - Deploy a Contract', function () {
  let alice = {
    "address": "0xf24FF3a9CF04c71Dbc94D0b566f7A27B94566cac",
    "pk": "0x5fb92d6e98884f76de468fa3f6278f8807c48bebc13595d45af5bdc4da702133",
  }

  // Define network configurations
  const providerRPC = {
    dev: {
      name: 'moonbeam-development',
      rpc: 'http://127.0.0.1:9933',
      chainId: 1281, // 0x501 in hex,
    },
  };
  // Create ethers provider
  const provider = new ethers.providers.StaticJsonRpcProvider(
    providerRPC.dev.rpc,
    {
      chainId: providerRPC.dev.chainId,
      name: providerRPC.dev.name,
    }
  );

  const compileContract = () => {
    const source = fs.readFileSync('contracts/Incrementer.sol', 'utf8');
    const input = {
      language: 'Solidity',
      sources: {
        'Incrementer.sol': {
          content: source,
        },
      },
      settings: {
        outputSelection: {
          '*': {
            '*': ['*'],
          },
        },
      },
    };

    const tempFile = JSON.parse(solc.compile(JSON.stringify(input)));
    const contractFile = tempFile.contracts['Incrementer.sol']['Incrementer'];

    return contractFile;
  }

  const deployContract = async (abi, bytecode) => {
    let wallet = new ethers.Wallet(alice.pk, provider);

    const incrementer = new ethers.ContractFactory(abi, bytecode, wallet);
    const contract = await incrementer.deploy([5]);
    
    return contract;
  }

  describe('Compile Contract - compile.js', async () => {
    it('should compile the contract into bytecode', async () => {
      const contractFile = compileContract();
      const bytecode = contractFile.evm.bytecode.object;

      assert.exists(bytecode);
    });

    it('should return the correct number of ABI inputs', async () => {
      const contractFile = compileContract();
      const abi = contractFile.abi;

      assert.lengthOf(abi, 4);
    })
  });

  describe('Deploy Contract - deploy.js', async () => {
    it('should deploy the contract', async () => {
      const contractFile = compileContract();
      const bytecode = contractFile.evm.bytecode.object;
      const abi = contractFile.abi;

      const contract = await deployContract(abi, bytecode);
      const res = await (await contract.deployed()).deployTransaction.wait();

      assert.equal(res.status, 1);
    }).timeout(15000);
  })

  describe('Get Contract - get.js', async () => {
    it('should return the initial incrementer number', async () => {
      const contractFile = compileContract();
      const bytecode = contractFile.evm.bytecode.object;
      const abi = contractFile.abi;

      const contract = await deployContract(abi, bytecode);
      const contractAddress = contract.address;

      const wallet = new ethers.Wallet(alice.pk, provider);
      const incrementer = new ethers.Contract(contractAddress, abi, wallet);

      const data = await incrementer.number();

      assert.equal(data.toString(), "5");
    })
  })

  describe('Increment Contract - increment.js', async () => {
    it('should return the incremented number', async () => {
      const contractFile = compileContract();
      const bytecode = contractFile.evm.bytecode.object;
      const abi = contractFile.abi;
  
      const contract = await deployContract(abi, bytecode);
      const contractAddress = contract.address;

      const wallet = new ethers.Wallet(alice.pk, provider);
      const incrementer = new ethers.Contract(contractAddress, abi, wallet);

      await (await incrementer.increment(2)).wait();
      const data = await incrementer.number();

      assert.equal(data.toString(), "7");
    }).timeout(15000)
  })

  describe('Reset Contract - reset.js', async () => {
    it('should return the reset number', async () => {
      const contractFile = compileContract();
      const bytecode = contractFile.evm.bytecode.object;
      const abi = contractFile.abi;
  
      const contract = await deployContract(abi, bytecode);
      const contractAddress = contract.address;

      const wallet = new ethers.Wallet(alice.pk, provider);
      const incrementer = new ethers.Contract(contractAddress, abi, wallet);

      await (await incrementer.reset()).wait();
      const data = await incrementer.number();

      assert.equal(data.toString(), "0");
    }).timeout(15000)
  })
});