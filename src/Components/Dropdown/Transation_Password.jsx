import React, { useState, useEffect } from "react";
import "../Matches/./Match.css";
import Navbar from "../Header/Navbar";
import { useNavigate, useParams } from "react-router-dom";
import AllSide from "./AllSide";
import "./AllSide.css";
import { toast } from "react-hot-toast";
import { API } from "../../API";
import UpperHeader from "../Dash_Child/UpperHeader";
import LeftSidebar from "../Dash_Child/LeftSidebar";
import FirstSlid from "../Dash_Child/FirstSlid";

function Transation_Password() {
  const user = sessionStorage.getItem("user");
  let ress = JSON.parse(user);
  let userName = ress.resultusername;
  let UserId = ress.resultid;

  const [old, setOld] = useState("");

  const Profile = async () => {
    try {
      let res;
      if (userName.includes("BT")) {
        res = await API.get(`Userprofile_Details?uid=${UserId}`);
      } else {
        res = await API.get(`Userprofile_Details_MLM?uid=${UserId}`);
      }
      res = res.data.data[0]
      console.log("Profile+>", res);
      setOld(res.trans_password)

    } catch (e) {
      console.log("Somthing error in Profile API", e);
    }
  }

  useEffect(() => {
    Profile();
  }, [])

  const handleUpdatePassword = async () => {
    try {
      let res;
      if (userName.includes("BT")) {
        res = await API.post(`Update_Trans_Password`, {
          uid: UserId,
          "trans_password": old
        });
      } else {
        res = await API.post(`Update_Trans_Password_MLM`, {
          uid: UserId,
          "trans_password": old
        });
      }
      console.log("Even_Type", res.data);
      // setscoreboard_data(res.data)
      if (res.data.data === "Update Successfull") {
        toast.success(res.data.data);
      } else {
        toast.error(res.data.data);
      }
    } catch (error) {
      console.log("Something Error in handleUpdatePassword API", error);
    }
  };
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
                            <h2>Change Transaction Password</h2>
                            {/* <a className="btn" href="/Bet_History" >Bet History</a> */}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <from>
                        {/* <div className="col-md-12"> */}
                        <div className="col-lg-6 col-12">
                          <label className="fromdate"></label>
                          <br />
                          <input
                            className="password form-control"
                            type="text"
                            placeholder="Transaction Password"
                            value={old}
                            onChange={(e) => setOld(e.target.value)}
                            maxLength={20}
                          />
                        </div>


                        <div className="col-lg-6 col-12 submit_btnn">
                          <br />
                          <input
                            className="btn submit_BTN"
                            // type="submit"
                            value="Change Password"
                            onClick={() => handleUpdatePassword()}
                          />
                        </div>
                        {/* </div> */}
                        <br />
                      </from>
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

export default Transation_Password;
