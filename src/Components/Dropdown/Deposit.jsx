import React, { useEffect, useState } from "react";

import click from "../Assets/click.png";
import axios from "axios";
import { toast } from "react-toastify";
import {
  bet24_Address,
  bet24_ABI,
  USDTAddress,
  USDT_Abi,
  LAR_Token_Address,
  LAR_Token_Abi,
} from "../../Utils/Contract";
// import { ThreeDots } from "react-loader-spinner";
import { SyncLoader } from "react-spinners";
import { useNavigate } from "react-router-dom/dist";
import "./AllSide.css";
import UpperHeader from "../Dash_Child/UpperHeader";
import LeftSidebar from "../Dash_Child/LeftSidebar";
import FirstSlid from "../Dash_Child/FirstSlid";
import { loadWeb3 } from "../../apis/api";
import Web3 from "web3";
import { errorMonitor } from "stream";
import { API } from "../../API";

let count1 = 0;
let count2 = 0;
let count3 = 0;
let count4 = 0;
let count5 = 0;
let count6 = 0;
let sum = 0;

function Deposit() {
  const user = sessionStorage.getItem("user");
  let ress = JSON.parse(user);
  let UserName = ress.resultusername;
  let UserId = ress.resultid;
  let [liveRate, setliveRate] = useState(0);
  let [amount, setamount] = useState(0);
  let [meticmultiplyablevalue, setmeticmultiplyablevalue] = useState(0);
  let [connected, setconnected] = useState("Wallet is locked");
  let [valueBNB, setvalueBNB] = useState(0);
  let [valueCoin, setvalueCoin] = useState(0);
  let [balanceUle, setbalanceUle] = useState(0);
  let [TrxBalance, setTrxBalance] = useState(0);
  let [spiner, setspiner] = useState(false);
  let [Live_Price, setLive_Price] = useState(0);
  const [package_plan, setpackage_plan] = useState("USDT");
  const [Wallet_Address, setWallet_Address] = useState("");

  const [loading, setloading] = useState(false);
  let navigation = useNavigate();

  const walletConnected = async () => {
    try {
      let acc = await loadWeb3();

      if (acc == "No Wallet") {
        // toast.error("No Wallet");
        setconnected("Wallet is locked");
      } else if (acc == "Wrong Network") {
        toast.error(" Wrong Network Please Connect BSc Network");
        console.log("Wrong Network Please Connect BSC Scan Network");
        setconnected("Wrong Network");
      } else {
        // setaddress(acc)
        setconnected("Wallet is Connected");
      }
    } catch (e) {
      console.log("Error While WalletConnect", e);
    }
  };

  const UleBalance = async () => {
    try {
      let acc = await loadWeb3();
      if (acc) {
        setloading(true);
        let contract = await new window.web3.eth.Contract(
          USDT_Abi,
          USDTAddress
        );
        let result = await contract.methods.balanceOf(acc).call();
        // result = parseInt(result)
        result = window.web3.utils.fromWei(result);
        setbalanceUle(result);
        let contractOf_AGC = await new window.web3.eth.Contract(
          LAR_Token_Abi,
          LAR_Token_Address
        );
        let BalanveOf_AGC = await contractOf_AGC.methods.balanceOf(acc).call();
        BalanveOf_AGC = window.web3.utils.fromWei(BalanveOf_AGC.toString());
        setTrxBalance(BalanveOf_AGC);
        setloading(false);
      }
    } catch (error) {
      setloading(false);
      console.log(error);
    }
  };

  const getLiveRate = async () => {
    try {
      setloading(true);
      let res = await axios.get("https://cnx-presale.nakshtech.info/live_rate");
      console.log("Res", res.data.data[0].usdperunit);
      setliveRate(res.data.data[0].usdperunit);
      setloading(false);
    } catch (e) {
      console.log("Erroe while calling LiveRate Api ", e);
      // setloading(false)
    }
  };

  let webSupply1 = new Web3("https://bsc-mainnet.public.blastapi.io");
  const getValue_BNB = async () => {
    try {
      let res = await API.post(`/getbetawallet`, { username: UserName });

      res = res.data.data[0][0].Wallet_Address;
      setWallet_Address(res);
      console.log("getbetawallet", res);
      if (amount != 0) {
        let web3 = window.web3;
        let contractOf = new web3.eth.Contract(
          bet24_ABI,
          bet24_Address
        );
        if (package_plan == "USDT") {
          let Amount_USDT = await contractOf.methods.getPrice(amount).call();

          Amount_USDT = window.web3.utils.fromWei(Amount_USDT[1].toString());
          setLive_Price(Amount_USDT);
        } else {
          let Amount_AGC = await contractOf.methods.getPrice(amount).call();
          Amount_AGC = window.web3.utils.fromWei(Amount_AGC[0].toString());
          setLive_Price(parseFloat(Amount_AGC).toFixed(2));
        }
      }
    } catch (e) {
      console.log("Error While Calling GetValue API", e);
    }
  };

  const encryptdata = async (payload) => {
    try {
      let res;
      // setspinner(true);
      let response = await API.get(`/getPublicKey`);
      let publicKey = response.data.publicKey;
      if (publicKey) {
        const data = JSON.stringify(payload);

        const textBuffer = new TextEncoder().encode(data);

        // Convert base64 publicKey to Uint8Array
        const binaryString = window.atob(publicKey);
        const len = binaryString.length;
        const bytes = new Uint8Array(len);
        for (let i = 0; i < len; i++) {
          bytes[i] = binaryString.charCodeAt(i);
        }

        const cryptoKey = await window.crypto.subtle.importKey(
          "spki",
          bytes,
          {
            name: "RSA-OAEP",
            hash: "SHA-256",
          },
          true,
          ["encrypt"]
        );
        const encryptedData = await window.crypto.subtle.encrypt(
          {
            name: "RSA-OAEP",
          },
          cryptoKey,
          textBuffer
        );
        // Convert encryptedData to base64
        const base64EncryptedData = btoa(
          String.fromCharCode(...new Uint8Array(encryptedData))
        );
        // setspinner(false);

        return base64EncryptedData;
      }
    } catch (e) {
      console.log("encrypt Api error:", e);
      //setspinner(false);
    }
  };

  const buyToken = async () => {
    let acc = await loadWeb3();
    if (acc == "No Wallet") {
      toast.error("No Wallet");
    } else if (acc == "Wrong Network") {
      //toast.error("Wrong Network Please Connect BSC Scan Network");
      console.log("Wrong Network Please Connect BSC Scan Network");
    } else {
      if (Wallet_Address.toUpperCase() == acc.toUpperCase())
        if (amount != 0) {
          if (package_plan == "USDT") {
            if (balanceUle < amount) {
              toast.error("Insufficiant USDT Balance");
            } else {
              setspiner(true);
              let amountValue = window.web3.utils.toWei(amount.toString());
              const gasPrice = await window.web3.eth.getGasPrice();
              const approveBlock = window.web3.eth.getBlock("latest");

              try {
                let contract = await new window.web3.eth.Contract(
                  bet24_ABI,
                  bet24_Address
                );
                let contractToken = await new window.web3.eth.Contract(
                  USDT_Abi,
                  USDTAddress
                );

                let approveCall = await contractToken.methods
                  .approve(bet24_Address, amountValue)
                  .send({
                    from: acc,
                    gasLimit: approveBlock.gasLimit,
                    gasPrice: await window.web3.eth.getGasPrice(),
                  });
                toast.success("Approved Succesfull");
                let sellCall = await contract.methods.buyWithUSDT(amount).send({
                  from: acc,
                  gasLimit: approveBlock.gasLimit,
                  gasPrice: await window.web3.eth.getGasPrice(),
                });

                let body = await encryptdata({
                  accountnumber: acc,
                  BuyType: package_plan,
                  usdamount: amount,
                  tokenamount: Live_Price,
                  trx: sellCall.transactionHash,
                });
                let res = await API.post("buycoin", {
                  encryptedData: body,
                });
                console.log("buycoin", res.data);
                toast.success("Transection Succesfull");
                if (res.data.data == "Successfully Buy") {
                  toast.success("Deposit Successfull");
                  window.location.href = "./Dashboard/Cricket/4";
                  setspiner(false);
                }
                setspiner(false);
              } catch (err) {
                console.log("error while calling fuction sell", err);
                setspiner(false);
              }
            }
          } else {
            if (TrxBalance < Live_Price) {
              toast.error("Insufficiant AGV Token ");
            } else {
              setspiner(true);
              let amountValue = window.web3.utils.toWei(amount.toString());
              const gasPrice = await window.web3.eth.getGasPrice();

              try {
                let contract = await new window.web3.eth.Contract(
                  bet24_ABI,
                  bet24_Address
                );
                let contractToken = await new window.web3.eth.Contract(
                  LAR_Token_Abi,
                  LAR_Token_Address
                );

                let approveCall = await contractToken.methods
                  .approve(bet24_Address, amountValue)
                  .send({ from: acc, gasPrice: gasPrice });
                toast.success("Approved");
                let sellCall = await contract.methods
                  .buyWithLAR(amount)
                  .send({ from: acc, gasPrice: gasPrice });
                let body = await encryptdata({
                  accountnumber: acc,
                  BuyType: package_plan,
                  usdamount: amount,
                  tokenamount: Live_Price,
                  trx: sellCall.transactionHash,
                });
                let res = await API.post("buycoin", {
                  encryptedData: body,
                });

                console.log("buycoin", res.data);
                toast.success("Transection Succesfull");
                if (res.data.data == "Successfully Buy") {
                  toast.success("Deposit Successfull");
                  window.location.href = "./Dashboard/Cricket/4";
                  setspiner(false);
                }
                setspiner(false);
              } catch (err) {
                console.log("error while calling fuction sell", err);
                setspiner(false);
              }
            }
          }
        } else {
          toast.error("Please Enter Amout First");
        }
      else {
        toast.error("Invalid Wallet address");
      }
    }

    // setloader(false)
  };

  const fifty = async (value) => {
    if (value == 10) {
      setmeticmultiplyablevalue(value);
      setamount("");
      count2 = 0;
      count3 = 0;
      count4 = 0;
      count5 = 0;
      count6 = 0;
      count1 = count1 + 1;

      sum = sum + value;
      setamount(sum);
    } else if (value == 20) {
      setmeticmultiplyablevalue(value);
      setamount("");
      count1 = 0;
      count3 = 0;
      count4 = 0;
      count5 = 0;
      count6 = 0;
      count2 = count2 + 1;

      sum = sum + value;
      setamount(sum);
      //  setamount(value * count2);
    } else if (value == 50) {
      setmeticmultiplyablevalue(value);
      setamount("");
      count1 = 0;
      count2 = 0;
      count4 = 0;
      count5 = 0;
      count6 = 0;
      count3 = count3 + 1;

      sum = sum + value;
      setamount(sum);
    } else if (value == 100) {
      count1 = 0;
      count2 = 0;
      count3 = 0;
      count5 = 0;
      count6 = 0;
      setmeticmultiplyablevalue(value);
      setamount("");
      count4 = count4 + 1;

      sum = sum + value;
      setamount(sum);
    } else if (value == 500) {
      count1 = 0;
      count2 = 0;
      count3 = 0;
      count4 = 0;
      count6 = 0;
      setmeticmultiplyablevalue(value);
      setamount("");
      count5 = count5 + 1;

      sum = sum + value;
      setamount(sum);
    } else if (value == 1000) {
      setamount("");
      setmeticmultiplyablevalue(value);
      count1 = 0;
      count2 = 0;
      count3 = 0;
      count4 = 0;
      count5 = 0;
      count6 = count6 + 1;

      sum = sum + value;
      setamount(sum);
    } else if (value == 0) {
      setamount("");
      setmeticmultiplyablevalue(value);
      count1 = 0;
      count3 = 0;
      count2 = 0;
      count4 = 0;
      count5 = 0;
      count6 = 0;
      sum = 0;
      setamount(sum);
      setvalueCoin(sum);
      setLive_Price(sum);
    }

    // setamount(value * count);
  };

  const Deposit_API = async () => {
    try {
      let body = await encryptdata({
        accountnumber: "",
        BuyType: package_plan,
        usdamount: amount,
        tokenamount: Live_Price,
        trx: "",
      });
      let res = await API.post("buycoin", {
        encryptedData: body,
      });
      console.log("Deposit_API", res);
    } catch {
      console.log("Somthing Error in Deposit_API");
    }
  };

  useEffect(() => {
    getValue_BNB();
  }, [amount, package_plan]);

  useEffect(() => {
    // getLiveRate();
    walletConnected();
    UleBalance();
  }, []);

  return (
    <div>
      {/* <Navbar data_Dashboard={"All"} /> */}
      <UpperHeader />
      <br />
      <br />
      <main class="main_root wrapper">
        <div style={{ backgroundColor: "#000" }} className="sidebar_respon">
          <LeftSidebar />
        </div>
        {/* <!-----=======body section start=======----> */}
        <div className="live_match">
          <div class="container">
            <div class="row">
              <FirstSlid />
              <div class="col-md-12 ">
                <div className="buy_main">
                  <div className="container">
                    <div className="row justify-content-center align-content-center">
                      <div className="col-md-6">
                        <div className="card buy_card">
                          {loading ? (
                            <>
                              <div className="loader rounded-4 d-flex justify-content-center align-items-center w-100 h-100 z-100 ">
                                <SyncLoader color="#fff" />
                              </div>
                            </>
                          ) : (
                            <></>
                          )}

                          <div className="card-header buy_hea">
                            <h2 className="text-white text-start buy_header_h">
                              Deposit
                            </h2>
                            <h5 className="text-white text-start">
                              Available USDT Balance : {balanceUle} USDT
                            </h5>
                            <h5 className="text-white text-start">
                              Available LAR Token Balance : {TrxBalance} LAR
                              Token
                            </h5>
                            {/* <h5 className="text-white text-start">
                              Live Rate :{" "}
                              <span>
                                <input
                                  type="text"
                                  value={`1 CNX =${liveRate} USD`}
                                  className="text-dark card_in w-50"
                                />
                              </span>{" "}
                            </h5> */}
                          </div>
                          <div className="mt-2 mb-2 d-flex justify-content-center">
                            <button
                              className={
                                package_plan == "USDT"
                                  ? "active btn input_btn"
                                  : "btn input_btn"
                              }
                              onClick={() => setpackage_plan("USDT")}
                            >
                              USDT
                            </button>
                            <button
                              className={
                                package_plan == "LARToken"
                                  ? "active btn input_btn mx-2"
                                  : "btn input_btn mx-2"
                              }
                              onClick={() => setpackage_plan("LARToken")}
                            >
                              LAR Token
                            </button>
                          </div>
                          <div className="card-body">
                            {connected == "Wallet is Connected" ? (
                              <h6
                                className="para text-start mb-2"
                                style={{ color: "white" }}
                              >
                                {connected}
                              </h6>
                            ) : (
                              <h6
                                className="para text-start"
                                style={{ color: "red" }}
                              >
                                {connected}
                              </h6>
                            )}

                            <div className="input_buy">
                              <input
                                type="text"
                                className="card_in text-dark"
                                value={amount}
                              />{" "}
                              <span className="text-white mt-2 fs-5 ms-1">
                                Amount
                              </span>
                            </div>

                            <div className="input_buy mt-3">
                              <input
                                type="text"
                                className="card_in text-dark"
                                value={Live_Price}
                              />{" "}
                              <span className="text-white mt-2 fs-5 ms-1">
                                {package_plan == "USDT" ? "USDT" : "LAR Token"}
                              </span>
                            </div>
                            <div className="input_buy mt-3">
                              <input
                                type="text"
                                className="card_in text-dark"
                                value={amount * 90}
                              />{" "}
                              <span className="text-white mt-2 fs-5 ms-1">
                                PTS
                              </span>
                            </div>
                            {/* <div className="input_buy mt-3">
                  <input type="text" className='card_in text-dark' value={valueBNB} /> <span className='text-white mt-2 fs-5 ms-1'>BNB Value</span>
                </div> */}

                            <div className="row mt-3 ">
                              <div className="col-lg-4 col-4 mb-2">
                                <button
                                  className="btn input_btn"
                                  onClick={() => {
                                    fifty(10);
                                  }}
                                >
                                  +10$
                                </button>
                              </div>
                              <div className="col-lg-4 col-4">
                                <button
                                  className="btn input_btn"
                                  onClick={() => {
                                    fifty(20);
                                  }}
                                >
                                  +20$
                                </button>
                              </div>
                              <div className="col-lg-4 col-4">
                                <button
                                  className="btn input_btn"
                                  onClick={() => {
                                    fifty(50);
                                  }}
                                >
                                  +50$
                                </button>
                              </div>
                              <div className="col-lg-4 col-4">
                                <button
                                  className="btn input_btn"
                                  onClick={() => {
                                    fifty(100);
                                  }}
                                >
                                  +100$
                                </button>
                              </div>
                              <div className="col-lg-4 col-4">
                                <button
                                  className="btn input_btn"
                                  onClick={() => {
                                    fifty(500);
                                  }}
                                >
                                  +500$
                                </button>
                              </div>
                              <div className="col-lg-4 col-4">
                                <button
                                  className="btn input_btn"
                                  onClick={() => {
                                    fifty(1000);
                                  }}
                                >
                                  +1000$
                                </button>
                              </div>
                            </div>
                            <button
                              className="btn input_btn mt-3"
                              onClick={() => {
                                fifty(0);
                              }}
                            >
                              Reset
                            </button>
                            <div
                              className="d-flex justify-content-center mt-3"
                              style={{ cursor: "pointer" }}
                            >
                              <div
                                className="buy_token"
                                onClick={() => buyToken()}
                              >
                                {spiner ? (
                                  <>
                                    <div
                                      class="spinner-border spinnerload"
                                      role="status"
                                    >
                                      <span class="visually-hidden">
                                        Loading...
                                      </span>
                                    </div>
                                  </>
                                ) : (
                                  <>
                                    <img src={click} alt="" />
                                    <h4
                                      className="text-white"
                                      onClick={() => Deposit_API()}
                                    >
                                      Deposit
                                    </h4>
                                  </>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <!-----=======body section end=========----> */}
      </main>
    </div>
  );
}

export default Deposit;
