import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { FaTwitter } from "react-icons/fa";
import { FaTelegramPlane } from "react-icons/fa";
import { IoRocketOutline } from "react-icons/io5";
import { HiOutlineQuestionMarkCircle } from "react-icons/hi";
import { TbBrandLinktree } from "react-icons/tb";
import { FaMedium } from "react-icons/fa6";

import usdt from "../Images/usdt.svg";
import usdt1 from "../Images/usdt1.png";
import usdc from "../Images/usdc.png";
import eth from "../Images/eth.svg";
import eth1 from "../Images/eth1.png";
import card from "../Images/card.png";
import logorx from "../Images/logorx.svg";

import {
  StyledBtn,
  StyledButton,
  StyledText,
  ToastNotify,
} from "../components/SmallComponents/AppComponents";
import Loading from "../components/SmallComponents/loading";
import { AppContext } from "../utils";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import {
  preSaleReadFunction,
  preSaleWriteFunction,
  usdcReadFunction,
  usdcWriteFunction,
  usdtReadFunction,
  usdtWriteFunction,
} from "../ConnectivityAssets/hooks";
import { formatUnits, parseUnits } from "viem";
import { preSaleAddress } from "../ConnectivityAssets/environment";
import { fetchBalance } from "wagmi/actions";

function formatNumberWithCommas(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function HeroSection() {
  const matches = useMediaQuery("(max-width:950px)");
  const { open } = useWeb3Modal();
  const { account } = useContext(AppContext);
  const [token, setToken] = useState("ETH");
  const [progress, setProgress] = useState(0);
  const [loading, setloading] = useState();
  const [currentPresaleID, setCurrentPresaleID] = useState("");
  const [enteredAmount, setEnteredAmount] = useState("");
  const [enterToken, setEnterToken] = useState("");
  const [callFunction, setCallFunction] = useState(false);
  const [totalRaised, setTotalRaised] = useState(0);
  const [nextStagePrice, setNextStagePrice] = useState(0);
  const [usdtSoldHardcap, setusdtSoldHardcap] = useState(0);
  const [soldToken, setSoldToken] = useState(0);
  const [tokenSoldHardcap, settokenSoldHardcap] = useState(0);
  const [tokenPrice, setTokenPrice] = useState(0);
  const [balance, setBalance] = useState(0);

  const [isButtonClicked, setButtonClicked] = useState(true);
  const [isButtonClicked1, setButtonClicked1] = useState(false);
  const [isButtonClicked2, setButtonClicked2] = useState(false);
  const handlebgClick = () => {
    // Toggle the state when the button is clicked
    setButtonClicked(!isButtonClicked);
    setButtonClicked1(false);
    setButtonClicked2(false);
  };
  const handlebgClick1 = () => {
    // Toggle the state when the button is clicked

    setButtonClicked1(!isButtonClicked1);
    setButtonClicked(false);
    setButtonClicked2(false);
  };
  const handlebgClick2 = () => {
    // Toggle the state when the button is clicked

    setButtonClicked2(!isButtonClicked2);
    setButtonClicked(false);
    setButtonClicked1(false);
  };
  const [alertState, setAlertState] = useState({
    open: false,
    message: "",
    severity: undefined,
  });

  const showAlert = (message, severity = "error") => {
    setAlertState({
      open: true,
      message,
      severity,
    });
  };
  useEffect(() => {
    (async () => {
      try {
        let currentID = await preSaleReadFunction("currentSale");
        setCurrentPresaleID(currentID.toString());
        let presaleData = await preSaleReadFunction("presale", [currentID]);
        let priceIndollar = +formatUnits(presaleData[2].toString(), 18);

        let actualprice = 1 / priceIndollar;
        setTokenPrice(actualprice);
        let nextStagePrice = +formatUnits(presaleData[3].toString(), 18);
        let nextActualprice = 1 / nextStagePrice;
        setNextStagePrice(nextActualprice);

        let totalSoldTokens = 0,
          totalRaisedAmount = 0,
          totalTokenSOldhardcap = 0,
          totalUSDThardcap = 0;

        for (let i = 1; i <= Number(currentID.toString()); i++) {
          const [
            startTime,
            endTime,
            price,
            nextStagePrice,
            Sold,
            tokensToSell,
            UsdtHardcap,
            amountRaised,
            Active,
            isEnableClaim,
          ] = await preSaleReadFunction("presale", [i]);

          totalSoldTokens =
            totalSoldTokens + Number(formatUnits(Sold.toString(), 18));

          totalTokenSOldhardcap =
            totalTokenSOldhardcap +
            Number(formatUnits(tokensToSell.toString(), 18));

          totalRaisedAmount =
            totalRaisedAmount + Number(formatUnits(amountRaised.toString(), 6));

          totalUSDThardcap =
            totalUSDThardcap + Number(formatUnits(UsdtHardcap.toString(), 6));
          console.log(totalUSDThardcap, "totalUSDThardcap");
        }

        setSoldToken(totalSoldTokens);
        settokenSoldHardcap(totalTokenSOldhardcap);
        setTotalRaised(totalRaisedAmount);
        setusdtSoldHardcap(totalUSDThardcap);
        let progressBar = (+totalSoldTokens / +totalTokenSOldhardcap) * 100;
        setProgress(progressBar);
        console.log(progressBar, "progressBar");

        //////////////////////////////max balances/////////////////////////

        if (token === "USDT") {
          let usdtBalance = await usdtReadFunction("balanceOf", [account]);
          console.log(+formatUnits(usdtBalance.toString(), 6), "usdtBalance");
          setBalance(+formatUnits(usdtBalance.toString(), 6));
        } else {
          const { formatted } = await fetchBalance({
            address: account,
          });
          let ethBalance = +formatted - 0.0075;
          console.log(ethBalance, "ethBalance");
          setBalance(ethBalance);
        }
      } catch (error) {
        console.log(error);
      }
    })();
    setCallFunction(false);
  }, [account, callFunction, token]);

  useEffect(() => {
    (async () => {
      try {
        if (enteredAmount > 0) {
          if (token === "USDT" || token === "USDC") {
            let currentID = await preSaleReadFunction("currentSale");
            let usdtToTokens = await preSaleReadFunction("usdToTokens", [
              currentID.toString(),
              parseUnits(enteredAmount.toString(), 6),
            ]);
            console.log(
              +formatUnits(usdtToTokens.toString(), 18),
              "usdtToTokens"
            );
            setEnterToken(+formatUnits(usdtToTokens.toString(), 18));
          } else {
            let currentID = await preSaleReadFunction("currentSale");
            let ethToTokens = await preSaleReadFunction("ethToTokens", [
              currentID.toString(),
              parseUnits(enteredAmount.toString(), 18),
            ]);
            console.log(ethToTokens, "ethToTokens");
            setEnterToken(+formatUnits(ethToTokens.toString(), 18));
          }
        }
      } catch (e) {
        console.log(e);
      }
    })();
  }, [enteredAmount, token]);

  const buyHandler = async () => {
    try {
      if (!account) {
        return showAlert("Please connect your wallet");
      }
      if (!enteredAmount) {
        return showAlert("Please enter amount");
      }
      console.log(enteredAmount, token, "check");
      setloading(true);
      if (token === "USDT") {
        let allowanceusdt = await usdtReadFunction("allowance", [
          account,
          preSaleAddress,
        ]);
        console.log(+formatUnits(allowanceusdt.toString(), 6), "allowance");
        if (
          +formatUnits(allowanceusdt.toString(), 6).toString() < enteredAmount
        ) {
          await usdtWriteFunction("approve", [
            preSaleAddress,
            "999999999999999999999999999999",
          ]);
        }

        await preSaleWriteFunction("buyWithUSDT", [
          parseUnits(enteredAmount.toString(), 6).toString(),
        ]);
      }
      // else if (token === "USDC") {
      //   let allowanceusdc = await usdcReadFunction("allowance", [
      //     account,
      //     preSaleAddress,
      //   ]);
      //   console.log(+formatUnits(allowanceusdc.toString(), 6), "allowance");
      //   if (
      //     +formatUnits(allowanceusdc.toString(), 6).toString() < enteredAmount
      //   ) {
      //     await usdcWriteFunction("approve", [
      //       preSaleAddress,
      //       "999999999999999999999999999999",
      //     ]);
      //   }

      //   await preSaleWriteFunction("buyWithUSDC", [
      //     parseUnits(enteredAmount.toString(), 6).toString(),
      //   ]);
      // }
      else {
        await preSaleWriteFunction(
          "buyWithEth",
          [],
          parseUnits(enteredAmount.toString(), 18).toString()
        );
      }
      setCallFunction(true);
      setloading(false);
      setEnteredAmount(0);
      setEnterToken(0);

      setAlertState({
        open: true,
        message: "Transaction confirmed!!!",
        severity: "success",
      });
    } catch (error) {
      console.error(error);
      setloading(false);
      const errorMessage = error?.shortMessage;
      showAlert(errorMessage);
    }
  };

  // const claimHandler = async () => {
  //   try {
  //     if (!account) {
  //       return showAlert("Please connect your wallet");
  //     }
  //     setloading(true);
  //     await preSaleWriteFunction("claimMultiple");
  //     setloading(false);

  //     setAlertState({
  //       open: true,
  //       message: "claimed successfully!!!",
  //       severity: "success",
  //     });
  //   } catch (error) {
  //     setloading(false);
  //     const errorMessage = error?.shortMessage;
  //     showAlert(errorMessage);
  //   }
  // };
  return (
    <Box id="home">
      <Loading loading={loading} />
      <ToastNotify alertState={alertState} setAlertState={setAlertState} />
      <Container maxWidth="lg">
        <Grid container spacing={3} py={matches ? 4 : 4} px={!matches && 3}>
          <Grid
            item
            md={12}
            xs={12}
            justifyContent="flex-start"
            alignItems="center"
            display="flex"
            pb={matches && 2}
          >
            <Box>
              {!matches && (
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent={"center"}
                >
                  <a
                    href="https://x.com/rexas"
                    style={{ textDecoration: "none" }}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <FaTwitter
                      style={{
                        color: "#F0B90B",
                        fontSize: "25px",
                        marginRight: "23px",
                      }}
                    />
                  </a>
                  <a
                    href="https://t.me//rexas"
                    style={{ textDecoration: "none" }}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <FaTelegramPlane
                      style={{
                        color: "#F0B90B",
                        fontSize: "28px",
                        marginRight: "23px",
                      }}
                    />
                  </a>
                  <a
                    href=" https://linktr.ee/rexasfinance"
                    style={{ textDecoration: "none" }}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <TbBrandLinktree
                      style={{
                        color: "#F0B90B",
                        fontSize: "28px",
                        marginRight: "23px",
                      }}
                    />
                  </a>
                  <a
                    href="https://medium.com/@rexasfinance"
                    style={{ textDecoration: "none" }}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <FaMedium
                      style={{
                        color: "#F0B90B",
                        fontSize: "28px",
                      }}
                    />
                  </a>
                </Box>
              )}
              <Typography
                mt={1}
                sx={{
                  fontFamily: "accelerator",
                  fontSize: matches ? "28px" : "48px",
                  textAlign: "center",
                }}
              >
                <span
                  style={{
                    background: "transparent",
                    backgroundImage:
                      "linear-gradient(271.68deg, #F0B90B 0%, #E8749E 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Rexas Protocol
                </span>{" "}
              </Typography>
              <Typography
                sx={{
                  fontFamily: "Poppins",
                  fontSize: matches ? "28px" : "48px",
                  textAlign: "center",
                  fontWeight: 600,
                }}
              >
                Tokenize Real World Assets Everything, Everywhere
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Typography
                  mt={3}
                  sx={{
                    fontFamily: "Poppins",
                    fontSize: "15px",
                    textAlign: "center",
                    width: matches ? "100%" : "80%",
                  }}
                >
                  Rexas Protocol is your gateway to the future of asset
                  management. Rexas empowers you to own or tokenize virtually
                  any real-world asset, from real estate and art to commodities
                  and intellectual property, on a global scale. With Rexas, you
                  gain access to a world where asset liquidity and investment
                  opportunities are boundless. Embrace the power of blockchain
                  technology to make investing more inclusive, transparent, and
                  efficient.
                </Typography>
              </Box>

              <Box
                mt={matches ? 4 : 4}
                display="flex"
                justifyContent={"center"}
              >
                <a
                  href="https://rexas.com/rexas-whitepaper.pdf"
                  target="_blank"
                  style={{ textDecoration: "none" }}
                  rel="noreferrer"
                >
                  <div className="cardBox" style={{ marginRight: "20px" }}>
                    <div className="card-animation">
                      <div className="card-content">
                        <h2
                          style={{
                            fontSize: "16px",
                            fontWeight: 500,
                            fontFamily: "Poppins",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            color: "#f0b90b",
                          }}
                        >
                          <IoRocketOutline
                            style={{
                              color: "#F0B90B",
                              fontSize: "25px",
                              marginRight: "5px",
                            }}
                          />{" "}
                          Whitepaper
                        </h2>
                      </div>
                    </div>
                  </div>
                </a>
                <a
                  href="https://rexas.com/audit/"
                  target="_blank"
                  style={{ textDecoration: "none" }}
                  rel="noreferrer"
                >
                  <div
                    className="cardBox"
                    style={{ marginRight: "20px", width: "120px" }}
                  >
                    <div
                      className="card-animation"
                      style={{
                        width: "80%",
                      }}
                    >
                      <div
                        className="card-content"
                        style={{
                          width: "115px",
                        }}
                      >
                        <h2
                          style={{
                            fontSize: "16px",
                            fontWeight: 500,
                            fontFamily: "Poppins",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            color: "#fff",
                          }}
                        >
                          Audit
                        </h2>
                      </div>
                    </div>
                  </div>
                </a>
              </Box>
              <Typography
                mt={3}
                sx={{
                  fontFamily: "Poppins",
                  fontSize: "12px",
                  textDecoration: "underline",
                  textAlign: "center",
                }}
              >
                Audited | 100% Secure & Verified
                {/* <img
                  src={audit}
                  width="100px"
                  style={{ marginLeft: "10px" }}
                  alt=""
                /> */}
              </Typography>
              {matches && (
                <Box
                  mt={2}
                  display="flex"
                  alignItems="center"
                  justifyContent={"center"}
                >
                  <a
                    href="https://x.com/rexas"
                    style={{ textDecoration: "none" }}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <FaTwitter
                      style={{
                        color: "#F0B90B",
                        fontSize: "25px",
                        marginRight: "23px",
                      }}
                    />
                  </a>
                  <a
                    href="https://t.me//rexas"
                    style={{ textDecoration: "none" }}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <FaTelegramPlane
                      style={{
                        color: "#F0B90B",
                        fontSize: "28px",
                        marginRight: "23px",
                      }}
                    />
                  </a>
                  <a
                    href=" https://linktr.ee/rexasfinance"
                    style={{ textDecoration: "none" }}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <TbBrandLinktree
                      style={{
                        color: "#F0B90B",
                        fontSize: "28px",
                        marginRight: "23px",
                      }}
                    />
                  </a>
                  <a
                    href="https://medium.com/@rexasfinance"
                    style={{ textDecoration: "none" }}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <FaMedium
                      style={{
                        color: "#F0B90B",
                        fontSize: "28px",
                      }}
                    />
                  </a>
                </Box>
              )}
            </Box>
          </Grid>
          {/* Presale stage 1 Card data  */}

          <Grid
            item
            md={12}
            xs={12}
            justifyContent="center"
            alignItems="center"
            display="flex"
          >
            <Box
              sx={{
                background:
                  "radial-gradient(60% 51.57% at 50% 50%, #F0B90B 0%, rgba(232, 116, 158, 0.5) 100%)",
                width: matches ? "100%" : "55%",
                borderRadius: matches ? "20px" : "25px",
                p: matches ? 0.5 : 1,
              }}
            >
              <Box
                pb={5}
                px={!matches && 5}
                sx={{
                  background:
                    "linear-gradient(152.97deg, rgba(65, 66, 71) 0%, rgba(27, 29, 35) 100%)",
                  borderRadius: "18px",
                  textAlign: "center",
                  border: "1px solid #2c2d32",
                }}
              >
                <>
                  <Box>
                    <Box mx={2}>
                      <Typography
                        mt={3}
                        sx={{
                          fontFamily: "Poppins",
                          fontSize: matches ? "27px" : "40px",
                          fontWeight: "700",
                          lineHeight: matches ? "37px" : "50px",
                        }}
                      >
                        <span
                          style={{
                            background: "transparent",
                            backgroundImage:
                              "linear-gradient(271.68deg, #F0B90B 0%, #E8749E 100%)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                          }}
                        >
                          Rexas{" "}
                        </span>
                        Presale <br />
                        Stage{" "}
                        <span
                          style={{
                            color: "#F0B90B",
                          }}
                        >
                          {currentPresaleID}
                        </span>
                      </Typography>
                      <Typography
                        pt={1}
                        sx={{
                          fontFamily: "Poppins",
                          fontSize: matches ? "16px" : "20px",
                          color: "#fff",
                          fontWeight: "500",
                        }}
                      >
                        1 RXS = ${parseFloat(tokenPrice).toFixed(3)}
                      </Typography>
                      <Typography
                        pb={1}
                        sx={{
                          fontFamily: "Poppins",
                          fontSize: matches ? "16px" : "20px",
                          color: "#Fff",
                          fontWeight: "500",
                        }}
                      >
                        Next Stage Price = ${" "}
                        {parseFloat(nextStagePrice).toFixed(3)}
                      </Typography>
                      {/* Progress bar */}
                      <Box
                        sx={{
                          position: "relative",
                          background: "#fff",
                          borderRadius: "20px",
                          margin: "15px 0",
                          height: 30,
                          width: "100%",
                          overflow: "hidden",
                        }}
                      >
                        <div
                          style={{
                            backgroundImage:
                              "linear-gradient(90deg, #F0B90B 0%, #E8749E 100%)",
                            display: "flex",
                            alignItems: "center",
                            borderRadius: "20px",
                            justifyContent: "center",
                            height: 30,
                            opacity: 1,
                            transition: "1s ease 0.3s",
                            width: `${+progress > 0 ? progress : 0}%`,
                            // width: "40%",
                          }}
                        ></div>
                        <Box
                          sx={{
                            position: "absolute",
                            top: 5,
                            left: matches ? "45%" : "45%",
                            color: "#000",
                            fontSize: "15px",
                            fontWeight: "500",
                          }}
                        >
                          {+progress > 0
                            ? parseFloat(progress).toFixed(2)
                            : "0.00"}
                          %
                        </Box>
                      </Box>
                      <Typography
                        sx={{
                          fontFamily: "Poppins",
                          fontSize: matches ? "16px" : "20px",
                          fontWeight: "500",
                        }}
                      >
                        USD Raised:{" "}
                        <span style={{ color: "#FFe1a9" }}>
                          $
                          {formatNumberWithCommas(
                            parseFloat(totalRaised).toFixed(0)
                          )}{" "}
                          / ${formatNumberWithCommas(usdtSoldHardcap)}
                        </span>
                      </Typography>
                      <Typography
                        pb={2}
                        sx={{
                          fontFamily: "Poppins",
                          fontSize: matches ? "16px" : "20px",
                          fontWeight: "500",
                          color: "#fff",
                        }}
                      >
                        Tokens sold:{" "}
                        <span style={{ color: "#FFe1a9" }}>
                          {formatNumberWithCommas(
                            parseFloat(soldToken).toFixed(0)
                          )}{" "}
                          / {tokenSoldHardcap.toLocaleString()}
                        </span>
                      </Typography>
                    </Box>

                    <Box
                      mx={matches ? 2 : 3}
                      display="flex"
                      justifyContent={"space-between"}
                    >
                      <Box
                        onClick={() => {
                          setToken("ETH");
                          handlebgClick();
                        }}
                        sx={{
                          width: "32%",
                          height: "44px",
                          border: "2px solid #fff",
                          borderRadius: "10px",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          cursor: "pointer",
                          background: isButtonClicked
                            ? "#F0B90B"
                            : "transparent",
                        }}
                      >
                        <img
                          src={eth}
                          width={matches ? "68px" : "78px"}
                          alt=""
                        />
                      </Box>
                      <Box
                        onClick={() => {
                          setToken("USDT");
                          handlebgClick1();
                        }}
                        sx={{
                          width: "32%",
                          height: "44px",
                          border: "2px solid #fff",

                          borderRadius: "10px",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          cursor: "pointer",
                          background: isButtonClicked1
                            ? "#F0B90B"
                            : "transparent",
                        }}
                      >
                        <img
                          src={usdt}
                          width={matches ? "68px" : "78px"}
                          alt=""
                        />
                      </Box>
                      <Button
                        href="https://rexas.com/buy-with-card/"
                        target="_blank"
                        sx={{
                          width: "32%",
                          height: "44px",
                          border: "2px solid #fff",
                          borderRadius: "10px",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          cursor: "pointer",
                          background: "transparent",
                        }}
                      >
                        <img
                          src={card}
                          width={matches ? "68px" : "78px"}
                          alt=""
                        />
                      </Button>
                    </Box>
                    {/* <Box
                      mx={matches ? 2 : 5}
                      display="flex"
                      justifyContent="space-between"
                      mt={2}
                    >
                      <Box
                        onClick={() => {
                          setToken("USDC");
                          handlebgClick2();
                        }}
                        sx={{
                          width: matches ? "46%" : "41%",
                          height: "44px",
                          border: "2px solid #fff",
                          borderRadius: "10px",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          cursor: "pointer",
                          background: isButtonClicked2
                            ? "#F0B90B"
                            : "transparent",
                        }}
                      >
                        <img
                          src={usdc1}
                          width={matches ? "68px" : "78px"}
                          alt=""
                        />
                      </Box>

                     
                    </Box> */}
                    <Box px={2}>
                      <Box py={1} textAlign="start" mt={1}>
                        <StyledText style={{ fontWeight: "400" }}>
                          Amount in{" "}
                          <span style={{ fontWeight: "700" }}>
                            {token === "USDT"
                              ? "USDT"
                              : token === "USDC"
                              ? "USDC"
                              : "ETH"}
                          </span>{" "}
                          You Pay:
                        </StyledText>
                        <Box
                          mt={1}
                          sx={{
                            bgcolor: "#E3E1E1",
                            borderRadius: "14px",
                            width: "100%",
                            height: "53px",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <input
                            style={{
                              height: "40px",
                              width: "100%",
                              fontSize: "17px",
                              fontWeight: "500",
                              textAlign: "left",
                              color: "#000000",
                              fontFamily: "Poppins",
                              backgroundColor: "transparent",
                              paddingLeft: "15px",
                              border: "none",
                              outline: "none",
                            }}
                            type="number"
                            placeholder="Enter Amount"
                            value={enteredAmount}
                            onChange={(e) => setEnteredAmount(e.target.value)}
                            name="usdt"
                            // onChange={onChangeHandler}
                          />

                          <Box display="flex" alignItems="center">
                            <StyledButton
                              width="50px"
                              onClick={() => {
                                setEnteredAmount(balance);
                              }}
                              style={{
                                borderRadius: "10px",
                                height: "38px",
                                boxShadow: "none",
                              }}
                            >
                              Max
                            </StyledButton>
                            <img
                              alt=""
                              src={
                                token === "USDT"
                                  ? usdt1
                                  : token === "USDC"
                                  ? usdc
                                  : eth1
                              }
                              style={{
                                width: "27px",
                                marginLeft: "10px",
                                marginRight: "10px",
                              }}
                            />
                          </Box>
                        </Box>

                        <Box mt={1}>
                          <StyledText style={{ fontWeight: "400" }}>
                            Amount in{" "}
                            <span style={{ fontWeight: "700" }}> RXS </span> You
                            Receive:
                          </StyledText>
                          <Box
                            mt={0.5}
                            sx={{
                              bgcolor: "#E3E1E1",
                              borderRadius: "14px",
                              width: "100%",
                              height: "53px",
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                            }}
                          >
                            <input
                              type="number"
                              style={{
                                height: "40px",
                                width: "100%",
                                fontSize: "17px",
                                fontWeight: "500",
                                textAlign: "left",
                                color: "#000000",
                                fontFamily: "Poppins",
                                backgroundColor: "transparent",
                                paddingLeft: "15px",
                                border: "none",
                                outline: "none",
                              }}
                              placeholder="0"
                              name="retik"
                              readOnly
                              value={enterToken}
                              // onChange={onChangeHandler}
                              // onChange={(e) => setEnterToken(e.target.value)}
                            />
                            <Box
                              component="img"
                              src={logorx}
                              width="37px"
                              pr={1}
                              alt=""
                            />
                          </Box>
                        </Box>
                      </Box>

                      <Box mb={1}>
                        {!account ? (
                          <StyledBtn width="100%" onClick={async () => open()}>
                            Connect Wallet
                          </StyledBtn>
                        ) : (
                          <>
                            <StyledBtn
                              width="100%"
                              onClick={() => buyHandler()}
                            >
                              Buy Now
                            </StyledBtn>
                            {/* <StyledBtn
                            width="100%"
                            onClick={() => claimHandler()}
                            style={{ marginTop: "10px" }}
                          >
                            Claim
                          </StyledBtn> */}
                          </>
                        )}
                      </Box>

                      <Box
                        mt={2}
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <Button
                          href="https://rexas.com/how-to-buy/"
                          target="_blank"
                          sx={{
                            width: "48%",
                            height: "32px",
                            border: "2px solid #4B4C59",
                            background: "#414141",
                            borderRadius: "8px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "#fff",
                            fontSize: matches ? "12px" : "14px",
                            cursor: "pointer",
                            textTransform: "capitalize",
                            "&:hover": {
                              background: "#414141",
                            },
                          }}
                        >
                          <HiOutlineQuestionMarkCircle
                            style={{ fontSize: "20px", marginRight: "7px" }}
                          />{" "}
                          How To Buy?
                        </Button>

                        <Button
                          href="https://rexas.com/win-500k/"
                          target="_blank"
                          sx={{
                            width: "48%",
                            height: "32px",
                            border: "2px solid #4B4C59",
                            background: "#414141",
                            borderRadius: "8px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "#fff",
                            fontSize: matches ? "12px" : "14px",
                            cursor: "pointer",
                            textTransform: "capitalize",
                            "&:hover": {
                              background: "#414141",
                            },
                          }}
                        >
                          <IoRocketOutline
                            style={{ fontSize: "17px", marginRight: "7px" }}
                          />{" "}
                          Win $500k
                        </Button>
                      </Box>
                      <Box display="flex" justifyContent="center" mt={2}>
                        <Button
                          href="https://rexas.com/help/"
                          target="_blank"
                          sx={{
                            width: matches ? "80%" : "60%",
                            height: "32px",
                            border: "2px solid #4B4C59",
                            background: "#414141",
                            borderRadius: "8px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "#fff",
                            fontSize: matches ? "12px" : "13px",
                            cursor: "pointer",
                            textTransform: "capitalize",
                            "&:hover": {
                              background: "#414141",
                            },
                          }}
                        >
                          <HiOutlineQuestionMarkCircle
                            style={{ fontSize: "20px", marginRight: "7px" }}
                          />{" "}
                          Getting Error here? Click here
                        </Button>
                      </Box>
                    </Box>
                  </Box>
                </>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default HeroSection;
