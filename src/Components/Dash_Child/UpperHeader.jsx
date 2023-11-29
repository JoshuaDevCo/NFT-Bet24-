import React, { useEffect, useState } from "react";
import "../Dashboard/Dashboard.css";
import cricket from "../../icoons/cricket.png";
import football from "../../icoons/football.png";
import tennis from "../../icoons/tennis.png";
import table_tennis from "../../icoons/table_tennis.png";
import basketball from "../../icoons/basketball.png";
import volleyball from "../../icoons/volleyball.png";
import snooker from "../../icoons/snooker.png";
import politics from "../../icoons/politics.png";
import cycling from "../../icoons/cycling.png";
import horse_racing from "../../icoons/horse_racing.png";
import greyhound_racing from "../../icoons/greyhound_racing.png";
import ice_hockey from "../../icoons/ice_hockey.png";
import boxing from "../../icoons/boxing.png";
import mixed_martial_art from "../../icoons/mixed_martial_art.png";
import moto_gp from "../../icoons/moto_gp.png";
import rugby_league from "../../icoons/rugby_league.png";
import e_games from "../../icoons/e_games.png";
import futsal from "../../icoons/futsal.png";
import handball from "../../icoons/handball.png";
import kabaddi from "../../icoons/kabaddi.png";
import beach_volleyball from "../../icoons/beach_volleyball.png";
import golf from "../../icoons/golf.png";
import chess from "../../icoons/chess.png";
import moterbikes from "../../icoons/moterbikes.png";
import badminton from "../../icoons/badminton.png";
import athelitics from "../../icoons/athelitics.png";
import sumo from "../../icoons/sumo.png";
import virtual_sports from "../../icoons/virtual_sports.png";
import motor_sports from "../../icoons/motor_sports.png";
import baseball from "../../icoons/baseball.png";
import rugby_union from "../../icoons/rugby_union.png";
import dart from "../../icoons/dart.png";
import american_football from "../../icoons/american_football.png";
import soccer from "../../icoons/soccer.png";
import boat_racing from "../../icoons/boat_racing.png";
import logo from "../Assets/bet21-logo.png";
import { FaUserAlt, FaWallet } from "react-icons/fa";
import "../Dashboard/Dashboard.css";
import { API } from "../../API";
import { useNavigate, useParams } from "react-router-dom";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import axios from "axios";
import "./UpperHeader.css";

function UpperHeader({ updateBal, data_Dashboard }) {
  const user = sessionStorage.getItem("user");
  let ress = JSON.parse(user);
  let uId = ress.resultusername;
  let userId = ress.resultid;
  const [data, setData] = useState("0.00");
  const [showId, setShowId] = useState("USERID");
  // let navigate = useNavigate();
  const [exp, setExp] = useState(0);

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

  let { name, type } = useParams();
  const [cricketMatches, setCricketMatches] = useState([]);
  const [Cricket_dropdown, setCricket_dropdown] = useState(false);
  const [All_Sport_dropdown, setAll_Sport_dropdown] = useState(false);

  const [eventCatagory_Data, seteventCatagory_Data] = useState([]);
  const [eventCatagorydata, seteventCatagory] = useState([]);
  const [event_Type, setevent_Type] = useState(0);
  const [event_name, setevent_name] = useState("");
  const [events_Data, setevents_Data] = useState([]);
  let navigate = useNavigate();



  const getAllEvents = async () => {
    try {
        //   setSpinner(true);

        let res = await API.get("GetAllMatches");
        console.log(" getAllEvents =>", res.data.data);
        setevents_Data(res.data.data);
        //   setSpinner(false);
    } catch (error) {
        //   setSpinner(false);

        console.log("Something Error in getAllEvents API", error);
    }
};

useEffect(() => {
    getAllEvents();
}, []);

const Current_Match = async (EventTypeID) => {
    // console.log("EventTypeIDCurrent_Match", EventTypeID);
    try {
        let res = await API.get(
            `GetAllCurrentMatches?eventTypeID=${EventTypeID}`
        );
        // res = res.data.data;
        seteventCatagory_Data(res.data.data);
        // console.log("Current_Match", res.data.data);
    } catch (e) {
        console.log("Error While Fatch Current_Match API", e);
    }
};

const eventCatagory = async (EventTypeID) => {
    try {
        // console.log("EventType=>", EventTypeID, event_name);
        let res = await API.get(
            `GetAllCompetitionsData?EventTypeID=${EventTypeID}`
        );
        console.log("eventCatagory", res.data);
        seteventCatagory(res.data.data);
    } catch (error) {
        console.log("Something Error in eventCatagory API", error);
    }
};

function handleClick() {
    let eventType1 = type ?? "4";
    let name1 = name ?? "Cricket";
    eventCatagory(eventType1);
    Current_Match(eventType1);
    setevent_Type(eventType1);
    setevent_name(name1);
}

useEffect(() => {
    handleClick();
}, [name, type]);

  return (
    <div>
      {/* desktop upper links  */}
      <div className="upper_links_dashboR d-none  d-lg-block">
        <ul className="d-flex justify-content-center ps-0">
          <li className="li_upper_dash">Lottery</li>
          <li className="li_upper_dash">SportBook1</li>
          <li className="li_upper_dash">Exchange</li>
          <li className="li_upper_dash">Live Casino</li>
          <li className="li_upper_dash">Slot</li>
          <li className="li_upper_dash">Fantasy Games</li>
        </ul>
      </div>

      <div className="upper_links_dashboR lg_img">
        <a
          class="btn btn-primary"
          data-bs-toggle="offcanvas"
          style={{ marginLeft: "10px" }}
          href="#offcanvasExample"
          role="button"
          aria-controls="offcanvasExample"
        >
          <i class="fa-solid fa-bars"></i>
        </a>

        <div
          class="offcanvas offcanvas-start"
          tabindex="-1"
          id="offcanvasExample"
          aria-labelledby="offcanvasExampleLabel"
        >
          <div class="offcanvas-body">
            <nav id="sidebar" className="sidemenu">
             

              <div className="search-box">
                <div className="form-group">
                  <input
                    type="text"
                    placeholder="Search"
                    autoComplete="off"
                    className="form-control"
                    style={{ textTransform: "lowercase" }}
                  />{" "}
                  <img
                    src="https://wver.sprintstaticdata.com/v14/static/front/img/search.svg"
                    className="search-icon"
                  />
                </div>
                <div
                  class="offcanvas-header"
                  style={{ justifyContent: "flex-end" }}
                >
                  {/* <h5 class="offcanvas-title" id="offcanvasExampleLabel">Offcanvas</h5> */}
                  <button
                    type="button"
                    class="btn-close text-reset"
                    data-bs-dismiss="offcanvas"
                    aria-label="Close"
                    style={{ backgroundColor: "white", position: "absolute" }}
                  ></button>
                </div>
              </div>

              <div
                className="special-menu"
                style={{ borderBottom: "1px solid white" }}
              >
               <h5 className="text-yellow pl-2" style={{ cursor: "pointer" }} >
                        {events_Data.slice(1, 4).map((items, index) => {
                            return (
                                <>
                                    <u className="nav-link " style={{ color: "#fdcf13" }} onClick={() =>
                                    (setCricket_dropdown(items.eventType),
                                        eventCatagory(items.eventType),
                                        Current_Match(items.eventType),
                                        setevent_Type(items.eventType),
                                        setevent_name(items.name),
                                        
                                        navigate(
                                            `/Dashboard/${items.name}/${items.eventType}`,
                                        ))}>

                                        {items.name === "Soccer"
                                            ? "Football"
                                            : items.name}
                                        {Cricket_dropdown == items.eventType ? (
                                            <>
                                                <IoIosArrowDown />
                                            </>
                                        ) : (
                                            <>
                                                <IoIosArrowForward />
                                            </>
                                        )}
                                        {Cricket_dropdown == items.eventType && (
                                            <ul style={{marginLeft: "-84px", marginTop: "30px"}}>
                                                <ul>
                                                    {eventCatagorydata?.map((item, index) => (
                                                        <li>
                                                            <a href="" >
                                                                <button
                                                                    class="btn ml-3 hxn_btn"
                                                                    type="button"
                                                                    data-toggle="collapse"
                                                                    data-target="#collapseExample200hxn"
                                                                    aria-expanded="false"
                                                                    aria-controls="collapseExample200hxn"
                                                                    onClick={() =>
                                                                        navigate(
                                                                            event_name === "Tennis"
                                                                                ? `/Dashboard/${name}/${event_Type}/${item.CompetitionID}`
                                                                                : event_name === "Soccer"
                                                                                    ? `/Dashboard/${name}/${event_Type}/${item.CompetitionID}`
                                                                                    : `/Dashboard/${name}/${event_Type}/${item.CompetitionID}`
                                                                        )
                                                                    }
                                                                >
                                                                    {item?.name}
                                                                </button>
                                                            </a>

                                                        </li>
                                                    ))}
                                                </ul>
                                            </ul>
                                        )}
                                    </u>
                                </>
                            );
                        })}

                    </h5>
              </div>
            </nav>
          </div>
        </div>

        <div className="text-center mb_py3 py-3">
          <a href="/Dashboard/Cricket/4">
            <img src={logo} className="w-50" alt="" />
          </a>
        </div>

        <div className="wallettt" style={{ marginLeft: "45px" }}>
          <div className={data_Dashboard == "none" ? "wallet " : "wallet "}>
            <div className="mdsection">
              <span style={{ color: "rgb(255, 255, 255)", padding: "0 5px" }}>
                PTS::{data || 0.0}
              </span>{" "}
              <br />
              <span style={{ color: "rgb(255, 255, 255)", padding: "0 5px" }}>
                EXP:{exp || 0.0}
              </span>
            </div>
          </div>

          <div className="dropdown">
            <button
              className="btn New_das_bord_drop dropdown-toggle mob_drpBtns"
              type="button"
              id="dropdownMenuButton1"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {userId}
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
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

      {/* ends here  */}
    </div>
  );
}

export default UpperHeader;
