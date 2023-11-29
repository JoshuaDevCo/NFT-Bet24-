import React, { useState, useEffect } from "react";
import axios from "axios";
import "../Matches/./Match.css";
import Navbar from "../Header/Navbar";
import { useNavigate, useParams } from "react-router-dom";
import AllSide from "./AllSide";
import "./AllSide.css";
import { toast } from "react-hot-toast";

function Button_value() {
  const user = sessionStorage.getItem("user");
  let ress = JSON.parse(user);
  let uId = ress.resultid;
  const [data, setData] = useState([]);
  // const
  const Button_Api = async () => {
    try {
      let res = await axios.get(
        "https://nft-betting-api.nakshtech.info/Get_Button_value_List?uid=339602"
      );
      res = res.data.data;
      console.log("Button_Api", res);
      setData(res);
    } catch (e) {
      console.log("Error While Fatch Button_Api", e);
    }
  };

  useEffect(() => {
    Button_Api();
  }, []);

  const handleInputChange = (event, id) => {
    const updatedData = data.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          price_level:
            event.target.name === "price_level"
              ? event.target.value
              : item.price_level,
          price_value:
            event.target.name === "price_value"
              ? event.target.value
              : item.price_value,
        };
      }
      return item;
    });
    console.log("update", updatedData);
    setData(updatedData);
  };

  const handleButtonClick = async (id, label, value) => {
    try {
      let res = await axios.post(
        `https://nft-betting-api.nakshtech.info/Update_Button_value_list`,
        {
          id: id,
          uid: uId,
          price_level: label,
          price_value: value,
        }
      );
      console.log("Button_Api", res);
      // res = res.data.data;
      if(res.data.success){
        toast.success('Successfull')
        Button_Api()
      }
      // setData(res);
    } catch (e) {
      console.log("Error While Fatch Button_Api", e);
    }
  };
  return (
    <div>
      <Navbar />
      <main class="main_root wrapper">
        <AllSide />
        {/* <!-----=======body section start=======----> */}
        <div id="content">
          <div class="container">
            <div class="row">
              <div class="col-md-12 ">
                <div class="section_bg">
                  <div class="mybet_wedget">
                    <div class="bars_bg">
                      <div class="row">
                        <div class="col-md-12">
                          <div class="section_heading">
                            <h2>Change Button Values</h2>
                            {/* <a className="btn" href="/Bet_History" >Bet History</a> */}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <from>
                        <div className="col-md-12" style={{ display: "flex" }}>
                          <div className="col-md-4">
                            {data.map((item) => (
                              <div className="col-md-12" key={item.id}>
                                {/* <label className="fromdate">Price Label</label> */}
                                <br />
                                <input
                                  className="button_value from-control"
                                  type="text"
                                  name="price_level"
                                  value={item.price_level}
                                  onChange={(e) =>
                                    handleInputChange(e, item.id)
                                  }
                                />
                              </div>
                            ))}
                          </div>
                          <div className="col-md-4">
                            {data.map((item) => (
                              <div className="col-md-12" key={item.id}>
                                {/* <label className="fromdate">Price Value</label> */}
                                <br />
                                <input
                                  className="button_value from-control"
                                  type="text"
                                  name="price_value"
                                  value={item.price_value}
                                  onChange={(e) =>
                                    handleInputChange(e, item.id)
                                  }
                                />
                              </div>
                            ))}
                          </div>
                          <div className="col-md-3">
                            {data.map((item) => (
                              <div className="col-md-12">
                                <label className="todate"></label>
                                <br />
                                <input
                                  // className="btn btn-info btn-sm"
                                  style={{    background: "#0dcaf0",
                                  padding: "0.1rem !important"}}
                                className="text-center"                                  // type="submit"
                                  value="Update"
                                  readOnly
                                  onClick={() =>
                                    handleButtonClick(
                                      item.id,
                                      item.price_level,
                                      item.price_value
                                    )
                                  }
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                        {/* <div className="col-md-3 update">
                            <label className="todate"></label>
                            <br />
                            <input
                              className="btn btn-info"
                              // type="submit"
                              value="Update"
                              readOnly
                              onClick={handleButtonClick}
                            />
                          </div> */}
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

export default Button_value;
