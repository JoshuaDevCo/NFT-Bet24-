import React, { useState, useEffect } from "react";
import { FaUserAlt, FaWallet } from "react-icons/fa";
import "../Dashboard/Dashboard.css";
import { API } from "../../API";
import { useNavigate, useParams } from "react-router-dom";
import Vertical2 from "../Vertical2/Vertical2";
import axios from "axios";

function FirstSlid({ updateBal, data_Dashboard }) {
  const user = sessionStorage.getItem("user");
  let ress = JSON.parse(user);
  let uId = ress.resultusername;
  let userId = ress.resultid;
  const [data, setData] = useState("0.00");
  const navigate = useNavigate();
  const [exp, setExp] = useState(0);
  const [showId, setShowId] = useState("USERID");

  const Live_Rate = async () => {
    try {
      // if (uId.includes("USERID")) {
      //   setShowId("USERID");
      // }
      // if (uId.includes("BT")) {
      let res = await API.post(`/getbetawallet`, { username: uId });
      setExp(res.data.data[0][0].exposure);
      res = res.data.data[0][0].totalnetbal;
      setData(res);
      // console.log("Live_Rate1", res.data.data);
    } catch (e) {
      console.log("Error While Fatch Dashboard API", e);
    }
  };

  function Logout() {
    sessionStorage.clear();
    navigate("/");
  }

  useEffect(() => {
    Live_Rate();
  }, [updateBal]);

  return (
    <div className="FTTT">
      <div className="First_bar_main ">
        <div className="First_bar1 ">
          <div className="fixure_title">
            <p style={{ color: "#fdcf13", fontSize: "14px" }}>Upcoming</p>
            <p style={{ color: "#fff", fontSize: "14px" }}>Fixure</p>
          </div>
          {/* <p style={{color:"#fff"}}>Fixure</p> */}
          <div className="sldrr">
            <Vertical2 />
          </div>
        </div>

        <div className="First_bar2 First_Fix">
          <marquee
            behavior=""
            scrollamount="4"
            direction="left"
            className="meqi"
          >
            Experience the Excitement of Live Sports, Live Casinos, Virtual
            Casinos and Fantasy Games On Our Exchange. Play Now To Win
            Unlimited.
          </marquee>
          <div className="bellUpper">
            <img
              src="https://wver.sprintstaticdata.com/v14/static/front/img/icons/speaker.svg"
              alt="#"
              className="bells"
            />
          </div>
        </div>
      </div>

      <div className="top_profile_setting">
        <div
          className={data_Dashboard == "none" ? "setCustd_fex" : "setCustd_fex"}
        >
          <div className="icons_daskPDa">
            {" "}
            <FaWallet></FaWallet>
          </div>{" "}
          <div className="min_ht48" style={{ backgroundColor: "#e53856" }}>
            <p style={{ color: "#fff", padding: "0 10px" }}>
              PTS::{data || 0.0}
            </p>{" "}
            <p style={{ color: "#fff", padding: "0 10px" }}>exp:{exp || 0.0}</p>
          </div>
        </div>
        <div className="walle profile__seting">
          <div className="icons_daskPDa">
            {" "}
            <FaUserAlt></FaUserAlt>
          </div>{" "}
          <div style={{ backgroundColor: "#e53856" }}>
            <div className="dropdown">
              <button
                className="btn New_das_bord_drop dropdown-toggle"
                type="button"
                id="dropdownMenuButton1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                style={{
                  color: "#fff",
                  textTransform: "uppercase",
                  padding: "0 10px",
                }}
              >
                {userId}
              </button>
              <ul
                className="dropdown-menu"
                aria-labelledby="dropdownMenuButton1"
              >
                <li>
                  <a className="dropdown-item" href="/Dashboard/Cricket/4">
                    Home
                  </a>
                </li>

                {/* <li>
                  <a className="dropdown-item" href="/Deposit">
                    Deposit
                  </a>
                </li> */}
                {showId == "USERID" ? (
                  <>
                    <li>
                      <a className="dropdown-item" href="/Profile">
                        Profile
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="/Deposit">
                        Deposit
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="/DepositHistory">
                        Deposit History
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="/Withdrawal">
                        Withdrawal
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="/Withdrawal_History">
                        Withdrawal History
                      </a>
                    </li>
                    {/* <li>
                      <a className="dropdown-item" href="/TransferFund">
                        Transfer Fund
                      </a>
                    </li>

                    <li>
                      <a className="dropdown-item" href="/TransferFundHistory">
                        Transfer Fund History
                      </a>
                    </li> */}
                    <li>
                      <a className="dropdown-item" href="/Transation_Password">
                        Transation Password
                      </a>
                    </li>
                    {/* <li>
                      <a className="dropdown-item" href="/Level_Income">
                        Level Income
                      </a>
                    </li> */}
                  </>
                ) : (
                  <></>
                )}

                <li>
                  <a className="dropdown-item" href="/Statement">
                    Account Statement
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="/ProfitLoss">
                    {" "}
                    Profit Loss Report
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="/Bet_History_Drop">
                    Bet History
                  </a>
                </li>

                <li>
                  <a className="dropdown-item" href="/Unsellected">
                    {" "}
                    Unsetteled Bet
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="/Change_Password">
                    {" "}
                    Change Password
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#" onClick={Logout}>
                    <span className="fafa">
                      {" "}
                      <i className="fa fa-sign-out"></i>
                    </span>{" "}
                    Logout
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FirstSlid;
