
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
import "../assets/css/admin.css";

import banner_bg2 from "../assets/img/banner_bg2.png";
import token_bg from "../assets/img/token_bg.png";

import { connectWallet, getCurrentWalletConnected } from "../util/interact.js";

import { useEffect, useState } from "react";
import { BigNumber } from 'ethers';
import { nftAddress } from '../constants/address';
import { tokenAddress } from '../constants/address';
import { chainId } from '../constants/address';
import api from "../util/api.js";
import $ from "jquery";
import Web3 from 'web3'
/* const Moralis = require('moralis'); */



function AdminPage() {
  const [walletAddress, setWallet] = useState("");
  const [status, setStatus] = useState("");

  const [mint, setMint] = useState(0);
  const [tokenContracts, setTokenContracts] = useState([]);

/*   const serverUrl = "https://8mu2apptlnm4.usemoralis.com:2053/server";
  const appId = "UBjvihVqesxPw7UtpavjEQhLO6MX6fJf0PbkTWl0"; */

  // const rpcURL = "https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161";
  // const rpcURL = "https://data-seed-prebsc-1-s1.binance.org:8545";
  const rpcURL = "https://bsc-dataseed.binance.org/";
  const web3 = new Web3(rpcURL);


  useEffect(async () => {
    const { address, status } = await getCurrentWalletConnected();

    setWallet(address);
    setStatus(status);

    addStyles();

    addWalletListener();
    // getTokenContracts();
    /* Moralis.start({ serverUrl, appId }); */

  }, []);


  const addStyles = () => {
    $(window).on('scroll', function() {
      var scroll = $(window).scrollTop();
  
        if (scroll >= 80) {
            $('header').addClass('nav-fixed');
        } else {
            $('header').removeClass('nav-fixed');
        }
  
    });
    $(window).scroll(function() {
      if ($(this).scrollTop() > 150) {
        $('.scrollup').fadeIn();
      } else {
        $('.scrollup').fadeOut();
      }
    });
    
    $(".scrollup").on('click', function (e) {
      e.preventDefault();
      $('html, body').animate({
        scrollTop: 0
      }, 600);
      return false;
    });
    	//Hide Navbar Dropdown After Click On Links
    var navBar = $(".header_wrap");
    var navbarLinks = navBar.find(".navbar-collapse ul li a.nav_item");

      $.each( navbarLinks, function( i, val ) {

        var navbarLink = $(this);

          navbarLink.on('click', function () {
            navBar.find(".navbar-collapse").collapse('hide');
        $("header").removeClass("active");
          });

      });
    
    //Main navigation Active Class Add Remove
    $('.navbar-toggler').on('click', function() {
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
      })
    })
  }

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


  const registerToken = async () => {
    let tokenAddress, tokenPrice;
    let addAddr = $("#tokenAddr").val();
    addAddr = addAddr.toUpperCase();

    if (addAddr != "") {

      /* const options = {
        address: addAddr,
        chain: "bsc",
        exchange: "PancakeSwapv2",
      };

      let tokenPriceInfo = await Moralis.Web3API.token.getTokenPrice(options); */
      let tokenPriceInfo;
      await api
      .post("/token-price", {
        address: addAddr // Include the options object in the body
      })
      .then(function (res) {
        tokenPriceInfo=res?.data;
        console.log(res?.data);
      })
      .catch(function (error) {
        console.log("stories error response :: ", error);
      });
      console.log(tokenPriceInfo);
      if (tokenPriceInfo) {

        //--------------  read ---------------
        
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
          })
          .catch(function (error) {
            console.log("stories error response :: ", error);
          });

          let is = true;
          for (let i = 0; i < tokens.length; i++) {
            if (addAddr == tokens[i]) {
              alert("This token was already registered.");
              is = false;
            }
          }

          if (is == true) {
            tokens.push(addAddr.toUpperCase());
            tokenPrices.push(String(tokenPriceInfo.usdPrice));
            tokenDecimals.push(String(tokenPriceInfo.nativePrice.decimals));
  
            // --------------------------- write  ----------------------------
      
            let tokenAddr = "";
            for (let i = 0; i < tokens.length; i++) {
              tokenAddr += tokens[i] + "," + tokenPrices[i] + "," + tokenDecimals[i] + ",";
            }
            
            await api
              .post("/writeFile", {
                params: {tokenInfo: tokenAddr},
              })
              .then(function (res) {
                alert(res.data.Success)
              })
              .catch(function (error) {
                console.log("stories error response :: ", error);
              });
          }

      } else {
        alert("Please check again token address.")
      }

    } else {
      alert("Please input token address for register!")
    }

  }

  return (
    <>
      <div className="v_dark loaded" data-spy="scroll" data-offset="110" data-new-gr-c-s-check-loaded="14.1050.0" data-gr-ext-installed="">
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
          <img className="parallax-slider img1-4" src={token_bg} data-xblocker="passed" />
        </div>
        <div className="parallax-mirror div1-5">
          <img className="parallax-slider img1-5" src={banner_bg2} data-xblocker="passed" />
        </div>


        <div className="nigr" id="adsdasxczczx" style={{display: 'none'}}>
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
                  <button value="theme-lightgreen" className="lightgreen"></button>
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
        

        <section id="home_section" className="section_banner bg_black_dark" data-z-index="1" data-parallax="scroll" data-image-src={banner_bg2} style={{height: '100vh'}}>
          <div className="container">
              <div className="adminButtonDiv">
                <form class="subscribe_form animation animated fadeInUp" data-animation="fadeInUp" data-animation-delay="0.4s" style={{animationDelay: '0.4s', opacity: 1}}>
                  <input id="tokenAddr" class="input-rounded" type="text" required="" placeholder="Enter Token Address"/>
                </form>
                <div style={{height: '50px'}}></div>
                <div className="btn_group pt-2 pb-3 animation animated fadeInUp" data-animation="fadeInUp" data-animation-delay="1.4s" style={{animationDelay: '1.4s', opacity: 1}}> 
                  <a className="btn green text-white btn-radius nav_item content-popup adminButton"  onClick={() => { registerToken() }}> 
                    Register Token
                  </a> 
                </div>
              </div>
          </div>
        </section>
        
      </div>
    </>
  );
}

export default AdminPage;
