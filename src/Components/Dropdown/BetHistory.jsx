import React, { useState, useEffect } from "react";
import "../Matches/./Match.css";
import Navbar from "../Header/Navbar";
import "./AllSide.css";
import AllSide from "./AllSide";
import moment from "moment";
import Table_Buttons from "../Table_Buttons/Table_Button";
import { API } from "../../API";
import UpperHeader from "../Dash_Child/UpperHeader";
import LeftSidebar from "../Dash_Child/LeftSidebar";
import FirstSlid from "../Dash_Child/FirstSlid";

function Bet_History_Drop() {
  const user = sessionStorage.getItem("user");
  let ress = JSON.parse(user);
  let UserId = ress.resultid;
  const [tableData, setTableData] = useState([]);
  const [todate, settodate] = useState('')
  const [fromdate, setfromdate] = useState('')
  const [currentPage, setcurrentPage] = useState(1);
  const [listPerpage, setlistPerpage] = useState(100);

  const PlaceBet_History = async () => {
    try {
      let res = await API.post("BetHistory", {
        "uid": UserId,
        "fromDate": fromdate,
        "toDate": todate
      }
      );
      res = res.data.data;
      console.log("PlaceBet_History", res);
      setTableData(res);
    } catch (e) {
      console.log("Error While Fatch Bet_History API", e);
    }
  };

  useEffect(() => {
    PlaceBet_History();
  }, []);

  const indexOfLastPost = currentPage * listPerpage;
  const indexOfFirstPage = indexOfLastPost - listPerpage;
  const currentPost = tableData.slice(indexOfFirstPage, indexOfLastPost);

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
                            <h2>Bet History</h2>
                            {/* <a className="btn" href="/Bet_History" >Bet History</a> */}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <from>
                        <div className="row mod_12" >
                          <div className="col-md-2">
                            <label className="fromdate">From Date</label>
                            <br />
                            <input className="from-control" type="date" value={fromdate} onChange={(e) => setfromdate(e.target.value)} />
                          </div>
                          <div className="col-md-2">
                            <label className="todate">To Date</label>
                            <br />
                            <input className="from-control" type="date" value={todate} onChange={(e) => settodate(e.target.value)} />
                          </div>
                          <div className="col-md-3">
                            <label className="todate"></label>
                            <br />
                            <input
                              className="btn submit_BTN"
                              // type="submit"
                              value="Submit"
                              onClick={() => PlaceBet_History()}
                              readOnly
                            />
                          </div>
                        </div>
                        <br />
                      </from>
                    </div>
                    <br />
                    <div class="mybet_table">
                      <div class="table-responsive">
                        <table class="table">
                          <thead className="Statement_head">
                            <tr>
                              <th>Matched Bet</th>
                              <th>Odds</th>
                              <th>Remark</th>
                              <th>Match</th>
                              <th>Back</th>
                              <th>Lay</th>
                              <th>Date & Time</th>
                              <th>Ball Session</th>
                              <th>Match Id</th>
                              <th>Match Status</th>
                              <th>Status</th>
                              {/* <th>Stake</th> */}
                            </tr>
                          </thead>
                          {/* {currentPost?.map((item) => (
                              return()
                              {item.back >0 ? <></>:<></>} */}
                          <tbody>
                            {currentPost.map((item) => (
                              item.back > 0 ? (
                                <tr key={item.id} style={{backgroundColor:"#0b9cf1"}}>
                                  <td>{item.team}</td>
                                  <td>{item.type}</td>
                                  <td>{item.remark}</td>
                                  <td>{item.name}</td>
                                  <td>{item.back}</td>
                                  <td>{item.lay}</td>
                                  <td>{moment(item.dd).format("DD/MM/YYYY h:m:s A")}  </td>
                                  <td>{item.ballsess}</td>
                                  <td>{item.matchid}</td>
                                  {item.status == "1" ? (
                                    <td>
                                      {item.MatchStatus == "0" ? (
                                        <div className="result3 text-center">-</div>
                                      ) : (
                                        <div className="result4 text-center">+</div>
                                      )}
                                    </td>
                                  ) : (
                                    <td>
                                      {
                                        item.lay > 0 ?
                                          <div className="result51" id="result9">.</div>
                                          :
                                          <div className="result50" >.</div>
                                      }

                                    </td>
                                  )}
                                  <td>{item.status == '0' ? 'Unsettled' : 'Settled'}</td>
                                  {/* <td>{item.stake}</td> */}
                                </tr>
                              ) : (
                                <tr key={item.id} style={{backgroundColor:"#f37a13 "}}>
                                  <td>{item.team}</td>
                                  <td>{item.type}</td>
                                  <td>{item.remark}</td>
                                  <td>{item.name}</td>
                                  <td>{item.back}</td>
                                  <td>{item.lay}</td>
                                  <td>{moment(item.dd).format("DD/MM/YYYY h:m:s A")}  </td>
                                  <td>{item.ballsess}</td>
                                  <td>{item.matchid}</td>
                                  {item.status == "1" ? (
                                    <td>
                                      {item.MatchStatus == "0" ? (
                                        <div className="result3 text-center">-</div>
                                      ) : (
                                        <div className="result4 text-center">+</div>
                                      )}
                                    </td>
                                  ) : (
                                    <td>
                                      {
                                        item.lay > 0 ?
                                          <div className="result51" id="result9">.</div>
                                          :
                                          <div className="result50" >.</div>
                                      }

                                    </td>
                                  )}
                                  <td>{item.status == '0' ? 'Unsettled' : 'Settled'}</td>
                                  {/* <td>{item.stake}</td> */}
                                </tr>
                              )
                            ))}

                          </tbody>
                          {/* ))} */}
                        </table>
                        <Table_Buttons
                          indexOfFirstPage={indexOfFirstPage}
                          indexOfLastPost={indexOfLastPost}
                          setcurrentPage={setcurrentPage}
                          currentPage={currentPage}
                          totalData={tableData.length}
                          listPerpage={listPerpage}
                        />
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

export default Bet_History_Drop;
