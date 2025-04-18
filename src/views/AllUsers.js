/* eslint-disable react-hooks/exhaustive-deps */
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

import { connectWallet, disconnectWallet, formatDate, getCurrentWalletConnected, walletAddressResize } from "../util/interact.js";

import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { BigNumber } from "ethers";
import { nftAddress } from "../constants/address";
import { tokenAddress } from "../constants/address";
import { chainId } from "../constants/address";
import api from "../util/api.js";
import $ from "jquery";
import Web3 from "web3";
import Swal from 'sweetalert2'
import Header from "../component/Header.js";


function AllUsers() {
  const [allUsers, setAllUsers] = useState([]);

      useEffect(() => {
          const fetchTokenTransfer = async () => {
            try {
              const res = await api.get("/all-users");
              /* console.log(res?.data); */
              console.log('referd users ')
              setAllUsers(res?.data?.users)
            } catch (error) {
              console.log("stories error response :: ", error);
            }
          };
  
            fetchTokenTransfer();
       
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }, []);

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

<Header setWallet={null} setStatus={null} walletAddress={null}/>
        <section
          id="home_section"
          className="section_banner bg_black_dark"
          data-z-index="1"
          data-parallax="scroll"
          data-image-src={banner_bg2}
        >
          {/* <canvas id="banner_canvas" class="transparent_effect fixed" width="2560" height="1080"></canvas> */}
          <div className="container">
            


            <table className="table table-striped table-responsive all-users-table-header" style={{ backgroundColor: 'transparent', color: '#fff' }}>
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Date</th>
                  <th scope="col">Address</th>
                  <th scope="col">Referred By</th>
                </tr>
              </thead>
              <tbody className="all-users-table-body">
                {
                  allUsers?.length === 0 ? (
                    <tr>
                      <th colSpan="4"><h6 className='text-center text-danger'>No User Found</h6></th>
                    </tr>
                  ) : (
                    allUsers?.map((user, index) => (
                      <tr key={index}>
                        <th scope="row" >{index + 1}</th> 
                        <td>{formatDate(user.created_at)}</td> 
                        <td>{user.wallet_address}</td>
                        <td>{user.referred_by ? user.referred_by : '-'}</td>
                      </tr>
                    ))
                  )
                }
              </tbody>
            </table>



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
                      Welcome to USDT Live Staking Company, a pioneering enterprise in the cryptocurrency staking sector. Our focus is on providing users with a seamless and profitable staking experience using USDT, integrated with the Metamask wallet on the Binance Smart Chain (BSC) network. Our innovative platform ensures daily staking interest ranging from a minimum of 0.7% to higher returns, catering to both small and large investors.
                    </p>

                    <h4 className="mt-3">Company Overview</h4>

                    <p
                      class="animation animated fadeInUp"
                      data-animation="fadeInUp"
                      data-animation-delay="0.4s"
                      style={{ animationDelay: "0.4s", opacity: 1 }}
                      id="subheader"
                    >
                      <strong>USDT Live Staking Company</strong> is committed to offering reliable and lucrative staking opportunities. With a current market capitalization of 15.8 billion USDT and 213.7 million USDT staked in the last seven days, we are positioned as a strong player in the cryptocurrency staking market.
                    </p>

                    <h4 className="mt-3">Investment Details</h4>

                    <ul className="text-white">
  <li><strong>Daily Staking Interest:</strong> Minimum of 0.7% to 2.8% daily, with potential for higher returns.</li>
  <li><strong>Integration with Metamask Wallet:</strong> Ensures secure and efficient transactions.</li>
  <li><strong>Binance Smart Chain (BSC):</strong> Utilizes BSC for optimal performance and low transaction costs.</li>
  <li><strong>Gas Fees:</strong> Minimal gas fees ranging from $0.02 to $0.1, payable in BNB.</li>
  <li><strong>Weekly Interest Payout:</strong> Every single day, the accumulated interest will be added to the user’s USDT wallet.</li>
</ul>


                    <h4 className="mt-3">Investment Details</h4>
                    <p
                      class="animation animated fadeInUp"
                      data-animation="fadeInUp"
                      data-animation-delay="0.4s"
                      style={{ animationDelay: "0.4s", opacity: 1 }}
                      id="subheader"
                    >
                      Minimum Staking Amount: 10 USDT
                    </p>
                    <p
                      class="animation animated fadeInUp"
                      data-animation="fadeInUp"
                      data-animation-delay="0.4s"
                      style={{ animationDelay: "0.4s", opacity: 1 }}
                      id="subheader"
                    >
                      Maximum Staking Amount: 10,000,000 USDT
                    </p>

                    <h5 className="mt-3">How It Works</h5>

                    <ul className="text-white">
  <li><strong>Deposit Funds:</strong> Users deposit USDT into their Web3-based wallet under the Binance Smart Chain network.</li>
  <li><strong>Daily Returns:</strong> Earn daily interest from a minimum of 0.7% to 2.8%, depending on market conditions and staking performance.</li>
  <li><strong>Interest Payout:</strong> Every single day, the accumulated interest will be added to the user’s USDT wallet.</li>
  <li><strong>Gas Fees:</strong> All transactions incur minimal gas fees, paid in BNB, ensuring cost-effectiveness and transparency.</li>
</ul>


                    
                    

                    
                    <h5 className="mt-3">Terms and Conditions</h5>
                    <ul className="text-white">
  <li><strong>Gas Fees:</strong> Transactions require gas fees to be paid in BNB. The gas fee ranges from $0.02 to $0.1.</li>
  <li><strong>Network:</strong> All transactions and staking activities occur on the Binance Smart Chain (BSC).</li>
  <li><strong>Staking Currency:</strong> USDT is the primary currency used for staking.</li>
  <li><strong>Metamask Wallet:</strong> All staking activities and fund transactions are managed through the Metamask wallet for enhanced security and user convenience.</li>
</ul>


                    <h5 className="mt-3">Market Performance</h5>
                    <p
                      class="animation animated fadeInUp"
                      data-animation="fadeInUp"
                      data-animation-delay="0.4s"
                      style={{ animationDelay: "0.4s", opacity: 1 }}
                      id="subheader"
                    >
                      Our company has shown robust performance with a significant market presence:
                    </p>
                    <ul className="text-white">
  <li><strong>Current Market Cap:</strong> 15.8 Billion USDT</li>
  <li><strong>Last 7 Days Staking:</strong> 213.7 million USDT staked, indicating strong and consistent staking activity.</li>
  <li><strong>Volume (24h):</strong> $13,635,339 (8.68% increase)</li>
  <li><strong>Volume/Market Cap (24h):</strong> 19.39%</li>
  <li><strong>Circulating Supply:</strong> 70,511,448 USDT</li>
  <li><strong>Total Supply:</strong> 70,511,448 USDT</li>
  <li><strong>Max. Supply:</strong> ∞</li>
  <li><strong>Fully Diluted Market Cap:</strong> $70,516,556</li>
</ul>



                    <h5 className="mt-3">Benefits to Investors</h5>
                    
                    <ul className="text-white">
  <li><strong>Consistent Returns:</strong> Investors can expect steady daily returns on their investments.</li>
  <li><strong>Secure Transactions:</strong> Integration with Metamask wallet ensures secure and hassle-free transactions.</li>
  <li><strong>Low Fees:</strong> Minimal gas fees make it cost-effective for investors.</li>
  <li><strong>Scalability:</strong> Flexible investment amounts allow for a wide range of investors to participate.</li>
  <li><strong>Weekly Payouts:</strong> Interest is accumulated daily and added to the user’s wallet every 7 days, providing regular and reliable payouts.</li>
</ul>




    <h5 className="mt-3">Conclusion</h5>

    <p
                      class="animation animated fadeInUp"
                      data-animation="fadeInUp"
                      data-animation-delay="0.4s"
                      style={{ animationDelay: "0.4s", opacity: 1 }}
                      id="subheader"
                    >
                      USDT Live Staking Company is dedicated to providing a reliable, profitable, and secure staking environment for our users. By leveraging the power of Binance Smart Chain and the security of Metamask, we ensure that our investors receive the best possible returns on their investments with minimal costs. Join us in the world of cryptocurrency staking and start earning daily interest on your USDT investments today.
                    </p>


    <h5 className="mt-3">Contact Us</h5>


    <p
                      class="animation animated fadeInUp"
                      data-animation="fadeInUp"
                      data-animation-delay="0.4s"
                      style={{ animationDelay: "0.4s", opacity: 1 }}
                      id="subheader"
                    >
                      For more information and to start investing, please visit our website or contact our support team. We look forward to helping you achieve your financial goals through innovative and secure mining solutiFor more information and to start investing, please visit our website or contact our support team. We look forward to helping you achieve your financial goals through innovative and secure staking solutions.
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
                <p className="copyright" id="company">
  Binance Web3 © {new Date().getFullYear()}
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

export default AllUsers;
