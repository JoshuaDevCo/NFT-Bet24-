import Navbar from "../Header/Navbar";
import axios from "axios";
import moment from "moment/moment";
import "./Match.css";
import { useSearchParams } from "react-router-dom";
import io from 'socket.io-client';
import "reactjs-popup/dist/index.css";
import Rule from "../Popup/popup";
import React, { useEffect, useRef, useState, useCallback } from "react";
import Modal from "react-modal";
import { Box, Tab, Tabs, Typography } from "@mui/material";
import Countdown from "react-countdown";
import { toast } from "react-toastify";
import UpperHeader from "../Dash_Child/UpperHeader";
import LeftSidebar from "../Dash_Child/LeftSidebar";
import FirstSlid from "../Dash_Child/FirstSlid";
import { API } from "../../API";

function Tennis_Matches() {
  const user = sessionStorage.getItem("user");
  let ress = JSON.parse(user);
  let UName = ress.resultusername;
  let userId = ress.resultid;
  const [searchParams, setSearchParams] = useSearchParams();
  const [id, setId] = useState(searchParams.get("Id"));
  const [market_Id, setMarket_Id] = useState(searchParams.get("m_Id"));
  const [eId, setEId] = useState(searchParams.get("e_Id"));
  const [date_time, setTime] = useState(searchParams.get("Time"));
  let [updateBal, setUpdateBal] = useState(false);
  const [spinner, setspinner] = useState(false);
  const [spinner1, setspinner1] = useState(true);

  const [t1, setT1] = useState("0.0");
  const [bm, setBm] = useState("0.0");
  const [t2, setT2] = useState("0.0");
  const [t3, setT3] = useState("0.0");
  const [t4, setT4] = useState("0.0");
  const [rem, setRemarkdata] = useState("");
  const [data, setData] = useState([]);
  const [sid, setSid] = useState("");
  const [sr, setSr] = useState("");
  const [sess, setBall] = useState("");
  const [size, setSize] = useState("");
  const [min, setMin] = useState("");
  const [max, setMax] = useState("");
  const [sessionMarket, setSessionMarket] = useState("");
  const [counteyName, setcountrydata] = useState("");
  const [dataValue, setValue] = useState("0");
  const [country, setCountry] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [back, setback] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [LayPrice1, setLayPrice1] = useState("");
  const [LaySize1, setLaySize1] = useState("");
  const [BackPrice1, setBackPrice1] = useState("");
  const [BackSize1, setBackSize1] = useState("");
  const [gtype, setgtype] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [complet, setComplet] = useState("");

  const [betRunnerName, setbetRunnerName] = useState("");

  const [showMatchOdds, setshowMatchOdds] = useState(false);
  const [sus, setSus] = useState("0.0");
  const [sus1, setSus1] = useState("0.0");
  const [odd1Stack, setOdd1Stack] = useState("0");
  const [odd2Stack, setOdd2Stack] = useState("0");
  const [oddRed, setOddRed] = useState("0");
  const [profitBal, setProfitBal] = useState("");
  const [count,setCount]=useState(0)

  const SOCKET_URL = "https://bet24-api-new.nakshtech.info/";

  useEffect(() => {
    const cricketMatchesSocket = io(SOCKET_URL);
    cricketMatchesSocket.emit("CricketOddMatch", id, eId);
    cricketMatchesSocket.on("CricketOddMatch_FromAPI", (data) => {
      let res = data;
      console.log("MatchOdd_1", res);
      if (res != null) {
        setFilterMarket(res, "Match Odds", setcountrydata);
      }
    });

    return () => {
      cricketMatchesSocket.disconnect();
    };
  }, [id]);

  const setFilterMarket = (
    res,
    condition,
    setStateFunction,
    setlabelFunction
  ) => {
    let fiteredData = res.filter((ele) => ele.marketName == condition);
    // console.log("filter", fiteredData);
    if (condition == "Match Odds") {
      setStateFunction(fiteredData[0]?.runners);
    } else {
      // console.log("filter1", fiteredData);
      setStateFunction(fiteredData[0]?.marketId);
      setlabelFunction(fiteredData[0]?.runners);
    }
  };

  const SaveTeams_API=async(mname,team)=>{
    try{
      let res=await API.post(`/saveTeams`,{
        "matchid":id,
        "mname":mname,
        "Team":team    
      })
      //  console.log("SaveTeams_API",res )
    }catch (e){
      console.log("Errore in Save Team APi",e)
    }
  }


  useEffect(()=>{
      if(counteyName&&counteyName.length>0&&count<1){
        counteyName.forEach(runner => {
          SaveTeams_API("Match Odds", runner.runnerName);
        });
        setCount(count+1)
      }

  },[counteyName])


  function stop() {
    document.getElementById("marquee1").stop();
  }

  function start() {
    document.getElementById("marquee1").start();
  }

  useEffect(() => {
    const cricketMatchesSocket = io(SOCKET_URL);
    cricketMatchesSocket.emit("CricketOddMatchType", market_Id);
    cricketMatchesSocket.on("CricketOddMatchType_FromAPI", (data) => {
      // console.log("BookMarket2==>", data);
      let res = data;
      if (res != null && res.length > 0) {
        setshowMatchOdds(true);
        setT1(res[0].runners[0].ex.availableToBack);
        setT2(res[0].runners[0].ex.availableToLay);
        setT3(res[0].runners[1].ex.availableToBack);
        setT4(res[0].runners[1].ex.availableToLay);
        setSus(res[0].runners[0]);
        setSus1(res[0].runners[1]);
        setspinner1(false);
      } else {
        setshowMatchOdds(false);
      }
    });

    return () => {
      cricketMatchesSocket.disconnect();
    };
    // }
  }, [market_Id]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setspinner1(false);
    }, 5000);
    return () => {
      clearTimeout(timeout);
    };
  }, []);

  const PlaceBet_History = async () => {
    try {
      let res = await API.post(`BetHistoryDashboard`, {
        uid: userId,
        fromDate: "",
        toDate: "",
      });
      res = res.data.data;
      // console.log("PlaceBet_History", res);
      setTableData(res);
    } catch (e) {
      console.log("Error While Fatch PlaceBet_History API", e);
    }
  };

  const Match_Close = async () => {
    if (complet != "") {
      try {
        let res = await API.post("Match_Close", {
          id: id,
          eventTypeid: "4",
        });
        res = res.data.data;
        // console.log("Match_Close", res);
        toast.success(res);
      } catch (e) {
        console.log("Something Error in Match_Close Api");
      }
    } else {
      console.log("Match_Close", complet);
    }
  };

  const popupRef = useRef(null);
  function BetValue(
    value1,
    value2,
    value3,
    value4,
    value5,
    value6,
    value7,
    value8,
    value9,
    value10,
    value11,
    value12,
    value13,
    value14,
    value15,
    value16,
    betrunnername
  ) {
    if (value4 == "back") {
      setShowPopup(true);
      setModalIsOpen(true);
      setValue(value1);
      setCountry(value2);
      setSessionMarket(value3);
      setback(value4);
      setSid(value5);
      setSr(value6);
      setBall(value7);
      setSize(value8);
      setMin(value9);
      setMax(value10);
      setLayPrice1(value11);
      setLaySize1(value12);
      setBackPrice1(value13);
      setBackSize1(value14);
      setgtype(value15);
      setRemarkdata(value16);
      setbetRunnerName(betrunnername);
    } else {
      setShowPopup(true);
      setModalIsOpen(true);
      setValue(value1);
      setCountry(value2);
      setSessionMarket(value3);
      setback(value4);
      setSid(value5);
      setSr(value6);
      setBall(value7);
      setSize(value8);
      setMin(value9);
      setMax(value10);
      setLayPrice1(value11);
      setLaySize1(value12);
      setBackPrice1(value13);
      setBackSize1(value14);
      setgtype(value15);
      setRemarkdata(value16);
      setbetRunnerName(betrunnername);
    }

    fetchData1();
  }

  const [betValue, setbetValue] = useState("");
  function handleClick(value) {
    setbetValue(value);
    ProfitValue(value);
  }

  const encryptdata = async (payload) => {
    try {
      let res;

      let response = await API.get("getPublicKey");
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

        return base64EncryptedData;
      }
    } catch (e) {
      console.log("encrypt Api error:", e);
    }
  };
  const Live_Bet_Api = async () => {
    if (dataValue > 0) {
      if (sessionMarket == "Match Odds") {
        if (
          (sus.selectionId == sid || sus1.selectionId == sid) &&
          (sus.status != "SUSPENDED" || sus1.status != "SUSPENDED") &&
          (t1[0]?.price == dataValue ||
            t1[1]?.price == dataValue ||
            t1[2]?.price == dataValue ||
            t2[0]?.price == dataValue ||
            t2[1]?.price == dataValue ||
            t2[2]?.price == dataValue ||
            t3[0]?.price == dataValue ||
            t3[1]?.price == dataValue ||
            t3[2]?.price == dataValue ||
            t4[0]?.price == dataValue ||
            t4[1]?.price == dataValue ||
            t4[3]?.price == dataValue)
        ) {
          if (back == "back") {
            try {
              let body = await encryptdata({
                uid: userId,
                stake: betValue,
                marketId: sess,
                evntid: "2",
                matchid: id,
                selectionId: sid,
                runnerName: country,
                handicap: BackPrice1,
                status: gtype,
                lastPriceTraded: BackSize1,
                totalMatched: size,
                Backprice1: LaySize1,
                Backprice: dataValue,
                Backsize: LayPrice1,
                Layprice1: 0,
                Layprice: 0,
                Laysize: 0,
                min: min,
                max: max,
                mname: sr,
                betRunnerName: betRunnerName,
              });
              let res = await API.post("PlaceBetBook", {
                encryptedData: body,
              });
              res = res.data.data;

              // console.log("Live_Bet_Api", res);
              if (res == "Minimum Bet amount is 100 Usd !!") {
                toast.error("Minimum Bet amount is 100 INR !!");
                setModalIsOpen(false)
                setShowPopup(false);
              } else if (res == "Insufficient fund") {
                toast.error(res);
                setModalIsOpen(false)
                setShowPopup(false);
              } else {
                toast.success(res);
                PlaceBet_History();
                setUpdateBal(!updateBal);
                fetchData();
                setModalIsOpen(false)
                setShowPopup(false);
                ProfitVauePageOdds();
                
              }
            } catch (e) {
              console.log("Error While Fatch Live_Bet_Api ", e);
            }
          } else if (back == "lay") {
            try {
              let body = await encryptdata({
                uid: userId,
                stake: betValue,
                marketId: sess,
                evntid: "2",
                matchid: id,
                selectionId: sid,
                runnerName: country,
                handicap: BackPrice1,
                status: gtype,
                lastPriceTraded: BackSize1,
                totalMatched: size,
                Backprice1: 0,
                Backprice: 0,
                Backsize: 0,
                Layprice1: LaySize1,
                Layprice: dataValue,
                Laysize: LayPrice1,
                min: min,
                max: max,
                mname: sr,
                betRunnerName: betRunnerName,
              });
              let res = await API.post("PlaceBetBook", {
                encryptedData: body,
              });
              res = res.data.data;
              // console.log("Live_Bet_Api", res);

              if (res == "Minimum Bet amount is 100 Usd !!") {
                toast.error("Minimum Bet amount is 100 INR !!");
                setModalIsOpen(false)
                setShowPopup(false);
              } else if (res == "Insufficient fund") {
                toast.error(res);
                setModalIsOpen(false)
                setShowPopup(false);
              } else {
                toast.success(res);
                PlaceBet_History();
                setUpdateBal(!updateBal);
                fetchData();
                setModalIsOpen(false)
                setShowPopup(false);
                ProfitVauePageOdds();
                
              }
            } catch (e) {
              console.log("Error While Fatch Live_Bet_Api API", e);
            }
          } else {
            toast.error("Odd Value is miss Match");
          }
        } else {
          toast.error("Odd Value is miss Match");
        }
      } else {
        console.log("Something Error in betting API");
      }
    } else {
      toast.error("Invalid Request !");
    }
    setbetValue("")
  };

  const fetchData1 = () => {
    setIsLoading(true);

    setTimeout(() => {
      handleReset();
      setIsLoading(false);
    }, 20000);
  };

  const fetchData = () => {
    setIsLoading(true);
    setTimeout(() => {
      handleReset();
      setIsLoading(false);
    }, 2000);
  };

  const handleReset = () => {
    setbetValue("");
    setValue("");
    setCountry("");
  };

  function closeModal() {
    setModalIsOpen(false);
  }

  const [show, setShow] = useState(false);

  const toggleShow = () => {
    setShow(!show);
  };
  const [abhi, setabhi] = useState([]);

  useEffect(() => {
    PlaceBet_History();
    Match_Close();
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", fixed_top);
    return () => {
      window.removeEventListener("scroll", fixed_top);
    };
  });
  const fixed_top = (e) => {
    const header = document.querySelector("#bettingSection");
    const scrollTop = window.scrollY;
    scrollTop >= 50
      ? header.classList.add("set_sticky")
      : header.classList.remove("set_sticky");
  };

  const [buttondata, setbuttonData] = useState([]);

  // const Button_Api = async () => {
  //   try {
  //     let res = await API.get(`Get_Button_value_List?uid=${userId}`);
  //     res = res.data.data;
  //     // console.log("Button_Api", res);
  //     setbuttonData(res);
  //   } catch (e) {
  //     console.log("Error While Fatch Button_Api", e);
  //   }
  // };

 

  const ProfitVauePageOdds = async () => {
    try {
      let res = await API.get(
        `PlaceBetCalculaterDB?uid=${userId}&matchid=${id}&mname=Match Odds`
      );
      res = res.data.data;
      console.log("ProfitVauePageOdd", res);
      
      if(counteyName[0]?.runnerName==res[0].team){
         setOdd1Stack(res[0].amount)
      }
       if(counteyName[1]?.runnerName==res[1].team){
        console.log("ProfitVauePageOdd1",res[1].team)
         setOdd2Stack(res[1].amount)
      }
      
    } catch (e) {
      console.log("Somthing error in ProfitValue API", e);
    }
  };

  const ProfitValue = async (value) => {
    try {
      let res;
      if (sessionMarket == "Match Odds") {
        if (country == counteyName[0]?.runnerName) {
          if (back == "back") {
            res = await API.get(
              `PlaceBetCalculater?mname=${sessionMarket}&stake=${value}&Layprice=0&Backprice=${dataValue}`
            );
            res = res.data.data;
            setProfitBal(Math.floor(res.odds));
          } else {
            res = await API.get(
              `PlaceBetCalculater?mname=${sessionMarket}&stake=${value}&Layprice=${dataValue}&Backprice=0`
            );
            res = res.data.data;
            setProfitBal(Math.floor(res.odds));
          }
        } else {
          if (back == "back") {
            res = await API.get(
              `PlaceBetCalculater?mname=${sessionMarket}&stake=${value}&Layprice=0&Backprice=${dataValue}`
            );
            res = res.data.data;
            setProfitBal(Math.floor(res.odds));
          } else {
            res = await API.get(
              `PlaceBetCalculater?mname=${sessionMarket}&stake=${value}&Layprice=${dataValue}&Backprice=0`
            );
            res = res.data.data;
            setProfitBal(Math.floor(res.odds));
          }
        }
      } else if (sessionMarket == "Bookmaker Market") {
        if (country == counteyName[0]?.runnerName) {
          if (back == "back") {
            res = await API.get(
              `PlaceBetCalculater?mname=${sessionMarket}&stake=${value}&Layprice=0&Backprice=${dataValue}`
            );
            res = res.data.data;
            setProfitBal(Math.floor(res.odds));
          } else {
            res = await API.get(
              `PlaceBetCalculater?mname=${sessionMarket}&stake=${value}&Layprice=${dataValue}&Backprice=0`
            );
            res = res.data.data;
            setProfitBal(Math.floor(res.odds));
          }
        } else {
          if (back == "back") {
            res = await API.get(
              `PlaceBetCalculater?mname=${sessionMarket}&stake=${value}&Layprice=0&Backprice=${dataValue}`
            );
            res = res.data.data;
            setProfitBal(Math.floor(res.odds));
          } else {
            res = await API.get(
              `PlaceBetCalculater?mname=${sessionMarket}&stake=${value}&Layprice=${dataValue}&Backprice=0`
            );
            res = res.data.data;
            setProfitBal(Math.floor(res.odds));
          }
        }
      }
    } catch (e) {
      console.log("Somthing error in ProfitValue API", e);
    }
  };

  useEffect(() => {
    // Button_Api();
    ProfitVauePageOdds();
  }, [counteyName[0]?.runnerName]);

  return (
    <div>
      {/* <Navbar updateBal={updateBal}  /> */}
      <UpperHeader updateBal={updateBal} data_Dashboard={"All"} />
      <br />
      <br />
      <main class="main_root wrapper">
        <LeftSidebar />
        {/* <!-----=======body section start=======----> */}
        <div className="live_match">
          <div class="container">
            <div class="row">
              <FirstSlid updateBal={updateBal} data_Dashboard={"All"} />
              <div class="col-md-8">
                <div class="section_bg">
                  <div className="bars_bg">
                    <div className="game_timer">
                      {/* <Countdown
                                              date={Date.now() + (parseInt(1681918116689) - Date.now())}
                                              renderer={renderer}
                                          /> */}
                      <div className="game_vs">
                        <div className="countryName">
                          <h1>
                            {counteyName && counteyName.length > 0
                              ? counteyName[0]?.runnerName
                              : ""}
                          </h1>
                        </div>
                        <div className="countVs">
                          <h1>vs</h1>
                        </div>
                        <div className="countryName">
                          <h1>
                            {counteyName && counteyName.length > 0
                              ? counteyName[1]?.runnerName
                              : ""}
                          </h1>
                        </div>
                        <div class="section_heading streaming stram_live">
                          <p className="btn btn-primary" onClick={toggleShow}>
                            <i
                              class="fa fa-television"
                              style={{ color: "white" }}
                            ></i>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="">
                    <iframe
                      allowfullscreen="true"
                      style={{
                        width: "100%",
                        height: "210px",
                        border: "none",
                        opacity: "1",
                        visibility: "visible",
                      }}
                      id="frame_video"
                      // https://nikhilm.gq/bettingapi/matchtv_v1.php?Action=match&EventID=32473058
                      src={`https://internal-consumer-apis.jmk888.com/go-score/template/2/${id}`}
                    ></iframe>

                    <br />
                  </div>

                  {show && (
                    <div class="live_video streaming">
                      <iframe
                        allowfullscreen="true"
                        style={{
                          width: "100%",
                          height: "210px",
                          border: "none",
                          opacity: "1",
                          visibility: "visible",
                        }}
                        id="frame_video"
                        // https://nikhilm.gq/bettingapi/matchtv_v1.php?Action=match&EventID=32473058
                        src={`https://stream.1ex99.com/tv?EventId=${id}`}
                      ></iframe>
                    </div>
                  )}

                  {/* <div >{mappedArray}</div>; */}

                  {/* <!-----================match odds row============------> */}
                  <div class="bars_bg">
                    <div class="row">
                      <div className="col-4">
                        <div className="section_heading">
                          <h2 style={{ padding: "5px" }}>Match Odds</h2>
                        </div>
                      </div>
                      <div className="col-4">
                        <div className="section_heading">
                          <h2>
                            {moment(date_time).format("DD/MM/YYYY h:m:s A")}
                          </h2>
                        </div>
                      </div>
                      <div className="col-4">
                        <div className="section_heading">
                          <h2>Maximum Bet 1500K</h2>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Box
                    sx={{
                      width: "100%",
                      backgroundImage:
                        "radial-gradient(circle farthest-corner at 83.7% 4.3%,rgba(173,0,171,.72) 0,#0d3c71 90%)",
                    }}
                  >
                    <Box
                      sx={{ borderBottom: 1, borderColor: "divider" }}
                      className=""
                    ></Box>

{showMatchOdds ? (
                          <div className="match_odds_table">
                            <div className="table-responsive-sm">
                              <table className="table table-borderless">
                                <tbody>
                                  <tr>
                                    <td className="min_width">
                                      <div className="td1">
                                        <h4></h4>
                                        <p></p>
                                      </div>
                                    </td>
                                    <td className="td_width display">
                                      <div className="td_item tdbg1 dp">
                                        <h4></h4>
                                        <p></p>
                                      </div>
                                    </td>
                                    <td className="td_width display">
                                      <div className="td_item tdbg2 dp">
                                        <h4></h4>
                                        <p></p>
                                      </div>
                                    </td>
                                    <td className="td_width">
                                      <div className="td_item tdbg3">
                                        <h4>BACK</h4>
                                      </div>
                                    </td>
                                    <td className="td_width">
                                      <div className="td_item tdbg4">
                                        <h4>LAY</h4>
                                      </div>
                                    </td>
                                    <td className="td_width display">
                                      <div className="td_item tdbg5 dp">
                                        <h4></h4>
                                        <p></p>
                                      </div>
                                    </td>
                                    <td className="td_width display">
                                      <div className="td_item tdbg6 dp">
                                        <h4></h4>
                                        <p></p>
                                      </div>
                                    </td>
                                  </tr>

                                  <tr>
                                    <td className="min_width">
                                      <div className="td1">
                                        <h4>
                                          {counteyName && counteyName.length > 0
                                            ? counteyName[0]?.runnerName
                                            : ""}
                                             {odd1Stack !== 0 && (
  <span style={{ color: odd1Stack > 0 ? "green" : "red" }}>
    {odd1Stack}
  </span>
)}

                                        </h4>
                                      </div>
                                    </td>
                                    {isNaN(t1[2]?.price) ? (
                                      <td className="td_width pp display">
                                        <div className="td_item tdbg1  tdw1">
                                          <h4></h4>
                                          <p></p>
                                        </div>
                                      </td>
                                    ) : (
                                      <td className="td_width display">
                                        <div
                                          className="td_item tdbg1 tdw1"
                                          onClick={() =>
                                            BetValue(
                                              t1[2]?.price,
                                              counteyName[0]?.runnerName,
                                              "Match Odds",
                                              "back",
                                              sus.selectionId,
                                              "Match Odds",
                                              0,
                                              0,
                                              0,
                                              0,
                                              t1[2]?.size,
                                              t1[2]?.price,
                                              0,
                                              0,
                                              sus.status,
                                              0,
                                              counteyName[0]?.runnerName
                                            )
                                          }
                                        >
                                          <h4>{t1[2]?.price}</h4>
                                          {t1[2]?.size < 1000 ? (
                                            <p>{t1[2]?.size}</p>
                                          ) : (
                                            <p>
                                              {(t1[2]?.size / 1000).toFixed(1)}K
                                            </p>
                                          )}
                                        </div>
                                      </td>
                                    )}
                                    {isNaN(t1[1]?.price) ? (
                                      <td className="td_width pp display">
                                        <div className="td_item tdbg1  tdw1">
                                          <h4></h4>
                                          <p></p>
                                        </div>
                                      </td>
                                    ) : (
                                      <td className="td_width display">
                                        <div
                                          className="td_item tdbg2  tdw1"
                                          onClick={() =>
                                            BetValue(
                                              t1[1]?.price,
                                              counteyName[0]?.runnerName,
                                              "Match Odds",
                                              "back",
                                              sus.selectionId,
                                              "Match Odds",
                                              0,
                                              0,
                                              0,
                                              0,
                                              t1[1]?.size,
                                              t1[1]?.price,
                                              0,
                                              0,
                                              sus.status,
                                              0,
                                              counteyName[0]?.runnerName
                                            )
                                          }
                                        >
                                          <h4>{t1[1]?.price}</h4>
                                          {t1[1]?.size < 1000 ? (
                                            <p>{t1[1]?.size}</p>
                                          ) : (
                                            <p>
                                              {(t1[1]?.size / 1000).toFixed(1)}K
                                            </p>
                                          )}
                                        </div>
                                      </td>
                                    )}
                                    {isNaN(t1[0]?.price) ? (
                                      <td className="td_width pp">
                                        <div className="td_item tdbg1">
                                          <h4></h4>
                                          <p></p>
                                        </div>
                                      </td>
                                    ) : (
                                      <td className="td_width">
                                        <div
                                          className="td_item tdbg3"
                                          onClick={() =>
                                            BetValue(
                                              t1[0]?.price,
                                              counteyName[0]?.runnerName,
                                              "Match Odds",
                                              "back",
                                              sus.selectionId,
                                              "Match Odds",
                                              0,
                                              0,
                                              0,
                                              0,
                                              t1[0]?.size,
                                              t1[0]?.price,
                                              0,
                                              0,
                                              sus.status,
                                              0,
                                              counteyName[0]?.runnerName
                                            )
                                          }
                                        >
                                          <h4>{t1[0]?.price}</h4>
                                          {t1[0]?.size < 1000 ? (
                                            <p>{t1[0]?.size}</p>
                                          ) : (
                                            <p>
                                              {(t1[0]?.size / 1000).toFixed(1)}K
                                            </p>
                                          )}
                                        </div>
                                      </td>
                                    )}
                                    {isNaN(t2[0]?.price) ? (
                                      <td className="td_width pp1">
                                        <div className="td_item tdbg4">
                                          <h4></h4>
                                          <p></p>
                                        </div>
                                      </td>
                                    ) : (
                                      <td className="td_width">
                                        <div
                                          className="td_item tdbg4"
                                          onClick={() =>
                                            BetValue(
                                              t2[0]?.price,
                                              counteyName[0]?.runnerName,
                                              "Match Odds",
                                              "lay",
                                              sus.selectionId,
                                              "Match Odds",
                                              0,
                                              0,
                                              0,
                                              0,
                                              t2[0]?.size,
                                              t2[0]?.price,
                                              0,
                                              0,
                                              sus.status,
                                              0,
                                              counteyName[1]?.runnerName
                                            )
                                          }
                                        >
                                          <h4>{t2[0]?.price}</h4>
                                          {t2[0]?.size < 1000 ? (
                                            <p>{t2[0]?.size}</p>
                                          ) : (
                                            <p>
                                              {(t2[0]?.size / 1000).toFixed(1)}K
                                            </p>
                                          )}
                                        </div>
                                      </td>
                                    )}
                                    {isNaN(t2[1]?.price) ? (
                                      <td className="td_width pp1 display">
                                        <div className="td_item tdbg4  tdw1">
                                          <h4></h4>
                                          <p></p>
                                        </div>
                                      </td>
                                    ) : (
                                      <td className="td_width display">
                                        <div
                                          className="td_item tdbg5  tdw1"
                                          onClick={() =>
                                            BetValue(
                                              t2[1]?.price,
                                              counteyName[0]?.runnerName,
                                              "Match Odds",
                                              "lay",
                                              sus.selectionId,
                                              "Match Odds",
                                              0,
                                              0,
                                              0,
                                              0,
                                              t2[1]?.size,
                                              t2[1]?.price,
                                              0,
                                              0,
                                              sus.status,
                                              0,
                                              counteyName[1]?.runnerName
                                            )
                                          }
                                        >
                                          <h4>{t2[1]?.price}</h4>
                                          {isNaN(t2[1]?.size) ? (
                                            <p></p>
                                          ) : t2[1]?.size < 1000 ? (
                                            <p>{t2[1]?.size}</p>
                                          ) : (
                                            <p>
                                              {(t2[1]?.size / 1000).toFixed(1)}K
                                            </p>
                                          )}
                                        </div>
                                      </td>
                                    )}
                                    {isNaN(t2[2]?.price) ? (
                                      <td className="td_width pp1 display">
                                        <div className="td_item tdbg4  tdw1">
                                          <h4></h4>
                                          <p></p>
                                        </div>
                                      </td>
                                    ) : (
                                      <td className="td_width display">
                                        <div
                                          className="td_item tdbg6  tdw1"
                                          onClick={() =>
                                            BetValue(
                                              t2[2]?.price,
                                              counteyName[0]?.runnerName,
                                              "Match Odds",
                                              "lay",
                                              sus.selectionId,
                                              "Match Odds",
                                              0,
                                              0,
                                              0,
                                              0,
                                              t2[2]?.size,
                                              t2[2]?.price,
                                              0,
                                              0,
                                              sus.status,
                                              0,
                                              counteyName[1]?.runnerName
                                            )
                                          }
                                        >
                                          <h4>{t2[2]?.price}</h4>
                                          {t2[2]?.size < 1000 ? (
                                            <p>{t2[2]?.size}</p>
                                          ) : (
                                            <p>
                                              {(t2[2]?.size / 1000).toFixed(1)}K
                                            </p>
                                          )}
                                        </div>
                                      </td>
                                    )}
                                  </tr>

                                  <tr>
                                    <td className="min_width">
                                      <div className="td1">
                                        <h4>
                                          {counteyName && counteyName.length > 0
                                            ? counteyName[1]?.runnerName
                                            : ""}
                                             {odd2Stack !== 0 && (
  <span style={{ color: odd2Stack > 0 ? "green" : "red" }}>
    {odd2Stack}
  </span>
)}

                                        </h4>
                                      </div>
                                    </td>
                                    {isNaN(t3[2]?.price) ? (
                                      <td className="td_width pp display">
                                        <div className="td_item tdbg1  tdw1">
                                          <h4></h4>
                                          <p></p>
                                        </div>
                                      </td>
                                    ) : (
                                      <td className="td_width display">
                                        <div
                                          className="td_item tdbg1 tdw1"
                                          onClick={() =>
                                            BetValue(
                                              t3[2]?.price,
                                              counteyName[1]?.runnerName,
                                              "Match Odds",
                                              "back",
                                              sus1.selectionId,
                                              "Match Odds",
                                              0,
                                              0,
                                              0,
                                              0,
                                              t3[2]?.size,
                                              t3[2]?.price,
                                              0,
                                              0,
                                              sus1.status,
                                              0,
                                              counteyName[1]?.runnerName
                                            )
                                          }
                                        >
                                          <h4>{t3[2]?.price}</h4>
                                          {t3[2]?.size < 1000 ? (
                                            <p>{t3[2]?.size}</p>
                                          ) : (
                                            <p>
                                              {(t3[2]?.size / 1000).toFixed(1)}K
                                            </p>
                                          )}
                                        </div>
                                      </td>
                                    )}
                                    {isNaN(t3[1]?.price) ? (
                                      <td className="td_width pp display">
                                        <div className="td_item tdbg1  tdw1">
                                          <h4></h4>
                                          <p></p>
                                        </div>
                                      </td>
                                    ) : (
                                      <td className="td_width display">
                                        <div
                                          className="td_item tdbg2  tdw1"
                                          onClick={() =>
                                            BetValue(
                                              t3[1]?.price,
                                              counteyName[1]?.runnerName,
                                              "Match Odds",
                                              "back",
                                              sus1.selectionId,
                                              "Match Odds",
                                              0,
                                              0,
                                              0,
                                              0,
                                              t3[1]?.size,
                                              t3[1]?.price,
                                              0,
                                              0,
                                              sus1.status,
                                              0,
                                              counteyName[1]?.runnerName
                                            )
                                          }
                                        >
                                          <h4>{t3[1]?.price}</h4>
                                          {t3[1]?.size < 1000 ? (
                                            <p>{t3[1]?.size}</p>
                                          ) : (
                                            <p>
                                              {(t3[1]?.size / 1000).toFixed(1)}K
                                            </p>
                                          )}
                                        </div>
                                      </td>
                                    )}
                                    {isNaN(t3[0]?.price) ? (
                                      <td className="td_width pp">
                                        <div className="td_item tdbg1">
                                          <h4></h4>
                                          <p></p>
                                        </div>
                                      </td>
                                    ) : (
                                      <td className="td_width">
                                        <div
                                          className="td_item tdbg3"
                                          onClick={() =>
                                            BetValue(
                                              t3[0]?.price,
                                              counteyName[1]?.runnerName,
                                              "Match Odds",
                                              "back",
                                              sus1.selectionId,
                                              "Match Odds",
                                              0,
                                              0,
                                              0,
                                              0,
                                              t3[0]?.size,
                                              t3[0]?.price,
                                              0,
                                              0,
                                              sus1.status,
                                              0,
                                              counteyName[1]?.runnerName
                                            )
                                          }
                                        >
                                          <h4>{t3[0]?.price}</h4>
                                          {t3[0]?.size < 1000 ? (
                                            <p>{t3[0]?.size}</p>
                                          ) : (
                                            <p>
                                              {(t3[0]?.size / 1000).toFixed(1)}K
                                            </p>
                                          )}
                                        </div>
                                      </td>
                                    )}
                                    {isNaN(t4[0]?.price) ? (
                                      <td className="td_width pp1 display">
                                        <div className="td_item tdbg4">
                                          <h4></h4>
                                          <p></p>
                                        </div>
                                      </td>
                                    ) : (
                                      <td className="td_width">
                                        <div
                                          className="td_item tdbg4"
                                          onClick={() =>
                                            BetValue(
                                              t4[0]?.price,
                                              counteyName[1]?.runnerName,
                                              "Match Odds",
                                              "lay",
                                              sus1.selectionId,
                                              "Match Odds",
                                              0,
                                              0,
                                              0,
                                              0,
                                              t4[0]?.size,
                                              t4[0]?.price,
                                              0,
                                              0,
                                              sus1.status,
                                              0,
                                              counteyName[0]?.runnerName
                                            )
                                          }
                                        >
                                          <h4>{t4[0]?.price}</h4>
                                          {t4[0]?.size < 1000 ? (
                                            <p>{t4[0]?.size}</p>
                                          ) : (
                                            <p>
                                              {(t4[0]?.size / 1000).toFixed(1)}K
                                            </p>
                                          )}
                                        </div>
                                      </td>
                                    )}
                                    {isNaN(t4[1]?.price) ? (
                                      <td className="td_width pp1 display">
                                        <div className="td_item tdbg4  tdw1">
                                          <h4></h4>
                                          <p></p>
                                        </div>
                                      </td>
                                    ) : (
                                      <td className="td_width display">
                                        <div
                                          className="td_item tdbg5  tdw1"
                                          onClick={() =>
                                            BetValue(
                                              t4[1]?.price,
                                              counteyName[1]?.runnerName,
                                              "Match Odds",
                                              "lay",
                                              sus1.selectionId,
                                              "Match Odds",
                                              0,
                                              0,
                                              0,
                                              0,
                                              t4[1]?.size,
                                              t4[1]?.price,
                                              0,
                                              0,
                                              sus1.status,
                                              0,
                                              counteyName[0]?.runnerName
                                            )
                                          }
                                        >
                                          <h4>{t4[1]?.price}</h4>
                                          {t4[1]?.size < 1000 ? (
                                            <p>{t4[1]?.size}</p>
                                          ) : (
                                            <p>
                                              {(t4[1]?.size / 1000).toFixed(1)}K
                                            </p>
                                          )}
                                        </div>
                                      </td>
                                    )}
                                    {isNaN(t4[2]?.price) ? (
                                      <td className="td_width pp1 display">
                                        <div className="td_item tdbg4  tdw1">
                                          <h4></h4>
                                          <p></p>
                                        </div>
                                      </td>
                                    ) : (
                                      <td className="td_width display">
                                        <div
                                          className="td_item tdbg6  tdw1"
                                          onClick={() =>
                                            BetValue(
                                              t4[2]?.price,
                                              counteyName[1]?.runnerName,
                                              "Match Odds",
                                              "lay",
                                              sus1.selectionId,
                                              "Match Odds",
                                              0,
                                              0,
                                              0,
                                              0,
                                              t4[2]?.size,
                                              t4[2]?.price,
                                              0,
                                              0,
                                              sus1.status,
                                              0,
                                              counteyName[0]?.runnerName
                                            )
                                          }
                                        >
                                          <h4>{t4[2]?.price}</h4>
                                          {t4[2]?.size < 1000 ? (
                                            <p>{t4[2]?.size}</p>
                                          ) : (
                                            <p>
                                              {(t4[2]?.size / 1000).toFixed(1)}K
                                            </p>
                                          )}
                                        </div>
                                      </td>
                                    )}
                                  </tr>
                                </tbody>{" "}
                              </table>
                              <marquee
                                id="marquee1"
                                direction="left"
                                scrollamount="4"
                                onMouseOver={stop}
                                onMouseOut={start}
                                className="text-danger"
                              >
                                England V Ireland: Advance Match Bets Started
                                Started in our Exchange 🏏
                              </marquee>
                            </div>
                          </div>
                        ) : (
                          <div id="fancy" class="tab-pane active">
                            <div class="fancy-market">
                              <div class="fancy-message col-12 mt-1">
                                No real-time records found
                              </div>
                            </div>
                          </div>
                        )}

                    

                  </Box>
                </div>
              </div>

              <div class="col-md-4 bet_icon ">
                <div class="section_bg" id="bettingSection">
                  <div class="bars_bg live_stream">
                    <div class="row">
                      <div class="col-md-6">
                        <div class="section_heading">
                          <h2>Live Match</h2>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="section_heading" id="video_tab">
                          <p>
                            <i class="fa fa-television"></i> live stream started
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    class="live_video video_tab_pan"
                    style={{ display: "none" }}
                  >


                    <iframe
                      allowfullscreen="true"
                      style={{
                        width: "100%",
                        height: "210px",
                        border: "none",
                        opacity: "1",
                        visibility: "visible",
                      }}
                      id="frame_video"
                      // https://nikhilm.gq/bettingapi/matchtv_v1.php?Action=match&EventID=32473058
                      src={`https://stream.1ex99.com/tv?EventId=${id}`}
                    ></iframe>
                  </div>
                  {userId !== "286428" && (
                    <>
                      <div className="kk22">
                        <h6 className="card-title d-inline-block ">
                          Place Bet
                        </h6>
                      </div>
                      {back == "back" ? (
                        <div className="Back_color" ref={popupRef}>
                          <div className="row">
                            <div
                              className="card m-b-8 place-bet "
                              id="betting_data"
                            >
                              <div
                                _ngcontent-hvs-c85=""
                                className="card-header "
                              ></div>
                              {showPopup ? (
                                <div>
                                  <div
                                    className="card-body table-responsive hide-box-click ng-tns-c85-1 back-color ng-star-inserted"
                                    style={{ paddingBottom: "4px;" }}
                                  >
                                    {/* <form _ngcontent-hvs-c85="" novalidate="" method="post" id="frm_placebet" action="" className="ng-tns-c85-1 ng-untouched ng-pristine ng-valid" /> */}

                                    <table className="coupon-table table table-borderedless ng-tns-c85-1">
                                      <thead
                                        _ngcontent-hvs-c85=""
                                        className="ng-tns-c85-1"
                                      >
                                        <tr
                                          _ngcontent-hvs-c85=""
                                          className="ng-tns-c85-1"
                                        >
                                          <th
                                            style={{
                                              width: "35%",
                                              textAlign: "left",
                                            }}
                                            className="ng-tns-c85-1"
                                          >
                                            (Bet for)
                                          </th>
                                          <th
                                            style={{
                                              width: "25%",
                                              textAlign: "left;",
                                            }}
                                            className="ng-tns-c85-1"
                                          >
                                            odds{" "}
                                          </th>
                                          <th
                                            style={{
                                              width: "15%",
                                              textAlign: "left",
                                            }}
                                            className="ng-tns-c85-1"
                                          >
                                            Stake
                                          </th>
                                          <th
                                            id="profit-head"
                                            style={{
                                              width: "15%",
                                              textAlign: "right",
                                            }}
                                            className="ng-tns-c85-1"
                                          >
                                            {" "}
                                            Profit{" "}
                                          </th>
                                        </tr>
                                      </thead>
                                      <tbody
                                        _ngcontent-hvs-c85=""
                                        className="ng-tns-c85-1"
                                      >
                                        <tr
                                          _ngcontent-hvs-c85=""
                                          className="ng-tns-c85-1"
                                        >
                                          <td
                                            id="team_nm"
                                            className=" country_color ng-tns-c85-1"
                                          >
                                            {country}
                                          </td>
                                          <td
                                            style={{ width: "75px" }}
                                            className="ng-tns-c85-1"
                                          >
                                            <div className="form-group ng-tns-c85-1">
                                              <input
                                                placeholder="0"
                                                name="odds"
                                                type="text"
                                                required=""
                                                value={dataValue}
                                                id="odds"
                                                readonly=""
                                                className="amountint ng-tns-c85-1 ng-untouched ng-pristine ng-valid"
                                                style={{
                                                  width: "45px",
                                                  verticalAlign: "middle",
                                                }}
                                              />
                                            </div>
                                          </td>
                                          <td
                                            _ngcontent-hvs-c85=""
                                            className="ng-tns-c85-1"
                                          >
                                            <div className="form-group bet-stake ng-tns-c85-1">
                                              <input
                                                id="btn_val"
                                                required=""
                                                value={betValue}
                                                type="text"
                                                readOnly
                                                onChange={(e) =>
                                                  setbetValue(e.target.value)
                                                }
                                                // autocomplete="off"
                                                style={{ width: "82px" }}
                                                className="ng-tns-c85-1 ng-untouched ng-pristine ng-valid"
                                              />
                                            </div>
                                          </td>
                                          <td
                                            id="prft"
                                            className="text-right ng-tns-c85-1 ng-star-inserted"
                                            style={{ color: "#fff" }}
                                          >
                                            {" "}
                                            {profitBal}
                                          </td>
                                        </tr>
                                        <tr
                                          _ngcontent-hvs-c85=""
                                          className="ng-tns-c85-1"
                                        >
                                          <td
                                            colspan="5"
                                            className="value-buttons ng-tns-c85-1"
                                            style={{ padding: "5px;" }}
                                          >
                                            <button
                                              className="btn btn-success btn_dyn ng-tns-c85-1 ng-star-inserted"
                                              onClick={() =>
                                                handleClick("1000")
                                              }
                                              value="1000"
                                            >
                                              1000
                                            </button>
                                            <button
                                              className="btn btn-success btn_dyn ng-tns-c85-1 ng-star-inserted"
                                              onClick={() =>
                                                handleClick("2000")
                                              }
                                              value="2000"
                                            >
                                              2000
                                            </button>
                                            <button
                                              className="btn btn-success btn_dyn ng-tns-c85-1 ng-star-inserted"
                                              onClick={(value) =>
                                                handleClick(5000)
                                              }
                                              value="5000"
                                            >
                                              5000
                                            </button>
                                            <button
                                              className="btn btn-success btn_dyn ng-tns-c85-1 ng-star-inserted"
                                              onClick={(value) =>
                                                handleClick(10000)
                                              }
                                              value="10000"
                                            >
                                              10000
                                            </button>
                                            <button
                                              className="btn btn-success btn_dyn ng-tns-c85-1 ng-star-inserted"
                                              onClick={(value) =>
                                                handleClick(20000)
                                              }
                                              value="20000"
                                            >
                                              20000
                                            </button>
                                            <button
                                              className="btn btn-success btn_dyn ng-tns-c85-1 ng-star-inserted"
                                              onClick={(value) =>
                                                handleClick(50000)
                                              }
                                              value="50000"
                                            >
                                              50000
                                            </button>
                                            <button
                                              className="btn btn-success btn_dyn ng-tns-c85-1 ng-star-inserted"
                                              onClick={(value) =>
                                                handleClick(100000)
                                              }
                                              value="100000"
                                            >
                                              100000
                                            </button>
                                            <button
                                              className="btn btn-success btn_dyn ng-tns-c85-1 ng-star-inserted"
                                              onClick={(value) =>
                                                handleClick(250000)
                                              }
                                              value="250000"
                                            >
                                              250000
                                            </button>
                                            <button
                                              className="btn btn-success btn_dyn ng-tns-c85-1 ng-star-inserted"
                                              onClick={(value) =>
                                                handleClick(500000)
                                              }
                                              value="500000"
                                            >
                                              500000
                                            </button>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                    <div
                                      _ngcontent-hvs-c85=""
                                      className="col-md-12 ng-tns-c85-1"
                                    >
                                      <button
                                        type=""
                                        onClick={handleReset}
                                        className="btn btn-sm btn-danger float-left ng-tns-c85-1"
                                      >
                                        Reset
                                      </button>
                                      <button
                                        type="submit"
                                        id="submit_btn"
                                        onClick={() => Live_Bet_Api()}
                                        className="btn btn-sm btn-success float-right ng-tns-c85-1"
                                      >
                                        Submit
                                      </button>
                                      <input
                                        id="tmp_id"
                                        type="hidden"
                                        className="ng-tns-c85-1"
                                      />
                                      <input
                                        id="bet_section_id"
                                        type="hidden"
                                        className="ng-tns-c85-1"
                                      />
                                      <input
                                        id="bet_market_id"
                                        type="hidden"
                                        className="ng-tns-c85-1"
                                      />
                                      <input
                                        type="hidden"
                                        id="lst_update"
                                        value=""
                                        className="ng-tns-c85-1"
                                      />
                                      <input
                                        type="hidden"
                                        id="lst_update_lambi"
                                        value=""
                                        className="ng-tns-c85-1"
                                      />
                                    </div>
                                    {/* </form> */}
                                  </div>
                                </div>
                              ) : null}
                            </div>
                          </div>
                        </div>
                      ) : back == "lay" ? (
                        <div className="Lay_color " ref={popupRef}>
                          <div className="row">
                            <div
                              className="card m-b-10 place-bet "
                              id="betting_data"
                            >
                              {/* <div _ngcontent-hvs-c85="" className="card-header ">
                            <h6
                              className="card-title d-inline-block 
                            "
                            >
                              Place Bet
                            </h6>
                          </div> */}
                              {showPopup ? (
                                <>
                                  <input
                                    type="hidden"
                                    id="back-lay"
                                    value=""
                                    className="ng-tns-c85-1"
                                  />
                                  <ngx-spinner
                                    bdcolor="rgba(51,51,51,0.8)"
                                    size="medium"
                                    color="#fff"
                                    type="ball-scale-multiple"
                                    _nghost-hvs-c75=""
                                    className="ng-tns-c75-2 ng-tns-c85-1 ng-star-inserted"
                                  ></ngx-spinner>
                                  <div
                                    className="card-body table-responsive hide-box-click ng-tns-c85-1 back-color ng-star-inserted"
                                    style={{ paddingBottom: "4px;" }}
                                  >
                                    {/* <form _ngcontent-hvs-c85="" novalidate="" method="post" id="frm_placebet" action="" className="ng-tns-c85-1 ng-untouched ng-pristine ng-valid" /> */}

                                    <table className="coupon-table table table-borderedless ng-tns-c85-1">
                                      <thead
                                        _ngcontent-hvs-c85=""
                                        className="ng-tns-c85-1"
                                      >
                                        <tr
                                          _ngcontent-hvs-c85=""
                                          className="ng-tns-c85-1"
                                        >
                                          <th
                                            style={{
                                              width: "35%",
                                              textAlign: "left",
                                            }}
                                            className="ng-tns-c85-1"
                                          >
                                            (Bet for)
                                          </th>
                                          <th
                                            style={{
                                              width: "25%",
                                              textAlign: "left;",
                                            }}
                                            className="ng-tns-c85-1"
                                          >
                                            odds{" "}
                                          </th>
                                          <th
                                            style={{
                                              width: "15%",
                                              textAlign: "left",
                                            }}
                                            className="ng-tns-c85-1"
                                          >
                                            Stake
                                          </th>
                                          <th
                                            id="profit-head"
                                            style={{
                                              width: "15%",
                                              textAlign: "right",
                                            }}
                                            className="ng-tns-c85-1"
                                          >
                                            {" "}
                                            Profit{" "}
                                          </th>
                                        </tr>
                                      </thead>
                                      <tbody
                                        _ngcontent-hvs-c85=""
                                        className="ng-tns-c85-1"
                                      >
                                        <tr
                                          _ngcontent-hvs-c85=""
                                          className="ng-tns-c85-1"
                                        >
                                          <td
                                            id="team_nm"
                                            className=" country_color ng-tns-c85-1"
                                          >
                                            {country}
                                          </td>
                                          <td
                                            style={{ width: "75px" }}
                                            className="ng-tns-c85-1"
                                          >
                                            <div className="form-group ng-tns-c85-1">
                                              <input
                                                placeholder="0"
                                                name="odds"
                                                type="text"
                                                required=""
                                                value={dataValue}
                                                id="odds"
                                                readonly=""
                                                className="amountint ng-tns-c85-1 ng-untouched ng-pristine ng-valid"
                                                style={{
                                                  width: "45px",
                                                  verticalAlign: "middle",
                                                }}
                                              />
                                            </div>
                                          </td>
                                          <td
                                            _ngcontent-hvs-c85=""
                                            className="ng-tns-c85-1"
                                          >
                                            <div className="form-group bet-stake ng-tns-c85-1">
                                              <input
                                                id="btn_val"
                                                required=""
                                                value={betValue}
                                                readOnly
                                                type="text"
                                                // autocomplete="off"
                                                onChange={(e) =>
                                                  setbetValue(e.target.value)
                                                }
                                                style={{ width: "82px" }}
                                                className="ng-tns-c85-1 ng-untouched ng-pristine ng-valid"
                                              />
                                            </div>
                                          </td>
                                          <td
                                            id="prft"
                                            className="text-right ng-tns-c85-1 ng-star-inserted"
                                            style={{ color: "#fff" }}
                                          >
                                            {" "}
                                            {profitBal}
                                          </td>
                                        </tr>
                                        <tr
                                          _ngcontent-hvs-c85=""
                                          className="ng-tns-c85-1"
                                        >
                                          <td
                                            colspan="5"
                                            className="value-buttons ng-tns-c85-1"
                                            style={{ padding: "5px;" }}
                                          >
                                            <button
                                              className="btn btn-success btn_dyn ng-tns-c85-1 ng-star-inserted"
                                              onClick={() =>
                                                handleClick("1000")
                                              }
                                              value="1000"
                                            >
                                              1000
                                            </button>
                                            <button
                                              className="btn btn-success btn_dyn ng-tns-c85-1 ng-star-inserted"
                                              onClick={() =>
                                                handleClick("2000")
                                              }
                                              value="2000"
                                            >
                                              2000
                                            </button>
                                            <button
                                              className="btn btn-success btn_dyn ng-tns-c85-1 ng-star-inserted"
                                              onClick={(value) =>
                                                handleClick(5000)
                                              }
                                              value="5000"
                                            >
                                              5000
                                            </button>
                                            <button
                                              className="btn btn-success btn_dyn ng-tns-c85-1 ng-star-inserted"
                                              onClick={(value) =>
                                                handleClick(10000)
                                              }
                                              value="10000"
                                            >
                                              10000
                                            </button>
                                            <button
                                              className="btn btn-success btn_dyn ng-tns-c85-1 ng-star-inserted"
                                              onClick={(value) =>
                                                handleClick(20000)
                                              }
                                              value="20000"
                                            >
                                              20000
                                            </button>
                                            <button
                                              className="btn btn-success btn_dyn ng-tns-c85-1 ng-star-inserted"
                                              onClick={(value) =>
                                                handleClick(50000)
                                              }
                                              value="50000"
                                            >
                                              50000
                                            </button>
                                            <button
                                              className="btn btn-success btn_dyn ng-tns-c85-1 ng-star-inserted"
                                              onClick={(value) =>
                                                handleClick(100000)
                                              }
                                              value="100000"
                                            >
                                              100000
                                            </button>
                                            <button
                                              className="btn btn-success btn_dyn ng-tns-c85-1 ng-star-inserted"
                                              onClick={(value) =>
                                                handleClick(250000)
                                              }
                                              value="250000"
                                            >
                                              250000
                                            </button>
                                            <button
                                              className="btn btn-success btn_dyn ng-tns-c85-1 ng-star-inserted"
                                              onClick={(value) =>
                                                handleClick(500000)
                                              }
                                              value="500000"
                                            >
                                              500000
                                            </button>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                    <div
                                      _ngcontent-hvs-c85=""
                                      className="col-md-12 ng-tns-c85-1"
                                    >
                                      <button
                                        type=""
                                        onClick={handleReset}
                                        className="btn btn-sm btn-danger float-left ng-tns-c85-1"
                                      >
                                        Reset
                                      </button>
                                      <button
                                        type="submit"
                                        id="submit_btn"
                                        onClick={() => Live_Bet_Api()}
                                        className="btn btn-sm btn-success float-right ng-tns-c85-1"
                                      >
                                        Submit
                                      </button>
                                      <input
                                        id="tmp_id"
                                        type="hidden"
                                        className="ng-tns-c85-1"
                                      />
                                      <input
                                        id="bet_section_id"
                                        type="hidden"
                                        className="ng-tns-c85-1"
                                      />
                                      <input
                                        id="bet_market_id"
                                        type="hidden"
                                        className="ng-tns-c85-1"
                                      />
                                      <input
                                        type="hidden"
                                        id="lst_update"
                                        value=""
                                        className="ng-tns-c85-1"
                                      />
                                      <input
                                        type="hidden"
                                        id="lst_update_lambi"
                                        value=""
                                        className="ng-tns-c85-1"
                                      />
                                    </div>
                                    {/* </form> */}
                                  </div>
                                </>
                              ) : null}
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div
                          className="dp_none bars_bg"
                          ref={popupRef}
                          id="betting_data"
                        >
                          <div className="row">
                            <div
                              className="card m-b-10 place-bet "
                              id="betting_data"
                            >
                              {/* <div _ngcontent-hvs-c85="" className="card-header ">
                            <h6 className="card-title d-inline-block ">
                              Place Bet
                            </h6>
                          </div> */}
                              {showPopup ? (
                                <>
                                  <input
                                    type="hidden"
                                    id="back-lay"
                                    value=""
                                    className="ng-tns-c85-1"
                                  />
                                  <ngx-spinner
                                    bdcolor="rgba(51,51,51,0.8)"
                                    size="medium"
                                    color="#fff"
                                    type="ball-scale-multiple"
                                    _nghost-hvs-c75=""
                                    className="ng-tns-c75-2 ng-tns-c85-1 ng-star-inserted"
                                  ></ngx-spinner>
                                  <div
                                    className="card-body table-responsive hide-box-click ng-tns-c85-1 back-color ng-star-inserted"
                                    style={{ paddingBottom: "4px;" }}
                                  >
                                    {/* <form _ngcontent-hvs-c85="" novalidate="" method="post" id="frm_placebet" action="" className="ng-tns-c85-1 ng-untouched ng-pristine ng-valid" /> */}

                                    <table className="coupon-table table table-borderedless ng-tns-c85-1">
                                      <thead
                                        _ngcontent-hvs-c85=""
                                        className="ng-tns-c85-1"
                                      >
                                        <tr
                                          _ngcontent-hvs-c85=""
                                          className="ng-tns-c85-1"
                                        >
                                          <th
                                            style={{
                                              width: "35%",
                                              textAlign: "left",
                                            }}
                                            className="ng-tns-c85-1"
                                          >
                                            (Bet for)
                                          </th>
                                          <th
                                            style={{
                                              width: "25%",
                                              textAlign: "left;",
                                            }}
                                            className="ng-tns-c85-1"
                                          >
                                            odds{" "}
                                          </th>
                                          <th
                                            style={{
                                              width: "15%",
                                              textAlign: "left",
                                            }}
                                            className="ng-tns-c85-1"
                                          >
                                            Stake
                                          </th>
                                          <th
                                            id="profit-head"
                                            style={{
                                              width: "15%",
                                              textAlign: "right",
                                            }}
                                            className="ng-tns-c85-1"
                                          >
                                            {" "}
                                            Profit{" "}
                                          </th>
                                        </tr>
                                      </thead>
                                      <tbody
                                        _ngcontent-hvs-c85=""
                                        className="ng-tns-c85-1"
                                      >
                                        <tr
                                          _ngcontent-hvs-c85=""
                                          className="ng-tns-c85-1"
                                        >
                                          <td
                                            id="team_nm"
                                            className=" country_color ng-tns-c85-1"
                                          >
                                            {country}
                                          </td>
                                          <td
                                            style={{ width: "75px" }}
                                            className="ng-tns-c85-1"
                                          >
                                            <div className="form-group ng-tns-c85-1">
                                              <input
                                                placeholder="0"
                                                name="odds"
                                                type="text"
                                                required=""
                                                value={dataValue}
                                                id="odds"
                                                readonly=""
                                                className="amountint ng-tns-c85-1 ng-untouched ng-pristine ng-valid"
                                                style={{
                                                  width: "45px",
                                                  verticalAlign: "middle",
                                                }}
                                              />
                                            </div>
                                          </td>
                                          <td
                                            _ngcontent-hvs-c85=""
                                            className="ng-tns-c85-1"
                                          >
                                            <div className="form-group bet-stake ng-tns-c85-1">
                                              <input
                                                id="btn_val"
                                                required=""
                                                value={betValue}
                                                type="text"
                                                readOnly
                                                // autocomplete="off"
                                                onChange={(e) =>
                                                  setbetValue(e.target.value)
                                                }
                                                style={{ width: "82px" }}
                                                className="ng-tns-c85-1 ng-untouched ng-pristine ng-valid"
                                              />
                                            </div>
                                          </td>
                                          <td
                                            id="prft"
                                            className="text-right ng-tns-c85-1 ng-star-inserted"
                                            style={{ color: "#fff" }}
                                          >
                                            {" "}
                                            {profitBal}
                                          </td>
                                        </tr>
                                        <tr
                                          _ngcontent-hvs-c85=""
                                          className="ng-tns-c85-1"
                                        >
                                          <td
                                            colspan="5"
                                            className="value-buttons ng-tns-c85-1"
                                            style={{ padding: "5px;" }}
                                          >
                                            <button
                                              className="btn btn-success btn_dyn ng-tns-c85-1 ng-star-inserted"
                                              onClick={() =>
                                                handleClick("1000")
                                              }
                                              value="1000"
                                            >
                                              1000
                                            </button>
                                            <button
                                              className="btn btn-success btn_dyn ng-tns-c85-1 ng-star-inserted"
                                              onClick={() => handleClick(2000)}
                                              value="2000"
                                            >
                                              2000
                                            </button>
                                            <button
                                              className="btn btn-success btn_dyn ng-tns-c85-1 ng-star-inserted"
                                              onClick={(value) =>
                                                handleClick(5000)
                                              }
                                              value="5000"
                                            >
                                              5000
                                            </button>
                                            <button
                                              className="btn btn-success btn_dyn ng-tns-c85-1 ng-star-inserted"
                                              onClick={(value) =>
                                                handleClick(10000)
                                              }
                                              value="10000"
                                            >
                                              10000
                                            </button>
                                            <button
                                              className="btn btn-success btn_dyn ng-tns-c85-1 ng-star-inserted"
                                              onClick={(value) =>
                                                handleClick(20000)
                                              }
                                              value="20000"
                                            >
                                              20000
                                            </button>
                                            <button
                                              className="btn btn-success btn_dyn ng-tns-c85-1 ng-star-inserted"
                                              onClick={(value) =>
                                                handleClick(50000)
                                              }
                                              value="50000"
                                            >
                                              50000
                                            </button>
                                            <button
                                              className="btn btn-success btn_dyn ng-tns-c85-1 ng-star-inserted"
                                              onClick={(value) =>
                                                handleClick(100000)
                                              }
                                              value="100000"
                                            >
                                              100000
                                            </button>
                                            <button
                                              className="btn btn-success btn_dyn ng-tns-c85-1 ng-star-inserted"
                                              onClick={(value) =>
                                                handleClick(250000)
                                              }
                                              value="250000"
                                            >
                                              250000
                                            </button>
                                            <button
                                              className="btn btn-success btn_dyn ng-tns-c85-1 ng-star-inserted"
                                              onClick={(value) =>
                                                handleClick(500000)
                                              }
                                              value="500000"
                                            >
                                              500000
                                            </button>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                    <div
                                      _ngcontent-hvs-c85=""
                                      className="col-md-12 ng-tns-c85-1"
                                    >
                                      <button
                                        type=""
                                        onClick={handleReset}
                                        className="btn btn-sm btn-danger float-left ng-tns-c85-1"
                                      >
                                        Reset
                                      </button>
                                      <button
                                        type="submit"
                                        id="submit_btn"
                                        onClick={() => Live_Bet_Api()}
                                        className="btn btn-sm btn-success float-right ng-tns-c85-1"
                                      >
                                        Submit
                                      </button>
                                      <input
                                        id="tmp_id"
                                        type="hidden"
                                        className="ng-tns-c85-1"
                                      />
                                      <input
                                        id="bet_section_id"
                                        type="hidden"
                                        className="ng-tns-c85-1"
                                      />
                                      <input
                                        id="bet_market_id"
                                        type="hidden"
                                        className="ng-tns-c85-1"
                                      />
                                      <input
                                        type="hidden"
                                        id="lst_update"
                                        value=""
                                        className="ng-tns-c85-1"
                                      />
                                      <input
                                        type="hidden"
                                        id="lst_update_lambi"
                                        value=""
                                        className="ng-tns-c85-1"
                                      />
                                    </div>
                                    {/* </form> */}
                                  </div>
                                </>
                              ) : null}
                            </div>
                          </div>
                        </div>
                      )}



                      <Modal
                        isOpen={modalIsOpen}
                        className="mobile_popup"
                        onRequestClose={closeModal}
                      >
                        {back == "back" ? (
                          <div class="Back_color bars_bg">
                            <div class="row">
                              <div class="card m-b-10 place-bet ">
                                <div _ngcontent-hvs-c85="" class="card-header ">
                                  <h6 class="card-title d-inline-block ">
                                    Place Bet
                                  </h6>
                                  <button
                                    onClick={closeModal}
                                    className="close_button"
                                  >
                                    <img
                                      src="assets/images/xmark-solid.svg"
                                      width="100%"
                                      alt=""
                                    />
                                  </button>
                                </div>
                                {showPopup ? (
                                  <>
                                    <input
                                      type="hidden"
                                      id="back-lay"
                                      value=""
                                      class="ng-tns-c85-1"
                                    />
                                    <ngx-spinner
                                      bdcolor="rgba(51,51,51,0.8)"
                                      size="medium"
                                      color="#fff"
                                      type="ball-scale-multiple"
                                      _nghost-hvs-c75=""
                                      class="ng-tns-c75-2 ng-tns-c85-1 ng-star-inserted"
                                    ></ngx-spinner>
                                    <div
                                      class="card-body table-responsive hide-box-click ng-tns-c85-1 back-color ng-star-inserted"
                                      style={{ paddingBottom: "4px;" }}
                                    >
                                      {/* <form _ngcontent-hvs-c85="" novalidate="" method="post" id="frm_placebet" action="" class="ng-tns-c85-1 ng-untouched ng-pristine ng-valid" /> */}

                                      <table class="coupon-table table table-borderedless ng-tns-c85-1">
                                        <thead
                                          _ngcontent-hvs-c85=""
                                          class="ng-tns-c85-1"
                                        >
                                          <tr
                                            _ngcontent-hvs-c85=""
                                            class="ng-tns-c85-1"
                                          >
                                            <th
                                              style={{
                                                width: "35%",
                                                textAlign: "left",
                                              }}
                                              class="ng-tns-c85-1"
                                            >
                                              (Bet for)
                                            </th>
                                            <th
                                              style={{
                                                width: "25%",
                                                textAlign: "left;",
                                              }}
                                              class="ng-tns-c85-1"
                                            >
                                              odds{" "}
                                            </th>
                                            <th
                                              style={{
                                                width: "15%",
                                                textAlign: "left",
                                              }}
                                              class="ng-tns-c85-1"
                                            >
                                              Stake
                                            </th>
                                            <th
                                              id="profit-head"
                                              style={{
                                                width: "15%",
                                                textAlign: "right",
                                              }}
                                              class="ng-tns-c85-1"
                                            >
                                              {" "}
                                              Profit{" "}
                                            </th>
                                          </tr>
                                        </thead>
                                        <tbody
                                          _ngcontent-hvs-c85=""
                                          class="ng-tns-c85-1"
                                        >
                                          <tr
                                            _ngcontent-hvs-c85=""
                                            class="ng-tns-c85-1"
                                          >
                                            <td
                                              id="team_nm"
                                              class=" country_color ng-tns-c85-1"
                                            >
                                              {country}
                                            </td>
                                            <td
                                              style={{ width: "75px" }}
                                              class="ng-tns-c85-1"
                                            >
                                              <div class="form-group ng-tns-c85-1">
                                                <input
                                                  placeholder="0"
                                                  name="odds"
                                                  type="text"
                                                  required=""
                                                  value={dataValue}
                                                  id="odds"
                                                  readonly=""
                                                  class="amountint ng-tns-c85-1 ng-untouched ng-pristine ng-valid"
                                                  style={{
                                                    width: "45px",
                                                    verticalAlign: "middle",
                                                  }}
                                                />
                                              </div>
                                            </td>
                                            <td
                                              _ngcontent-hvs-c85=""
                                              class="ng-tns-c85-1"
                                            >
                                              <div class="form-group bet-stake ng-tns-c85-1">
                                                <input
                                                  id="btn_val"
                                                  required=""
                                                  value={betValue}
                                                  type="text"
                                                  // autocomplete="off"
                                                  onChange={(e) =>
                                                    setbetValue(e.target.value)
                                                  }
                                                  style={{ width: "82px" }}
                                                  class="ng-tns-c85-1 ng-untouched ng-pristine ng-valid"
                                                />
                                              </div>
                                            </td>
                                            <td
                                              id="prft"
                                              class="text-right ng-tns-c85-1 ng-star-inserted"
                                              style={{ color: "#fff" }}
                                            >
                                              {" "}
                                              {profitBal}
                                            </td>
                                          </tr>
                                          <tr
                                            _ngcontent-hvs-c85=""
                                            class="ng-tns-c85-1"
                                          >
                                            <td
                                              colspan="5"
                                              class="value-buttons ng-tns-c85-1"
                                              style={{ padding: "5px;" }}
                                            >
                                              <button
                                                class="btn btn-success btn_dyn ng-tns-c85-1 ng-star-inserted"
                                                onClick={() => handleClick("1000")}
                                                value="1000"
                                              >
                                                1000
                                              </button>
                                              <button
                                                class="btn btn-success btn_dyn ng-tns-c85-1 ng-star-inserted"
                                                onClick={() => handleClick("2000")}
                                                value="2000"
                                              >
                                                2000
                                              </button>
                                              <button
                                                class="btn btn-success btn_dyn ng-tns-c85-1 ng-star-inserted"
                                                onClick={(value) =>
                                                  handleClick(5000)
                                                }
                                                value="5000"
                                              >
                                                5000
                                              </button>
                                              <button
                                                class="btn btn-success btn_dyn ng-tns-c85-1 ng-star-inserted"
                                                onClick={(value) =>
                                                  handleClick(10000)
                                                }
                                                value="10000"
                                              >
                                                10000
                                              </button>
                                              <button
                                                class="btn btn-success btn_dyn ng-tns-c85-1 ng-star-inserted"
                                                onClick={(value) =>
                                                  handleClick(20000)
                                                }
                                                value="20000"
                                              >
                                                20000
                                              </button>
                                              <button
                                                class="btn btn-success btn_dyn ng-tns-c85-1 ng-star-inserted"
                                                onClick={(value) =>
                                                  handleClick(50000)
                                                }
                                                value="50000"
                                              >
                                                50000
                                              </button>
                                              <button
                                                class="btn btn-success btn_dyn ng-tns-c85-1 ng-star-inserted"
                                                onClick={(value) =>
                                                  handleClick(100000)
                                                }
                                                value="100000"
                                              >
                                                100000
                                              </button>
                                              <button
                                                class="btn btn-success btn_dyn ng-tns-c85-1 ng-star-inserted"
                                                onClick={(value) =>
                                                  handleClick(250000)
                                                }
                                                value="250000"
                                              >
                                                250000
                                              </button>
                                              <button
                                                class="btn btn-success btn_dyn ng-tns-c85-1 ng-star-inserted"
                                                onClick={(value) =>
                                                  handleClick(500000)
                                                }
                                                value="500000"
                                              >
                                                500000
                                              </button>

                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                      <div
                                        _ngcontent-hvs-c85=""
                                        class="col-md-12 ng-tns-c85-1"
                                      >
                                        <button
                                          type=""
                                          onClick={handleReset}
                                          class="btn btn-sm btn-danger float-left ng-tns-c85-1"
                                        >
                                          Reset
                                        </button>
                                        <button
                                          type="submit"
                                          id="submit_btn"
                                          onClick={() => Live_Bet_Api()}
                                          class="btn btn-sm btn-success float-right ng-tns-c85-1"
                                        >
                                          Submit
                                        </button>
                                        <input
                                          id="tmp_id"
                                          type="hidden"
                                          class="ng-tns-c85-1"
                                        />
                                        <input
                                          id="bet_section_id"
                                          type="hidden"
                                          class="ng-tns-c85-1"
                                        />
                                        <input
                                          id="bet_market_id"
                                          type="hidden"
                                          class="ng-tns-c85-1"
                                        />
                                        <input
                                          type="hidden"
                                          id="lst_update"
                                          value=""
                                          class="ng-tns-c85-1"
                                        />
                                        <input
                                          type="hidden"
                                          id="lst_update_lambi"
                                          value=""
                                          class="ng-tns-c85-1"
                                        />
                                      </div>
                                      {/* </form> */}
                                    </div>
                                  </>
                                ) : null}
                              </div>
                            </div>
                          </div>
                        ) : back == "lay" ? (
                          <div class="Lay_color bars_bg">
                            <div class="row">
                              <div class="card m-b-10 place-bet ">
                                <div _ngcontent-hvs-c85="" class="card-header ">
                                  <h6 class="card-title d-inline-block ">
                                    Place Bet
                                  </h6>
                                  <button
                                    onClick={closeModal}
                                    className="close_button"
                                  >
                                    <img
                                      src="assets/images/xmark-solid.svg"
                                      width="100%"
                                      alt=""
                                    />
                                  </button>
                                </div>
                                {showPopup ? (
                                  <>
                                    <input
                                      type="hidden"
                                      id="back-lay"
                                      value=""
                                      class="ng-tns-c85-1"
                                    />
                                    <ngx-spinner
                                      bdcolor="rgba(51,51,51,0.8)"
                                      size="medium"
                                      color="#fff"
                                      type="ball-scale-multiple"
                                      _nghost-hvs-c75=""
                                      class="ng-tns-c75-2 ng-tns-c85-1 ng-star-inserted"
                                    ></ngx-spinner>
                                    <div
                                      class="card-body table-responsive hide-box-click ng-tns-c85-1 back-color ng-star-inserted"
                                      style={{ paddingBottom: "4px;" }}
                                    >
                                      {/* <form _ngcontent-hvs-c85="" novalidate="" method="post" id="frm_placebet" action="" class="ng-tns-c85-1 ng-untouched ng-pristine ng-valid" /> */}

                                      <table class="coupon-table table table-borderedless ng-tns-c85-1">
                                        <thead
                                          _ngcontent-hvs-c85=""
                                          class="ng-tns-c85-1"
                                        >
                                          <tr
                                            _ngcontent-hvs-c85=""
                                            class="ng-tns-c85-1"
                                          >
                                            <th
                                              style={{
                                                width: "35%",
                                                textAlign: "left",
                                              }}
                                              class="ng-tns-c85-1"
                                            >
                                              (Bet for)
                                            </th>
                                            <th
                                              style={{
                                                width: "25%",
                                                textAlign: "left;",
                                              }}
                                              class="ng-tns-c85-1"
                                            >
                                              odds{" "}
                                            </th>
                                            <th
                                              style={{
                                                width: "15%",
                                                textAlign: "left",
                                              }}
                                              class="ng-tns-c85-1"
                                            >
                                              Stake
                                            </th>
                                            <th
                                              id="profit-head"
                                              style={{
                                                width: "15%",
                                                textAlign: "right",
                                              }}
                                              class="ng-tns-c85-1"
                                            >
                                              {" "}
                                              Profit{" "}
                                            </th>
                                          </tr>
                                        </thead>
                                        <tbody
                                          _ngcontent-hvs-c85=""
                                          class="ng-tns-c85-1"
                                        >
                                          <tr
                                            _ngcontent-hvs-c85=""
                                            class="ng-tns-c85-1"
                                          >
                                            <td
                                              id="team_nm"
                                              class=" country_color ng-tns-c85-1"
                                            >
                                              {country}
                                            </td>
                                            <td
                                              style={{ width: "75px" }}
                                              class="ng-tns-c85-1"
                                            >
                                              <div class="form-group ng-tns-c85-1">
                                                <input
                                                  placeholder="0"
                                                  name="odds"
                                                  type="text"
                                                  required=""
                                                  value={dataValue}
                                                  id="odds"
                                                  readonly=""
                                                  class="amountint ng-tns-c85-1 ng-untouched ng-pristine ng-valid"
                                                  style={{
                                                    width: "45px",
                                                    verticalAlign: "middle",
                                                  }}
                                                />
                                              </div>
                                            </td>
                                            <td
                                              _ngcontent-hvs-c85=""
                                              class="ng-tns-c85-1"
                                            >
                                              <div class="form-group bet-stake ng-tns-c85-1">
                                                <input
                                                  id="btn_val"
                                                  required=""
                                                  value={betValue}
                                                  type="text"
                                                  // autocomplete="off"
                                                  onChange={(e) =>
                                                    setbetValue(e.target.value)
                                                  }
                                                  style={{ width: "82px" }}
                                                  class="ng-tns-c85-1 ng-untouched ng-pristine ng-valid"
                                                />
                                              </div>
                                            </td>
                                            <td
                                              id="prft"
                                              class="text-right ng-tns-c85-1 ng-star-inserted"
                                              style={{ color: "#fff" }}
                                            >
                                              {" "}
                                              {profitBal}
                                            </td>
                                          </tr>
                                          <tr
                                            _ngcontent-hvs-c85=""
                                            class="ng-tns-c85-1"
                                          >
                                            <td
                                              colspan="5"
                                              class="value-buttons ng-tns-c85-1"
                                              style={{ padding: "5px;" }}
                                            >
                                              <button
                                                class="btn btn-success btn_dyn ng-tns-c85-1 ng-star-inserted"
                                                onClick={() => handleClick("1000")}
                                                value="1000"
                                              >
                                                1000
                                              </button>
                                              <button
                                                class="btn btn-success btn_dyn ng-tns-c85-1 ng-star-inserted"
                                                onClick={() => handleClick("2000")}
                                                value="2000"
                                              >
                                                2000
                                              </button>
                                              <button
                                                class="btn btn-success btn_dyn ng-tns-c85-1 ng-star-inserted"
                                                onClick={(value) =>
                                                  handleClick(5000)
                                                }
                                                value="5000"
                                              >
                                                5000
                                              </button>
                                              <button
                                                class="btn btn-success btn_dyn ng-tns-c85-1 ng-star-inserted"
                                                onClick={(value) =>
                                                  handleClick(10000)
                                                }
                                                value="10000"
                                              >
                                                10000
                                              </button>
                                              <button
                                                class="btn btn-success btn_dyn ng-tns-c85-1 ng-star-inserted"
                                                onClick={(value) =>
                                                  handleClick(20000)
                                                }
                                                value="20000"
                                              >
                                                20000
                                              </button>
                                              <button
                                                class="btn btn-success btn_dyn ng-tns-c85-1 ng-star-inserted"
                                                onClick={(value) =>
                                                  handleClick(50000)
                                                }
                                                value="50000"
                                              >
                                                50000
                                              </button>
                                              <button
                                                class="btn btn-success btn_dyn ng-tns-c85-1 ng-star-inserted"
                                                onClick={(value) =>
                                                  handleClick(100000)
                                                }
                                                value="100000"
                                              >
                                                100000
                                              </button>
                                              <button
                                                class="btn btn-success btn_dyn ng-tns-c85-1 ng-star-inserted"
                                                onClick={(value) =>
                                                  handleClick(250000)
                                                }
                                                value="250000"
                                              >
                                                250000
                                              </button>
                                              <button
                                                class="btn btn-success btn_dyn ng-tns-c85-1 ng-star-inserted"
                                                onClick={(value) =>
                                                  handleClick(500000)
                                                }
                                                value="500000"
                                              >
                                                500000
                                              </button>

                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                      <div
                                        _ngcontent-hvs-c85=""
                                        class="col-md-12 ng-tns-c85-1"
                                      >
                                        <button
                                          type=""
                                          onClick={handleReset}
                                          class="btn btn-sm btn-danger float-left ng-tns-c85-1"
                                        >
                                          Reset
                                        </button>
                                        <button
                                          type="submit"
                                          id="submit_btn"
                                          onClick={() => Live_Bet_Api()}
                                          class="btn btn-sm btn-success float-right ng-tns-c85-1"
                                        >
                                          Submit
                                        </button>
                                        <input
                                          id="tmp_id"
                                          type="hidden"
                                          class="ng-tns-c85-1"
                                        />
                                        <input
                                          id="bet_section_id"
                                          type="hidden"
                                          class="ng-tns-c85-1"
                                        />
                                        <input
                                          id="bet_market_id"
                                          type="hidden"
                                          class="ng-tns-c85-1"
                                        />
                                        <input
                                          type="hidden"
                                          id="lst_update"
                                          value=""
                                          class="ng-tns-c85-1"
                                        />
                                        <input
                                          type="hidden"
                                          id="lst_update_lambi"
                                          value=""
                                          class="ng-tns-c85-1"
                                        />
                                      </div>
                                      {/* </form> */}
                                    </div>
                                  </>
                                ) : null}
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div class="dp_none bars_bg">
                            <div class="row">
                              <div class="card m-b-10 place-bet ">
                                <div _ngcontent-hvs-c85="" class="card-header">
                                  <h6 class="card-title d-inline-block ">
                                    Place Bet
                                  </h6>
                                </div>
                                {showPopup ? (
                                  <>
                                    <input
                                      type="hidden"
                                      id="back-lay"
                                      value=""
                                      class="ng-tns-c85-1"
                                    />
                                    <ngx-spinner
                                      bdcolor="rgba(51,51,51,0.8)"
                                      size="medium"
                                      color="#fff"
                                      type="ball-scale-multiple"
                                      _nghost-hvs-c75=""
                                      class="ng-tns-c75-2 ng-tns-c85-1 ng-star-inserted"
                                    ></ngx-spinner>
                                    <div
                                      class="card-body table-responsive hide-box-click ng-tns-c85-1 back-color ng-star-inserted"
                                      style={{ paddingBottom: "4px;" }}
                                    >
                                      {/* <form _ngcontent-hvs-c85="" novalidate="" method="post" id="frm_placebet" action="" class="ng-tns-c85-1 ng-untouched ng-pristine ng-valid" /> */}

                                      <table class="coupon-table table table-borderedless ng-tns-c85-1">
                                        <thead
                                          _ngcontent-hvs-c85=""
                                          class="ng-tns-c85-1"
                                        >
                                          <tr
                                            _ngcontent-hvs-c85=""
                                            class="ng-tns-c85-1"
                                          >
                                            <th
                                              style={{
                                                width: "35%",
                                                textAlign: "left",
                                              }}
                                              class="ng-tns-c85-1"
                                            >
                                              (Bet for)
                                            </th>
                                            <th
                                              style={{
                                                width: "25%",
                                                textAlign: "left;",
                                              }}
                                              class="ng-tns-c85-1"
                                            >
                                              odds{" "}
                                            </th>
                                            <th
                                              style={{
                                                width: "15%",
                                                textAlign: "left",
                                              }}
                                              class="ng-tns-c85-1"
                                            >
                                              Stake
                                            </th>
                                            <th
                                              id="profit-head"
                                              style={{
                                                width: "15%",
                                                textAlign: "right",
                                              }}
                                              class="ng-tns-c85-1"
                                            >
                                              {" "}
                                              Profit{" "}
                                            </th>
                                          </tr>
                                        </thead>
                                        <tbody
                                          _ngcontent-hvs-c85=""
                                          class="ng-tns-c85-1"
                                        >
                                          <tr
                                            _ngcontent-hvs-c85=""
                                            class="ng-tns-c85-1"
                                          >
                                            <td
                                              id="team_nm"
                                              class=" country_color ng-tns-c85-1"
                                            >
                                              {country}
                                            </td>
                                            <td
                                              style={{ width: "75px" }}
                                              class="ng-tns-c85-1"
                                            >
                                              <div class="form-group ng-tns-c85-1">
                                                <input
                                                  placeholder="0"
                                                  name="odds"
                                                  type="text"
                                                  required=""
                                                  value={dataValue}
                                                  id="odds"
                                                  readonly=""
                                                  class="amountint ng-tns-c85-1 ng-untouched ng-pristine ng-valid"
                                                  style={{
                                                    width: "45px",
                                                    verticalAlign: "middle",
                                                  }}
                                                />
                                              </div>
                                            </td>
                                            <td
                                              _ngcontent-hvs-c85=""
                                              class="ng-tns-c85-1"
                                            >
                                              <div class="form-group bet-stake ng-tns-c85-1">
                                                <input
                                                  id="btn_val"
                                                  required=""
                                                  value={betValue}
                                                  type="text"
                                                  // autocomplete="off"
                                                  onChange={(e) =>
                                                    setbetValue(e.target.value)
                                                  }
                                                  style={{ width: "82px" }}
                                                  class="ng-tns-c85-1 ng-untouched ng-pristine ng-valid"
                                                />
                                              </div>
                                            </td>
                                            <td
                                              id="prft"
                                              class="text-right ng-tns-c85-1 ng-star-inserted"
                                              style={{ color: "#fff" }}
                                            >
                                              {" "}
                                              {profitBal||0}
                                            </td>
                                          </tr>
                                          <tr
                                            _ngcontent-hvs-c85=""
                                            class="ng-tns-c85-1"
                                          >
                                            <td
                                              colspan="5"
                                              class="value-buttons ng-tns-c85-1"
                                              style={{ padding: "5px;" }}
                                            >
                                              <button
                                                class="btn btn-success btn_dyn ng-tns-c85-1 ng-star-inserted"
                                                onClick={() => handleClick("1000")}
                                                value="1000"
                                              >
                                                1000
                                              </button>
                                              <button
                                                class="btn btn-success btn_dyn ng-tns-c85-1 ng-star-inserted"
                                                onClick={() => handleClick("2000")}
                                                value="2000"
                                              >
                                                2000
                                              </button>
                                              <button
                                                class="btn btn-success btn_dyn ng-tns-c85-1 ng-star-inserted"
                                                onClick={(value) =>
                                                  handleClick(5000)
                                                }
                                                value="5000"
                                              >
                                                5000
                                              </button>
                                              <button
                                                class="btn btn-success btn_dyn ng-tns-c85-1 ng-star-inserted"
                                                onClick={(value) =>
                                                  handleClick(10000)
                                                }
                                                value="10000"
                                              >
                                                10000
                                              </button>
                                              <button
                                                class="btn btn-success btn_dyn ng-tns-c85-1 ng-star-inserted"
                                                onClick={(value) =>
                                                  handleClick(20000)
                                                }
                                                value="20000"
                                              >
                                                20000
                                              </button>
                                              <button
                                                class="btn btn-success btn_dyn ng-tns-c85-1 ng-star-inserted"
                                                onClick={(value) =>
                                                  handleClick(50000)
                                                }
                                                value="50000"
                                              >
                                                50000
                                              </button>
                                              <button
                                                class="btn btn-success btn_dyn ng-tns-c85-1 ng-star-inserted"
                                                onClick={(value) =>
                                                  handleClick(100000)
                                                }
                                                value="100000"
                                              >
                                                100000
                                              </button>
                                              <button
                                                class="btn btn-success btn_dyn ng-tns-c85-1 ng-star-inserted"
                                                onClick={(value) =>
                                                  handleClick(250000)
                                                }
                                                value="250000"
                                              >
                                                250000
                                              </button>
                                              <button
                                                class="btn btn-success btn_dyn ng-tns-c85-1 ng-star-inserted"
                                                onClick={(value) =>
                                                  handleClick(500000)
                                                }
                                                value="500000"
                                              >
                                                500000
                                              </button>

                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                      <div
                                        _ngcontent-hvs-c85=""
                                        class="col-md-12 ng-tns-c85-1"
                                      >
                                        <button
                                          type=""
                                          onClick={handleReset}
                                          class="btn btn-sm btn-danger float-left ng-tns-c85-1"
                                        >
                                          Reset
                                        </button>
                                        <button
                                          type="submit"
                                          id="submit_btn"
                                          onClick={() => Live_Bet_Api()}
                                          class="btn btn-sm btn-success float-right ng-tns-c85-1"
                                        >
                                          Submit
                                        </button>
                                        <input
                                          id="tmp_id"
                                          type="hidden"
                                          class="ng-tns-c85-1"
                                        />
                                        <input
                                          id="bet_section_id"
                                          type="hidden"
                                          class="ng-tns-c85-1"
                                        />
                                        <input
                                          id="bet_market_id"
                                          type="hidden"
                                          class="ng-tns-c85-1"
                                        />
                                        <input
                                          type="hidden"
                                          id="lst_update"
                                          value=""
                                          class="ng-tns-c85-1"
                                        />
                                        <input
                                          type="hidden"
                                          id="lst_update_lambi"
                                          value=""
                                          class="ng-tns-c85-1"
                                        />
                                      </div>
                                      {/* </form> */}
                                    </div>
                                  </>
                                ) : null}
                              </div>
                            </div>
                          </div>
                        )}
                      </Modal>

                    </>
                  )}
                  <div class="mybet_wedget">
                    <div class="bars_bg">
                      <div class="row">
                        <div class="col-md-12">
                          <div
                            class="section_heading"
                            style={{ display: "flex" }}
                          >
                            <h2>My Bet</h2>
                            <a className="Bet_button btn" href="/Unsellected">
                              Bet History
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="mybet_table">
                      <div
                        class="table-responsive"
                        style={{
                          overflowY: "scroll",
                          overflowX: "hidden",
                          maxHeight: "400px",
                        }}
                      >
                        <table class="table">
                          <thead>
                            <tr>
                              <th>Matched Bet</th>
                              <th>Odds</th>
                              <th>Result</th>
                              <th>Stake</th>
                            </tr>
                          </thead>
                          <tbody>
                            {tableData?.map((item) => (
                              <tr key={item.id}>
                                <td>{item.team}</td>
                                <td>{item.type}</td>
                                {item.status == "1" ? (
                                  <td>
                                    {item.MatchStatus == "0" ? (
                                      <div className="result2">-</div>
                                    ) : (
                                      <div className="result1">+</div>
                                    )}
                                  </td>
                                ) : (
                                  <td>
                                    <div className="result5">.</div>
                                  </td>
                                )}
                                <td>{item.stake}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
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
    </div>);
}

export default Tennis_Matches;
