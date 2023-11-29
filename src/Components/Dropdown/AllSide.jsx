import React, { useState, useEffect } from "react";
import axios from "axios";
import "../Matches/./Match.css";
import { useNavigate, useParams } from "react-router-dom";

function AllSide() {
  let { name, type } = useParams();
  const [cricketMatches, setCricketMatches] = useState([]);
  const [events_Data, setevents_Data] = useState([]);
  const [eventCatagory_Data, seteventCatagory_Data] = useState([]);
  const [eventCatagorydata, seteventCatagory] = useState([]);
  const [event_Type, setevent_Type] = useState(0);
  const [event_name, setevent_name] = useState("");
  let navigate = useNavigate();

  const Current_Match = async (EventTypeID) => {
    // console.log("EventTypeIDCurrent_Match", EventTypeID);
    try {
      let res = await axios.get(
        `https://nft-betting-api.nakshtech.info/GetAllCurrentMatches?eventTypeID=${EventTypeID}`
      );
      // res = res.data.data;
      seteventCatagory_Data(res.data.data);
      console.log("Current_Match", res.data.data);
    } catch (e) {
      console.log("Error While Fatch Current_Match API", e);
    }
  };

  const eventCatagory = async (EventTypeID) => {
    try {
      // console.log("EventType=>", EventTypeID, event_name);
      let res = await axios.get(
        `https://nft-betting-api.nakshtech.info/GetAllCompetitionsData?EventTypeID=${EventTypeID}`
      );
      // console.log("Res", res.data);
      seteventCatagory(res.data);
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
      {/* <!-- Sidebar start  --> */}
      <nav id="sidebar" className="sidemenu">
        <ul className="list-unstyled components">
          <button className="badge badge-info " style={{ fontSize: "16px" }}>
            {event_name}
          </button>
          <hr style={{ color: "#fff" }} />
          {/* <input className="btn btn-info" value={event_name} /> */}
          <li class="active">
            {eventCatagorydata?.map((item, index) => (
              <ul class="collapse list-unstyled show" id="homeSubmenu">
                {/* <span>{event_name}</span */}
                <li> 
                  <a
                    href=""
                    style={{
                      color: "#fff",
                      textDecoration: "none",
                    }}
                    onClick={() =>
                      navigate(
                        event_name === "Tennis"
                          ? `/Tennis/${item.competition.id}/${event_Type}`
                          : event_name === "Soccer"
                          ? `/Soccer/${item.competition.id}/${event_Type}`
                          : `/scoreboard/${item.competition.id}/${event_Type}`
                      )
                    }
                  >
                    {item?.competition?.name}
                  </a>
                </li>
              </ul>
            ))}
          </li>
        </ul>
      </nav>

      {/* <!-- Sidebar end  --> */}
    </div>
  );
}

export default AllSide;
