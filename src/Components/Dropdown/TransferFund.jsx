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

function TransferFund() {
  const user = sessionStorage.getItem("user");
  let ress = JSON.parse(user);
  let uId = ress.resultusername;

  const [touid, settouid] = useState("");
  const [transPassword, settransPassword] = useState("");
  const [amount, setAmount] = useState("0");
  const [netbal, setNetbal] = useState("0");

  const Live_Rate = async () => {
    try {
      let resnetbal = await API.post(`/getbetawallet`, { username: uId });
      resnetbal = resnetbal.data.data[0][0].netbal;
      setNetbal(resnetbal);
      console.log("Live_Rate1", resnetbal);

    } catch (e) {
      console.log("Error While Fatch Dashboard API", e);
    }
  };
const hendelClick =(event)=>{
  const newValue=event.target.value
  settouid(newValue)
  Check_Sponser(newValue)
  
}

  const [sponserCheck, setSponserCheck] = useState(null);
  const Check_Sponser = async (value) => {
    // let value1 = value ?? token;
    try {
      let res = await API.post(`/checkValidId`, {
        uid: value,
        UserType: "User",
        result: "",
      });
      // console.log("Check_Sponser", res);
      res = res.data.data;
      setSponserCheck(res);
    } catch (e) {
      console.log("Somthing Error in Sponser API");
    }
  };

  useEffect(()=>{
    Check_Sponser();
  },[])

  const handleUpdatePassword = async () => {
    try {
      let res = await API.post(`userToUserFundTransfer`, {
        uid: uId,
        touid: touid,
        amount: amount,
        trxPswd: transPassword
      });
      console.log("Even_Type_Fund", res.data);
      if (res.data.data === "Successfull") {
        alert("Fund Transfered Successfully !!");
        window.location.reload();
      } else {
        toast.error(res.data.data);
      }

    } catch (error) {
      console.log("Something Error in handleUpdatePassword API", error);
    }
  };

  useEffect(() => {
    Live_Rate();
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
                <div class="section_bg">
                  <div class="mybet_wedget">
                    <div class="bars_bg">
                      <div class="row">
                        <div class="col-md-12">
                          <div class="section_heading">
                            <h2>Transfer Fund</h2>
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
                            type="text"
                            value={netbal}
                            maxLength={20}
                            disabled
                            style={{ "background-color": "floralwhite" }}
                          />
                        </div>
                        <div className="col-lg-6 col-12">
                          <label className="fromdate">Amount</label>
                          <br />
                          <input
                            className="password form-control"
                            type="text"
                            placeholder="Enter Amount"
                            // value={newpass}
                            onChange={(e) => setAmount(e.target.value)}
                            maxLength={20}
                          />
                        </div>
                        <div className="col-lg-6 col-12">
                          <label className="fromdate">Transfer User Id</label>
                          <br />
                          <input
                            className="password form-control"
                            type="text"
                            placeholder="Enter Transfer User Id"
                            // value={newpass}
                            onChange={(e) =>hendelClick(e)}
                          />
                        </div>
                        <div className="col-lg-6 col-12">
                          <label className="fromdate">Transfer User Name</label>
                          <br />
                          <input
                            className="password form-control"
                            type="text"
                            // placeholder="Enter Transfer User Name"
                            value={sponserCheck}
                            // onChange={(e) => settouid(e.target.value)}
                          />
                        </div>
                        
                        <div className="col-lg-6 col-12">
                          <label className="fromdate">Transaction Password</label>
                          <br />
                          <input
                            className="password form-control"
                            type="password"
                            placeholder="Enter Transaction Password"
                            // value={confirm}
                            onChange={(e) => settransPassword(e.target.value)}
                          />
                        </div>
                        <div className="col-lg-6 col-12 submit_btnn">
                          <br />
                          <input
                            className="btn submit_BTN"
                            type="submit"
                            value="Transfer"
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

export default TransferFund;
