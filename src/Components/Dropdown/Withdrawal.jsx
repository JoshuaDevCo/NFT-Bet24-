import React, { useState, useEffect } from "react";
import "../Matches/./Match.css";
import Navbar from "../Header/Navbar";
import { useNavigate, useParams } from "react-router-dom";
import AllSide from "./AllSide";
import "./AllSide.css";
import { toast } from "react-hot-toast";
import { API } from "../../API";
import UpperHeader from "../Dash_Child/UpperHeader";
import LeftSidebar from "../Dash_Child/LeftSidebar";
import FirstSlid from "../Dash_Child/FirstSlid";

function Withdrawal() {
  const user = sessionStorage.getItem("user");
  let ress = JSON.parse(user);
  let uId = ress.resultusername;
  let UserId = ress.resultid;

  const [old, setData] = useState("0.00");
  const [password, setPassword] = useState("");
  const [amount, setAmount] = useState("");
  const [valueData, setValueData] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [select, setSelect] = useState("USDT");

  const connectToMetaMask = async () => {
    try {
      if (window.ethereum) {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        setInputValue(accounts[0]);
      } else {
        console.log('MetaMask not found');
      }
    } catch (error) {
      console.error(error);
    }
  }


  useEffect(() => {
    connectToMetaMask()

  }, [])

  const hendelclick = (event) => {
    let Value = event.target.value;
    setAmount(Value)
    ConverAmount(Value)
  }

  const ConverAmount = async (value) => {
    try {
      let res = await API.get(`WithdrawlConversationAmount?PtcAmount=${value}`)
      res = res.data.data[0];
      console.log("ConverAmount", res);
      setValueData(res)
    } catch (e) {
      console.log("Something Error in ConvertAmount API", e);
    }
  }


  const Live_Rate = async () => {
    try {
      let res = await API.post(`/getbetawallet`, { username: uId });
      // setExp(res.data.data[0][0].exposure)
      console.log("old", res);
      res = res.data.data[0][0].totalnetbal;
      setData(res);

    } catch (e) {
      console.log("Error While Fatch Dashboard API", e);
    }
  };


  useEffect(() => {
    Live_Rate();
  }, []);

  const encryptdata = async (payload) => {
    try {
      let res;
      // setspinner(true);
      let response = await API.get("getPublicKey");
      let publicKey = response.data.publicKey;
      if (publicKey) {
        const data = JSON.stringify(payload);

        const textBuffer = new TextEncoder().encode(data);

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
      // setspinner(false);
    }
  };


  const handleUpdatePassword = async () => {

    try {
      if (inputValue == "No Wallet") {
        toast.error("No Wallet");
        // setconnected("Wallet is locked");
      } else if (inputValue == "Wrong Network") {
        toast.error(" Wrong Network Please Connect BSc Network");
        console.log("Wrong Network Please Connect BSC Scan Network");
        // setconnected("Wrong Network");
      } else {
        let res = await API.post("UserWithdrawl", {
          "uid": UserId,
          "amount": amount,
          "type": select,
          "password": password
        });
        console.log("Withdrwal", res.data);
        // setscoreboard_data(res.data)
        if (res.data.data === "SUCCESSFUL") {
          toast.success(res.data.data);
          Live_Rate();
        } else {
          toast.error(res.data.data);
        }
      }

    } catch (error) {
      console.log("Something Error in handleUpdatePassword API", error);
    }
  };
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
                <div class="section_bg">
                  <div class="mybet_wedget">
                    <div class="bars_bg">
                      <div class="row">
                        <div class="col-md-12">
                          <div class="section_heading">
                            <h2>Withdrawal</h2>
                            {/* <a className="btn" href="/Bet_History" >Bet History</a> */}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <from>
                        {/* <div className="col-md-12"> */}
                        <div className="col-lg-6 col-12">
                          <label className="fromdate">Available Balance</label>
                          <br />
                          <input
                            className="password form-control"
                            style={{ backgroundColor: "#fff" }}
                            type="text"
                            value={old}
                            // maxLength={20}
                            readOnly
                          />
                        </div>
                        <div className="col-lg-6 col-12">
                          <label className="fromdate">Select Token</label>
                          <br />
                          <select className="password form-control" onChange={(e) => setSelect(e.target.value)} aria-label="Default select example">
                            <option>Select</option>
                            {/* <option value="USDT">USDT</option> */}
                            <option value="AGCToken">LAR Token</option>
                          </select>
                        </div>
                        <div className="col-lg-6 col-12">
                          <label className="fromdate">Enter PTS Amount</label>
                          <br />
                          <input
                            className="password form-control"
                            type="text"
                            placeholder="Enter PTS Amount"
                            value={amount}
                            onChange={(e) => hendelclick(e)}
                            maxLength={20}
                          />
                        </div>
                        {/* <div className="col-lg-6 col-12">
                          <label className="fromdate">USD Amount</label>
                          <br />
                          <input
                            className="password form-control"
                            style={{ backgroundColor: "#fff" }}
                            type="text"
                            placeholder="Calculated USD Amount"
                            value={valueData.USDAmount}
                            disabled
                            maxLength={20}
                          />
                        </div> */}
                        <div className="col-lg-6 col-12">
                          <label className="fromdate">LAR Amount</label>
                          <br />
                          <input
                            className="password form-control"
                            style={{ backgroundColor: "#fff" }}
                            type="text"
                            placeholder="Calculated LAR Amount"
                            value={valueData.AGCAmount}
                            disabled
                            maxLength={20}
                          />
                        </div>

                        <div className="col-lg-6 col-12">
                          <label className="fromdate">Transaction Password</label>
                          <br />
                          <input
                            className="password form-control"
                            type="password"
                            placeholder="Transaction Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                          />
                        </div>
                        <div className="col-lg-6 col-12 submit_btnn">
                          <br />
                          <input
                            className="btn submit_BTN"
                            // type="submit"
                            value="Withdrawal"
                            onClick={() => handleUpdatePassword()}
                          />
                        </div>
                        {/* </div> */}
                        <br />
                      </from>
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

export default Withdrawal;
