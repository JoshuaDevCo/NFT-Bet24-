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

export default function Deposit_History() {
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
      console.log("UserId",UserId);
      let res = await API.get(`buycoin_history?id=${UserId}`);
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
                            <h2>Deposit History</h2>
                            {/* <a className="btn" href="/Bet_History" >Bet History</a> */}
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* <div className="row">
                      <from>
                        <div className="row mod_12">
                          <div className="col-md-2">
                            <label className="fromdate">From Date</label>
                            <br />
                            <input
                              className="from-control"
                              type="date"
                              value={fromdate}
                              onChange={(e) => setfromdate(e.target.value)}
                            />
                          </div>
                          <div className="col-md-2">
                            <label className="todate">To Date</label>
                            <br />
                            <input
                              className="from-control"
                              type="date"
                              value={todate}
                              onChange={(e) => settodate(e.target.value)}
                            />
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
                    </div> */}
                    <br />
                    <div class="mybet_table">
                      <div class="table-responsive" >
                        <table class="table" >
                          <thead className="Statement_head">
                            <tr>
                              <th>UserID</th>
                              <th>USDT Value</th>
                              <th>Pay USDT</th>
                              <th>Pay USDT TXN</th>
                              <th>Request Token</th>
                              <th>Date & Time</th>
                             
                            </tr>
                          </thead>
                          <tbody >
                            {currentPost?.map((item) => (
                              <tr key={item.id} >
                                <td >{item.user_id}</td>
                                <td>{item.USDValue}</td>
                                <td>{item.payBNB}</td>
                                <td><a   className="btn submit_BTN" href={`https://bscscan.com/tx/${item.PayBNBtxn}`} target="_blank" >View</a></td>
                                <td>{item.RequestToken}</td>
                                <td>
                                  {(item.Request_date)}
                                  {/* {moment(item.Request_date).format(
                                    "DD/MM/YYYY hh:mm:ss A",
                                  )}{" "} */}
                                </td>
                               
                              
                              </tr>
                            ))}
                          </tbody>
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
