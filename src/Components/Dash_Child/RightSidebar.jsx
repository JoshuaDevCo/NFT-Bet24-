import React, { useState, useEffect } from "react";
import { FaUserAlt, FaWallet } from "react-icons/fa";
import Vertical from "../Vertical/Vertical";
import "../Dashboard/Dashboard.css";
import { API } from "../../API";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function RightSidebar({ updateBal, data_Dashboard }) {
  const user = sessionStorage.getItem("user");
  let ress = JSON.parse(user);
  let uId = ress.resultusername;
  let userId = ress.resultid;
  const [data, setData] = useState("0.00");
  const [exp, setExp] = useState(0);
  const [showId, setShowId] = useState("USERID");

  const navigate = useNavigate();

  const Live_Rate = async () => {
    try {
      // let res;
      // if (uId.includes("BT")) {
      if (uId.includes("USERID")) {
        setShowId("USERID");
      }

      let res = await API.post(`/getbetawallet`, { username: uId });
      setExp(res.data.data[0][0].exposure);
      res = res.data.data[0][0].totalnetbal;
      setData(res);
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
    <div>
      <div className="top_profile_setting">
        <div className="custom_flex">
          <div className="icons_daskPDa">
            {" "}
            <FaWallet></FaWallet>
          </div>{" "}
          <div className="w_104" style={{ backgroundColor: "#e53856" }}>
            <span style={{ color: "#fff" }}>PTS::{data || 0.0}</span> <br />
            <span style={{ color: "#fff" }}>exp:{exp || 0.0}</span>
          </div>
        </div>
        <div className="custom_flex">
          <div className="icons_daskPDa">
            {" "}
            <FaUserAlt></FaUserAlt>
          </div>{" "}
          <div style={{ backgroundColor: "#e53856" }}>
            <div className="dropdown" style={{ backgroundColor: "#e53856" }}>
              <button
                className="btn New_das_bord_drop dropdown-toggle"
                type="button"
                id="dropdownMenuButton1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                style={{
                  color: "#fff",
                  textTransform: "uppercase",
                }}
                htmlFor="uppercaseInput"
              >
                {uId}
              </button>
              <ul
                className="dropdown-menu"
                aria-labelledby="dropdownMenuButton1"
              >
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

                {/* <li>
                                    <a className="dropdown-item" href="/Direct_Income">
                                       Direct Income
                                    </a>
                                </li> */}
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
      <div className="rightSliDr text-danger">
        <>
          <Vertical />
        </>
      </div>
    </div>
  );
}

export default RightSidebar;
