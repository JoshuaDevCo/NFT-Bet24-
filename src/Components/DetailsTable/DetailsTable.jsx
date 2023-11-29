import React, { useEffect, useState } from "react";
// import {PiTelevisionSimple} from "react-icons/pi"
import "./DetailsTable.css";
import DashboardMatch_Slider from "../DashboardMatch_Slider/DashboardMatch_Slider";
import Dashboard_mobile_slider from "../Dashboard_mobile_slider/Dashboard_mobile_slider";
import { API, API_Match } from "../../API";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment-timezone";


function DetailsTable(index) {
  // console.log("Index",index);
  const token = sessionStorage.getItem("token");
  let { name, type } = useParams();
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

  const Current_Match = async (index) => {
    // console.log("Index",index);
    try {
      setSpinner(true);
      let res = await API.get(
        `GetAllCurrentMatches?eventTypeID=${index}`
      );
      // res = res.data.data;
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

  useEffect(() => {
    getAllEvents();
  }, []);




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

  const eventCatagory = async (EventTypeID) => {
    try {
      setSpinner(true);

      // console.log("EventType=>", EventTypeID, event_name);
      let res = await API_Match.get(
        `GetAllCompetitionsData?EventTypeID=${EventTypeID}`
      );
      console.log("Res", res.data);
      seteventCatagory(res.data);
      setSpinner(false);
    } catch (error) {
      setSpinner(false);

      console.log("Something Error in eventCatagory API", error);
    }
  };

  // console.log("name",name);

  function handleClick() {
    let eventType1 = type ?? "0";
    let name1 = name ?? "InPlay";
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
      <div className="table-responsive-sm d-none d-lg-block">
        <table className="table tblBG">
          <thead>
            <tr>
              {/* <th className="new_table" scope="col">Open Time</th> */}
              <th className="new_table" scope="col">
                Name
              </th>
              <th scope="col"></th>
              <th scope="col"></th>
              <th scope="col" className="temp new_table"></th>
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
                {/* <th className="clr_the" scope="row">
                  {" "}
                  Live
                </th> */}
                <td className="glo  clr_the">
                  <span className="Today clr_the">  {moment(item.openDate)
                    .tz("Asia/Kolkata")
                    .format("DD/MM/YYYY h:m:s A")}</span>{" "}
                  {/* <span className="Today clr_the">16:30</span> <br />{" "} */}
                </td>
                <td className="eng clr_the ">
                  <a
                    href=""
                    onClick={() =>
                      navigate(
                        event_name === "Tennis"
                          ? `/Tennis_Matches?Id=${item.id}&Time=${item.openDate}`
                          : event_name === "Soccer"
                            ? `/Football_Matches?Id=${item.id}&Time=${item.openDate}`
                            : `/Live_Matches?Id=${item.id}&Time=${item.openDate}`
                      )
                    }
                  >
                    {item.name}
                  </a>
                  {/* <span className="fon ms-1">F1 F BM</span> */}
                </td>
                <td></td>
                <td></td>
                <td className="tbldta">
                  <div className="d-flex UpPrdtalay ">
                    <div className="blubx">{item.Back_1}</div>
                    <div className="pinkbx">{item.Lay_1}</div>
                  </div>
                </td>
                <td className="tbldta">
                  <div className="d-flex UpPrdtalay ">
                    <div className=" simplexb">{item.Back_x}</div>
                    <div className=" simplexb">{item.Lay_x}</div>
                  </div>
                </td>
                <td className="tbldta">
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

      <div className="table_for_mobile  d-block d-lg-none">
        <div>
          <div className="row mt-3">
            <div className="col-2 right_borde">
              <span className="mbl_libe">Live</span>
            </div>
            <div className="col-7">
              <p className="about_game mb-0 text-truncate">Warwickshire v Northamptonshire</p>
              <p className="about_game text-truncate">(County Championship Division 1)</p>
            </div>
            <div className="col-2">
              <span className="me-1 last_icons">F</span>
              <span className="last_icons">F1</span>
              <i class="icon-tv d-icon"></i>
            </div>
          </div>

          <div className="row mt-3">
            <div className="col-4">
              <div className="clr_two_boxes d-flex gap-1">
                <div className="blue_box"><p className="mb-0 text-dark  ">2.73</p></div>
                <div className="pink_box"><p className="mb-0 text-dark  ">2.73</p></div>
              </div>
            </div>
            <div className="col-4">
              <div className="clr_two_boxes d-flex gap-1">
                <div className="blue_box"><p className="mb-0 text-dark  ">10</p></div>
                <div className="pink_box"><p className="mb-0 text-dark  ">3</p></div>
              </div>
            </div>
            <div className="col-4">
              <div className="clr_two_boxes d-flex gap-1">
                <div className="blue_box"><p className="mb-0 text-dark  ">6</p></div>
                <div className="pink_box"><p className="mb-0 text-dark  ">3</p></div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="row mt-3">
            <div className="col-2 right_borde">
              <span className="mbl_libe">Live</span>
            </div>
            <div className="col-7">
              <p className="about_game mb-0 text-truncate">Warwickshire v Northamptonshire</p>
              <p className="about_game text-truncate">(County Championship Division 1)</p>
            </div>
            <div className="col-2">
              <span className="me-1 last_icons">F</span>
              <span className="last_icons">F1</span>
              <i class="icon-tv d-icon"></i>
            </div>
          </div>

          <div className="row mt-3">
            <div className="col-4">
              <div className="clr_two_boxes d-flex gap-1">
                <div className="blue_box"><p className="mb-0 text-dark  ">2.73</p></div>
                <div className="pink_box"><p className="mb-0 text-dark  ">2.73</p></div>
              </div>
            </div>
            <div className="col-4">
              <div className="clr_two_boxes d-flex gap-1">
                <div className="blue_box"><p className="mb-0 text-dark  ">10</p></div>
                <div className="pink_box"><p className="mb-0 text-dark  ">3</p></div>
              </div>
            </div>
            <div className="col-4">
              <div className="clr_two_boxes d-flex gap-1">
                <div className="blue_box"><p className="mb-0 text-dark  ">6</p></div>
                <div className="pink_box"><p className="mb-0 text-dark  ">3</p></div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="row mt-3">
            <div className="col-2 right_borde">
              <span className="mbl_libe">Live</span>
            </div>
            <div className="col-7">
              <p className="about_game mb-0 text-truncate">Warwickshire v Northamptonshire</p>
              <p className="about_game text-truncate">(County Championship Division 1)</p>
            </div>
            <div className="col-2">
              <span className="me-1 last_icons">F</span>
              <span className="last_icons">F1</span>
              <i class="icon-tv d-icon"></i>
            </div>
          </div>

          <div className="row mt-3">
            <div className="col-4">
              <div className="clr_two_boxes d-flex gap-1">
                <div className="blue_box"><p className="mb-0 text-dark  ">2.73</p></div>
                <div className="pink_box"><p className="mb-0 text-dark  ">2.73</p></div>
              </div>
            </div>
            <div className="col-4">
              <div className="clr_two_boxes d-flex gap-1">
                <div className="blue_box"><p className="mb-0 text-dark  ">10</p></div>
                <div className="pink_box"><p className="mb-0 text-dark  ">3</p></div>
              </div>
            </div>
            <div className="col-4">
              <div className="clr_two_boxes d-flex gap-1">
                <div className="blue_box"><p className="mb-0 text-dark  ">6</p></div>
                <div className="pink_box"><p className="mb-0 text-dark  ">3</p></div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="row mt-3">
            <div className="col-2 right_borde">
              <span className="mbl_libe">Live</span>
            </div>
            <div className="col-7">
              <p className="about_game mb-0 text-truncate">Warwickshire v Northamptonshire</p>
              <p className="about_game text-truncate">(County Championship Division 1)</p>
            </div>
            <div className="col-2">
              <span className="me-1 last_icons">F</span>
              <span className="last_icons">F1</span>
              <i class="icon-tv d-icon"></i>
            </div>
          </div>

          <div className="row mt-3">
            <div className="col-4">
              <div className="clr_two_boxes d-flex gap-1">
                <div className="blue_box"><p className="mb-0 text-dark  ">2.73</p></div>
                <div className="pink_box"><p className="mb-0 text-dark  ">2.73</p></div>
              </div>
            </div>
            <div className="col-4">
              <div className="clr_two_boxes d-flex gap-1">
                <div className="blue_box"><p className="mb-0 text-dark  ">10</p></div>
                <div className="pink_box"><p className="mb-0 text-dark  ">3</p></div>
              </div>
            </div>
            <div className="col-4">
              <div className="clr_two_boxes d-flex gap-1">
                <div className="blue_box"><p className="mb-0 text-dark  ">6</p></div>
                <div className="pink_box"><p className="mb-0 text-dark  ">3</p></div>
              </div>
            </div>
          </div>
        </div>




        {/* <Dashboard_mobile_slider/> */}

      </div>
    </div>
  );
}

export default DetailsTable;
