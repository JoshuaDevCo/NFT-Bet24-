import moment from "moment/moment";
import io from "socket.io-client";
import "./Match.css";
import { useSearchParams } from "react-router-dom";
import "reactjs-popup/dist/index.css";
import React, { useEffect, useRef, useState, useCallback } from "react";
import Modal from "react-modal";
import { Box, Tab, Tabs, Typography } from "@mui/material";
import { toast } from "react-toastify";
import AllSide from "../Dropdown/AllSide";
import { API } from "../../API";
import Loading from "../Loading/Loading";
import football from "../Dashboard/image/1.png";
import tannis from "../Dashboard/image/2.png";
import criball from "../Dashboard/image/4.png";
import UpperHeader from "../Dash_Child/UpperHeader";
import LeftSidebar from "../Dash_Child/LeftSidebar";
import FirstSlid from "../Dash_Child/FirstSlid";
import axios from "axios";

function Live_Matches() {
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
  const [status, setStatus] = useState("");
  const [remark1, setRemark1] = useState("");
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
  const [balance, setbalance] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [complet, setComplet] = useState("");
  const [UiStatus, setUiStatus] = useState("All");
  const [filterOver, setFilterOver] = useState(false);
  const [filterball, setFilterball] = useState(false);
  const [filtersess, setFiltersess] = useState(false);
  const [ComplmarkId, setComplmarkId] = useState("");
  const [TiedmarkId, setTiedmarkId] = useState("");
  const [t5, setT5] = useState("0.0");
  const [t6, setT6] = useState("0.0");
  const [t7, setT7] = useState("0.0");
  const [t8, setT8] = useState("0.0");
  const [t9, setT9] = useState("0.0");
  const [t10, setT10] = useState("0.0");
  const [t11, setT11] = useState("0.0");
  const [t12, setT12] = useState("0.0");
  const [sus, setSus] = useState("0.0");
  const [sus1, setSus1] = useState("0.0");
  const [Tiedsus, setTiedSus] = useState("0.0");
  const [Tiedsus1, setTiedSus1] = useState("0.0");
  const [Tiedlabel, setTiedlabel] = useState("");
  const [Complabel, setComplabel] = useState("");
  const [profitBal, setProfitBal] = useState("");
  const [odd1Stack, setOdd1Stack] = useState("0");
  const [odd2Stack, setOdd2Stack] = useState("0");
  const [book1Stack, setBook1Stack] = useState("0");
  const [book2Stack, setBook2Stack] = useState("0");
  const [stackRed, setStackRed] = useState("0");
  const [oddRed, setOddRed] = useState("0");
  const [showComp, setShowComp] = useState(false);
  const [showTied, setShowTied] = useState(false);
  const [showMatchOdds, setshowMatchOdds] = useState(false);
  const [betRunnerName, setbetRunnerName] = useState("");
  const [count,setCount]=useState(0)
  const [CompCount,setCompCount]=useState(0)
  const [TiedCount,setTiedCount]=useState(0)
  // const [BookCount,setBookCount]=useState(0)




  const SOCKET_URL = "https://bet24-api-new.nakshtech.info/";

  useEffect(() => {
    const cricketMatchesSocket = io(SOCKET_URL);
    cricketMatchesSocket.emit("CricketBookMarket2", id);
    cricketMatchesSocket.on("CricketBookMarket2_FromAPI", (data) => {
      let res = data;
      console.log("BookMarketAPi", res);
      if (res != null) {
        setBm(res.Bookmaker);
      }
    });
    return () => {
      cricketMatchesSocket.disconnect();
    };
  }, [id]);

  useEffect(() => {
    const cricketMatchesSocket = io(SOCKET_URL);
    cricketMatchesSocket.emit("CricketAllMarket1", id);
    cricketMatchesSocket.on("CricketAllMarket1_FromAPI", (data) => {
      let res = data;
      console.log("CricketAllMarket1", res);
      if (res != null) {
        console.log("Overbyover", res);
        setStatus(res.status);
        if (Array.isArray(res.t3)) {
          setData(res.t3);

          let filteredData1 = res.t3.filter((item) => item.ballsess == "2");
          if (filteredData1 && filteredData1.length > 0) {
            setFilterOver(true);
          } else {
            setFilterOver(false);
          }

          let filteredData2 = res.t3.filter((item) => item.ballsess == "3");
          if (filteredData2 && filteredData2.length > 0) {
            setFilterball(true);
          } else {
            setFilterball(false);
          }
          let filteredData3 = res.t3.filter((item) => item.ballsess == "1");
          if (filteredData3 && filteredData3.length > 0) {
            setFiltersess(true);
          } else {
            setFiltersess(false);
          }
        }
      }
    });

    return () => {
      cricketMatchesSocket.disconnect();
    };
  }, [id]);

  useEffect(() => {
    // console.log("Cricketmatchesdata:",id);
    const cricketMatchesSocket = io(SOCKET_URL);
    cricketMatchesSocket.emit("CricketOddMatch", id, eId);
    cricketMatchesSocket.on("CricketOddMatch_FromAPI", (data) => {
      let res = data;
      console.log("MatchOdd_1", res);
      if (res != null) {
        setFilterMarket(res, "Match Odds", setcountrydata);
        setFilterMarket(res, "Tied Match", setTiedmarkId, setTiedlabel);
        setFilterMarket(res, "Completed Match", setComplmarkId, setComplabel);
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
    if (condition == "Match Odds") {
      setStateFunction(fiteredData[0]?.runners);
    } else {
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
          SaveTeams_API("Bookmaker Market",runner.runnerName)
        });
        setCount(count+1)
      }

      if(Tiedlabel&&Tiedlabel.length>0&&TiedCount<1){
        Tiedlabel.forEach(runner => {
          SaveTeams_API("Tied Match", runner.runnerName);
        });
        setTiedCount(count+1)
      }
      
      if(Complabel&&Complabel.length>0&&CompCount<1){
        Complabel.forEach(runner => {
          SaveTeams_API("Completed Match", runner.runnerName);
        });
        setCompCount(count+1)
      }

  },[counteyName])

  function stop() {
    document.getElementById("marquee1").stop();
  }

  function start() {
    document.getElementById("marquee1").start();
  }


  console.log("countey",counteyName)
  useEffect(() => {
    const cricketMatchesSocket = io(SOCKET_URL);
    cricketMatchesSocket.emit("CricketOddMatchType", market_Id);
    cricketMatchesSocket.on("CricketOddMatchType_FromAPI", (data) => {
      console.log("BookMarket2==>", data);
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
  }, [market_Id]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setspinner1(false);
    }, 5000);
    return () => {
      clearTimeout(timeout);
    };
  }, []);

  useEffect(() => {
    const cricketMatchesSocket = io(SOCKET_URL);
    cricketMatchesSocket.emit("CricketOddMatchType", ComplmarkId);
    cricketMatchesSocket.on("CricketOddMatchType_FromAPI", (data) => {
      console.log("Complete", data);
      let res = data;
      if (res != null && res.length > 0) {
        setShowComp(true);
        setT5(res[0].runners[0].ex.availableToBack);
        setT6(res[0].runners[0].ex.availableToLay);
        setT7(res[0].runners[1].ex.availableToBack);
        setT8(res[0].runners[1].ex.availableToLay);
      } else {
        setShowComp(false);
      }
    });

    return () => {
      cricketMatchesSocket.disconnect();
    };
  }, [ComplmarkId]);

  useEffect(() => {
    const cricketMatchesSocket = io(SOCKET_URL);
    cricketMatchesSocket.emit("CricketOddMatchType", TiedmarkId);
    cricketMatchesSocket.on("CricketOddMatchType_FromAPI", (data) => {
      console.log("TiedmarkId==>", data);
      let res = data;
      if (res != null && res.length > 0) {
        setShowTied(true);
        setT9(res[0].runners[0].ex.availableToBack);
        setT10(res[0].runners[0].ex.availableToLay);
        setT11(res[0].runners[1].ex.availableToBack);
        setT12(res[0].runners[1].ex.availableToLay);
      } else {
        setShowTied(false);
      }
    });

    return () => {
      cricketMatchesSocket.disconnect();
    };
  }, [TiedmarkId]);

  const PlaceBet_History = async () => {
    try {
      setspinner(true);
      let res = await API.post(`BetHistoryDashboard`, {
        uid: userId,
        fromDate: "",
        toDate: "",
      });
      res = res.data.data;
      console.log("PlaceBet_History", res);
      setTableData(res);
      setspinner(false);
    } catch (e) {
      setspinner(false);

      console.log("Error While Fatch PlaceBet_History API", e);
    }
  };

  const Match_Close = async () => {
    if (complet != "") {
      try {
        setspinner(true);

        let res = await API.post("Match_Close", {
          id: id,
          eventTypeid: "4",
        });
        res = res.data.data;
        console.log("Match_Close", res);
        toast.success(res);
        setspinner(false);
      } catch (e) {
        console.log("Something Error in Match_Close Api");
        setspinner(false);
      }
    } else {
      console.log("Match_Close", complet);
      setspinner(false);
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
    // popupRef.current.scrollIntoView({ behavior: "smooth" });

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
            console.log("ProfitValue", res);
            setProfitBal(Math.floor(res.odds));
            setBook1Stack(Math.floor(res.Stake));
          } else {
            res = await API.get(
              `PlaceBetCalculater?mname=${sessionMarket}&stake=${value}&Layprice=${dataValue}&Backprice=0`
            );
            res = res.data.data;
            console.log("ProfitValue1", res);
            setProfitBal(Math.floor(res.odds));
            setBook2Stack(Math.floor(res.Stake));
          }
        } else {
          if (back == "back") {
            res = await API.get(
              `PlaceBetCalculater?mname=${sessionMarket}&stake=${value}&Layprice=0&Backprice=${dataValue}`
            );
            res = res.data.data;
            console.log("ProfitValue", res);
            setProfitBal(Math.floor(res.odds));
            setBook2Stack(Math.floor(res.Stake));
          } else {
            res = await API.get(
              `PlaceBetCalculater?mname=${sessionMarket}&stake=${value}&Layprice=${dataValue}&Backprice=0`
            );
            res = res.data.data;
            console.log("ProfitValue1", res);
            setProfitBal(Math.floor(res.odds));
          }
        }
      }
    } catch (e) {
      console.log("Somthing error in ProfitValue API", e);
    }
  };

  const ProfitVauePageOdds = async () => {
    try {
      let res = await API.get(
        `PlaceBetCalculaterDB?uid=${userId}&matchid=${id}&mname=Match Odds`
      );
      res = res.data.data;
      console.log("ProfitVauePageOdd", res);
     if(counteyName&&counteyName.length>0&&res&&res.length>0){
      if (counteyName[0]?.runnerName == res[0].team) {
        setOdd1Stack(res[0].amount);
      }
      if (counteyName[1]?.runnerName == res[1].team) {
        console.log("ProfitVauePageOdd1", res[1].team);
        setOdd2Stack(res[1].amount);
      }
    }
    } catch (e) {
      console.log("Somthing error in ProfitValue API", e);
    }
  };

  const ProfitVauePageBook = async () => {
    try {
      let res = await API.get(
        `PlaceBetCalculaterDB?uid=${userId}&matchid=${id}&mname=Bookmaker Market`
      );
      res = res.data.data;
      console.log("ProfitVauePage", res);
      if(counteyName&&counteyName.length>0&&res&&res.length>0){
        if (counteyName[0]?.runnerName == res[0].team) {
          setBook1Stack(res[0].amount);
        }

        if (counteyName[1]?.runnerName == res[1].team) {
          console.log("ProfitVauePageOdd1", res[1].team);
          setBook2Stack(res[1].amount);
        }
      }
    } catch (e) {
      console.log("Somthing error in ProfitValue API", e);
    }
  };

  const Deduct_Fund = async () => {
    try {
      let res = await axios.post(
        "https://axenglobal-api.nakshtech.info/DeductGameWallet",
        {
          uid: userId,
          amount: dataValue,
        }
      );
      res = res.data;
      console.log("Deduct_Fund", res);
    } catch {
      console.log("Something error in Deduct API");
    }
  };

  const encryptdata = async (payload) => {
    try {
      let res;
      setspinner(true);
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
        setspinner(false);

        return base64EncryptedData;
      }
    } catch (e) {
      console.log("encrypt Api error:", e);
      setspinner(false);
    }
  };
  const Live_Bet_Api = async () => {
    setspinner(true);
    // if (balance >= 1000) {
    if (dataValue > 0) {
      if (
        sessionMarket == "Session Market" ||
        sessionMarket == "Over by Over Session Market" ||
        sessionMarket == "Ball by Ball Session Market"
      ) {
        const filteredData = data?.filter(
          (item) => item.nat == country && item.sid == sid && item.srno == sr
        );
        if (
          (filteredData[0]?.nat == country &&
            filteredData[0]?.sid == sid &&
            filteredData[0]?.srno == sr &&
            filteredData[0]?.gstatus == "" &&
            filteredData[0]?.b1 == dataValue) ||
          filteredData[0]?.l1 == dataValue
        ) {
          console.log("Clear");
          if (back == "back" && filteredData[0]?.b1 == dataValue) {
            try {
              let body = await encryptdata({
                uid: userId,
                type: sessionMarket,
                team: country,
                stake: betValue,
                back: dataValue,
                BackSize1: size,
                LaySize1: "",
                min: min,
                max: max,
                lay: "0",
                matchid: id,
                ballsess: sess,
                sid: sid,
                srno: sr,
                WinPerc: "0",
                LayPrice2: LayPrice1,
                LaySize2: LaySize1,
                BackPrice2: BackPrice1,
                BackSize2: BackSize1,
                GameStatus: gtype,
                gtype: sessionMarket,
                rem: rem,
                eventID:"4"
              });
              let res = await API.post("PlaceBet", {
                encryptedData: body,
              });
              res = res.data.data;
              console.log("Live_Bet_Api", res);
              if (res == "Minimum Bet amount is 100 Usd !!") {
                toast.error("Minimum Bet amount is 100 INR !!");
                setspinner(false);
              } else if (res == "Insufficient fund") {
                toast.error(res);
              } else {
                toast.success(res);
                PlaceBet_History();
                setUpdateBal(!updateBal);
                Deduct_Fund();
                setspinner(false);
                setShowPopup(false);
              }
            } catch (e) {
              console.log("Error While Fatch Live_Bet_Api API", e);
              setspinner(false);
            }
          } else if (back == "lay" && filteredData[0]?.l1 == dataValue) {
            try {
              // if (back == "back") {

              let body = await encryptdata({
                uid: userId,
                type: sessionMarket,
                team: country,
                stake: betValue,
                back: "0",
                lay: dataValue,
                BackSize1: "",
                LaySize1: size,
                min: min,
                max: max,
                matchid: id,
                ballsess: sess,
                sid: sid,
                srno: sr,
                WinPerc: "",
                LayPrice2: LayPrice1,
                LaySize2: LaySize1,
                BackPrice2: BackPrice1,
                BackSize2: BackSize1,
                GameStatus: gtype,
                gtype: sessionMarket,
                rem: rem,
                eventID:"4"
              });
              let res = await API.post("PlaceBet", {
                encryptedData: body,
              });
              res = res.data.data;
              console.log("Live_Bet_Api", res);
              if (res == "Minimum Bet amount is 100 Usd !!") {
                toast.error("Minimum Bet amount is 100 INR !!");
                setspinner(false);
              } else if (res == "Insufficient fund") {
                toast.error(res);
              } else {
                toast.success(res);
                PlaceBet_History();
                setUpdateBal(!updateBal);
                Deduct_Fund();
                setspinner(false);
                setShowPopup(false);
              }
            } catch (e) {
              console.log("Error While Fatch Live_Bet_Api API", e);
              setspinner(false);
            }
          } else {
            toast.error("Odd Value is miss Match");
            setspinner(false);
          }
        } else {
          toast.error("Odd Value is miss Match");
          setspinner(false);
        }
      } else if (sessionMarket == "Bookmaker Market") {
        if (
          (bm[0].sid == sid || bm[1].sid == sid) &&
          (bm[0].gstatus != "SUSPENDED" || bm[1].gstatus != "SUSPENDED") &&
          (bm[0]?.b1 == dataValue ||
            bm[0]?.l1 == dataValue ||
            bm[1]?.b1 == dataValue ||
            bm[1]?.l1 == dataValue)
        ) {
          if (back == "back") {
            try {
              let body = await encryptdata({
                uid: userId,
                stake: betValue,
                marketId: sess,
                evntid: "4",
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
              setspinner(false);

              console.log("Live_Bet_Api", res);
              if (res == "Minimum Bet amount is 100 Usd !!") {
                toast.error("Minimum Bet amount is 100 INR !!");
                setspinner(false);
              } else if (res == "Insufficient fund") {
                toast.error(res);
              } else {
                toast.success(res);
                ProfitVauePageOdds();
                ProfitVauePageBook();
                PlaceBet_History();
                setUpdateBal(!updateBal);
                Deduct_Fund();
                fetchData();
                setspinner(false);
                setShowPopup(false);
              }
            } catch (e) {
              console.log("Error While Fatch Live_Bet_Api ", e);
              setspinner(false);
            }
          } else if (back == "lay") {
            try {
              let body = await encryptdata({
                uid: userId,
                stake: betValue,
                marketId: sess,
                evntid: "4",
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
              console.log("Live_Bet_Api", res);
              setspinner(false);

              if (res == "Minimum Bet amount is 100 Usd !!") {
                toast.error("Minimum Bet amount is 100 INR !!");
                setspinner(false);
              } else if (res == "Insufficient fund") {
                toast.error(res);
              } else {
                toast.success(res);
                ProfitVauePageOdds();
                ProfitVauePageBook();
                PlaceBet_History();
                setUpdateBal(!updateBal);
                Deduct_Fund();
                fetchData();
                setspinner(false);
                setShowPopup(false);
              }
            } catch (e) {
              console.log("Error While Fatch Live_Bet_Api API", e);
              setspinner(false);
            }
          } else {
            toast.error("Odd Value is miss Match");
            setspinner(false);
          }
        } else {
          toast.error("Odd Value is miss Match");
          setspinner(false);
        }
      } else if (
        sessionMarket == "Match Odds" ||
        sessionMarket == "Tied Match"
      ) {
        if (
          (sus.selectionId == sid ||
            sus1.selectionId == sid ||
            Tiedsus.selectionId == sid ||
            Tiedsus1.selectionId == sid) &&
          (sus.status != "SUSPENDED" ||
            sus1.status != "SUSPENDED" ||
            Tiedsus.status != "SUSPENDED" ||
            Tiedsus1.status != "SUSPENDED") &&
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
            t4[3]?.price == dataValue ||
            t9[0]?.price == dataValue ||
            t9[1]?.price == dataValue ||
            t9[2]?.price == dataValue ||
            t10[0]?.price == dataValue ||
            t10[1]?.price == dataValue ||
            t10[2]?.price == dataValue ||
            t11[0]?.price == dataValue ||
            t11[1]?.price == dataValue ||
            t11[2]?.price == dataValue ||
            t12[0]?.price == dataValue ||
            t12[1]?.price == dataValue ||
            t12[2]?.price == dataValue)
        ) {
          if (back == "back") {
            try {
              let body = await encryptdata({
                uid: userId,
                stake: betValue,
                marketId: sess,
                evntid: "4",
                matchid: id,
                selectionId: sid||0,
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
              setspinner(false);

              console.log("Live_Bet_Api", res);
              if (res == "Minimum Bet amount is 100 Usd !!") {
                toast.error("Minimum Bet amount is 100 INR !!");
                setspinner(false);
              } else if (res == "Insufficient fund") {
                toast.error(res);
              } else {
                toast.success(res);
                ProfitVauePageOdds();
                ProfitVauePageBook();
                PlaceBet_History();
                setUpdateBal(!updateBal);
                Deduct_Fund();
                fetchData();
                setspinner(false);
                setShowPopup(false);
              }
            } catch (e) {
              console.log("Error While Fatch Live_Bet_Api ", e);
              setspinner(false);
            }
          } else if (back == "lay") {
            try {
              let body = await encryptdata({
                uid: userId,
                stake: betValue,
                marketId: sess,
                evntid: "4",
                matchid: id,
                selectionId: sid||0,
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
              console.log("Live_Bet_Api", res);
              setspinner(false);

              if (res == "Minimum Bet amount is 100 Usd !!") {
                toast.error("Minimum Bet amount is 100 INR !!");
                setspinner(false);
              } else if (res == "Insufficient fund") {
                toast.error(res);
              } else {
                toast.success(res);
                ProfitVauePageOdds();
                ProfitVauePageBook();
                PlaceBet_History();
                setUpdateBal(!updateBal);
                Deduct_Fund();
                fetchData();
                setspinner(false);
                setShowPopup(false);
              }
            } catch (e) {
              console.log("Error While Fatch Live_Bet_Api API", e);
              setspinner(false);
            }
          } else {
            toast.error("Odd Value is miss Match");
            setspinner(false);
          }
        } else {
          toast.error("Odd Value is miss Match");
          setspinner(false);
        }
      } else {
        console.log("Something Error in betting API");
        setspinner(false);
      }
    } else {
      toast.error("Invalid Request !");
      setspinner(false);
    }
    // } else {
    //   toast.error("Insufficient Balance !!")
    // }
    setShowPopup(false);
    setModalIsOpen(false);
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
    ProfitVauePageOdds();
    ProfitVauePageBook();
  }, [counteyName]);

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

  const Button_Api = async () => {
    try {
      let res = await API.get(`Get_Button_value_List?uid=${userId}`);
      res = res.data.data;
      console.log("Button_Api", res);
      setbuttonData(res);
    } catch (e) {
      console.log("Error While Fatch Button_Api", e);
    }
  };

  // useEffect(() => {
  //   Button_Api();
  // }, []);

  return (
    <div>
      {/* <Navbar updateBal={updateBal} data_Dashboard={"All"} /> */}
      <UpperHeader updateBal={updateBal} data_Dashboard={"All"} />
      <br />
      <br />

      <main className="main_root wrapper">
        <div style={{ backgroundColor: "#000" }} className="sidebar_respon">
          {/* <AllSide /> */}
          <LeftSidebar />
        </div>

        {/* <!-----=======body section start=======----> */}
        <div className="live_match">
          <div className="container">
            <div className="row">
              <br />
              <FirstSlid updateBal={updateBal} data_Dashboard={"All"} />
              <div className="col-md-8">
                {spinner ? (
                  <>
                    <Loading />
                  </>
                ) : (
                  <>
                    <div className="section_bg">
                      <div className="bars_bg">
                        <div className="game_timer">
                          <div className="game_vs">
                            <div className="countryName">
                              <h1>
                                {" "}
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
                                {" "}
                                {counteyName && counteyName.length > 0
                                  ? counteyName[1]?.runnerName
                                  : ""}
                              </h1>
                            </div>
                            <div className="section_heading streaming stram_live">
                              <p
                                className="btn btn-primary"
                                onClick={toggleShow}
                              >
                                <i
                                  className="fa fa-television"
                                  style={{ color: "white" }}
                                ></i>
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* https://internal-consumer-apis.jmk888.com/go-score/template/4/32630714 */}
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
                          src={`https://internal-consumer-apis.jmk888.com/go-score/template/4/${id}`}
                        ></iframe>

                        <br />
                      </div>

                      {show && (
                        <div className="live_video streaming stram_live">
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

                      {/* <!-----================match odds row============------> */}
                      <div className="bars_bg bars_bg_1 textand_icons_style">
                        {/* <div className="row"> */}
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
                        {/* </div> */}
                      </div>
                      <Box
                        sx={{
                          width: "100%",
                          backgroundColor: "#fff",
                        }}
                      >
                        {showMatchOdds ? (
                          <div className="match_odds_table">
                            <div className="table-responsive-sm">
                              <table className="table table-borderless">
                                {/* {t1 != 0 ? ( */}
                                <tbody>
                                  <tr>
                                    <td className="min_width">
                                      <div className="td1">
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
                                  </tr>

                                  <tr>
                                    <td className="min_width">
                                      <div className="td1">
                                        <h4>
                                          {" "}
                                          {counteyName && counteyName.length > 0
                                            ? counteyName[0]?.runnerName
                                            : " "} {" "}
                                          {odd1Stack && (
                                            <span
                                              style={{
                                                color:
                                                  odd1Stack >= 0
                                                    ? "green"
                                                    : "red",
                                              }}
                                            >
                                              {odd1Stack}
                                            </span>
                                          )}
                                        </h4>
                                      </div>
                                    </td>

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
                                  </tr>

                                  <tr>
                                    <td className="min_width">
                                      <div className="td1">
                                        <h4>
                                          {" "}
                                          {counteyName && counteyName.length > 0
                                            ? counteyName[1]?.runnerName
                                            : ""}{" "}
                                          {odd2Stack  && (
                                            <span
                                              style={{
                                                color:
                                                  odd2Stack >= 0
                                                    ? "green"
                                                    : "red",
                                              }}
                                            >
                                              {odd2Stack}
                                            </span>
                                          )}
                                        </h4>
                                      </div>
                                    </td>

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
                                  </tr>
                                </tbody>{" "}
                                {/* ) : (
                            <>
                              <p>No real-time records found</p>
                            </>
                          )} */}
                              </table>
                              <marquee
                                id="marquee1"
                                direction="left"
                                scrollamount="4"
                                onMouseOver={stop}
                                onMouseOut={start}
                                className="text-danger"
                              >
                                🏆 ICC Cricket World Cup Match Winner Bets
                                Started In Our Exchange 🏆
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

                        {status == "something went wrong" ? (
                          <></>
                        ) : (
                          <>
                            {/* <!----===============Book maker row=================-----> */}
                            <div>
                              <ul className="nav nav-tabs12">
                                <li
                                  className={
                                    UiStatus == "All"
                                      ? "nav-item active"
                                      : "nav-item "
                                  }
                                >
                                  <a
                                    className={
                                      UiStatus == "All"
                                        ? "nav-link active"
                                        : "nav-link "
                                    }
                                    onClick={() => setUiStatus("All")}
                                    style={{ cursor: "pointer" }}
                                  >
                                    <span
                                      style={{ textTransform: "uppercase" }}
                                    >
                                      all
                                    </span>
                                  </a>
                                </li>
                                <li
                                  className={
                                    UiStatus == "Book"
                                      ? "nav-item active"
                                      : "nav-item "
                                  }
                                >
                                  <a
                                    role="tab"
                                    className={
                                      UiStatus == "Book"
                                        ? "nav-link active"
                                        : "nav-link "
                                    }
                                    aria-controls=""
                                    aria-selected="false"
                                    id=""
                                    onClick={() => setUiStatus("Book")}
                                    style={{ cursor: "pointer" }}
                                  >
                                    <span
                                      style={{ textTransform: "uppercase" }}
                                    >
                                      Bookmaker Market
                                    </span>
                                  </a>
                                </li>
                                <li
                                  className={
                                    UiStatus == "Sess"
                                      ? "nav-item active"
                                      : "nav-item "
                                  }
                                >
                                  <a
                                    role="tab"
                                    className={
                                      UiStatus == "Sess"
                                        ? "nav-link active"
                                        : "nav-link "
                                    }
                                    aria-controls=""
                                    aria-selected="false"
                                    id=""
                                    onClick={() => setUiStatus("Sess")}
                                    style={{ cursor: "pointer" }}
                                  >
                                    <span />
                                    <span
                                      style={{ textTransform: "uppercase" }}
                                    >
                                      Session Market
                                    </span>
                                  </a>
                                </li>
                                <li
                                  className={
                                    UiStatus == "Over"
                                      ? "nav-item active"
                                      : "nav-item "
                                  }
                                >
                                  <a
                                    role="tab"
                                    className={
                                      UiStatus == "Over"
                                        ? "nav-link active"
                                        : "nav-link "
                                    }
                                    aria-controls=""
                                    aria-selected="false"
                                    id=""
                                    onClick={() => setUiStatus("Over")}
                                    style={{ cursor: "pointer" }}
                                  >
                                    <span />
                                    <span
                                      style={{ textTransform: "uppercase" }}
                                    >
                                      Over by Over
                                    </span>
                                  </a>
                                </li>
                                <li
                                  className={
                                    UiStatus == "Ball"
                                      ? "nav-item active"
                                      : "nav-item "
                                  }
                                >
                                  <a
                                    role="tab"
                                    className={
                                      UiStatus == "Ball"
                                        ? "nav-link active"
                                        : "nav-link "
                                    }
                                    aria-controls=""
                                    aria-selected="false"
                                    id=""
                                    onClick={() => setUiStatus("Ball")}
                                    style={{ cursor: "pointer" }}
                                  >
                                    <span />
                                    <span
                                      style={{ textTransform: "uppercase" }}
                                    >
                                      Ball by Ball
                                    </span>
                                  </a>
                                </li>
                              </ul>
                            </div>
                            {(UiStatus === "All" || UiStatus === "Book") &&
                              bm != 0 && (
                                <div className="row">
                                  <div className="col-md-12">
                                    <div className="bars_bg textand_icons_style">
                                      <div className="section_heading">
                                        <h2>Bookmaker Market </h2>
                                      </div>
                                    </div>
                                    <div className="match_odds_table">
                                      <div className="table-responsive-sm">
                                        <table className="col-md-6 table table-borderless">
                                          {bm[1] != "" ? (
                                            <tbody>
                                              <tr>
                                                <td className="min_width">
                                                  <div className="td1">
                                                    <h4 className="txt_color">
                                                      Min:{" "}
                                                      {Math.round(bm[1].minBet)}{" "}
                                                      Max:{" "}
                                                      {Math.round(
                                                        bm[1].maxBet / 1000
                                                      )}
                                                      K
                                                    </h4>
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
                                              </tr>

                                              {bm[0]?.gstatus == "SUSPENDED" ? (
                                                <tr className="tr_data">
                                                  {bm[0]?.gstatus}
                                                </tr>
                                              ) : (
                                                <></>
                                              )}
                                              <tr>
                                                <td className="Bkmk1 min_width">
                                                  <div className="td1">
                                                    <h4 className="headbkmk">
                                                      {counteyName &&
                                                      counteyName.length > 0
                                                        ? counteyName[0]
                                                            ?.runnerName
                                                        : ""}

                                                       {" "}
                                                      {book1Stack && (
                                                        <span
                                                          style={{
                                                            color:
                                                              book1Stack >= 0
                                                                ? "green"
                                                                : "red",
                                                          }}
                                                        >
                                                          {book1Stack}
                                                        </span>
                                                      )}
                                                    </h4>
                                                  </div>
                                                </td>

                                                {isNaN(bm[0]?.b1) ? (
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
                                                          bm[0]?.b1,
                                                          counteyName[0]
                                                            ?.runnerName,
                                                          "Bookmaker Market",
                                                          "back",
                                                          bm[0].sid,
                                                          "Bookmaker Market",
                                                          0,
                                                          0,
                                                          bm[0].minBet,
                                                          bm[0].maxBet,
                                                          bm[0]?.bs1,
                                                          bm[0]?.b1,
                                                          0,
                                                          0,
                                                          bm[0].gstatus,
                                                          0,
                                                          counteyName[0]
                                                            ?.runnerName
                                                        )
                                                      }
                                                    >
                                                      <h4>{bm[0]?.b1}</h4>
                                                      {bm[0]?.maxBet < 1000 ? (
                                                        <p>{bm[0]?.maxBet}</p>
                                                      ) : (
                                                        <p>
                                                          {(
                                                            bm[0]?.maxBet / 1000
                                                          ).toFixed(1)}
                                                          K
                                                        </p>
                                                      )}
                                                    </div>
                                                  </td>
                                                )}
                                                {isNaN(bm[0]?.l1) ? (
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
                                                          bm[0]?.l1,
                                                          counteyName[0]
                                                            ?.runnerName,
                                                          "Bookmaker Market",
                                                          "lay",
                                                          bm[0].sid,
                                                          "Bookmaker Market",
                                                          0,
                                                          0,
                                                          bm[0].minBet,
                                                          bm[0].maxBet,
                                                          bm[0]?.ls1,
                                                          bm[0]?.l1,
                                                          0,
                                                          0,
                                                          bm[0].gstatus,
                                                          0,
                                                          counteyName[0]
                                                            ?.runnerName
                                                        )
                                                      }
                                                    >
                                                      <h4>{bm[0]?.l1}</h4>
                                                      {bm[0]?.maxBet < 1000 ? (
                                                        <p>{bm[0]?.maxBet}</p>
                                                      ) : (
                                                        <p>
                                                          {(
                                                            bm[0]?.maxBet / 1000
                                                          ).toFixed(1)}
                                                          K
                                                        </p>
                                                      )}
                                                    </div>
                                                  </td>
                                                )}
                                              </tr>
                                              {bm[1]?.gstatus == "SUSPENDED" ? (
                                                <tr className="tr_data">
                                                  {bm[1]?.gstatus}
                                                </tr>
                                              ) : (
                                                <></>
                                              )}
                                              <tr>
                                                {/* <td className="tr_data"></td> */}
                                                <td className="Bkmk1 min_width">
                                                  <div className="td1">
                                                    <h4 className="headbkmk">
                                                      {counteyName &&
                                                      counteyName.length > 0
                                                        ? counteyName[1]
                                                            ?.runnerName
                                                        : ""}
{" "}
                                                      {book2Stack  && (
                                                        <span
                                                          style={{
                                                            color:
                                                              book2Stack >= 0
                                                                ? "green"
                                                                : "red",
                                                          }}
                                                        >
                                                          {book2Stack}
                                                        </span>
                                                      )}
                                                    </h4>
                                                  </div>
                                                </td>

                                                {isNaN(bm[1]?.l1) ||
                                                bm[1]?.l1 == 0 ? (
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
                                                          bm[1]?.b1,
                                                          counteyName[1]
                                                            ?.runnerName,
                                                          "Bookmaker Market",
                                                          "back",
                                                          bm[1].sid,
                                                          "Bookmaker Market",
                                                          0,
                                                          0,
                                                          bm[1].minBet,
                                                          bm[1].maxBet,
                                                          bm[1]?.bs1,
                                                          bm[1]?.b1,
                                                          0,
                                                          0,
                                                          bm[1].gstatus,
                                                          0,
                                                          counteyName[1]
                                                            ?.runnerName
                                                        )
                                                      }
                                                    >
                                                      <h4>{bm[1]?.b1}</h4>
                                                      {/* <p>{bm[1]?.bs1}</p> */}

                                                      {bm[1]?.maxBet < 1000 ? (
                                                        <p>{bm[1]?.maxBet}</p>
                                                      ) : (
                                                        <p>
                                                          {(
                                                            bm[1]?.maxBet / 1000
                                                          ).toFixed(1)}
                                                          K
                                                        </p>
                                                      )}
                                                    </div>
                                                  </td>
                                                )}

                                                {isNaN(bm[1]?.l1) ||
                                                bm[1]?.l1 == 0 ? (
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
                                                          bm[1]?.l1,
                                                          counteyName[1]
                                                            ?.runnerName,
                                                          "Bookmaker Market",
                                                          "lay",
                                                          bm[1].sid,
                                                          "Bookmaker Market",
                                                          0,
                                                          0,
                                                          bm[1].minBet,
                                                          bm[1].maxBet,
                                                          bm[1]?.ls1,
                                                          bm[1]?.l1,
                                                          0,
                                                          0,
                                                          bm[1].gstatus,
                                                          0,
                                                          counteyName[1]
                                                            ?.runnerName
                                                        )
                                                      }
                                                    >
                                                      <h4>{bm[1]?.l1}</h4>
                                                      {/* <p>{bm[1]?.ls1}</p> */}

                                                      {bm[1]?.maxBet < 1000 ? (
                                                        <p>{bm[1]?.maxBet}</p>
                                                      ) : (
                                                        <p>
                                                          {(
                                                            bm[1]?.maxBet / 1000
                                                          ).toFixed(1)}
                                                          K
                                                        </p>
                                                      )}
                                                    </div>
                                                  </td>
                                                )}
                                              </tr>
                                            </tbody>
                                          ) : (
                                            <>
                                              <p>No real-time records found</p>
                                            </>
                                          )}
                                        </table>
                                        <marquee
                                          id="marquee1"
                                          direction="left"
                                          scrollamount="4"
                                          onMouseOver={stop}
                                          onMouseOut={start}
                                          className="text-danger"
                                        >
                                          England V Ireland: Advance Match Bets
                                          Started Started in our Exchange 🏏
                                        </marquee>
                                      </div>
                                      <div className="match_discription">
                                        <p>{remark1}</p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              )}
                            {/* <!----===============completed match row=================-----> */}
                            <div>
                              <div className="row">
                                {(UiStatus === "All" || UiStatus === "Comp") &&
                                  showComp &&
                                  filtersess && (
                                    <div className="col-md-12">
                                      <div className="bars_bg textand_icons_style">
                                        <div className="section_heading">
                                          <h2>COMPLETED MATCH</h2>
                                        </div>
                                      </div>
                                      <div className="match_odds_table">
                                        <div className="table-responsive-sm">
                                          <table className="table table-borderless">
                                            {/* {t1 != 0 ? ( */}
                                            <tbody>
                                              <tr>
                                                <td className="min_width">
                                                  <div className="td1">
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
                                              </tr>

                                              <tr>
                                                <td className="min_width">
                                                  <div className="td1">
                                                    <h4>
                                                      {Complabel &&
                                                      Complabel.length > 0
                                                        ? Complabel[0]
                                                            ?.runnerName
                                                        : ""}
                                                    </h4>
                                                    {/* <p>{u1t1}</p> */}
                                                  </div>
                                                </td>

                                                {isNaN(t5[0]?.price) ? (
                                                  <td className="td_width pp">
                                                    <div className="td_item tdbg1">
                                                      <h4></h4>
                                                      <p></p>
                                                    </div>
                                                  </td>
                                                ) : (
                                                  <td className="td_width">
                                                    <div className="td_item tdbg3">
                                                      <h4>{t5[0]?.price}</h4>
                                                      {t5[0]?.size < 1000 ? (
                                                        <p>{t5[0]?.size}</p>
                                                      ) : (
                                                        <p>
                                                          {(
                                                            t5[0]?.size / 1000
                                                          ).toFixed(1)}
                                                          K
                                                        </p>
                                                      )}
                                                    </div>
                                                  </td>
                                                )}
                                                {isNaN(t6[0]?.price) ? (
                                                  <td className="td_width pp1">
                                                    <div className="td_item tdbg4">
                                                      <h4></h4>
                                                      <p></p>
                                                    </div>
                                                  </td>
                                                ) : (
                                                  <td className="td_width">
                                                    <div className="td_item tdbg4">
                                                      <h4>{t6[0]?.price}</h4>
                                                      {t6[0]?.size < 1000 ? (
                                                        <p>{t6[0]?.size}</p>
                                                      ) : (
                                                        <p>
                                                          {(
                                                            t6[0]?.size / 1000
                                                          ).toFixed(1)}
                                                          K
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
                                                      {Complabel &&
                                                      Complabel.length > 0
                                                        ? Complabel[1]
                                                            ?.runnerName
                                                        : ""}
                                                    </h4>
                                                    {/* <p>{u2t2}</p> */}
                                                  </div>
                                                </td>

                                                {isNaN(t7[0]?.price) ? (
                                                  <td className="td_width pp">
                                                    <div className="td_item tdbg1">
                                                      <h4></h4>
                                                      <p></p>
                                                    </div>
                                                  </td>
                                                ) : (
                                                  <td className="td_width">
                                                    <div className="td_item tdbg3">
                                                      <h4>{t7[0]?.price}</h4>
                                                      {t7[0]?.size < 1000 ? (
                                                        <p>{t7[0]?.size}</p>
                                                      ) : (
                                                        <p>
                                                          {(
                                                            t7[0]?.size / 1000
                                                          ).toFixed(1)}
                                                          K
                                                        </p>
                                                      )}
                                                    </div>
                                                  </td>
                                                )}
                                                {isNaN(t8[0]?.price) ? (
                                                  <td className="td_width pp1 display">
                                                    <div className="td_item tdbg4">
                                                      <h4></h4>
                                                      <p></p>
                                                    </div>
                                                  </td>
                                                ) : (
                                                  <td className="td_width">
                                                    <div className="td_item tdbg4">
                                                      <h4>{t8[0]?.price}</h4>
                                                      {t8[0]?.size < 1000 ? (
                                                        <p>{t8[0]?.size}</p>
                                                      ) : (
                                                        <p>
                                                          {(
                                                            t8[0]?.size / 1000
                                                          ).toFixed(1)}
                                                          K
                                                        </p>
                                                      )}
                                                    </div>
                                                  </td>
                                                )}
                                              </tr>
                                            </tbody>{" "}
                                          </table>
                                        </div>
                                      </div>
                                    </div>
                                  )}
                              </div>
                            </div>

                            {/* <!----===============session market row=================-----> */}

                            <div>
                              <div className="row">
                                {(UiStatus === "All" || UiStatus === "Sess") &&
                                  data &&
                                  filtersess && (
                                    <div className="col-md-6">
                                      <div className="bars_bg textand_icons_style">
                                        <div className="section_heading">
                                          <h2>Session Market</h2>
                                        </div>
                                        {/* <div className="section_heading">
                                          <h3>
                                            <i
                                              className="fa fa-info-circle"
                                              onclick="openNav10()"
                                            ></i>
                                          </h3>
                                        </div> */}
                                      </div>
                                      <div className="match_odds_table">
                                        <div className="table-responsive-sm">
                                          <table className="table table-borderless">
                                            <tbody>
                                              <tr>
                                                <td className="min_width">
                                                  <div className="td1">
                                                    <h4>&nbsp;</h4>
                                                  </div>
                                                </td>
                                                <td className="min_width">
                                                  <div className="td1">
                                                    <h4>&nbsp;</h4>
                                                  </div>
                                                </td>

                                                <td className="td_width">
                                                  <div className="td_item tdbg4">
                                                    <h4>No</h4>
                                                  </div>
                                                </td>
                                                <td className="td_width">
                                                  <div className="td_item tdbg3">
                                                    <h4>Yes</h4>
                                                  </div>
                                                </td>
                                                <td className="td_width display">
                                                  <div className="td_item bd">
                                                    <h4>&nbsp;</h4>
                                                  </div>
                                                </td>
                                              </tr>

                                              {data?.map((item, index) => {
                                                if (item.ballsess == "1") {
                                                  return (
                                                    <tr>
                                                      <tr>
                                                        {item.gstatus ==
                                                        "SUSPENDED" ? (
                                                          <tr className=" tr_data_3">
                                                            {item.gstatus}
                                                          </tr>
                                                        ) : item.gstatus ==
                                                          "Ball Running" ? (
                                                          <>
                                                            {" "}
                                                            <tr className=" tr_data_3">
                                                              {item.gstatus}
                                                            </tr>
                                                          </>
                                                        ) : (
                                                          <></>
                                                        )}
                                                      </tr>
                                                      <td className="ssmk min_width">
                                                        <div className="td1">
                                                          <h4 className="headpp4">
                                                            {item.nat}
                                                          </h4>
                                                          <p>{item.utime}</p>
                                                        </div>
                                                      </td>
                                                      {item.l1 != 0.0 ? (
                                                        <td className="tdss td_width">
                                                          <div
                                                            className="td_item tdbg4"
                                                            onClick={() =>
                                                              BetValue(
                                                                item.l1,
                                                                item.nat,
                                                                "Session Market",
                                                                "lay",
                                                                item.sid,
                                                                item.srno,
                                                                item.ballsess,
                                                                item.ls1,
                                                                item.min,
                                                                item.max,
                                                                item.l1,
                                                                item.ls1,
                                                                item.b1,
                                                                item.bs1,
                                                                item.gstatus,
                                                                item.remark
                                                              )
                                                            }
                                                          >
                                                            <h4>
                                                              {Math.round(
                                                                item.l1
                                                              )}
                                                            </h4>
                                                            <p>
                                                              {Math.round(
                                                                item.ls1
                                                              )}
                                                            </p>
                                                          </div>
                                                        </td>
                                                      ) : (
                                                        <td className="td_width pp1">
                                                          <div className="td_item tdbg4">
                                                            <h4></h4>
                                                            <p></p>
                                                          </div>
                                                        </td>
                                                      )}
                                                      {item.BackPrice1 !=
                                                      0.0 ? (
                                                        <td className="tdss td_width">
                                                          <div
                                                            className="td_item tdbg3"
                                                            onClick={() =>
                                                              BetValue(
                                                                item.b1,
                                                                item.nat,
                                                                "Session Market",
                                                                "back",
                                                                item.sid,
                                                                item.srno,
                                                                item.ballsess,
                                                                item.bs1,
                                                                item.min,
                                                                item.max,
                                                                item.l1,
                                                                item.ls1,
                                                                item.b1,
                                                                item.bs1,
                                                                item.gstatus,
                                                                item.remark
                                                              )
                                                            }
                                                          >
                                                            <h4>
                                                              {Math.round(
                                                                item.b1
                                                              )}
                                                            </h4>
                                                            <p>
                                                              {Math.round(
                                                                item.bs1
                                                              )}
                                                            </p>
                                                          </div>
                                                        </td>
                                                      ) : (
                                                        <td className="td_width pp">
                                                          <div className="td_item tdbg1">
                                                            <h4></h4>
                                                            <p></p>
                                                          </div>
                                                        </td>
                                                      )}
                                                      <td className="td_width display">
                                                        <div className="td_item bd">
                                                          <h4>
                                                            Min:
                                                            {Math.round(
                                                              item.min
                                                            )}
                                                          </h4>
                                                          <p>
                                                            Max:
                                                            {Math.round(
                                                              item.max / 1000
                                                            )}
                                                            K
                                                          </p>
                                                        </div>
                                                      </td>
                                                    </tr>
                                                  );
                                                } else {
                                                  return null;
                                                }
                                              })}
                                            </tbody>
                                            {/* )} */}
                                          </table>
                                        </div>
                                      </div>
                                    </div>
                                  )}
                                <div className="col-md-6">
                                  <div className="row">
                                    {(UiStatus === "All" ||
                                      UiStatus === "Over") &&
                                      data &&
                                      filterOver && (
                                        <div className="col-md-12">
                                          <div className="bars_bg">
                                            <div className="row">
                                              <div className="col-md-12">
                                                <div className="section_heading">
                                                  <h2>
                                                    Over by Over Session Market
                                                  </h2>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                          <div className="match_odds_table">
                                            <div className="table-responsive-sm">
                                              <table className="table table-borderless">
                                                <tbody>
                                                  <tr>
                                                    <td className="min_width">
                                                      <div className="td1">
                                                        <h4>&nbsp;</h4>
                                                      </div>
                                                    </td>
                                                    <td className="min_width">
                                                      <div className="td1">
                                                        <h4>&nbsp;</h4>
                                                      </div>
                                                    </td>
                                                    <td className="td_width">
                                                      <div className="td_item tdbg4 rc1">
                                                        <h4>No</h4>
                                                      </div>
                                                    </td>
                                                    <td className="td_width">
                                                      <div className="td_item tdbg3">
                                                        <h4>Yes</h4>
                                                      </div>
                                                    </td>
                                                    <td className="td_width display">
                                                      <div className="td_item bd">
                                                        <h4>&nbsp;</h4>
                                                      </div>
                                                    </td>
                                                  </tr>

                                                  {data?.map((item, index) => {
                                                    if (item.ballsess == "2") {
                                                      return (
                                                        <tr>
                                                          <tr>
                                                            {item.gstatus ==
                                                            "SUSPENDED" ? (
                                                              <tr className="tr_data_3">
                                                                {item.gstatus}
                                                              </tr>
                                                            ) : item.gstatus ==
                                                              "Ball Running" ? (
                                                              <>
                                                                {" "}
                                                                <tr className="tr_data_3">
                                                                  {item.gstatus}
                                                                </tr>
                                                              </>
                                                            ) : (
                                                              <></>
                                                            )}
                                                          </tr>
                                                          <td className="ssmk min_width">
                                                            <div className="td1">
                                                              <h4 className="headpp4">
                                                                {item.nat}
                                                              </h4>
                                                              {/* <p>{item.utime}</p> */}
                                                            </div>
                                                          </td>
                                                          {item.l1 != 0.0 ? (
                                                            <td className="tdss td_width">
                                                              <div
                                                                className="td_item tdbg4"
                                                                onClick={() =>
                                                                  BetValue(
                                                                    item.l1,
                                                                    item.nat,
                                                                    "Over by Over Session Market",
                                                                    "lay",
                                                                    item.sid,
                                                                    item.srno,
                                                                    item.ballsess,
                                                                    item.ls1,
                                                                    item.min,
                                                                    item.max,
                                                                    item.l1,
                                                                    item.ls1,
                                                                    item.b1,
                                                                    item.bs1,
                                                                    item.gstatus,
                                                                    item.remark
                                                                  )
                                                                }
                                                              >
                                                                <h4>
                                                                  {Math.round(
                                                                    item.l1
                                                                  )}
                                                                </h4>
                                                                <p>
                                                                  {Math.round(
                                                                    item.ls1
                                                                  )}
                                                                </p>

                                                                {/* <h4>{item.b1}</h4>
                                                    <p>{item.bs1}</p> */}
                                                              </div>
                                                            </td>
                                                          ) : (
                                                            <td className="td_width pp">
                                                              <div className="td_item tdbg1">
                                                                <h4></h4>
                                                                <p></p>
                                                              </div>
                                                            </td>
                                                          )}
                                                          {item.b1 != 0.0 ? (
                                                            <td className="tdss td_width">
                                                              <div
                                                                className="td_item tdbg3"
                                                                onClick={() =>
                                                                  BetValue(
                                                                    item.b1,
                                                                    item.nat,
                                                                    "Over by Over Session Market",
                                                                    "back",
                                                                    item.sid,
                                                                    item.srno,
                                                                    item.ballsess,
                                                                    item.bs1,
                                                                    item.min,
                                                                    item.max,
                                                                    item.l1,
                                                                    item.ls1,
                                                                    item.b1,
                                                                    item.bs1,
                                                                    item.gstatus,
                                                                    item.remark
                                                                  )
                                                                }
                                                              >
                                                                <h4>
                                                                  {Math.round(
                                                                    item.b1
                                                                  )}
                                                                </h4>
                                                                <p>
                                                                  {Math.round(
                                                                    item.bs1
                                                                  )}
                                                                </p>

                                                                {/* <h4>{item.l1}</h4>
                                                    <p>{item.ls1}</p> */}
                                                              </div>
                                                            </td>
                                                          ) : (
                                                            <td className="td_width pp1">
                                                              <div className="td_item tdbg4">
                                                                <h4></h4>
                                                                <p></p>
                                                              </div>
                                                            </td>
                                                          )}
                                                          <td className="td_width display">
                                                            <div className="td_item bd">
                                                              <h4>
                                                                Min:
                                                                {Math.round(
                                                                  item.min
                                                                )}
                                                              </h4>
                                                              <p>
                                                                Max:
                                                                {Math.round(
                                                                  item.max /
                                                                    1000
                                                                )}
                                                                K
                                                              </p>
                                                            </div>
                                                          </td>
                                                        </tr>
                                                      );
                                                    } else {
                                                      return null; // Return null if age is less than or equal to 18
                                                    }
                                                  })}
                                                </tbody>
                                                {/* )} */}
                                              </table>
                                            </div>
                                          </div>
                                        </div>
                                      )}

                                    {(UiStatus === "All" ||
                                      UiStatus === "Ball") &&
                                      data &&
                                      filterball && (
                                        <div className="col-md-12">
                                          <div className="bars_bg">
                                            <div className="row">
                                              <div className="col-md-12">
                                                <div className="section_heading">
                                                  <h2>
                                                    Ball by Ball Session Market
                                                  </h2>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                          <div className="match_odds_table">
                                            <div className="table-responsive-sm">
                                              <table className="table table-borderless">
                                                {/* {data.message ==
                                              "Match score fetched." ? (
                                              <>
                                                {" "}
                                                <p>No real-time records found</p>
                                              </>
                                            ) : ( */}
                                                <tbody>
                                                  <tr>
                                                    <td className="min_width">
                                                      <div className="td1">
                                                        <h4>&nbsp;</h4>
                                                      </div>
                                                    </td>

                                                    <td className="min_width">
                                                      <div className="td1">
                                                        <h4>&nbsp;</h4>
                                                      </div>
                                                    </td>

                                                    <td className="td_width">
                                                      <div className="td_item tdbg4 rc1">
                                                        <h4>No</h4>
                                                      </div>
                                                    </td>
                                                    <td className="td_width">
                                                      <div className="td_item tdbg3">
                                                        <h4>Yes</h4>
                                                      </div>
                                                    </td>
                                                    <td className="td_width display">
                                                      <div className="td_item bd">
                                                        <h4>&nbsp;</h4>
                                                      </div>
                                                    </td>
                                                  </tr>
                                                  {data?.map((item, index) => {
                                                    if (item.ballsess == "3") {
                                                      return (
                                                        <tr>
                                                          <tr>
                                                            {item.gstatus ==
                                                            "SUSPENDED" ? (
                                                              <tr className="tr_data_4">
                                                                {item.gstatus}
                                                              </tr>
                                                            ) : item.gstatus ==
                                                              "Ball Running" ? (
                                                              <>
                                                                {" "}
                                                                <tr className="tr_data_4">
                                                                  {item.gstatus}
                                                                </tr>
                                                              </>
                                                            ) : (
                                                              <></>
                                                            )}
                                                          </tr>
                                                          <td className="ssmk min_width">
                                                            <div className="td1">
                                                              <h4 className="headpp4">
                                                                {item.nat}
                                                              </h4>
                                                              {/* <p>{item.utime}</p> */}
                                                            </div>
                                                          </td>
                                                          {item.b1 != 0.0 ? (
                                                            <td className="tdss td_width">
                                                              <div
                                                                className="td_item tdbg4"
                                                                onClick={() =>
                                                                  BetValue(
                                                                    item.b1,
                                                                    item.nat,
                                                                    "Ball by Ball Session Market",
                                                                    "lay",
                                                                    item.sid,
                                                                    item.srno,
                                                                    item.ballsess,
                                                                    item.ls1,
                                                                    item.min,
                                                                    item.max,
                                                                    item.l1,
                                                                    item.ls1,
                                                                    item.b1,
                                                                    item.bs1,
                                                                    item.gstatus,
                                                                    item.remark
                                                                  )
                                                                }
                                                              >
                                                                <h4>
                                                                  {Math.round(
                                                                    item.b1
                                                                  )}
                                                                </h4>
                                                                <p>
                                                                  {Math.round(
                                                                    item.bs1
                                                                  )}
                                                                </p>
                                                              </div>
                                                            </td>
                                                          ) : (
                                                            <td className="td_width pp">
                                                              <div className="td_item tdbg4">
                                                                <h4></h4>
                                                                <p></p>
                                                              </div>
                                                            </td>
                                                          )}
                                                          {item.l1 != 0.0 ? (
                                                            <td className="tdss td_width">
                                                              <div
                                                                className="td_item tdbg3"
                                                                onClick={() =>
                                                                  BetValue(
                                                                    item.l1,
                                                                    item.nat,
                                                                    "Ball by Ball Session Market",
                                                                    "back",
                                                                    item.sid,
                                                                    item.srno,
                                                                    item.ballsess,
                                                                    item.bs1,
                                                                    item.min,
                                                                    item.max,
                                                                    item.ls1,
                                                                    item.b1,
                                                                    item.bs1,
                                                                    item.gstatus,
                                                                    item.remark
                                                                  )
                                                                }
                                                              >
                                                                <h4>
                                                                  {Math.round(
                                                                    item.l1
                                                                  )}
                                                                </h4>
                                                                <p>
                                                                  {Math.round(
                                                                    item.ls1
                                                                  )}
                                                                </p>
                                                              </div>
                                                            </td>
                                                          ) : (
                                                            <td className="td_width pp1">
                                                              <div className="td_item tdbg1">
                                                                <h4></h4>
                                                                <p></p>
                                                              </div>
                                                            </td>
                                                          )}
                                                          <td className="td_width display">
                                                            <div className="td_item bd">
                                                              <h4>
                                                                Min:
                                                                {Math.round(
                                                                  item.min
                                                                )}
                                                              </h4>
                                                              <p>
                                                                Max:
                                                                {Math.round(
                                                                  item.max /
                                                                    1000
                                                                )}
                                                                K
                                                              </p>
                                                            </div>
                                                          </td>
                                                        </tr>
                                                      );
                                                    } else {
                                                      return null;
                                                    }
                                                  })}
                                                </tbody>
                                                {/* )} */}
                                              </table>
                                            </div>
                                          </div>
                                        </div>
                                      )}
                                  </div>
                                </div>
                              </div>
                              {/* // data missing */}
                            </div>

                            {/* <!----===============Tiedmatch row=================-----> */}
                            <div>
                              <div className="row">
                                {(UiStatus === "All" || UiStatus === "Tied") &&
                                  showTied &&
                                  filtersess && (
                                    <div className="col-md-12">
                                      <div className="bars_bg textand_icons_style">
                                        <div className="section_heading">
                                          <h2>Tied Match</h2>
                                        </div>
                                        <div className="section_heading">
                                          <h3>
                                            <i className="fa fa-info-circle"></i>
                                          </h3>
                                        </div>
                                      </div>
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
                                              </tr>

                                              <tr>
                                                <td className="min_width">
                                                  <div className="td1">
                                                    <h4>
                                                      {Tiedlabel &&
                                                      Tiedlabel.length > 0
                                                        ? Tiedlabel[0]
                                                            ?.runnerName
                                                        : ""}
                                                    </h4>
                                                  </div>
                                                </td>

                                                {isNaN(t9[0]?.price) ? (
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
                                                          t9[0]?.price,
                                                          Tiedlabel[0]
                                                            ?.runnerName,
                                                          "Tied Match",
                                                          "back",
                                                          Tiedsus.selectionId,
                                                          "Tied Match",
                                                          0,
                                                          0,
                                                          0,
                                                          0,
                                                          t9[0]?.size,
                                                          t9[0]?.price,
                                                          0,
                                                          0,
                                                          Tiedsus.status,
                                                          0,
                                                          Tiedlabel[0]
                                                            ?.runnerName
                                                        )
                                                      }
                                                    >
                                                      <h4>{t9[0]?.price}</h4>
                                                      {t9[0]?.size < 1000 ? (
                                                        <p>{t9[0]?.size}</p>
                                                      ) : (
                                                        <p>
                                                          {(
                                                            t9[0]?.size / 1000
                                                          ).toFixed(1)}
                                                          K
                                                        </p>
                                                      )}
                                                    </div>
                                                  </td>
                                                )}
                                                {isNaN(t10[0]?.price) ? (
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
                                                          t10[0]?.price,
                                                          Tiedlabel[0]
                                                            ?.runnerName,
                                                          "Tied Match",
                                                          "lay",
                                                          Tiedsus.selectionId,
                                                          "Tied Match",
                                                          0,
                                                          0,
                                                          0,
                                                          0,
                                                          t10[0]?.size,
                                                          t10[0]?.price,
                                                          0,
                                                          0,
                                                          Tiedsus.status,
                                                          0,
                                                          Tiedlabel[1]
                                                            ?.runnerName
                                                        )
                                                      }
                                                    >
                                                      <h4>{t10[0]?.price}</h4>
                                                      {t10[0]?.size < 1000 ? (
                                                        <p>{t10[0]?.size}</p>
                                                      ) : (
                                                        <p>
                                                          {(
                                                            t10[0]?.size / 1000
                                                          ).toFixed(1)}
                                                          K
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
                                                      {Complabel &&
                                                      Complabel.length > 0
                                                        ? Complabel[1]
                                                            ?.runnerName
                                                        : ""}
                                                    </h4>
                                                  </div>
                                                </td>

                                                {isNaN(t11[0]?.price) ? (
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
                                                          t11[0]?.price,
                                                          Tiedlabel[1]
                                                            ?.runnerName,
                                                          "Tied Match",
                                                          "back",
                                                          Tiedsus1.selectionId,
                                                          "Tied Match",
                                                          0,
                                                          0,
                                                          0,
                                                          0,
                                                          t11[0]?.size,
                                                          t11[0]?.price,
                                                          0,
                                                          0,
                                                          Tiedsus1.status,
                                                          0,
                                                          Tiedlabel[1]
                                                            ?.runnerName
                                                        )
                                                      }
                                                    >
                                                      <h4>{t11[0]?.price}</h4>
                                                      {t11[0]?.size < 1000 ? (
                                                        <p>{t11[0]?.size}</p>
                                                      ) : (
                                                        <p>
                                                          {(
                                                            t11[0]?.size / 1000
                                                          ).toFixed(1)}
                                                          K
                                                        </p>
                                                      )}
                                                    </div>
                                                  </td>
                                                )}
                                                {isNaN(t12[0]?.price) ? (
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
                                                          t12[0]?.price,
                                                          Tiedlabel[1]
                                                            ?.runnerName,
                                                          "Tied Match",
                                                          "lay",
                                                          Tiedsus1.selectionId,
                                                          "Tied Match",
                                                          0,
                                                          0,
                                                          0,
                                                          0,
                                                          t12[0]?.size,
                                                          t12[0]?.price,
                                                          0,
                                                          0,
                                                          Tiedsus1.status,
                                                          0,
                                                          Tiedlabel[0]
                                                            ?.runnerName
                                                        )
                                                      }
                                                    >
                                                      <h4>{t12[0]?.price}</h4>
                                                      {t12[0]?.size < 1000 ? (
                                                        <p>{t12[0]?.size}</p>
                                                      ) : (
                                                        <p>
                                                          {(
                                                            t12[0]?.size / 1000
                                                          ).toFixed(1)}
                                                          K
                                                        </p>
                                                      )}
                                                    </div>
                                                  </td>
                                                )}
                                              </tr>
                                            </tbody>{" "}
                                          </table>
                                        </div>
                                      </div>
                                    </div>
                                  )}
                              </div>
                            </div>
                          </>
                        )}
                      </Box>
                    </div>
                  </>
                )}
              </div>

              <div className="col-md-4 bet_icon ">
                <div className="section_bg" id="bettingSection">
                  <div className="bars_bg live_stream">
                    <div className="row">
                      <div className="col-md-6">
                        <div className="section_heading">
                          <h2>Live Match</h2>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="section_heading" id="video_tab">
                          <p>
                            <i className="fa fa-television"></i> live stream
                            started
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="live_video video_tab_pan"
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
                                                onClick={() =>
                                                  handleClick("1000")
                                                }
                                                value="1000"
                                              >
                                                1000
                                              </button>
                                              <button
                                                class="btn btn-success btn_dyn ng-tns-c85-1 ng-star-inserted"
                                                onClick={() =>
                                                  handleClick("2000")
                                                }
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
                                                onClick={() =>
                                                  handleClick("1000")
                                                }
                                                value="1000"
                                              >
                                                1000
                                              </button>
                                              <button
                                                class="btn btn-success btn_dyn ng-tns-c85-1 ng-star-inserted"
                                                onClick={() =>
                                                  handleClick("2000")
                                                }
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
                                              {profitBal || 0}
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
                                                onClick={() =>
                                                  handleClick("1000")
                                                }
                                                value="1000"
                                              >
                                                1000
                                              </button>
                                              <button
                                                class="btn btn-success btn_dyn ng-tns-c85-1 ng-star-inserted"
                                                onClick={() =>
                                                  handleClick("2000")
                                                }
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

                  <div className="mybet_wedget">
                    <div className="bars_bg">
                      <div className="section_heading w-100 p-0 m-0">
                        <h2 className="mt-2">My Bet</h2>
                        <a
                          className="Bet_button btn btn-peimary"
                          href="/Unsellected"
                        >
                          {" "}
                          Bet History
                        </a>
                      </div>
                    </div>
                    <div className="mybet_table">
                      <div
                        className="table-responsive"
                        style={{
                          overflowY: "scroll",
                          // overflowX: "hidden",
                          maxHeight: "400px",
                        }}
                      >
                        <table className="table">
                          <thead>
                            <tr className="text-white">
                              <th className="text-white">Matched Bet</th>
                              <th className="text-white">Type</th>
                              <th className="text-white">Odds</th>
                              <th className="text-white">Stake</th>
                              <th className="text-white">Win Amount</th>
                              <th className="text-white">Bhaw</th>
                              <th className="text-white">Result</th>
                              {/* <th>Stake</th> */}
                            </tr>
                          </thead>
                          <tbody>
                            {tableData?.map((item) => {
                              // console.log("item", item.team.length);
                              return item.back > 0 ? (
                                <tr
                                  key={item.id}
                                  style={{ backgroundColor: "#0b9cf1" }}
                                >
                                  <td className="td_bet_items">
                                    <input
                                      type="text"
                                      value={item.team}
                                      className="bet_Items"
                                    />
                                  </td>
                                  <td>
                                    {" "}
                                    <img
                                      src={
                                        item.remark.includes("Cricket")
                                          ? criball
                                          : item.remark.includes("Soccer")
                                          ? football
                                          : tannis
                                      }
                                      // src={tannis}
                                      width="15px"
                                      style={{
                                        marginRight: "5px",
                                        filter: "invert(1)",
                                      }}
                                    />
                                  </td>
                                  <td>{item.type}</td>
                                  <td>{item.stake}</td>
                                  <td>{item.winamount || 0}</td>
                                  <td>
                                    {item.lay > 0 ? (
                                      <div className="">{item.lay}</div>
                                    ) : (
                                      <div className="">{item.back}</div>
                                    )}
                                  </td>
                                  {item.status == "1" ? (
                                    <td>
                                      {item.MatchStatus == "0" ? (
                                        <div className="result2">
                                          <span>-</span>
                                        </div>
                                      ) : (
                                        <div className="result1">
                                          {" "}
                                          <span>+</span>
                                        </div>
                                      )}
                                    </td>
                                  ) : (
                                    <td>
                                      {item.lay > 0 ? (
                                        <div className="result5">.</div>
                                      ) : (
                                        <div className="result5">.</div>
                                      )}
                                    </td>
                                  )}
                                  {/* <td>{item.stake}</td> */}
                                </tr>
                              ) : (
                                <tr
                                  key={item.id}
                                  style={{ backgroundColor: "#f37a13" }}
                                >
                                  <td className="td_bet_items">
                                    <input
                                      type="text"
                                      value={item.team}
                                      className="bet_Items"
                                    />
                                  </td>
                                  <td>
                                    {" "}
                                    <img
                                      src={
                                        item.remark.includes("Cricket")
                                          ? criball
                                          : item.remark.includes("Soccer")
                                          ? football
                                          : tannis
                                      }
                                      // src={tannis}
                                      width="15px"
                                      style={{
                                        marginRight: "5px",
                                        filter: "invert(1)",
                                      }}
                                    />
                                  </td>
                                  <td>{item.type}</td>
                                  <td>{item.stake}</td>
                                  <td>{item.winamount || 0}</td>
                                  <td>
                                    {item.lay > 0 ? (
                                      <div className="">{item.lay}</div>
                                    ) : (
                                      <div className="">{item.back}</div>
                                    )}
                                  </td>
                                  {item.status == "1" ? (
                                    <td>
                                      {item.MatchStatus == "0" ? (
                                        <div className="result2">
                                          <span>-</span>
                                        </div>
                                      ) : (
                                        <div className="result1">
                                          {" "}
                                          <span>+</span>
                                        </div>
                                      )}
                                    </td>
                                  ) : (
                                    <td>
                                      {item.lay > 0 ? (
                                        <div className="result5">.</div>
                                      ) : (
                                        <div className="result5">.</div>
                                      )}
                                    </td>
                                  )}
                                  {/* <td>{item.stake}</td> */}
                                </tr>
                              );
                            })}
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
    </div>
  );
}

export default Live_Matches;
