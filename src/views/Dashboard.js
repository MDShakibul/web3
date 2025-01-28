import React, { useEffect, useState } from 'react';
import footer_bg from "../assets/img/footer_bg.png";
import banner_bg2 from "../assets/img/banner_bg2.png";
import token_bg from "../assets/img/token_bg.png";
import HOqvV8i from "../assets/img/HOqvV8i.png";
import Header from '../component/Header';
import api from '../util/api';
import { formatDate } from '../util/interact';

const Dashboard = () => {
    const [ownReferCode, setOwnReferCode] = useState(() => localStorage.getItem('refer_code') || '');
    const [address, setAddress] = useState(() => localStorage.getItem('wallet_address') || '');
    const [referredUsers, setReferredUsers] = useState([]);

    useEffect(()=>{
        setOwnReferCode(localStorage.getItem('refer_code'))
        setAddress(localStorage.getItem('wallet_address'))
    },[]);

    useEffect(() => {
        const fetchTokenTransfer = async () => {
          try {
            const res = await api.get("/referred_user", {
              params: { refer_code: ownReferCode }, // Pass address as a query parameter
            });
            /* console.log(res?.data); */
            console.log('referd users ')
            setReferredUsers(res?.data?.referred_users)
          } catch (error) {
            console.log("stories error response :: ", error);
          }
        };

          fetchTokenTransfer();
     
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [address]);


    const shareLink = (code) => {
        const shareUrl = `${window.location.origin}/?refer_code=${code}`;
        const shareText = "Refer code for join";
    
        if (navigator.share) {
          navigator
            .share({
              title: "Referral",
              text: shareText,
              url: shareUrl,
            })
            .then(() => console.log("Shared successfully"))
            .catch((error) => console.error("Error sharing:", error));
        } else {
          window.open(
            "https:google.com"
          );
        }
      };
    return (
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
        <h3>Share Link</h3>
        <p className='text-white'>{`${window.location.origin}/?refer_code=${ownReferCode}`}</p>
        <p
                        className="btn green text-white btn-radius nav_item content-popup"
                        onClick={() => {
                          shareLink(ownReferCode);
                        }}
                        id="claimButton"
                      >
                        Copy →
                      </p>

      </div>
    </div>
              <div className="col-lg-6 col-md-12 col-sm-12">
                <h3 className='text-center'>Referred User</h3>

                <table className="table table-striped" style={{ backgroundColor: 'transparent', color: '#fff' }}>
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Date</th>
      <th scope="col">Address</th>
    </tr>
  </thead>
  <tbody>
    {
      referredUsers?.length === 0 ? (
        <tr>
          <th colSpan="3"><h6 className='text-center text-danger'>No User Found</h6></th>
        </tr>
      ) : (
        referredUsers?.map((user, index) => (
          <tr key={index}>
            <th scope="row">{index + 1}</th>
            <td>{formatDate(user.created_at)}</td>
            <td>{user.wallet_address}</td>
          </tr>
        ))
      )
    }
  </tbody>
</table>


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
    );
};

export default Dashboard;