import React, { useState, useEffect } from "react";
import "../Matches/./Match.css";
import Navbar from "../Header/Navbar";
import { useNavigate, useParams } from "react-router-dom";
import AllSide from "./AllSide";
import "./AllSide.css";
import Table_Buttons from "../Table_Buttons/Table_Button";
import moment from "moment";
import { API } from "../../API";
import UpperHeader from "../Dash_Child/UpperHeader";
import LeftSidebar from "../Dash_Child/LeftSidebar";
import FirstSlid from "../Dash_Child/FirstSlid";

function ProfitLoss() {
  const user = sessionStorage.getItem("user");
  let ress = JSON.parse(user);
  let uId = ress.resultusername;
  let UserId = ress.resultid;
  const [tableData, setTableData] = useState([]);
  const [todate, settodate] = useState("");
  const [fromdate, setfromdate] = useState("");
  const [select, setSelect] = useState("all");

  const [currentPage, setcurrentPage] = useState(1);
  const [listPerpage, setlistPerpage] = useState(100);

  const ProfitLossAPI = async () => {
    try {
      let res;
      if (uId.includes("BT")) {
      res = await API.get(
        `Loss_Profit?uid=${UserId}&fromDate=${fromdate}&toDate=${todate}`
      );
    }else{
      res = await API.get(
        `Loss_Profit_MLM?uid=${UserId}&fromDate=${fromdate}&toDate=${todate}`
      );
    }
      res = res.data.data;
      console.log("ProfitLossAPI", res);
      setTableData(res);
    } catch (e) {
      console.log("Error While Fatch ProfitLossAPI API", e);
    }
  };

  useEffect(() => {
    ProfitLossAPI();
  }, []);

  
  const indexOfLastPost = currentPage * listPerpage;
  const indexOfFirstPage = indexOfLastPost - listPerpage;
  const currentPost = tableData.slice(indexOfFirstPage, indexOfLastPost);
  const filteredData = select === "all" ? currentPost : currentPost.filter(item => item.matchstatus == select);

  console.log("filteredData",filteredData);

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
                            <h2>Profit Loss</h2>
                            {/* <a className="btn" href="/Bet_History" >Bet History</a> */}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row">
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
                          <div className="col-md-2">
                            <label className="todate"></label>
                            <br />
                            <select class="form-control" onChange={(e) => setSelect(e.target.value)}>
                            <option value="all">All</option>
                              <option value="1">Profit</option>
                              <option value="0">Loss</option>
                            </select>
                          </div>


                          <div className="col-md-3">
                            <label className="todate"></label>
                            <br />
                            <input
                              className="btn submit_BTN"
                              // type="submit"
                              value="Submit"
                              onClick={() => ProfitLossAPI()}
                              readOnly
                            />
                          </div>
                        </div>
                        <br />
                      </from>
                    </div>
                    <div class="mybet_table">
                      <div class="table-responsive">
                        <table class="table">
                          <thead className="Statement_head">
                            <tr>
                              <th>No</th>
                              <th>User</th>
                              <th>Date & Time</th>
                              <th>Event</th>
                              <th>Event Type</th>
                              <th>Match</th>
                              <th>Yes</th>
                              <th>No</th>
                              <th>Profit/Loss</th>
                              <th>Stack Amount</th>
                              <th>Win Amount</th>
                              <th>Profit Amount</th>
                            </tr>
                          </thead>
                          <tbody>
                            {filteredData?.map((item, index) => (
                              <tr key={item.id}>
                                <td>
                                  {(currentPage - 1) * listPerpage + index + 1}
                                </td>
                                <td>{item.username}</td>
                                <td>
                                  {moment(item.edate).format(
                                    "DD/MM/YYYY h:m:s A"
                                  )}
                                </td>
                                <td>{item.remark}</td>
                                <td>{item.team}</td>
                                <td>{item.name}</td>
                                <td>{item.back}</td>
                                <td>{item.lay}</td>

                                <td>
                                {item.matchstatus == "0" ? (
                                    <span className="badge badge-danger">
                                      Loss
                                    </span>
                                  ) : (
                                    <span className="badge badge-success">
                                      Profit
                                    </span>
                                  )}
                                </td>

                                <td>{item.amount}</td>
                                <td>{item.winamount}</td>
                                <td>{item.profitamount}</td>
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

export default ProfitLoss;
