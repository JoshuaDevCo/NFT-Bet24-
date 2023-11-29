import React, { useState, useEffect } from "react";
import axios from "axios";
import "../Matches/./Match.css";
import Navbar from "../Header/Navbar";
import { useNavigate, useParams } from "react-router-dom";
import AllSide from "../Dropdown/AllSide";
import "../Dropdown/AllSide";
import Table_Buttons from "../Table_Buttons/Table_Button";
import moment from "moment";
import UpperHeader from "../Dash_Child/UpperHeader";
import LeftSidebar from "../Dash_Child/LeftSidebar";
import FirstSlid from "../Dash_Child/FirstSlid";
import { API } from "../../API";

function Level_Income() {
  const user = sessionStorage.getItem("user");
  let ress = JSON.parse(user);
  let uId = ress.resultid;
  const [tableData, setTableData] = useState([]);

  const [currentPage, setcurrentPage] = useState(1);
  const [listPerpage, setlistPerpage] = useState(100);
  const [select, setSelect] = useState(100);


  const LevelIncome_Api = async () => {
    try {
      let res = await API.get(
        `level_income_list?uid=${uId}&level=${select}`
      );
      res = res.data.data;
      console.log("LevelIncome_Api", res);
      setTableData(res);
    } catch (e) {
      console.log("Error While Fatch LevelIncome_Api", e);
    }
  };

  useEffect(() => {
    LevelIncome_Api();
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
        <LeftSidebar />
        {/* <!-----=======body section start=======----> */}
        <div id="content">
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
                            <h2>Level Income</h2>
                            {/* <a className="btn" href="/Bet_History" >Bet History</a> */}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <from>
                        <div className="col-md-12 mod_12" >
                        <div className="col-md-2">
                            <label className="todate"></label>
                            <br />
                            <select class="form-control" onChange={(e) => setSelect(e.target.value)}>
                            <option value="all">All</option>
                              <option value="1">Level 1</option>
                              <option value="2">Level 2</option>
                              <option value="3">Level 3</option>
                              <option value="4">Level 4</option>
                              <option value="5">Level 5</option>
                            </select>
                          </div>

                          <div className="col-md-3">
                            <label className="todate"></label>
                            <br />
                            <input
                              className="btn btn-success"
                              type="submit"
                              value="Submit"
                            />
                          </div>
                        </div>
                        <br />
                      </from>
                    </div>
                    <div class="mybet_table">
                      <div class="table-responsive">
                        <table class="table">
                          <thead>
                            <tr>
                              <th>No</th>
                              <th>Sponsor Id</th>
                              <th>Level</th>
                              <th>Income</th>
                              <th>Date</th>
                              <th>Remark</th>
                            </tr>
                          </thead>
                          <tbody>
                            {currentPost?.map((item, index) => (
                              <tr key={item.id}>
                                <td>{(currentPage - 1) * listPerpage + index + 1}</td>
                                <td>{item.sid}</td>
                                <td>{item.lvl}</td>
                                <td>{item.income}</td>
                                <td>{item.edate}</td>
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
  )
}

export default Level_Income