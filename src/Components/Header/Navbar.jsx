import React, { useEffect, useState } from "react";
import { API, API_Match } from "../../API";
import { FaUserAlt, FaWallet } from "react-icons/fa";
import "./Header.css";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
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
import logo from "../Assets/battle_money.png";
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
import { FaDivide } from "react-icons/fa";

function Navbar({ updateBal }) {
  const user = sessionStorage.getItem("user");
  let ress = JSON.parse(user);
  let UName = ress.resultusername;
  let userId = ress.resultid;
  const [data, setData] = useState("0.00");
  const [events_Data, setevents_Data] = useState([]);
  const [eventCatagorydata, seteventCatagory] = useState([]);
  const [eventCatagory_Data, seteventCatagory_Data] = useState([]);
  const [event_name, setevent_name] = useState("");
  const [event_Type, setevent_Type] = useState(0);

  let { name, type } = useParams();
  const navigate = useNavigate();

  const Live_Rate = async () => {
    try {
      let res = await API.post("/getbetawallet", {
        username: UName,
      });
      res = res.data.data[0][0].totalnetbal;
      setData(res);
    } catch (e) {
      console.log("Error While Fatch Dashboard API", e);
    }
  };

  const getAllEvents = async () => {
    try {
      let res = await API.get("GetAllMatches");
      // console.log("getAllEvents=>", res.data);
      setevents_Data(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const eventCatagory = async () => {
    try {
      let res = await API_Match.get(
        `GetAllCompetitionsData?EventTypeID=${type}`,
      );
      //   console.log("Res", res.data);
      seteventCatagory(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    eventCatagory();
  }, [type]);

  useEffect(() => {
    Live_Rate();
    getAllEvents();
  }, [updateBal]);

  function stop() {
    document.getElementById("marquee1").stop();
  }

  function start() {
    document.getElementById("marquee1").start();
  }

  const [dd, setdd] = useState(false);

  function handleClick() {
    setdd(!dd);
  }

  function Logout() {
    sessionStorage.clear();
    navigate("/");
  }

  const Current_Match = async (EventTypeID) => {
    try {
      let res = await API.get(
        `GetAllCurrentMatches?eventTypeID=${EventTypeID}`,
      );
      // res = res.data.data;
      seteventCatagory_Data(res.data.data);
      console.log("Current_Match", res.data.data);
    } catch (e) {
      console.log("Error While Fatch Current_Match API", e);
    }
  };

  function handleClick() {
    let eventType1 = type ?? "0";
    let name1 = name ?? "InPlay";
    eventCatagory(eventType1);
    Current_Match(eventType1);
    setevent_Type(eventType1);
    setevent_name(name1);
  }

  return (
    <div className="d-block d-lg-none">
      <header className="top_header bet_icon_header">
        <div className="container-fluid head_box">
          <div className="row   ">
            <div className="col-6 text-center">
              <div className="header_menu">
                <nav className="navbar navbar-expand-lg navbar-dark toggle_btn">
                  <div className="d-flex gap-2 align-items-center">
                    <div>
                      {name && type && (
                        <button
                          className="btn off text-white  mod-slide"
                          type="button"
                          style={{ height: "32px", marginLeft: "-32%" }}
                          data-bs-toggle="offcanvas"
                          data-bs-target="#offcanvasExample2"
                          aria-controls="offcanvasExample2"
                        >
                          <i className="fa fa-bars text-white"></i>
                        </button>
                      )}
                    </div>

                    <div className="Left_items ">
                      <a href="#">
                        <img src={logo} alt="logo" className="nav_logo" />{" "}
                      </a>
                    </div>
                  </div>
                </nav>
              </div>
            </div>
            <div className="col-6 ">
              <div className="mt-1 text-end">
                <span className="mobile_version_pts">pts:{data || 0.0}</span>{" "}
                <br />
                <div className=" text-end ">
                  <div className=" text-end ">
                    <div className="dropdown">
                      <button
                        className="btn New_das_bord_drop dropdown-toggle"
                        type="button"
                        id="dropdownMenuButton1"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        {UName}
                      </button>
                      <ul
                        className="dropdown-menu"
                        aria-labelledby="dropdownMenuButton1"
                      >
                        <li>
                          <a className="dropdown-item" href="#">
                            Account Statement
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="#">
                            Current Bets
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="#">
                            {" "}
                            Casion Results
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="#">
                            {" "}
                            Set Button Value
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="#">
                            {" "}
                            Logout
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            class="offcanvas offcanvas-start offcamp1"
            tabindex="-1"
            id="offcanvasExample2"
            aria-labelledby="offcanvasExampleLabel"
          >
            <div className="container can_er1">
              <button
                type="button"
                class="btn-close text-reset"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>

              <ul className="list-unstyled components">
                <li className="active sideMobile">
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
                  </div>

                  <div className="special-menu">
                    <h5 className="text-yellow pl-2">
                      <u>Racing Sport</u>
                    </h5>

                    <ul>
                      <ul>
                        <li>
                          <button
                            class="btn ml-3 hxn_btn"
                            type="button"
                            data-toggle="collapse"
                            data-target="#collapseExample200"
                            aria-expanded="false"
                            aria-controls="collapseExample200"
                          >
                            <img
                              src={horse_racing}
                              alt=""
                              className="icn_emg"
                            />{" "}
                            Horse Racing
                          </button>
                          <div class="collapse" id="collapseExample200">
                            <div class="card card-body">
                              <div className="panel-group" id="accordion">
                                <div className="panel panel-default">
                                  <div className="panel-heading">
                                    <h4 className="panel-title">
                                      <a
                                        data-toggle="collapse"
                                        data-parent="#accordion"
                                        href="#collapseOne200"
                                      >
                                        <span className="glyphicon glyphicon-folder-close"></span>
                                        Assembly Election
                                      </a>
                                    </h4>
                                  </div>
                                  <div
                                    id="collapseOne200"
                                    className="panel-collapse collapse in"
                                  >
                                    <div className="panel-body">
                                      <table className="table">
                                        <tbody>
                                          <tr>
                                            <td>Assembly Election 2023</td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </li>

                        <li>
                          <button
                            class="btn ml-3 hxn_btn"
                            type="button"
                            data-toggle="collapse"
                            data-target="#collapseExample201"
                            aria-expanded="false"
                            aria-controls="collapseExample201"
                          >
                            <img
                              src={greyhound_racing}
                              alt=""
                              className="icn_emg"
                            />{" "}
                            Greyhound Racing
                          </button>
                          <div class="collapse" id="collapseExample201">
                            <div class="card card-body">
                              <div className="panel-group" id="accordion">
                                <div className="panel panel-default">
                                  <div className="panel-heading">
                                    <h4 className="panel-title">
                                      <a
                                        data-toggle="collapse"
                                        data-parent="#accordion"
                                        href="#collapseOne2002"
                                      >
                                        <span className="glyphicon glyphicon-folder-close"></span>
                                        T10 Xl(1)
                                      </a>
                                    </h4>
                                  </div>
                                  <div
                                    id="collapseOne2002"
                                    className="panel-collapse collapse in"
                                  >
                                    <div className="panel-body">
                                      <table className="table">
                                        <tbody>
                                          <tr>
                                            <td>Assembly Election 2023</td>
                                          </tr>
                                          <tr>
                                            <td>
                                              <a href="">News</a>
                                            </td>
                                          </tr>
                                          <tr>
                                            <td>
                                              <a href="">Newsletters</a>
                                            </td>
                                          </tr>
                                          <tr>
                                            <td>
                                              <a href="">Comments</a>
                                              <span className="badge">42</span>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </div>
                                  </div>
                                </div>
                                <div className="panel panel-default">
                                  <div className="panel-heading">
                                    <h4 className="panel-title">
                                      <a
                                        data-toggle="collapse"
                                        data-parent="#accordion"
                                        href="#collapseTwo2003"
                                      >
                                        <span className="glyphicon glyphicon-th"></span>
                                        T10 Xl(1)
                                      </a>
                                    </h4>
                                  </div>
                                  <div
                                    id="collapseTwo2003"
                                    className="panel-collapse collapse"
                                  >
                                    <div className="panel-body">
                                      <table className="table">
                                        <tbody>
                                          <tr>
                                            <td>
                                              <a href="">Sydney vs Auk</a>{" "}
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </div>
                                  </div>
                                </div>
                                <div className="panel panel-default">
                                  <div className="panel-heading">
                                    <h4 className="panel-title">
                                      <a
                                        data-toggle="collapse"
                                        data-parent="#accordion"
                                        href="#collapseThree2004"
                                      >
                                        <span className="glyphicon glyphicon-user"></span>
                                        T5 Xl
                                      </a>
                                    </h4>
                                  </div>
                                  <div
                                    id="collapseThree2004"
                                    className="panel-collapse collapse"
                                  >
                                    <div className="panel-body">
                                      <table className="table">
                                        <tbody>
                                          <tr>
                                            <td>
                                              <a href="">GAW 11 vs TKR</a>{" "}
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </div>
                                  </div>
                                </div>
                                <div className="panel panel-default">
                                  <div className="panel-heading">
                                    <h4 className="panel-title">
                                      <a
                                        data-toggle="collapse"
                                        data-parent="#accordion"
                                        href="#collapseFour2005"
                                      >
                                        <span className="glyphicon glyphicon-file"></span>
                                        Virtual Cricket
                                      </a>
                                    </h4>
                                  </div>
                                  <div
                                    id="collapseFour2005"
                                    className="panel-collapse collapse"
                                  >
                                    <div className="panel-body">
                                      <table className="table">
                                        <tbody>
                                          <tr>
                                            <td>
                                              <a href="">Ind vs Pak</a>
                                            </td>
                                          </tr>
                                          <tr>
                                            <td>
                                              <a href="">Bng vs Nz</a>
                                            </td>
                                          </tr>
                                          <tr>
                                            <td>
                                              <a href="">Afg vs Nep</a>
                                            </td>
                                          </tr>
                                          <tr>
                                            <td>
                                              <a href="">Sa vs Wi</a>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </ul>
                  </div>

                  <div className="special-menu">
                    <h5 className="text-yellow pl-2">
                      <u>All Sport</u>
                    </h5>

                    <ul>
                      <li>
                        <button
                          class="btn ml-3 hxn_btn"
                          type="button"
                          data-toggle="collapse"
                          data-target="#collapseExample"
                          aria-expanded="false"
                          aria-controls="collapseExample"
                        >
                          <img src={politics} alt="" className="icn_emg" />{" "}
                          Politics
                        </button>
                        <div class="collapse" id="collapseExample">
                          <div class="card card-body">
                            <div className="panel-group" id="accordion">
                              <div className="panel panel-default">
                                <div className="panel-heading">
                                  <h4 className="panel-title">
                                    <a
                                      data-toggle="collapse"
                                      data-parent="#accordion"
                                      href="#collapseOne"
                                    >
                                      <span className="glyphicon glyphicon-folder-close"></span>
                                      Assembly Election
                                    </a>
                                  </h4>
                                </div>
                                <div
                                  id="collapseOne"
                                  className="panel-collapse collapse in"
                                >
                                  <div className="panel-body">
                                    <table className="table">
                                      <tbody>
                                        <tr>
                                          <td>Assembly Election 2023</td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>

                      <li>
                        <button
                          class="btn ml-3 hxn_btn"
                          type="button"
                          data-toggle="collapse"
                          data-target="#collapseExample2"
                          aria-expanded="false"
                          aria-controls="collapseExample2"
                        >
                          <img src={cricket} alt="" className="icn_emg" />{" "}
                          Cricket
                        </button>
                        <div class="collapse" id="collapseExample2">
                          <div class="card card-body">
                            <div className="panel-group" id="accordion">
                              <div className="panel panel-default">
                                <div className="panel-heading">
                                  <h4 className="panel-title">
                                    <a
                                      data-toggle="collapse"
                                      data-parent="#accordion"
                                      href="#collapseOne"
                                    >
                                      <span className="glyphicon glyphicon-folder-close"></span>
                                      T10 Xl(1)
                                    </a>
                                  </h4>
                                </div>
                                <div
                                  id="collapseOne"
                                  className="panel-collapse collapse in"
                                >
                                  <div className="panel-body">
                                    <table className="table">
                                      <tbody>
                                        <tr>
                                          <td>Assembly Election 2023</td>
                                        </tr>
                                        <tr>
                                          <td>
                                            <a href="">News</a>
                                          </td>
                                        </tr>
                                        <tr>
                                          <td>
                                            <a href="">Newsletters</a>
                                          </td>
                                        </tr>
                                        <tr>
                                          <td>
                                            <a href="">Comments</a>
                                            <span className="badge">42</span>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              </div>
                              <div className="panel panel-default">
                                <div className="panel-heading">
                                  <h4 className="panel-title">
                                    <a
                                      data-toggle="collapse"
                                      data-parent="#accordion"
                                      href="#collapseTwo"
                                    >
                                      <span className="glyphicon glyphicon-th"></span>
                                      T10 Xl(1)
                                    </a>
                                  </h4>
                                </div>
                                <div
                                  id="collapseTwo"
                                  className="panel-collapse collapse"
                                >
                                  <div className="panel-body">
                                    <table className="table">
                                      <tbody>
                                        <tr>
                                          <td>
                                            <a href="">Sydney vs Auk</a>{" "}
                                          </td>
                                        </tr>
                                        {/* <tr>
              <td>
                <a href="">Invoices</a>
              </td>
            </tr>
            <tr>
              <td>
                <a href="">Shipments</a>
              </td>
            </tr>
            <tr>
              <td>
                <a href="">Tex</a>
              </td>
            </tr> */}
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              </div>
                              <div className="panel panel-default">
                                <div className="panel-heading">
                                  <h4 className="panel-title">
                                    <a
                                      data-toggle="collapse"
                                      data-parent="#accordion"
                                      href="#collapseThree"
                                    >
                                      <span className="glyphicon glyphicon-user"></span>
                                      T5 Xl
                                    </a>
                                  </h4>
                                </div>
                                <div
                                  id="collapseThree"
                                  className="panel-collapse collapse"
                                >
                                  <div className="panel-body">
                                    <table className="table">
                                      <tbody>
                                        <tr>
                                          <td>
                                            <a href="">GAW 11 vs TKR</a>{" "}
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              </div>
                              <div className="panel panel-default">
                                <div className="panel-heading">
                                  <h4 className="panel-title">
                                    <a
                                      data-toggle="collapse"
                                      data-parent="#accordion"
                                      href="#collapseFour"
                                    >
                                      <span className="glyphicon glyphicon-file"></span>
                                      Virtual Cricket
                                    </a>
                                  </h4>
                                </div>
                                <div
                                  id="collapseFour"
                                  className="panel-collapse collapse"
                                >
                                  <div className="panel-body">
                                    <table className="table">
                                      <tbody>
                                        <tr>
                                          <td>
                                            <a href="">Ind vs Pak</a>
                                          </td>
                                        </tr>
                                        <tr>
                                          <td>
                                            <a href="">Bng vs Nz</a>
                                          </td>
                                        </tr>
                                        <tr>
                                          <td>
                                            <a href="">Afg vs Nep</a>
                                          </td>
                                        </tr>
                                        <tr>
                                          <td>
                                            <a href="">Sa vs Wi</a>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>

                      <li>
                        <button
                          class="btn ml-3 hxn_btn"
                          type="button"
                          data-toggle="collapse"
                          data-target="#collapseExample3"
                          aria-expanded="false"
                          aria-controls="collapseExample3"
                        >
                          <img src={football} alt="" className="icn_emg" />{" "}
                          Football
                        </button>
                        <div class="collapse" id="collapseExample3">
                          <div class="card card-body">
                            <div className="panel-group" id="accordion">
                              <div className="panel panel-default">
                                <div className="panel-heading">
                                  <h4 className="panel-title">
                                    <a
                                      data-toggle="collapse"
                                      data-parent="#accordion"
                                      href="#collapseOne1"
                                    >
                                      <span className="glyphicon glyphicon-folder-close"></span>
                                      T10 Xl(1)
                                    </a>
                                  </h4>
                                </div>
                                <div
                                  id="collapseOne1"
                                  className="panel-collapse collapse in"
                                >
                                  <div className="panel-body">
                                    <table className="table">
                                      <tbody>
                                        <tr>
                                          <td>Assembly Election 2023</td>
                                        </tr>
                                        <tr>
                                          <td>
                                            <a href="">News</a>
                                          </td>
                                        </tr>
                                        <tr>
                                          <td>
                                            <a href="">Newsletters</a>
                                          </td>
                                        </tr>
                                        <tr>
                                          <td>
                                            <a href="">Comments</a>
                                            <span className="badge">42</span>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              </div>
                              <div className="panel panel-default">
                                <div className="panel-heading">
                                  <h4 className="panel-title">
                                    <a
                                      data-toggle="collapse"
                                      data-parent="#accordion"
                                      href="#collapseTwo2"
                                    >
                                      <span className="glyphicon glyphicon-th"></span>
                                      T10 Xl(1)
                                    </a>
                                  </h4>
                                </div>
                                <div
                                  id="collapseTwo2"
                                  className="panel-collapse collapse"
                                >
                                  <div className="panel-body">
                                    <table className="table">
                                      <tbody>
                                        <tr>
                                          <td>
                                            <a href="">Sydney vs Auk</a>{" "}
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              </div>
                              <div className="panel panel-default">
                                <div className="panel-heading">
                                  <h4 className="panel-title">
                                    <a
                                      data-toggle="collapse"
                                      data-parent="#accordion"
                                      href="#collapseThree3"
                                    >
                                      <span className="glyphicon glyphicon-user"></span>
                                      T5 Xl
                                    </a>
                                  </h4>
                                </div>
                                <div
                                  id="collapseThree3"
                                  className="panel-collapse collapse"
                                >
                                  <div className="panel-body">
                                    <table className="table">
                                      <tbody>
                                        <tr>
                                          <td>
                                            <a href="">GAW 11 vs TKR</a>{" "}
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              </div>
                              <div className="panel panel-default">
                                <div className="panel-heading">
                                  <h4 className="panel-title">
                                    <a
                                      data-toggle="collapse"
                                      data-parent="#accordion"
                                      href="#collapseFour4"
                                    >
                                      <span className="glyphicon glyphicon-file"></span>
                                      Virtual Cricket
                                    </a>
                                  </h4>
                                </div>
                                <div
                                  id="collapseFour4"
                                  className="panel-collapse collapse"
                                >
                                  <div className="panel-body">
                                    <table className="table">
                                      <tbody>
                                        <tr>
                                          <td>
                                            <a href="">Ind vs Pak</a>
                                          </td>
                                        </tr>
                                        <tr>
                                          <td>
                                            <a href="">Bng vs Nz</a>
                                          </td>
                                        </tr>
                                        <tr>
                                          <td>
                                            <a href="">Afg vs Nep</a>
                                          </td>
                                        </tr>
                                        <tr>
                                          <td>
                                            <a href="">Sa vs Wi</a>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>

                      <li>
                        <button
                          class="btn ml-3 hxn_btn"
                          type="button"
                          data-toggle="collapse"
                          data-target="#collapseExample4"
                          aria-expanded="false"
                          aria-controls="collapseExample4"
                        >
                          <img src={tennis} alt="" className="icn_emg" /> Tennis
                        </button>
                        <div class="collapse" id="collapseExample4">
                          <div class="card card-body">
                            <div className="panel-group" id="accordion">
                              <div className="panel panel-default">
                                <div className="panel-heading">
                                  <h4 className="panel-title">
                                    <a
                                      data-toggle="collapse"
                                      data-parent="#accordion"
                                      href="#collapseOne11"
                                    >
                                      <span className="glyphicon glyphicon-folder-close"></span>
                                      T10 Xl(1)
                                    </a>
                                  </h4>
                                </div>
                                <div
                                  id="collapseOne11"
                                  className="panel-collapse collapse in"
                                >
                                  <div className="panel-body">
                                    <table className="table">
                                      <tbody>
                                        <tr>
                                          <td>Assembly Election 2023</td>
                                        </tr>
                                        <tr>
                                          <td>
                                            <a href="">News</a>
                                          </td>
                                        </tr>
                                        <tr>
                                          <td>
                                            <a href="">Newsletters</a>
                                          </td>
                                        </tr>
                                        <tr>
                                          <td>
                                            <a href="">Comments</a>
                                            <span className="badge">42</span>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              </div>
                              <div className="panel panel-default">
                                <div className="panel-heading">
                                  <h4 className="panel-title">
                                    <a
                                      data-toggle="collapse"
                                      data-parent="#accordion"
                                      href="#collapseTwo22"
                                    >
                                      <span className="glyphicon glyphicon-th"></span>
                                      T10 Xl(1)
                                    </a>
                                  </h4>
                                </div>
                                <div
                                  id="collapseTwo22"
                                  className="panel-collapse collapse"
                                >
                                  <div className="panel-body">
                                    <table className="table">
                                      <tbody>
                                        <tr>
                                          <td>
                                            <a href="">Sydney vs Auk</a>{" "}
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              </div>
                              <div className="panel panel-default">
                                <div className="panel-heading">
                                  <h4 className="panel-title">
                                    <a
                                      data-toggle="collapse"
                                      data-parent="#accordion"
                                      href="#collapseThree33"
                                    >
                                      <span className="glyphicon glyphicon-user"></span>
                                      T5 Xl
                                    </a>
                                  </h4>
                                </div>
                                <div
                                  id="collapseThree33"
                                  className="panel-collapse collapse"
                                >
                                  <div className="panel-body">
                                    <table className="table">
                                      <tbody>
                                        <tr>
                                          <td>
                                            <a href="">GAW 11 vs TKR</a>{" "}
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              </div>
                              <div className="panel panel-default">
                                <div className="panel-heading">
                                  <h4 className="panel-title">
                                    <a
                                      data-toggle="collapse"
                                      data-parent="#accordion"
                                      href="#collapseFour44"
                                    >
                                      <span className="glyphicon glyphicon-file"></span>
                                      Virtual Cricket
                                    </a>
                                  </h4>
                                </div>
                                <div
                                  id="collapseFour44"
                                  className="panel-collapse collapse"
                                >
                                  <div className="panel-body">
                                    <table className="table">
                                      <tbody>
                                        <tr>
                                          <td>
                                            <a href="">Ind vs Pak</a>
                                          </td>
                                        </tr>
                                        <tr>
                                          <td>
                                            <a href="">Bng vs Nz</a>
                                          </td>
                                        </tr>
                                        <tr>
                                          <td>
                                            <a href="">Afg vs Nep</a>
                                          </td>
                                        </tr>
                                        <tr>
                                          <td>
                                            <a href="">Sa vs Wi</a>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>

                      <li>
                        <button
                          class="btn ml-3 hxn_btn"
                          type="button"
                          data-toggle="collapse"
                          data-target="#collapseExample5"
                          aria-expanded="false"
                          aria-controls="collapseExample5"
                        >
                          <img src={table_tennis} alt="" className="icn_emg" />{" "}
                          Table Tennis
                        </button>
                        <div class="collapse" id="collapseExample5">
                          <div class="card card-body">
                            <div className="panel-group" id="accordion">
                              <div className="panel panel-default">
                                <div className="panel-heading">
                                  <h4 className="panel-title">
                                    <a
                                      data-toggle="collapse"
                                      data-parent="#accordion"
                                      href="#collapseOne112"
                                    >
                                      <span className="glyphicon glyphicon-folder-close"></span>
                                      T10 Xl(1)
                                    </a>
                                  </h4>
                                </div>
                                <div
                                  id="collapseOne112"
                                  className="panel-collapse collapse in"
                                >
                                  <div className="panel-body">
                                    <table className="table">
                                      <tbody>
                                        <tr>
                                          <td>Assembly Election 2023</td>
                                        </tr>
                                        <tr>
                                          <td>
                                            <a href="">News</a>
                                          </td>
                                        </tr>
                                        <tr>
                                          <td>
                                            <a href="">Newsletters</a>
                                          </td>
                                        </tr>
                                        <tr>
                                          <td>
                                            <a href="">Comments</a>
                                            <span className="badge">42</span>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              </div>
                              <div className="panel panel-default">
                                <div className="panel-heading">
                                  <h4 className="panel-title">
                                    <a
                                      data-toggle="collapse"
                                      data-parent="#accordion"
                                      href="#collapseTwo222"
                                    >
                                      <span className="glyphicon glyphicon-th"></span>
                                      T10 Xl(1)
                                    </a>
                                  </h4>
                                </div>
                                <div
                                  id="collapseTwo222"
                                  className="panel-collapse collapse"
                                >
                                  <div className="panel-body">
                                    <table className="table">
                                      <tbody>
                                        <tr>
                                          <td>
                                            <a href="">Sydney vs Auk</a>{" "}
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              </div>
                              <div className="panel panel-default">
                                <div className="panel-heading">
                                  <h4 className="panel-title">
                                    <a
                                      data-toggle="collapse"
                                      data-parent="#accordion"
                                      href="#collapseThree332"
                                    >
                                      <span className="glyphicon glyphicon-user"></span>
                                      T5 Xl
                                    </a>
                                  </h4>
                                </div>
                                <div
                                  id="collapseThree332"
                                  className="panel-collapse collapse"
                                >
                                  <div className="panel-body">
                                    <table className="table">
                                      <tbody>
                                        <tr>
                                          <td>
                                            <a href="">GAW 11 vs TKR</a>{" "}
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              </div>
                              <div className="panel panel-default">
                                <div className="panel-heading">
                                  <h4 className="panel-title">
                                    <a
                                      data-toggle="collapse"
                                      data-parent="#accordion"
                                      href="#collapseFour442"
                                    >
                                      <span className="glyphicon glyphicon-file"></span>
                                      Virtual Cricket
                                    </a>
                                  </h4>
                                </div>
                                <div
                                  id="collapseFour442"
                                  className="panel-collapse collapse"
                                >
                                  <div className="panel-body">
                                    <table className="table">
                                      <tbody>
                                        <tr>
                                          <td>
                                            <a href="">Ind vs Pak</a>
                                          </td>
                                        </tr>
                                        <tr>
                                          <td>
                                            <a href="">Bng vs Nz</a>
                                          </td>
                                        </tr>
                                        <tr>
                                          <td>
                                            <a href="">Afg vs Nep</a>
                                          </td>
                                        </tr>
                                        <tr>
                                          <td>
                                            <a href="">Sa vs Wi</a>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>

                      <li>
                        <button
                          class="btn ml-3 hxn_btn"
                          type="button"
                          data-toggle="collapse"
                          data-target="#collapseExample6"
                          aria-expanded="false"
                          aria-controls="collapseExample6"
                        >
                          <img src={basketball} alt="" className="icn_emg" />{" "}
                          Basketball
                        </button>
                        <div class="collapse" id="collapseExample6">
                          <div class="card card-body">
                            <div className="panel-group" id="accordion">
                              <div className="panel panel-default">
                                <div className="panel-heading">
                                  <h4 className="panel-title">
                                    <a
                                      data-toggle="collapse"
                                      data-parent="#accordion"
                                      href="#collapseOne113"
                                    >
                                      <span className="glyphicon glyphicon-folder-close"></span>
                                      T10 Xl(1)
                                    </a>
                                  </h4>
                                </div>
                                <div
                                  id="collapseOne113"
                                  className="panel-collapse collapse in"
                                >
                                  <div className="panel-body">
                                    <table className="table">
                                      <tbody>
                                        <tr>
                                          <td>Assembly Election 2023</td>
                                        </tr>
                                        <tr>
                                          <td>
                                            <a href="">News</a>
                                          </td>
                                        </tr>
                                        <tr>
                                          <td>
                                            <a href="">Newsletters</a>
                                          </td>
                                        </tr>
                                        <tr>
                                          <td>
                                            <a href="">Comments</a>
                                            <span className="badge">42</span>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              </div>
                              <div className="panel panel-default">
                                <div className="panel-heading">
                                  <h4 className="panel-title">
                                    <a
                                      data-toggle="collapse"
                                      data-parent="#accordion"
                                      href="#collapseTwo223"
                                    >
                                      <span className="glyphicon glyphicon-th"></span>
                                      T10 Xl(1)
                                    </a>
                                  </h4>
                                </div>
                                <div
                                  id="collapseTwo223"
                                  className="panel-collapse collapse"
                                >
                                  <div className="panel-body">
                                    <table className="table">
                                      <tbody>
                                        <tr>
                                          <td>
                                            <a href="">Sydney vs Auk</a>{" "}
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              </div>
                              <div className="panel panel-default">
                                <div className="panel-heading">
                                  <h4 className="panel-title">
                                    <a
                                      data-toggle="collapse"
                                      data-parent="#accordion"
                                      href="#collapseThree333"
                                    >
                                      <span className="glyphicon glyphicon-user"></span>
                                      T5 Xl
                                    </a>
                                  </h4>
                                </div>
                                <div
                                  id="collapseThree333"
                                  className="panel-collapse collapse"
                                >
                                  <div className="panel-body">
                                    <table className="table">
                                      <tbody>
                                        <tr>
                                          <td>
                                            <a href="">GAW 11 vs TKR</a>{" "}
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              </div>
                              <div className="panel panel-default">
                                <div className="panel-heading">
                                  <h4 className="panel-title">
                                    <a
                                      data-toggle="collapse"
                                      data-parent="#accordion"
                                      href="#collapseFour443"
                                    >
                                      <span className="glyphicon glyphicon-file"></span>
                                      Virtual Cricket
                                    </a>
                                  </h4>
                                </div>
                                <div
                                  id="collapseFour443"
                                  className="panel-collapse collapse"
                                >
                                  <div className="panel-body">
                                    <table className="table">
                                      <tbody>
                                        <tr>
                                          <td>
                                            <a href="">Ind vs Pak</a>
                                          </td>
                                        </tr>
                                        <tr>
                                          <td>
                                            <a href="">Bng vs Nz</a>
                                          </td>
                                        </tr>
                                        <tr>
                                          <td>
                                            <a href="">Afg vs Nep</a>
                                          </td>
                                        </tr>
                                        <tr>
                                          <td>
                                            <a href="">Sa vs Wi</a>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>

                      <li>
                        <button
                          class="btn ml-3 hxn_btn"
                          type="button"
                          data-toggle="collapse"
                          data-target="#collapseExample7"
                          aria-expanded="false"
                          aria-controls="collapseExample7"
                        >
                          <img src={volleyball} alt="" className="icn_emg" />{" "}
                          Volleyball
                        </button>
                        <div class="collapse" id="collapseExample7">
                          <div class="card card-body">
                            <div className="panel-group" id="accordion">
                              <div className="panel panel-default">
                                <div className="panel-heading">
                                  <h4 className="panel-title">
                                    <a
                                      data-toggle="collapse"
                                      data-parent="#accordion"
                                      href="#collapseOne114"
                                    >
                                      <span className="glyphicon glyphicon-folder-close"></span>
                                      T10 Xl(1)
                                    </a>
                                  </h4>
                                </div>
                                <div
                                  id="collapseOne114"
                                  className="panel-collapse collapse in"
                                >
                                  <div className="panel-body">
                                    <table className="table">
                                      <tbody>
                                        <tr>
                                          <td>Assembly Election 2023</td>
                                        </tr>
                                        <tr>
                                          <td>
                                            <a href="">News</a>
                                          </td>
                                        </tr>
                                        <tr>
                                          <td>
                                            <a href="">Newsletters</a>
                                          </td>
                                        </tr>
                                        <tr>
                                          <td>
                                            <a href="">Comments</a>
                                            <span className="badge">42</span>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              </div>
                              <div className="panel panel-default">
                                <div className="panel-heading">
                                  <h4 className="panel-title">
                                    <a
                                      data-toggle="collapse"
                                      data-parent="#accordion"
                                      href="#collapseTwo224"
                                    >
                                      <span className="glyphicon glyphicon-th"></span>
                                      T10 Xl(1)
                                    </a>
                                  </h4>
                                </div>
                                <div
                                  id="collapseTwo224"
                                  className="panel-collapse collapse"
                                >
                                  <div className="panel-body">
                                    <table className="table">
                                      <tbody>
                                        <tr>
                                          <td>
                                            <a href="">Sydney vs Auk</a>{" "}
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              </div>
                              <div className="panel panel-default">
                                <div className="panel-heading">
                                  <h4 className="panel-title">
                                    <a
                                      data-toggle="collapse"
                                      data-parent="#accordion"
                                      href="#collapseThree334"
                                    >
                                      <span className="glyphicon glyphicon-user"></span>
                                      T5 Xl
                                    </a>
                                  </h4>
                                </div>
                                <div
                                  id="collapseThree334"
                                  className="panel-collapse collapse"
                                >
                                  <div className="panel-body">
                                    <table className="table">
                                      <tbody>
                                        <tr>
                                          <td>
                                            <a href="">GAW 11 vs TKR</a>{" "}
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              </div>
                              <div className="panel panel-default">
                                <div className="panel-heading">
                                  <h4 className="panel-title">
                                    <a
                                      data-toggle="collapse"
                                      data-parent="#accordion"
                                      href="#collapseFour444"
                                    >
                                      <span className="glyphicon glyphicon-file"></span>
                                      Virtual Cricket
                                    </a>
                                  </h4>
                                </div>
                                <div
                                  id="collapseFour444"
                                  className="panel-collapse collapse"
                                >
                                  <div className="panel-body">
                                    <table className="table">
                                      <tbody>
                                        <tr>
                                          <td>
                                            <a href="">Ind vs Pak</a>
                                          </td>
                                        </tr>
                                        <tr>
                                          <td>
                                            <a href="">Bng vs Nz</a>
                                          </td>
                                        </tr>
                                        <tr>
                                          <td>
                                            <a href="">Afg vs Nep</a>
                                          </td>
                                        </tr>
                                        <tr>
                                          <td>
                                            <a href="">Sa vs Wi</a>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>

                      <li>
                        <button
                          class="btn ml-3 hxn_btn"
                          type="button"
                          data-toggle="collapse"
                          data-target="#collapseExample8"
                          aria-expanded="false"
                          aria-controls="collapseExample8"
                        >
                          <img src={snooker} alt="" className="icn_emg" />{" "}
                          Snooker
                        </button>
                        <div class="collapse" id="collapseExample8">
                          <div class="card card-body">
                            <div className="panel-group" id="accordion">
                              <div className="panel panel-default">
                                <div className="panel-heading">
                                  <h4 className="panel-title">
                                    <a
                                      data-toggle="collapse"
                                      data-parent="#accordion"
                                      href="#collapseOne115"
                                    >
                                      <span className="glyphicon glyphicon-folder-close"></span>
                                      T10 Xl(1)
                                    </a>
                                  </h4>
                                </div>
                                <div
                                  id="collapseOne115"
                                  className="panel-collapse collapse in"
                                >
                                  <div className="panel-body">
                                    <table className="table">
                                      <tbody>
                                        <tr>
                                          <td>Assembly Election 2023</td>
                                        </tr>
                                        <tr>
                                          <td>
                                            <a href="">News</a>
                                          </td>
                                        </tr>
                                        <tr>
                                          <td>
                                            <a href="">Newsletters</a>
                                          </td>
                                        </tr>
                                        <tr>
                                          <td>
                                            <a href="">Comments</a>
                                            <span className="badge">42</span>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              </div>
                              <div className="panel panel-default">
                                <div className="panel-heading">
                                  <h4 className="panel-title">
                                    <a
                                      data-toggle="collapse"
                                      data-parent="#accordion"
                                      href="#collapseTwo225"
                                    >
                                      <span className="glyphicon glyphicon-th"></span>
                                      T10 Xl(1)
                                    </a>
                                  </h4>
                                </div>
                                <div
                                  id="collapseTwo225"
                                  className="panel-collapse collapse"
                                >
                                  <div className="panel-body">
                                    <table className="table">
                                      <tbody>
                                        <tr>
                                          <td>
                                            <a href="">Sydney vs Auk</a>{" "}
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              </div>
                              <div className="panel panel-default">
                                <div className="panel-heading">
                                  <h4 className="panel-title">
                                    <a
                                      data-toggle="collapse"
                                      data-parent="#accordion"
                                      href="#collapseThree335"
                                    >
                                      <span className="glyphicon glyphicon-user"></span>
                                      T5 Xl
                                    </a>
                                  </h4>
                                </div>
                                <div
                                  id="collapseThree335"
                                  className="panel-collapse collapse"
                                >
                                  <div className="panel-body">
                                    <table className="table">
                                      <tbody>
                                        <tr>
                                          <td>
                                            <a href="">GAW 11 vs TKR</a>{" "}
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              </div>
                              <div className="panel panel-default">
                                <div className="panel-heading">
                                  <h4 className="panel-title">
                                    <a
                                      data-toggle="collapse"
                                      data-parent="#accordion"
                                      href="#collapseFour445"
                                    >
                                      <span className="glyphicon glyphicon-file"></span>
                                      Virtual Cricket
                                    </a>
                                  </h4>
                                </div>
                                <div
                                  id="collapseFour445"
                                  className="panel-collapse collapse"
                                >
                                  <div className="panel-body">
                                    <table className="table">
                                      <tbody>
                                        <tr>
                                          <td>
                                            <a href="">Ind vs Pak</a>
                                          </td>
                                        </tr>
                                        <tr>
                                          <td>
                                            <a href="">Bng vs Nz</a>
                                          </td>
                                        </tr>
                                        <tr>
                                          <td>
                                            <a href="">Afg vs Nep</a>
                                          </td>
                                        </tr>
                                        <tr>
                                          <td>
                                            <a href="">Sa vs Wi</a>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>

                      <li>
                        <button
                          class="btn ml-3 hxn_btn"
                          type="button"
                          data-toggle="collapse"
                          data-target="#collapseExample8hxnice_hockey"
                          aria-expanded="false"
                          aria-controls="collapseExample8hxnice_hockey"
                        >
                          <img src={ice_hockey} alt="" className="icn_emg" />{" "}
                          Ice Hockey
                        </button>
                        <div
                          class="collapse"
                          id="collapseExample8hxnice_hockey"
                        >
                          <div class="card card-body">
                            <div className="panel-group" id="accordion">
                              <div className="panel panel-default">
                                <div className="panel-heading">
                                  <h4 className="panel-title">
                                    <a
                                      data-toggle="collapse"
                                      data-parent="#accordion"
                                      href="#collapseOne115ice_hockey"
                                    >
                                      <span className="glyphicon glyphicon-folder-close"></span>
                                      T10 Xl(1)
                                    </a>
                                  </h4>
                                </div>
                                <div
                                  id="collapseOne115ice_hockey"
                                  className="panel-collapse collapse in"
                                >
                                  <div className="panel-body">
                                    <table className="table">
                                      <tbody>
                                        <tr>
                                          <td>Assembly Election 2023</td>
                                        </tr>
                                        <tr>
                                          <td>
                                            <a href="">News</a>
                                          </td>
                                        </tr>
                                        <tr>
                                          <td>
                                            <a href="">Newsletters</a>
                                          </td>
                                        </tr>
                                        <tr>
                                          <td>
                                            <a href="">Comments</a>
                                            <span className="badge">42</span>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              </div>
                              <div className="panel panel-default">
                                <div className="panel-heading">
                                  <h4 className="panel-title">
                                    <a
                                      data-toggle="collapse"
                                      data-parent="#accordion"
                                      href="#collapseTwo225ice_hockey"
                                    >
                                      <span className="glyphicon glyphicon-th"></span>
                                      T10 Xl(1)
                                    </a>
                                  </h4>
                                </div>
                                <div
                                  id="collapseTwo225ice_hockey"
                                  className="panel-collapse collapse"
                                >
                                  <div className="panel-body">
                                    <table className="table">
                                      <tbody>
                                        <tr>
                                          <td>
                                            <a href="">Sydney vs Auk</a>{" "}
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              </div>
                              <div className="panel panel-default">
                                <div className="panel-heading">
                                  <h4 className="panel-title">
                                    <a
                                      data-toggle="collapse"
                                      data-parent="#accordion"
                                      href="#collapseThree335ice_hockey"
                                    >
                                      <span className="glyphicon glyphicon-user"></span>
                                      T5 Xl
                                    </a>
                                  </h4>
                                </div>
                                <div
                                  id="collapseThree335ice_hockey"
                                  className="panel-collapse collapse"
                                >
                                  <div className="panel-body">
                                    <table className="table">
                                      <tbody>
                                        <tr>
                                          <td>
                                            <a href="">GAW 11 vs TKR</a>{" "}
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              </div>
                              <div className="panel panel-default">
                                <div className="panel-heading">
                                  <h4 className="panel-title">
                                    <a
                                      data-toggle="collapse"
                                      data-parent="#accordion"
                                      href="#collapseFour445ice_hockey"
                                    >
                                      <span className="glyphicon glyphicon-file"></span>
                                      Virtual Cricket
                                    </a>
                                  </h4>
                                </div>
                                <div
                                  id="collapseFour445ice_hockey"
                                  className="panel-collapse collapse"
                                >
                                  <div className="panel-body">
                                    <table className="table">
                                      <tbody>
                                        <tr>
                                          <td>
                                            <a href="">Ind vs Pak</a>
                                          </td>
                                        </tr>
                                        <tr>
                                          <td>
                                            <a href="">Bng vs Nz</a>
                                          </td>
                                        </tr>
                                        <tr>
                                          <td>
                                            <a href="">Afg vs Nep</a>
                                          </td>
                                        </tr>
                                        <tr>
                                          <td>
                                            <a href="">Sa vs Wi</a>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>

                      <li>
                        <button
                          class="btn ml-3 hxn_btn"
                          type="button"
                          data-toggle="collapse"
                          data-target="#collapseExample8hxne_games"
                          aria-expanded="false"
                          aria-controls="collapseExample8hxne_games"
                        >
                          <img src={e_games} alt="" className="icn_emg" /> E
                          Games
                        </button>
                        <div class="collapse" id="collapseExample8hxne_games">
                          <div class="card card-body">
                            <div className="panel-group" id="accordion">
                              <div className="panel panel-default">
                                <div className="panel-heading">
                                  <h4 className="panel-title">
                                    <a
                                      data-toggle="collapse"
                                      data-parent="#accordion"
                                      href="#collapseOne115e_games"
                                    >
                                      <span className="glyphicon glyphicon-folder-close"></span>
                                      T10 Xl(1)
                                    </a>
                                  </h4>
                                </div>
                                <div
                                  id="collapseOne115e_games"
                                  className="panel-collapse collapse in"
                                >
                                  <div className="panel-body">
                                    <table className="table">
                                      <tbody>
                                        <tr>
                                          <td>Assembly Election 2023</td>
                                        </tr>
                                        <tr>
                                          <td>
                                            <a href="">News</a>
                                          </td>
                                        </tr>
                                        <tr>
                                          <td>
                                            <a href="">Newsletters</a>
                                          </td>
                                        </tr>
                                        <tr>
                                          <td>
                                            <a href="">Comments</a>
                                            <span className="badge">42</span>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              </div>
                              <div className="panel panel-default">
                                <div className="panel-heading">
                                  <h4 className="panel-title">
                                    <a
                                      data-toggle="collapse"
                                      data-parent="#accordion"
                                      href="#collapseTwo225e_games"
                                    >
                                      <span className="glyphicon glyphicon-th"></span>
                                      T10 Xl(1)
                                    </a>
                                  </h4>
                                </div>
                                <div
                                  id="collapseTwo225e_games"
                                  className="panel-collapse collapse"
                                >
                                  <div className="panel-body">
                                    <table className="table">
                                      <tbody>
                                        <tr>
                                          <td>
                                            <a href="">Sydney vs Auk</a>{" "}
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              </div>
                              <div className="panel panel-default">
                                <div className="panel-heading">
                                  <h4 className="panel-title">
                                    <a
                                      data-toggle="collapse"
                                      data-parent="#accordion"
                                      href="#collapseThree335e_games"
                                    >
                                      <span className="glyphicon glyphicon-user"></span>
                                      T5 Xl
                                    </a>
                                  </h4>
                                </div>
                                <div
                                  id="collapseThree335e_games"
                                  className="panel-collapse collapse"
                                >
                                  <div className="panel-body">
                                    <table className="table">
                                      <tbody>
                                        <tr>
                                          <td>
                                            <a href="">GAW 11 vs TKR</a>{" "}
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              </div>
                              <div className="panel panel-default">
                                <div className="panel-heading">
                                  <h4 className="panel-title">
                                    <a
                                      data-toggle="collapse"
                                      data-parent="#accordion"
                                      href="#collapseFour445e_games"
                                    >
                                      <span className="glyphicon glyphicon-file"></span>
                                      Virtual Cricket
                                    </a>
                                  </h4>
                                </div>
                                <div
                                  id="collapseFour445e_games"
                                  className="panel-collapse collapse"
                                >
                                  <div className="panel-body">
                                    <table className="table">
                                      <tbody>
                                        <tr>
                                          <td>
                                            <a href="">Ind vs Pak</a>
                                          </td>
                                        </tr>
                                        <tr>
                                          <td>
                                            <a href="">Bng vs Nz</a>
                                          </td>
                                        </tr>
                                        <tr>
                                          <td>
                                            <a href="">Afg vs Nep</a>
                                          </td>
                                        </tr>
                                        <tr>
                                          <td>
                                            <a href="">Sa vs Wi</a>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>

                      <li>
                        <button
                          class="btn ml-3 hxn_btn"
                          type="button"
                          data-toggle="collapse"
                          data-target="#collapseExample8hxnfutsal"
                          aria-expanded="false"
                          aria-controls="collapseExample8hxnfutsal"
                        >
                          <img src={futsal} alt="" className="icn_emg" /> Futsal
                        </button>
                        <div class="collapse" id="collapseExample8hxnfutsal">
                          <div class="card card-body">
                            <div className="panel-group" id="accordion">
                              <div className="panel panel-default">
                                <div className="panel-heading">
                                  <h4 className="panel-title">
                                    <a
                                      data-toggle="collapse"
                                      data-parent="#accordion"
                                      href="#collapseOne115futsal"
                                    >
                                      <span className="glyphicon glyphicon-folder-close"></span>
                                      T10 Xl(1)
                                    </a>
                                  </h4>
                                </div>
                                <div
                                  id="collapseOne115futsal"
                                  className="panel-collapse collapse in"
                                >
                                  <div className="panel-body">
                                    <table className="table">
                                      <tbody>
                                        <tr>
                                          <td>Assembly Election 2023</td>
                                        </tr>
                                        <tr>
                                          <td>
                                            <a href="">News</a>
                                          </td>
                                        </tr>
                                        <tr>
                                          <td>
                                            <a href="">Newsletters</a>
                                          </td>
                                        </tr>
                                        <tr>
                                          <td>
                                            <a href="">Comments</a>
                                            <span className="badge">42</span>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              </div>
                              <div className="panel panel-default">
                                <div className="panel-heading">
                                  <h4 className="panel-title">
                                    <a
                                      data-toggle="collapse"
                                      data-parent="#accordion"
                                      href="#collapseTwo225futsal"
                                    >
                                      <span className="glyphicon glyphicon-th"></span>
                                      T10 Xl(1)
                                    </a>
                                  </h4>
                                </div>
                                <div
                                  id="collapseTwo225futsal"
                                  className="panel-collapse collapse"
                                >
                                  <div className="panel-body">
                                    <table className="table">
                                      <tbody>
                                        <tr>
                                          <td>
                                            <a href="">Sydney vs Auk</a>{" "}
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              </div>
                              <div className="panel panel-default">
                                <div className="panel-heading">
                                  <h4 className="panel-title">
                                    <a
                                      data-toggle="collapse"
                                      data-parent="#accordion"
                                      href="#collapseThree335futsal"
                                    >
                                      <span className="glyphicon glyphicon-user"></span>
                                      T5 Xl
                                    </a>
                                  </h4>
                                </div>
                                <div
                                  id="collapseThree335futsal"
                                  className="panel-collapse collapse"
                                >
                                  <div className="panel-body">
                                    <table className="table">
                                      <tbody>
                                        <tr>
                                          <td>
                                            <a href="">GAW 11 vs TKR</a>{" "}
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              </div>
                              <div className="panel panel-default">
                                <div className="panel-heading">
                                  <h4 className="panel-title">
                                    <a
                                      data-toggle="collapse"
                                      data-parent="#accordion"
                                      href="#collapseFour445futsal"
                                    >
                                      <span className="glyphicon glyphicon-file"></span>
                                      Virtual Cricket
                                    </a>
                                  </h4>
                                </div>
                                <div
                                  id="collapseFour445futsal"
                                  className="panel-collapse collapse"
                                >
                                  <div className="panel-body">
                                    <table className="table">
                                      <tbody>
                                        <tr>
                                          <td>
                                            <a href="">Ind vs Pak</a>
                                          </td>
                                        </tr>
                                        <tr>
                                          <td>
                                            <a href="">Bng vs Nz</a>
                                          </td>
                                        </tr>
                                        <tr>
                                          <td>
                                            <a href="">Afg vs Nep</a>
                                          </td>
                                        </tr>
                                        <tr>
                                          <td>
                                            <a href="">Sa vs Wi</a>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>

                      <li>
                        <button
                          class="btn ml-3 hxn_btn"
                          type="button"
                          data-toggle="collapse"
                          data-target="#collapseExample8hxnhandball"
                          aria-expanded="false"
                          aria-controls="collapseExample8hxnhandball"
                        >
                          <img src={handball} alt="" className="icn_emg" />{" "}
                          Handball
                        </button>
                        <div class="collapse" id="collapseExample8hxnhandball">
                          <div class="card card-body">
                            <div className="panel-group" id="accordion">
                              <div className="panel panel-default">
                                <div className="panel-heading">
                                  <h4 className="panel-title">
                                    <a
                                      data-toggle="collapse"
                                      data-parent="#accordion"
                                      href="#collapseOne115handball"
                                    >
                                      <span className="glyphicon glyphicon-folder-close"></span>
                                      T10 Xl(1)
                                    </a>
                                  </h4>
                                </div>
                                <div
                                  id="collapseOne115handball"
                                  className="panel-collapse collapse in"
                                >
                                  <div className="panel-body">
                                    <table className="table">
                                      <tbody>
                                        <tr>
                                          <td>Assembly Election 2023</td>
                                        </tr>
                                        <tr>
                                          <td>
                                            <a href="">News</a>
                                          </td>
                                        </tr>
                                        <tr>
                                          <td>
                                            <a href="">Newsletters</a>
                                          </td>
                                        </tr>
                                        <tr>
                                          <td>
                                            <a href="">Comments</a>
                                            <span className="badge">42</span>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              </div>
                              <div className="panel panel-default">
                                <div className="panel-heading">
                                  <h4 className="panel-title">
                                    <a
                                      data-toggle="collapse"
                                      data-parent="#accordion"
                                      href="#collapseTwo225handball"
                                    >
                                      <span className="glyphicon glyphicon-th"></span>
                                      T10 Xl(1)
                                    </a>
                                  </h4>
                                </div>
                                <div
                                  id="collapseTwo225handball"
                                  className="panel-collapse collapse"
                                >
                                  <div className="panel-body">
                                    <table className="table">
                                      <tbody>
                                        <tr>
                                          <td>
                                            <a href="">Sydney vs Auk</a>{" "}
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              </div>
                              <div className="panel panel-default">
                                <div className="panel-heading">
                                  <h4 className="panel-title">
                                    <a
                                      data-toggle="collapse"
                                      data-parent="#accordion"
                                      href="#collapseThree335handball"
                                    >
                                      <span className="glyphicon glyphicon-user"></span>
                                      T5 Xl
                                    </a>
                                  </h4>
                                </div>
                                <div
                                  id="collapseThree335handball"
                                  className="panel-collapse collapse"
                                >
                                  <div className="panel-body">
                                    <table className="table">
                                      <tbody>
                                        <tr>
                                          <td>
                                            <a href="">GAW 11 vs TKR</a>{" "}
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              </div>
                              <div className="panel panel-default">
                                <div className="panel-heading">
                                  <h4 className="panel-title">
                                    <a
                                      data-toggle="collapse"
                                      data-parent="#accordion"
                                      href="#collapseFour445handball"
                                    >
                                      <span className="glyphicon glyphicon-file"></span>
                                      Virtual Cricket
                                    </a>
                                  </h4>
                                </div>
                                <div
                                  id="collapseFour445handball"
                                  className="panel-collapse collapse"
                                >
                                  <div className="panel-body">
                                    <table className="table">
                                      <tbody>
                                        <tr>
                                          <td>
                                            <a href="">Ind vs Pak</a>
                                          </td>
                                        </tr>
                                        <tr>
                                          <td>
                                            <a href="">Bng vs Nz</a>
                                          </td>
                                        </tr>
                                        <tr>
                                          <td>
                                            <a href="">Afg vs Nep</a>
                                          </td>
                                        </tr>
                                        <tr>
                                          <td>
                                            <a href="">Sa vs Wi</a>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>

                      <li>
                        <button
                          class="btn ml-3 hxn_btn"
                          type="button"
                          data-toggle="collapse"
                          data-target="#collapseExample8hxnkabaddi"
                          aria-expanded="false"
                          aria-controls="collapseExample8hxnkabaddi"
                        >
                          <img src={kabaddi} alt="" className="icn_emg" />{" "}
                          Kabaddi
                        </button>
                        <div class="collapse" id="collapseExample8hxnkabaddi">
                          <div class="card card-body">
                            <div className="panel-group" id="accordion">
                              <div className="panel panel-default">
                                <div className="panel-heading">
                                  <h4 className="panel-title">
                                    <a
                                      data-toggle="collapse"
                                      data-parent="#accordion"
                                      href="#collapseOne115kabaddi"
                                    >
                                      <span className="glyphicon glyphicon-folder-close"></span>
                                      T10 Xl(1)
                                    </a>
                                  </h4>
                                </div>
                                <div
                                  id="collapseOne115kabaddi"
                                  className="panel-collapse collapse in"
                                >
                                  <div className="panel-body">
                                    <table className="table">
                                      <tbody>
                                        <tr>
                                          <td>Assembly Election 2023</td>
                                        </tr>
                                        <tr>
                                          <td>
                                            <a href="">News</a>
                                          </td>
                                        </tr>
                                        <tr>
                                          <td>
                                            <a href="">Newsletters</a>
                                          </td>
                                        </tr>
                                        <tr>
                                          <td>
                                            <a href="">Comments</a>
                                            <span className="badge">42</span>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              </div>
                              <div className="panel panel-default">
                                <div className="panel-heading">
                                  <h4 className="panel-title">
                                    <a
                                      data-toggle="collapse"
                                      data-parent="#accordion"
                                      href="#collapseTwo225kabaddi"
                                    >
                                      <span className="glyphicon glyphicon-th"></span>
                                      T10 Xl(1)
                                    </a>
                                  </h4>
                                </div>
                                <div
                                  id="collapseTwo225kabaddi"
                                  className="panel-collapse collapse"
                                >
                                  <div className="panel-body">
                                    <table className="table">
                                      <tbody>
                                        <tr>
                                          <td>
                                            <a href="">Sydney vs Auk</a>{" "}
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              </div>
                              <div className="panel panel-default">
                                <div className="panel-heading">
                                  <h4 className="panel-title">
                                    <a
                                      data-toggle="collapse"
                                      data-parent="#accordion"
                                      href="#collapseThree335kabaddi"
                                    >
                                      <span className="glyphicon glyphicon-user"></span>
                                      T5 Xl
                                    </a>
                                  </h4>
                                </div>
                                <div
                                  id="collapseThree335kabaddi"
                                  className="panel-collapse collapse"
                                >
                                  <div className="panel-body">
                                    <table className="table">
                                      <tbody>
                                        <tr>
                                          <td>
                                            <a href="">GAW 11 vs TKR</a>{" "}
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              </div>
                              <div className="panel panel-default">
                                <div className="panel-heading">
                                  <h4 className="panel-title">
                                    <a
                                      data-toggle="collapse"
                                      data-parent="#accordion"
                                      href="#collapseFour445kabaddi"
                                    >
                                      <span className="glyphicon glyphicon-file"></span>
                                      Virtual Cricket
                                    </a>
                                  </h4>
                                </div>
                                <div
                                  id="collapseFour445kabaddi"
                                  className="panel-collapse collapse"
                                >
                                  <div className="panel-body">
                                    <table className="table">
                                      <tbody>
                                        <tr>
                                          <td>
                                            <a href="">Ind vs Pak</a>
                                          </td>
                                        </tr>
                                        <tr>
                                          <td>
                                            <a href="">Bng vs Nz</a>
                                          </td>
                                        </tr>
                                        <tr>
                                          <td>
                                            <a href="">Afg vs Nep</a>
                                          </td>
                                        </tr>
                                        <tr>
                                          <td>
                                            <a href="">Sa vs Wi</a>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>

                      <li>
                        <button
                          class="btn ml-3 hxn_btn"
                          type="button"
                          data-toggle="collapse"
                          data-target="#collapseExample8hxnkabaddi"
                          aria-expanded="false"
                          aria-controls="collapseExample8hxnkabaddi"
                        >
                          <img src={golf} alt="" className="icn_emg" /> Golf
                        </button>
                        <div class="collapse" id="collapseExample8hxnkabaddi">
                          <div class="card card-body">
                            <div className="panel-group" id="accordion">
                              <div className="panel panel-default">
                                <div className="panel-heading">
                                  <h4 className="panel-title">
                                    <a
                                      data-toggle="collapse"
                                      data-parent="#accordion"
                                      href="#collapseOne115kabaddi"
                                    >
                                      <span className="glyphicon glyphicon-folder-close"></span>
                                      T10 Xl(1)
                                    </a>
                                  </h4>
                                </div>
                                <div
                                  id="collapseOne115kabaddi"
                                  className="panel-collapse collapse in"
                                >
                                  <div className="panel-body">
                                    <table className="table">
                                      <tbody>
                                        <tr>
                                          <td>Assembly Election 2023</td>
                                        </tr>
                                        <tr>
                                          <td>
                                            <a href="">News</a>
                                          </td>
                                        </tr>
                                        <tr>
                                          <td>
                                            <a href="">Newsletters</a>
                                          </td>
                                        </tr>
                                        <tr>
                                          <td>
                                            <a href="">Comments</a>
                                            <span className="badge">42</span>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              </div>
                              <div className="panel panel-default">
                                <div className="panel-heading">
                                  <h4 className="panel-title">
                                    <a
                                      data-toggle="collapse"
                                      data-parent="#accordion"
                                      href="#collapseTwo225kabaddi"
                                    >
                                      <span className="glyphicon glyphicon-th"></span>
                                      T10 Xl(1)
                                    </a>
                                  </h4>
                                </div>
                                <div
                                  id="collapseTwo225kabaddi"
                                  className="panel-collapse collapse"
                                >
                                  <div className="panel-body">
                                    <table className="table">
                                      <tbody>
                                        <tr>
                                          <td>
                                            <a href="">Sydney vs Auk</a>{" "}
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              </div>
                              <div className="panel panel-default">
                                <div className="panel-heading">
                                  <h4 className="panel-title">
                                    <a
                                      data-toggle="collapse"
                                      data-parent="#accordion"
                                      href="#collapseThree335kabaddi"
                                    >
                                      <span className="glyphicon glyphicon-user"></span>
                                      T5 Xl
                                    </a>
                                  </h4>
                                </div>
                                <div
                                  id="collapseThree335kabaddi"
                                  className="panel-collapse collapse"
                                >
                                  <div className="panel-body">
                                    <table className="table">
                                      <tbody>
                                        <tr>
                                          <td>
                                            <a href="">GAW 11 vs TKR</a>{" "}
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              </div>
                              <div className="panel panel-default">
                                <div className="panel-heading">
                                  <h4 className="panel-title">
                                    <a
                                      data-toggle="collapse"
                                      data-parent="#accordion"
                                      href="#collapseFour445kabaddi"
                                    >
                                      <span className="glyphicon glyphicon-file"></span>
                                      Virtual Cricket
                                    </a>
                                  </h4>
                                </div>
                                <div
                                  id="collapseFour445kabaddi"
                                  className="panel-collapse collapse"
                                >
                                  <div className="panel-body">
                                    <table className="table">
                                      <tbody>
                                        <tr>
                                          <td>
                                            <a href="">Ind vs Pak</a>
                                          </td>
                                        </tr>
                                        <tr>
                                          <td>
                                            <a href="">Bng vs Nz</a>
                                          </td>
                                        </tr>
                                        <tr>
                                          <td>
                                            <a href="">Afg vs Nep</a>
                                          </td>
                                        </tr>
                                        <tr>
                                          <td>
                                            <a href="">Sa vs Wi</a>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>

                      <li>
                        <button
                          class="btn ml-3 hxn_btn"
                          type="button"
                          data-toggle="collapse"
                          data-target="#collapseExample8rugby_league"
                          aria-expanded="false"
                          aria-controls="collapseExample8rugby_league"
                        >
                          <img src={rugby_league} alt="" className="icn_emg" />{" "}
                          Rugby League
                        </button>
                        <div class="collapse" id="collapseExample8rugby_league">
                          <div class="card card-body">
                            <div className="panel-group" id="accordion">
                              <div className="panel panel-default">
                                <div className="panel-heading">
                                  <h4 className="panel-title">
                                    <a
                                      data-toggle="collapse"
                                      data-parent="#accordion"
                                      href="#collapseOne115rugby_league"
                                    >
                                      <span className="glyphicon glyphicon-folder-close"></span>
                                      T10 Xl(1)
                                    </a>
                                  </h4>
                                </div>
                                <div
                                  id="collapseOne115rugby_league"
                                  className="panel-collapse collapse in"
                                >
                                  <div className="panel-body">
                                    <table className="table">
                                      <tbody>
                                        <tr>
                                          <td>Assembly Election 2023</td>
                                        </tr>
                                        <tr>
                                          <td>
                                            <a href="">News</a>
                                          </td>
                                        </tr>
                                        <tr>
                                          <td>
                                            <a href="">Newsletters</a>
                                          </td>
                                        </tr>
                                        <tr>
                                          <td>
                                            <a href="">Comments</a>
                                            <span className="badge">42</span>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              </div>
                              <div className="panel panel-default">
                                <div className="panel-heading">
                                  <h4 className="panel-title">
                                    <a
                                      data-toggle="collapse"
                                      data-parent="#accordion"
                                      href="#collapseTwo225rugby_league"
                                    >
                                      <span className="glyphicon glyphicon-th"></span>
                                      T10 Xl(1)
                                    </a>
                                  </h4>
                                </div>
                                <div
                                  id="collapseTwo225rugby_league"
                                  className="panel-collapse collapse"
                                >
                                  <div className="panel-body">
                                    <table className="table">
                                      <tbody>
                                        <tr>
                                          <td>
                                            <a href="">Sydney vs Auk</a>{" "}
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              </div>
                              <div className="panel panel-default">
                                <div className="panel-heading">
                                  <h4 className="panel-title">
                                    <a
                                      data-toggle="collapse"
                                      data-parent="#accordion"
                                      href="#collapseThree335rugby_league"
                                    >
                                      <span className="glyphicon glyphicon-user"></span>
                                      T5 Xl
                                    </a>
                                  </h4>
                                </div>
                                <div
                                  id="collapseThree335rugby_league"
                                  className="panel-collapse collapse"
                                >
                                  <div className="panel-body">
                                    <table className="table">
                                      <tbody>
                                        <tr>
                                          <td>
                                            <a href="">GAW 11 vs TKR</a>{" "}
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              </div>
                              <div className="panel panel-default">
                                <div className="panel-heading">
                                  <h4 className="panel-title">
                                    <a
                                      data-toggle="collapse"
                                      data-parent="#accordion"
                                      href="#collapseFour445rugby_league"
                                    >
                                      <span className="glyphicon glyphicon-file"></span>
                                      Virtual Cricket
                                    </a>
                                  </h4>
                                </div>
                                <div
                                  id="collapseFour445rugby_league"
                                  className="panel-collapse collapse"
                                >
                                  <div className="panel-body">
                                    <table className="table">
                                      <tbody>
                                        <tr>
                                          <td>
                                            <a href="">Ind vs Pak</a>
                                          </td>
                                        </tr>
                                        <tr>
                                          <td>
                                            <a href="">Bng vs Nz</a>
                                          </td>
                                        </tr>
                                        <tr>
                                          <td>
                                            <a href="">Afg vs Nep</a>
                                          </td>
                                        </tr>
                                        <tr>
                                          <td>
                                            <a href="">Sa vs Wi</a>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>

                      <li>
                        <button
                          class="btn ml-3 hxn_btn"
                          type="button"
                          data-toggle="collapse"
                          data-target="#collapseExample8boxing"
                          aria-expanded="false"
                          aria-controls="collapseExample8boxing"
                        >
                          <img src={boxing} alt="" className="icn_emg" /> Boxing
                        </button>
                        <div class="collapse" id="collapseExample8boxing">
                          <div class="card card-body">
                            <div className="panel-group" id="accordion">
                              <div className="panel panel-default">
                                <div className="panel-heading">
                                  <h4 className="panel-title">
                                    <a
                                      data-toggle="collapse"
                                      data-parent="#accordion"
                                      href="#collapseOne115boxing"
                                    >
                                      <span className="glyphicon glyphicon-folder-close"></span>
                                      T10 Xl(1)
                                    </a>
                                  </h4>
                                </div>
                                <div
                                  id="collapseOne115boxing"
                                  className="panel-collapse collapse in"
                                >
                                  <div className="panel-body">
                                    <table className="table">
                                      <tbody>
                                        <tr>
                                          <td>Assembly Election 2023</td>
                                        </tr>
                                        <tr>
                                          <td>
                                            <a href="">News</a>
                                          </td>
                                        </tr>
                                        <tr>
                                          <td>
                                            <a href="">Newsletters</a>
                                          </td>
                                        </tr>
                                        <tr>
                                          <td>
                                            <a href="">Comments</a>
                                            <span className="badge">42</span>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              </div>
                              <div className="panel panel-default">
                                <div className="panel-heading">
                                  <h4 className="panel-title">
                                    <a
                                      data-toggle="collapse"
                                      data-parent="#accordion"
                                      href="#collapseTwo225boxing"
                                    >
                                      <span className="glyphicon glyphicon-th"></span>
                                      T10 Xl(1)
                                    </a>
                                  </h4>
                                </div>
                                <div
                                  id="collapseTwo225boxing"
                                  className="panel-collapse collapse"
                                >
                                  <div className="panel-body">
                                    <table className="table">
                                      <tbody>
                                        <tr>
                                          <td>
                                            <a href="">Sydney vs Auk</a>{" "}
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              </div>
                              <div className="panel panel-default">
                                <div className="panel-heading">
                                  <h4 className="panel-title">
                                    <a
                                      data-toggle="collapse"
                                      data-parent="#accordion"
                                      href="#collapseThree335boxing"
                                    >
                                      <span className="glyphicon glyphicon-user"></span>
                                      T5 Xl
                                    </a>
                                  </h4>
                                </div>
                                <div
                                  id="collapseThree335boxing"
                                  className="panel-collapse collapse"
                                >
                                  <div className="panel-body">
                                    <table className="table">
                                      <tbody>
                                        <tr>
                                          <td>
                                            <a href="">GAW 11 vs TKR</a>{" "}
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              </div>
                              <div className="panel panel-default">
                                <div className="panel-heading">
                                  <h4 className="panel-title">
                                    <a
                                      data-toggle="collapse"
                                      data-parent="#accordion"
                                      href="#collapseFour445boxing"
                                    >
                                      <span className="glyphicon glyphicon-file"></span>
                                      Virtual Cricket
                                    </a>
                                  </h4>
                                </div>
                                <div
                                  id="collapseFour445boxing"
                                  className="panel-collapse collapse"
                                >
                                  <div className="panel-body">
                                    <table className="table">
                                      <tbody>
                                        <tr>
                                          <td>
                                            <a href="">Ind vs Pak</a>
                                          </td>
                                        </tr>
                                        <tr>
                                          <td>
                                            <a href="">Bng vs Nz</a>
                                          </td>
                                        </tr>
                                        <tr>
                                          <td>
                                            <a href="">Afg vs Nep</a>
                                          </td>
                                        </tr>
                                        <tr>
                                          <td>
                                            <a href="">Sa vs Wi</a>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>

                      <li>
                        <button
                          class="btn ml-3 hxn_btn"
                          type="button"
                          data-toggle="collapse"
                          data-target="#collapseExamplebeach_volleyball"
                          aria-expanded="false"
                          aria-controls="collapseExamplebeach_volleyball"
                        >
                          <img
                            src={beach_volleyball}
                            alt=""
                            className="icn_emg"
                          />{" "}
                          Beach Volleyball
                        </button>
                        <div
                          class="collapse"
                          id="collapseExamplebeach_volleyball"
                        ></div>
                      </li>

                      <li>
                        <button
                          class="btn ml-3 hxn_btn"
                          type="button"
                          data-toggle="collapse"
                          data-target="#collapseExamplebeach_volleyball"
                          aria-expanded="false"
                          aria-controls="collapseExamplebeach_volleyball"
                        >
                          <img
                            src={mixed_martial_art}
                            alt=""
                            className="icn_emg"
                          />{" "}
                          Mixed Martial Arts
                        </button>
                        <div
                          class="collapse"
                          id="collapseExamplebeach_volleyball"
                        ></div>
                      </li>

                      <li>
                        <button
                          class="btn ml-3 hxn_btn"
                          type="button"
                          data-toggle="collapse"
                          data-target="#collapseExamplebeach_volleyball"
                          aria-expanded="false"
                          aria-controls="collapseExamplebeach_volleyball"
                        >
                          <img src={moto_gp} alt="" className="icn_emg" /> Moto
                          GP
                        </button>
                        <div
                          class="collapse"
                          id="collapseExamplebeach_volleyball"
                        ></div>
                      </li>

                      <li>
                        <button
                          class="btn ml-3 hxn_btn"
                          type="button"
                          data-toggle="collapse"
                          data-target="#collapseExamplebeach_volleyball"
                          aria-expanded="false"
                          aria-controls="collapseExamplebeach_volleyball"
                        >
                          <img src={chess} alt="" className="icn_emg" /> Chess
                        </button>
                        <div
                          class="collapse"
                          id="collapseExamplebeach_volleyball"
                        ></div>
                      </li>

                      <li>
                        <button
                          class="btn ml-3 hxn_btn"
                          type="button"
                          data-toggle="collapse"
                          data-target="#collapseExamplebeach_volleyball"
                          aria-expanded="false"
                          aria-controls="collapseExamplebeach_volleyball"
                        >
                          <img src={badminton} alt="" className="icn_emg" />{" "}
                          Badminton
                        </button>
                        <div
                          class="collapse"
                          id="collapseExamplebeach_volleyball"
                        ></div>
                      </li>

                      <li>
                        <button
                          class="btn ml-3 hxn_btn"
                          type="button"
                          data-toggle="collapse"
                          data-target="#collapseExamplebeach_volleyball"
                          aria-expanded="false"
                          aria-controls="collapseExamplebeach_volleyball"
                        >
                          <img src={cycling} alt="" className="icn_emg" />{" "}
                          Cycling
                        </button>
                        <div
                          class="collapse"
                          id="collapseExamplebeach_volleyball"
                        ></div>
                      </li>

                      <li>
                        <button
                          class="btn ml-3 hxn_btn"
                          type="button"
                          data-toggle="collapse"
                          data-target="#collapseExamplebeach_volleyball"
                          aria-expanded="false"
                          aria-controls="collapseExamplebeach_volleyball"
                        >
                          <img src={moterbikes} alt="" className="icn_emg" />{" "}
                          moterbikes
                        </button>
                        <div
                          class="collapse"
                          id="collapseExamplebeach_volleyball"
                        ></div>
                      </li>
                    </ul>
                  </div>
                </li>

                <li>
                  <button
                    class="btn ml-3 hxn_btn"
                    type="button"
                    data-toggle="collapse"
                    data-target="#collapseExamplebeach_volleyball"
                    aria-expanded="false"
                    aria-controls="collapseExamplebeach_volleyball"
                  >
                    <img src={athelitics} alt="" className="icn_emg" />{" "}
                    Athletics
                  </button>
                  <div
                    class="collapse"
                    id="collapseExamplebeach_volleyball"
                  ></div>
                </li>

                <li>
                  <button
                    class="btn ml-3 hxn_btn"
                    type="button"
                    data-toggle="collapse"
                    data-target="#collapseExamplebeach_volleyball"
                    aria-expanded="false"
                    aria-controls="collapseExamplebeach_volleyball"
                  >
                    <img src={basketball} alt="" className="icn_emg" />{" "}
                    Basketball
                  </button>
                  <div
                    class="collapse"
                    id="collapseExamplebeach_volleyball"
                  ></div>
                </li>

                <li>
                  <button
                    class="btn ml-3 hxn_btn"
                    type="button"
                    data-toggle="collapse"
                    data-target="#collapseExamplebeach_volleyball"
                    aria-expanded="false"
                    aria-controls="collapseExamplebeach_volleyball"
                  >
                    <img src={sumo} alt="" className="icn_emg" /> Sumo
                  </button>
                  <div
                    class="collapse"
                    id="collapseExamplebeach_volleyball"
                  ></div>
                </li>

                <li>
                  <button
                    class="btn ml-3 hxn_btn"
                    type="button"
                    data-toggle="collapse"
                    data-target="#collapseExamplebeach_volleyball"
                    aria-expanded="false"
                    aria-controls="collapseExamplebeach_volleyball"
                  >
                    <img src={virtual_sports} alt="" className="icn_emg" />{" "}
                    Virtual Sports
                  </button>
                  <div
                    class="collapse"
                    id="collapseExamplebeach_volleyball"
                  ></div>
                </li>

                <li>
                  <button
                    class="btn ml-3 hxn_btn"
                    type="button"
                    data-toggle="collapse"
                    data-target="#collapseExamplebeach_volleyball"
                    aria-expanded="false"
                    aria-controls="collapseExamplebeach_volleyball"
                  >
                    <img src={motor_sports} alt="" className="icn_emg" /> Motor
                    Sports
                  </button>
                  <div
                    class="collapse"
                    id="collapseExamplebeach_volleyball"
                  ></div>
                </li>

                <li>
                  <button
                    class="btn ml-3 hxn_btn"
                    type="button"
                    data-toggle="collapse"
                    data-target="#collapseExamplebeach_volleyball"
                    aria-expanded="false"
                    aria-controls="collapseExamplebeach_volleyball"
                  >
                    <img src={baseball} alt="" className="icn_emg" /> Baseball
                  </button>
                  <div
                    class="collapse"
                    id="collapseExamplebeach_volleyball"
                  ></div>
                </li>

                <li>
                  <button
                    class="btn ml-3 hxn_btn"
                    type="button"
                    data-toggle="collapse"
                    data-target="#collapseExamplebeach_volleyball"
                    aria-expanded="false"
                    aria-controls="collapseExamplebeach_volleyball"
                  >
                    <img src={rugby_union} alt="" className="icn_emg" /> Rugby
                    Union
                  </button>
                  <div
                    class="collapse"
                    id="collapseExamplebeach_volleyball"
                  ></div>
                </li>

                <li>
                  <button
                    class="btn ml-3 hxn_btn"
                    type="button"
                    data-toggle="collapse"
                    data-target="#collapseExamplebeach_volleyball"
                    aria-expanded="false"
                    aria-controls="collapseExamplebeach_volleyball"
                  >
                    <img src={dart} alt="" className="icn_emg" /> Darts
                  </button>
                  <div
                    class="collapse"
                    id="collapseExamplebeach_volleyball"
                  ></div>
                </li>

                <li>
                  <button
                    class="btn ml-3 hxn_btn"
                    type="button"
                    data-toggle="collapse"
                    data-target="#collapseExamplebeach_volleyball"
                    aria-expanded="false"
                    aria-controls="collapseExamplebeach_volleyball"
                  >
                    <img src={american_football} alt="" className="icn_emg" />{" "}
                    American Football
                  </button>
                  <div
                    class="collapse"
                    id="collapseExamplebeach_volleyball"
                  ></div>
                </li>

                <li>
                  <button
                    class="btn ml-3 hxn_btn"
                    type="button"
                    data-toggle="collapse"
                    data-target="#collapseExamplebeach_volleyball"
                    aria-expanded="false"
                    aria-controls="collapseExamplebeach_volleyball"
                  >
                    <img src={soccer} alt="" className="icn_emg" /> Soccer
                  </button>
                  <div
                    class="collapse"
                    id="collapseExamplebeach_volleyball"
                  ></div>
                </li>

                <li>
                  <button
                    class="btn ml-3 hxn_btn"
                    type="button"
                    data-toggle="collapse"
                    data-target="#collapseExamplebeach_volleyball"
                    aria-expanded="false"
                    aria-controls="collapseExamplebeach_volleyball"
                  >
                    <img src={e_games} alt="" className="icn_emg" /> Esports
                  </button>
                  <div
                    class="collapse"
                    id="collapseExamplebeach_volleyball"
                  ></div>
                </li>

                <li>
                  <button
                    class="btn ml-3 hxn_btn"
                    type="button"
                    data-toggle="collapse"
                    data-target="#collapseExamplebeach_volleyball"
                    aria-expanded="false"
                    aria-controls="collapseExamplebeach_volleyball"
                  >
                    <img src={boat_racing} alt="" className="icn_emg" /> Boat
                    Racing
                  </button>
                  <div
                    class="collapse"
                    id="collapseExamplebeach_volleyball"
                  ></div>
                </li>
              </ul>
            </div>
          </div>
          {/* <div className="row">
          
            <div className="col-6 max_nav_search">
              <div className="header_top_righ absulet">
                <div className="bal">
                  <h3>Balance:{data}</h3>
                  <h3>Exposure: 0</h3>
                </div>
                <div className="account-setting">
                  <h3 className="head_name">{userId}</h3>
                </div>
                <div class="dropdown drc1">
                  <a
                    class="btn btn-secondary dropdown-toggle menus"
                    href="#"
                    role="button"
                    id="dropdownMenuLink"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    onClick={handleClick}
                    >
                    Demo
                    </a>

                  <ul
                    class={`dropdown-menu hit ${dd ? "show" : ""}`}
                    aria-labelledby="dropdownMenuLink"
                  >
                    <li>
                      <a class="dropdown-item" href="/Dashboard/Cricket/4">
                        <span className="fafa">
                          {" "}
                       
                        </span>{" "}
                        Home
                      </a>
                    </li>
                    <li>
                      <a class="dropdown-item" href="/Level_Income">
                        <span className="fafa"> </span> Level Income
                      </a>
                    </li>
                    <li>
                      <a class="dropdown-item" href="/Direct_Income">
                        <span className="fafa"> </span> Direct Income
                      </a>
                    </li>

                    <li>
                      <a class="dropdown-item" href="/Statement">
                        <span className="fafa"> </span> Account Statement
                      </a>
                    </li>
                    <li>
                      <a class="dropdown-item" href="/ProfitLoss">
                        <span className="fafa"> </span> Profit Loss Report
                      </a>
                    </li>
                    <li>
                      <a class="dropdown-item" href="/Bet_History_Drop">
                        <span className="fafa"> </span> Bet History
                      </a>
                    </li>
                    <li>
                      <a class="dropdown-item" href="/Unsellected">
                        <span className="fafa"> </span> Unsetteled Bet
                      </a>
                    </li>
                    <li>
                      <a class="dropdown-item" href="/Button_value">
                        <span className="fafa"> </span> Set Button Value
                      </a>
                    </li>
                    <li>
                      <a class="dropdown-item" href="/Change_Password">
                        <span className="fafa"> </span> Change Password
                      </a>
                    </li>
                    <hr />
                    <li>
                      <a class="dropdown-item" href="" onClick={Logout}>
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
              <div className="top_marque">
                <marquee
                  id="marquee1"
                  direction="left"
                  scrollamount="4"
                  onMouseOver={stop}
                  onMouseOut={start}
                >
                  Welcome to demo. For Buy Fund Call Our India Coordinator.
                  12345
                </marquee>
              </div>
            </div>
          </div> */}
        </div>
      </header>
    </div>
  );
}

export default Navbar;
