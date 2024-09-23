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

import { useEffect, useState } from "react";
import Swal from 'sweetalert2';
import axios from "axios";
import { Link } from "react-router-dom";
import Header from "../component/Header";
import { useNavigate } from "react-router-dom";
import api from "../util/api";

function LogIn() {
    const [walletAddress, setWalletAddress] = useState("");
    const navigate = useNavigate();
  
    // Function to handle login
    const handleLogin = async (e) => {
      e.preventDefault();
  
      if (!walletAddress) {
        Swal.fire({
          icon: "error",
          title: "Input Required",
          text: "Please enter a wallet address.",
        });
        return;
      }


  
      try {
        const response = await api.post("/login", {
          address:walletAddress,
        });
  
        const data = response.data;
  
        if (data.success) {
          localStorage.setItem("wallet_address", walletAddress);
          localStorage.setItem("refer_code", data?.refer_code);
         /*  Swal.fire({
            icon: "success",
            title: "Login Successful",
            text: "Redirecting to the dashboard...",
          }); */
          navigate("/dashboard"); // Redirect to dashboard page
        } else {
          // If API returns false, log the error
          console.error("Login failed: Invalid wallet address");
          Swal.fire({
            icon: "error",
            title: "Login Failed",
            text: "Invalid wallet address. Please try again.",
          });
        }
      } catch (error) {
        console.error("Error logging in:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Something went wrong. Please try again later.",
        });
      }
    };

  return (
    <>
      <div className="v_dark loaded" data-spy="scroll" data-offset="110">
        <div className="parallax-mirror div1-4">
          <img className="parallax-slider img1-4" src={token_bg} alt="Token background" />
        </div>
        <div className="parallax-mirror div1-5">
          <img className="parallax-slider img1-5" src={banner_bg2} alt="Banner background" />
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

        <Header/>

        <section id="home_section" className="section_banner bg_black_dark" data-z-index="1" data-parallax="scroll" data-image-src={banner_bg2}>
          <div className="container">
            <div className="row align-items-center">
            <div className="col-lg-6 col-md-12 col-sm-12">
      <div className="container-fluid h-custom">
        <form onSubmit={handleLogin}>
          <div className="form-outline mb-4">
            <label className="form-label" htmlFor="form3Example3">Wallet Address</label>
            <input
              type="text"
              id="form3Example3"
              className="form-control form-control-lg"
              placeholder="Enter a wallet address"
              style={{ backgroundColor: "transparent", color: "#fff" }}
              value={walletAddress}
              onChange={(e) => setWalletAddress(e.target.value)} // Update state when typing
            />
          </div>

          <div className="text-center text-lg-start mt-4 pt-2">
            <button type="submit" className="btn green text-white btn-radius nav_item content-popup" style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }}>
              Login
            </button>
            <p className="small fw-bold mt-2 pt-1 mb-0">Don't have an account? <a href="#!" className="link-danger">Register</a></p>
          </div>
        </form>
      </div>
    </div>
              <div className="col-lg-6 col-md-12 col-sm-12">
                <div className="banner_image_right res_md_mb_50 res_xs_mb_30">
                  <img id="central-image" alt="banner_vector2" src={HOqvV8i} />
                </div>
              </div>
            </div>
          </div>
        </section>

        <footer>
          <div className="top_footer" data-z-index="1" data-parallax="scroll" data-image-src={footer_bg}>
          </div>
          <div className="bottom_footer">
            <div className="container">
              <div className="row">
                <div className="col-md-6">
                  <p className="copyright" id="company">
                    Binance Web3 © {new Date().getFullYear()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </footer>

        <a href="#" className="scrollup green" style={{ display: "none" }}>⇧</a>
      </div>
    </>
  );
}

export default LogIn;
