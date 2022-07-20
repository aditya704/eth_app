import { useEffect, useState } from "react";
import {
  BrowserRouter,
  Routes, //replaces "Switch" used till v5
  Route,
} from "react-router-dom";
import "../App.css";
import { ethers } from "ethers";
import contract from "../contracts/NFTdemo.json";
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
//const contractAddress = "0x95d6c3Da0f7dEbcbFA973017dF41D5DEF428A066";
const contractAddress = "0x17d511852c7491260545743004FB8Db1a4C8c15e";//uzheth
//const contractAddress = "0xC2F00C4dd6b76C0Ab99a27dF45012e2DaaabBDCF"; //bscnet
const abi = contract.abi;

function Mint() {
    const [currentAccount, setCurrentAccount] = useState(null);
    const [currentValue, setCurrentValue] = useState(0);
    const [currentUri, setCurrentUri] = useState(null);

  const checkWalletIsConnected = async () => {
    const { ethereum } = window;

    if (!ethereum) {
      console.log("Make sure you have Metamask installed!");
      return;
    } else {
      console.log("Wallet exists! We're ready to go!");
    }

    const accounts = await ethereum.request({ method: "eth_accounts" });

    if (accounts.length !== 0) {
      const account = accounts[0];
      console.log("Found an authorized account: ", account);
      setCurrentAccount(account);
    } else {
      console.log("No authorized account found");
    }
  };

  const connectWalletHandler = async () => {
    const { ethereum } = window;

    if (!ethereum) {
      alert("Please install Metamask!");
    }

    try {
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      console.log("Found an account! Address: ", accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch (err) {
      console.log(err);
    }
  };
  window.ethereum
    .request({
      method: "eth_getBalance",
      params: [currentAccount],
    })
    .then((balance) => {
      // Return string value to convert it into int balance
      console.log(balance, "hhh");

      // Yarn add ethers for using ethers utils or
      // npm install ethers
      console.log(ethers.utils.formatEther(balance), "fff");
      // Format the string into main latest balance
    });
  const mintNftHandler = async (value,uri) => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const nftContract = new ethers.Contract(contractAddress, abi, signer);
        console.log(value,'value')
console.log(signer,ethers.utils.parseEther((value*0.001).toString()))
        console.log("Initialize payment");
        let nftTxn = await nftContract.safeMint(currentAccount,uri,value,{value:ethers.utils.parseEther((0.002).toString())});

        console.log("Mining... please wait");
        await nftTxn.wait();
        console.log(nftTxn);
        console.log(
          `Mined, see transaction: http://130.60.24.79:1234/tx/${nftTxn.hash}?network=UZHETH/`
        );
      } else {
        console.log("Ethereum object does not exist");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const connectWalletButton = () => {
    return (
      <button
        onClick={connectWalletHandler}
        className="cta-button connect-wallet-button"
      >
        Connect Wallet
      </button>
    );
  };

  const mintNftButton = (value,uri) => {
    return (
      <button onClick={()=>mintNftHandler(value,uri)} className="cta-button mint-nft-button">
        Mint NFT
      </button>
    );
  };

  useEffect(() => {
    checkWalletIsConnected();
  }, []);
const handleValue=(e)=>{
  setCurrentValue(e)
}
const handleUri=(e)=>{
  setCurrentUri(e)
}
  return (
    <div className="main-app">
      <h1>UZH Group11 Minting Platform</h1>
      {currentAccount ?<InputGroup className="mb-3">
      <InputGroup.Text >Enter Selling Price</InputGroup.Text>
      <Form.Control id="val" aria-label="value" placeholder="in UZHETH" onChange={(e)=>handleValue(e.target.value)} />
      <InputGroup.Text>Enter uri</InputGroup.Text>
      <Form.Control id="uri" aria-label="uri" placeholder="NFT uri" onChange={(e)=>handleUri(e.target.value)} />
    </InputGroup>:<></>}
      <div>{currentAccount ? mintNftButton(currentValue*1000000000000000,currentUri) : connectWalletButton()}</div>
    </div>
  );}

  export default Mint;
  