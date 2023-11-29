import React, { useState, useEffect } from "react";
import "../Matches/./Match.css";
import Navbar from "../Header/Navbar";
import { useNavigate, useParams } from "react-router-dom";
import AllSide from "./AllSide";
import "./AllSide.css";
import { API } from "../../API";
import Table_Buttons from "../Table_Buttons/Table_Button";
import moment from "moment";
import UpperHeader from "../Dash_Child/UpperHeader";
import LeftSidebar from "../Dash_Child/LeftSidebar";
import FirstSlid from "../Dash_Child/FirstSlid";

function Statement() {
  const user = sessionStorage.getItem("user");
  let ress = JSON.parse(user);
  let UserId = ress.resultid;
  const [tableData, setTableData] = useState([]);
  const [todate, settodate] = useState("");
  const [fromdate, setfromdate] = useState("");

  const [currentPage, setcurrentPage] = useState(1);
  const [listPerpage, setlistPerpage] = useState(100);

  const Statement_History = async () => {
    try {
      let res = await API.post(`getAccount_Statement`, {
        uid: UserId,
        fromDate: fromdate,
        toDate: todate,
      });
      res = res.data.data;
      console.log("Statement_History", res);
      setTableData(res);
    } catch (e) {
      console.log("Error While Fatch Bet_History API", e);
    }
  };

  useEffect(() => {
    Statement_History();
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
                            <h2>Account Statement</h2>
                            {/* <a className="btn" href="/Bet_History" >Bet History</a> */}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <from>
                        <div className="row ">
                          <div className="col-md-3">
                            <label className="fromdate">From Date</label>
                            <br />
                            <input
                              className="from-control"
                              type="date"
                              value={fromdate}
                              onChange={(e) => setfromdate(e.target.value)}
                            />
                          </div>
                          <div className="col-md-3">
                            <div className="form-group">
                              <label className="fromdate todate">To Date</label>
                              <br />
                              <input
                                className="from-control"
                                type="date"
                                value={todate}
                                onChange={(e) => settodate(e.target.value)}
                              />
                            </div>
                          </div>
                          <div className="col-md-3">
                            <label className="todate"></label>
                            <br />
                            <input
                              className="btn submit_BTN"
                              // type="submit"
                              value="Submit"
                              onClick={() => Statement_History()}
                              readOnly
                            />
                          </div>{" "}
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
                              <th>From Id</th>
                              <th>From Type</th>
                              <th>From Name</th>
                              <th>Date</th>

                              {/* <th>Event Type</th>
                              <th>Yes</th>
                              <th>No</th> */}
                              <th>Credit</th>
                              <th>Debit</th>
                              <th>Balance</th>
                              {/* <th>Sports</th> */}
                              <th>Remark</th>
                            </tr>
                          </thead>
                          <tbody>
                            {currentPost?.map((item, index) => (
                              <tr key={item.id}>
                                <td>
                                  {(currentPage - 1) * listPerpage + index + 1}
                                </td>
                                <td>{item.fromId}</td>
                                <td>{item.fromName}</td>
                                <td>{item.fromType}</td>
                                <td>{item.receivedDate}</td>
                                {/* <td>{item.type}</td>
                                <td>{item.back}</td>
                                <td>{item.lay}</td> */}
                                <td>{item.amount}</td>
                                <td>{item.deduct}</td>
                                <td>{item.balance}</td>
                                {/* <td>{item.remark}</td> */}
                                <td>{item.remark}</td>
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

export default Statement;
