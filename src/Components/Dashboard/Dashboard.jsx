import React, { useEffect, useState } from "react";
import Navbar from "../Header/Navbar";
import { useNavigate, useParams } from "react-router-dom";
import "./Dashboard.css";
import { BsArrowDown } from "react-icons/bs";
import tv from "./tv-solid.svg";
import criball from "./image/4.png";
import football from "./image/1.png";
import tannis from "./image/2.png";
import Vertical2 from "../Vertical2/Vertical2";
import horse from "./image/5.png";
import { API, API_Match } from "../../API";
import LeftSidebar from "../Dash_Child/LeftSidebar";
import UpperHeader from "../Dash_Child/UpperHeader";
import RightSidebar from "../Dash_Child/RightSidebar";
import Footer from "../Dash_Child/Footer";
import DashboardMatch_Slider from "../DashboardMatch_Slider/DashboardMatch_Slider";
import Box from "@mui/material/Box";
import "../DashboardMatchDetail_Tab/DashboardMatchDetail_Tab.css";
import moment from "moment-timezone";
import FirstSlid from "../Dash_Child/FirstSlid";
import "./Tablecontent.css";


function Dashboard() {
  const token = sessionStorage.getItem("token");
  let { name, type, competitionId } = useParams();
  const [events_Data, setevents_Data] = useState([]);
  const [eventCatagory_Data, seteventCatagory_Data] = useState([]);
  const [eventCatagorydata, seteventCatagory] = useState([]);
  const [event_Type, setevent_Type] = useState(0);
  const [event_name, setevent_name] = useState("");
  const [select, setSelect] = useState("Time");
  const [Spinner, setSpinner] = useState(false);

  console.log("");

  setTimeout(() => {
    sessionStorage.removeItem(token);
  }, 5 * 60 * 1000);

  let navigate = useNavigate();

  const Current_Match = async (EventTypeID) => {
    try {
      let res;
      setSpinner(true);
      if (competitionId) {
        res = await API.get(
          `getMatchCompititionWise?CompetitionID=${competitionId}&eventTypeid=${type}`,
        );
      } else {
        res = await API.get(
          `GetAllCurrentMatches?eventTypeID=${EventTypeID}&fromDate=" "&toDate=" "&searchByName=" "`,
        );
      }
      seteventCatagory_Data(res.data.data);
      setSpinner(false);

      console.log("Current_Match", res.data.data);
    } catch (e) {
      setSpinner(false);

      console.log("Error While Fatch Current_Match API", e);
    }
  };

  const groupedData = eventCatagory_Data.reduce((groups, item) => {
    const key = item.ComName;
    if (!groups[key]) {
      groups[key] = [];
    }
    groups[key].push(item);
    return groups;
  }, {});

  const getAllEvents = async () => {
    try {
      setSpinner(true);

      let res = await API.get("GetAllMatches");
      console.log(" getAllEvents =>", res.data.data);
      setevents_Data(res.data.data);
      setSpinner(false);
    } catch (error) {
      setSpinner(false);

      console.log("Something Error in getAllEvents API", error);
    }
  };

  useEffect(() => {
    getAllEvents();
  }, []);

  const eventCatagory = async (EventTypeID) => {
    try {
      setSpinner(true);

      // console.log("EventType=>", EventTypeID, event_name);
      let res = await API_Match.get(
        `GetAllCompetitionsData?EventTypeID=${EventTypeID}`,
      );
      console.log("Res", res.data);
      seteventCatagory(res.data);
      setSpinner(false);
    } catch (error) {
      setSpinner(false);

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
  }, [name, type, competitionId]);

  return (
    <div>
      {/* <Navbar /> */}

      <UpperHeader />
      <br />
      <div className="main_root margin_top wrapper" style={{ overflow: "hidden" }}>
        <LeftSidebar />

        <div id="content">
          <div className="container px-1">
            <div className="row  m-0 desktop_row_here_testing">
              <div className="col-md-9">
                <div className="First_pt">
                  <FirstSlid data_Dashboard={"none"} />
                </div>
                <div className="First_bar_main First_dd">
                  <div className="First_bar1 ">
                    <div className="fixure_title">
                      <p style={{ color: "#fdcf13", fontSize: "14px" }}>
                        Upcoming
                        <p style={{ color: "#fff", fontSize: "14px" }}>
                          Fixure
                        </p>
                      </p>
                    </div>
                    <div className="sldrr">
                      <Vertical2 />
                    </div>
                  </div>
                  <br />

                  <div className="First_bar2">
                    <marquee
                      behavior=""
                      scrollamount="4"
                      direction="left"
                      className="meqi"
                    >
                      Experience the Excitement of Live Sports, Live Casinos,
                      Virtual Casinos and Fantasy Games On Our Exchange. Play
                      Now To Win Unlimited.
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
                <div className="second_bar_main">
                  {/* <ul className="dv1"> */}
                  {eventCatagory_Data?.map((item, index) => {
                    const currentTime = new Date();
                    const itemTime = new Date(item.openDate);
                    if (itemTime < currentTime) {
                      return (
                        <li className="dv1 scrl">
                          <a
                            className="Match_Name"
                            href=""
                            style={{ textDecoration: "none" }}
                            onClick={() =>
                              navigate(
                                event_name === "Tennis"
                                  ? `/Tennis_Matches?Id=${item.id}&Time=${item.openDate}`
                                  : event_name === "Soccer"
                                    ? `/Football_Matches?Id=${item.id}&Time=${item.openDate}`
                                    : `/Live_Matches?Id=${item.id}&Time=${item.openDate}`,
                              )
                            }
                          >
                            <span style={{ color: "#000" }}>
                              {" "}
                              {item.eventTypeid == "1" ? (
                                <td>
                                  <img
                                    src={football}
                                    width="15px"
                                    style={{ marginRight: "5px" }}
                                  />
                                </td>
                              ) : item.eventTypeid == "2" ? (
                                <td>
                                  <img
                                    src={tannis}
                                    width="15px"
                                    style={{ marginRight: "5px" }}
                                  />
                                </td>
                              ) : item.eventTypeid == "4" ? (
                                <td>
                                  <img
                                    src={criball}
                                    width="15px"
                                    style={{ marginRight: "5px" }}
                                  />
                                </td>
                              ) : (
                                <td>
                                  <img
                                    src={horse}
                                    width="15px"
                                    style={{ marginRight: "5px" }}
                                  />
                                </td>
                              )}
                              {"  "}
                              <span className="booo">
                                {item.name === "Soccer"
                                  ? "Football"
                                  : item.name}
                              </span>
                            </span>
                          </a>
                        </li>
                      );
                    } else {
                      return null;
                    }
                  })}
                  {/* </ul> */}
                </div>

                <div className="currnt d-flex justify-content-center d-lg-none">
                  <button className="curenn">
                    {" "}
                    <BsArrowDown />
                    Current Activities
                  </button>
                </div>
                <div className=" d-flex justify-content-center d-lg-none">
                  <ul className="mbl_row">
                    <li>
                      {" "}
                      <p className="mbl_list mb-0">Lottrry</p>
                    </li>
                    <li>
                      {" "}
                      <p className="mbl_list mb-0">SportBook1</p>
                    </li>
                    <li>
                      {" "}
                      <p className="mbl_list mb-0">Exchange</p>
                    </li>
                    <li>
                      {" "}
                      <p className="mbl_list mb-0">Live Casino</p>
                    </li>
                    <li>
                      {" "}
                      <p className="mbl_list mb-0">Slot</p>
                    </li>
                    <li>
                      {" "}
                      <p className="mbl_list mb-0">Fantasy Games</p>
                    </li>
                  </ul>
                </div>
                <div className="MatchSlider_Bar mb_n">
                  <DashboardMatch_Slider />
                </div>
                <div className="Match_detailsTab">
                  <Box sx={{ width: "100%" }}>
                    <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                      <div className="Dash_Match">
                        <ul className="nav nav-pills" role="tablist">
                          {events_Data.slice(1, 8).map((items, index) => {
                            return (
                              <>
                                <li
                                  className="btn btn-secondary tbUppermc Thampi"
                                  key={index}
                                >
                                  <a
                                    href=""
                                    className="nav-link  inplay_dis"
                                    data-toggle="pill"
                                    onClick={() => (
                                      eventCatagory(items.eventType),
                                      Current_Match(items.eventType),
                                      setevent_Type(items.eventType),
                                      setevent_name(items.name),
                                      navigate(
                                        `/Dashboard/${items.name}/${items.eventType}`,
                                      )
                                    )}
                                  >
                                    {/* <p ></p> */}
                                    <span className="booo">
                                      {items.name === "Soccer"
                                        ? "Football"
                                        : items.name}
                                    </span>
                                  </a>
                                </li>
                              </>
                            );
                          })}
                        </ul>
                      </div>
                    </Box>
                    {/* <br /> */}
                    <div
                      className="table-responsive-sm d-lg-block  dtable"
                      style={{ maxHeight: "400px", overflowY: "auto" }}
                    >
                      <table className="td_tb table tblBG">
                        <thead>
                          <tr>
                            <th className="new_table" scope="col"></th>
                            <th scope="col" className="temp new_table"></th>
                            <th className="new_table" scope="col">
                              Name
                            </th>
                            <th scope="col"></th>
                            <th scope="col"></th>
                            <th scope="col" className="temp new_table">
                              1
                            </th>
                            <th scope="col" className="temp new_table">
                              X
                            </th>
                            <th scope="col" className="temp new_table">
                              2
                            </th>
                          </tr>
                        </thead>

                        <tbody>
                          {eventCatagory_Data?.map((item, index) => (
                            <tr className="borber">
                              {new Date(item.openDate) <= new Date() ? (
                                <td className="td_tb" scope="row">
                                  {new Date(item.openDate) <= new Date() && (
                                    <span style={{color:"#09a409"}}> Live</span>
                                  )}
                                </td>
                              ) : (
                                <td className="td_tb" scope="row">
                                  <span className="">- </span>
                                </td>
                              )}
                              {item.eventTypeid == "1" ? (
                                <td>
                                  <img
                                    className="cls_int"
                                    src={football}
                                    width="15px"
                                    style={{ marginRight: "5px" }}
                                  />
                                </td>
                              ) : item.eventTypeid == "2" ? (
                                <td>
                                  <img
                                    className="cls_int"
                                    src={tannis}
                                    width="15px"
                                    style={{ marginRight: "5px" }}
                                  />
                                </td>
                              ) : item.eventTypeid == "4" ? (
                                <td className="td_tb">
                                  <img
                                    className="cls_int"
                                    src={criball}
                                    width="15px"
                                    style={{ marginRight: "5px" }}
                                  />
                                </td>
                              ) : (
                                <td className="td_tb">
                                  <img
                                    className="cls_int"
                                    src={horse}
                                    width="15px"
                                    style={{ marginRight: "5px" }}
                                  />
                                </td>
                              )}
                              <td className="glo td_tb clr_the">
                                <span className="Today clr_the">
                                  {" "}
                                  {moment(item.openDate)
                                    .tz("Asia/Kolkata")
                                    .format("DD/MM/YYYY h:m:s A")}
                                </span>{" "}
                              </td>
                              <td className="eng td_tb clr_the ">
                                <a
                                  href=""
                                  onClick={() =>
                                    navigate(
                                      event_name === "Tennis"
                                        ? `/Tennis_Matches?Id=${item.id}&Time=${item.openDate}&m_Id=${item.MarketID}&e_Id=${item.eventTypeid}`
                                        : event_name === "Soccer"
                                          ? `/Football_Matches?Id=${item.id}&Time=${item.openDate}&m_Id=${item.MarketID}&e_Id=${item.eventTypeid}`
                                          : `/Live_Matches?Id=${item.id}&Time=${item.openDate}&m_Id=${item.MarketID}&e_Id=${item.eventTypeid}`,
                                    )
                                  }
                                >
                                  {item.name}
                                </a>
                              </td>
                              
                              {new Date(item.openDate) <= new Date() ? (
                                <td className="td_tb">
                                  {new Date(item.openDate) <= new Date() && (
                                    <img src={tv} alt="" width="14" />
                                  )}
                                </td>
                              ) : (
                                <td className="td_tb">
                                  <span>-</span>
                                </td>
                              )}
                              <td className="td_tb tbldta">
                                <div className="d-flex UpPrdtalay ">
                                  <div className="blubx">{item.Back_1}</div>
                                  <div className="pinkbx">{item.Lay_1}</div>
                                </div>
                              </td>
                              <td className=" td_tb tbldta">
                                <div className="d-flex UpPrdtalay ">
                                  <div className=" simplexb">{item.Back_x}</div>
                                  <div className=" simplexb">{item.Lay_x}</div>
                                </div>
                              </td>
                              <td className="td_tb tbldta">
                                <div className="d-flex UpPrdtalay ">
                                  <div className="blubx">{item.Back_2}</div>
                                  <div className="pinkbx">{item.Lay_2}</div>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </Box>

                  {/* for mobile mode table */}
                  <div style={{ maxHeight: "400px", overflowY: "auto" }}>
                    {eventCatagory_Data?.map((item, index) => (
                      <div className="game_MobTable">
                        <div className="items_wraper">
                          <div className="game_MobTable_row">
                            <div className="colItem vr_middle col__4 text_center">
                            {new Date(item.openDate) <= new Date() ? (
                                  <td className="gameIcon" scope="row">
                                    {new Date(item.openDate) <= new Date() && (
                                      <span style={{color:"green"}}> Live</span>
                                    )}
                                  </td>
                                ) : (
                                  <td className="gameIcon" scope="row">
                                    <span className="">- </span>
                                  </td>
                                )}
                              {item.eventTypeid == "1" ? (
                                <span>
                                  <img
                                    // className="cls_int"
                                    src={football}
                                    width="15px"
                                    style={{ marginRight: "5px" }}
                                  />
                                </span>
                              ) : item.eventTypeid == "2" ? (
                                <span>
                                  <img
                                    // className="cls_int"
                                    src={tannis}
                                    width="15px"
                                    style={{ marginRight: "5px" }}
                                  />
                                </span>
                              ) : item.eventTypeid == "4" ? (
                                <span >
                                  <img
                                    // className="cls_int"
                                    src={criball}
                                    width="15px"
                                    style={{ marginRight: "5px" }}
                                  />
                                </span>
                              ) : (
                                <span >
                                  <img
                                    // className="cls_int"
                                    src={horse}
                                    width="15px"
                                    style={{ marginRight: "5px" }}
                                  />
                                </span>
                              )}
                            </div>
                            <div className="colItem col__8 flexSet">
                              <div className="col_Inner">
                                <a href="#" onClick={() =>
                                  navigate(
                                    event_name === "Tennis"
                                      ? `/Tennis_Matches?Id=${item.id}&Time=${item.openDate}&m_Id=${item.MarketID}&e_Id=${item.eventTypeid}`
                                      : event_name === "Soccer"
                                        ? `/Football_Matches?Id=${item.id}&Time=${item.openDate}&m_Id=${item.MarketID}&e_Id=${item.eventTypeid}`
                                        : `/Live_Matches?Id=${item.id}&Time=${item.openDate}&m_Id=${item.MarketID}&e_Id=${item.eventTypeid}`,
                                  )
                                }>
                                  <p>{item.name}</p>
                                  {/* <p>(ICC World Cup Warm Up..)</p> */}
                                </a>
                              </div>
                              <div>  <span className="Today clr_the">
                                  {" "}
                                  {moment(item.openDate)
                                    .tz("Asia/Kolkata")
                                    .format("DD/MM/YYYY h:m:s A")}
                                </span>{" "}</div>
                              <div className="icon_Items vr_middle">

                               
                                {new Date(item.openDate) <= new Date() ? (
                                  <td className="gameIcon">
                                    {new Date(item.openDate) <= new Date() && (
                                      <img src={tv} alt="" width="14" />
                                    )}
                                  </td>
                                ) : (
                                  <td className="gameIcon">
                                    <span>-</span>
                                  </td>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="bottm_td_shape">
                            <div className="colItem flexSet">
                              <div className="column1">
                                <div className="tdBox pink">
                                  <span>{item.Back_1}</span>
                                </div>
                                <div className="tdBox blue">
                                  <span>{item.Lay_1}</span>
                                </div>
                              </div>
                              <div className="column1">
                                <div className="tdBox blank">
                                  <span>{item.Back_x}</span>
                                </div>
                                <div className="tdBox blank">
                                  <span>{item.Lay_x}</span>
                                </div>
                              </div>
                              <div className="column1">
                                <div className="tdBox pink">
                                  <span>{item.Back_2}</span>
                                </div>
                                <div className="tdBox blue">
                                  <span>{item.Lay_2}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                    {/* <Tablecontent /> */}
                  </div>


                  {/* <DashboardMatchDetail_Tab /> */}

                  {/* <Dashboard_mobile_slider /> */}
                </div>
                <Footer />
                <br />
                <div className="MatchSlider_Bar mb_n1">
                  <DashboardMatch_Slider />
                </div>
              </div>
              <div className="col-lg-3  d-lg-block left_imgesa ps-0 rsbar">
                <RightSidebar data_Dashboard={"none"} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
