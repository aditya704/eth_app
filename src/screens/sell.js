import { useEffect, useState } from "react";
import {
  BrowserRouter,
  Routes, //replaces "Switch" used till v5
  Route,
} from "react-router-dom";
import "../App.css";
import { ethers } from "ethers";
import contract from "../contracts/UZHgroup11.json";
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Modal from 'react-bootstrap/Modal';
//const contractAddress = "0x95d6c3Da0f7dEbcbFA973017dF41D5DEF428A066";
const contractAddress = "0x17d511852c7491260545743004FB8Db1a4C8c15e";//uzheth
//const contractAddress = "0xC2F00C4dd6b76C0Ab99a27dF45012e2DaaabBDCF"; //bscnet
const abi = contract.abi;

function BuyNFT() {
    const [currentAccount, setCurrentAccount] = useState(null);
    const [currentBid, setCurrentBid] = useState(0);
    const [newSell, setNewSell] = useState(1);
    const [show, setShow] = useState(false);
    const [currentId, setCurrentId] = useState(0);
    // let dataid=[];
    // let dataprice=[];
    // let dataown=[];
    // let datauri=[];
    const [dataid, setdataid] = useState([]);
    const [datauri, setdatauri] = useState([]);
    const [dataown, setdataown] = useState([]);
    const [dataprice, setdataprice] = useState([]);
    const [fetchid, setfetchid] = useState(null);
    // const dataid = [0,1,2,3]
    // const dataval = [20,10,15,25]
    // const dataown = ['dsd','sd','sds','fhfh']
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const fetchData=async()=>{
        try {
            const { ethereum } = window;
      
            if (ethereum) {
              const provider = new ethers.providers.Web3Provider(ethereum);
              const signer = provider.getSigner();
              const nftContract = new ethers.Contract(contractAddress, abi, signer);
              console.log("Connecting ...");
              let totalSupply = await nftContract.getNFTCount();//getPrice,tokenURI,ownerOf
              
              console.log("Fetching data... please wait",totalSupply);
              //await totalSupply.wait();
              for (let ii=0;ii<totalSupply;ii++){
                console.log(dataid.length,'length',totalSupply)
                if(dataid.length<totalSupply){
                let tokenURI = await nftContract.tokenURI(ii);
                let price = await nftContract.getPrice(ii);
                let owner = await nftContract.ownerOf(ii);
                // await tokenURI.wait();
                // await price.wait();
                // await owner.wait();
                // dataid.push(ii);
                // dataprice.push(price);
                // dataown.push(owner);
                // datauri.push(tokenURI);
                setdataid(dataid=>[...dataid,ii]);
                setdataprice(dataprice=>[...dataprice,price.toNumber()]);
                setdataown(dataown=>[...dataown,owner]);
                setdatauri(datauri=>[...datauri,tokenURI]);
                console.log(ii)}
              }
              setfetchid('ok');
              console.log(dataid,dataown,dataprice,datauri)
              console.log(
                `Mined, see transaction: http://130.60.24.79:1234/tx/{nftTxn.hash}?network=UZHETH/`
              );
            } else {
              console.log("Ethereum object does not exist");
            }
          } catch (err) {
            console.log(err);
          }
    }
   
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
  const buyNFTHandler = async (value) => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const nftContract = new ethers.Contract(contractAddress, abi, signer);
        console.log(value,'value')
console.log(signer,ethers.utils.parseEther((value*0.001).toString()))
        console.log("Initialize payment");
        let nftTxn = await nftContract.buyNFT(currentAccount,currentId,newSell,{value:ethers.utils.parseEther((value).toString())});

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
      <button onClick={()=>buyNFTHandler(value,uri)} className="cta-button mint-nft-button">
        Mint NFT
      </button>
    );
  };

  useEffect(() => {
    checkWalletIsConnected();
    console.log('runned')
    
  }, [0]);

const openNftHandler=()=>{
return{

}
}
const handleBid=(e)=>{
    setCurrentBid(e)
  }
  const handleNewSell=(e)=>{
    setNewSell(e)
  }
  const handlePop=(val)=>{
    setCurrentId(val);
    handleShow()
  }
  const handleBuy=()=>{
    buyNFTHandler(currentBid);
    handleClose();
  }
  console.log(dataid,'id');
  console.log(dataid,dataown,dataprice,datauri)
  return (
    <div className="main-app">
      <h1>Buy NFT</h1>
      <button onClick={fetchData}>Display NFT</button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Buy NFT Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body><InputGroup className="mb-3">
      <InputGroup.Text>Enter Buy Price</InputGroup.Text>
      <Form.Control id="val" aria-label="value" onChange={(e)=>handleBid(e.target.value)} />
      <InputGroup.Text>Enter Sell Price</InputGroup.Text>
      <Form.Control id="uri" aria-label="uri" onChange={(e)=>handleNewSell(e.target.value)} />
    </InputGroup></Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleBuy}>
            Buy
          </Button>
        </Modal.Footer>
      </Modal>
      {currentAccount&&fetchid ? <Row xs={1} md={2} className="g-4">
      {dataid.map((_, idx) => (
        <Col>
          <Card onClick={()=>{handlePop(dataid[idx])}}>
            <Card.Img variant="top" src={datauri[idx]} />
            <Card.Body>
              <Card.Title>Price : {(dataprice[idx]).toFixed(2)} UZHETH</Card.Title>
              <Card.Text>
                Owner : {dataown[idx]}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>:<></>}
      {/* <div>{currentAccount ? mintNftButton(currentValue,currentUri) : connectWalletButton()}</div> */}
    </div>
  );}

  export default BuyNFT;
  