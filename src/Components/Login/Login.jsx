import React, { useState, useEffect } from "react";
import { API } from "../../API";
import swal from "sweetalert";
import axios from "axios";

function Login() {
  const [UserName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [data, setData] = useState("");
  const IP_address = async () => {
    try {
      let res = await axios.get(`https://api.ipify.org?format=json`);
      res = res.data;
      console.log("IP_Addressres==>", res);
      setData(res.ip);
    } catch (e) {
      console.log("Error While Fatch Dashboard API", e);
    }
  };

  useEffect(() => {
    IP_address();

  }, []);

  const Login_APi = async () => {
    try {
      let responce = await API.post("/login", {
        username: UserName,
        password: password,
        ipaddress: data,
      });
      responce = responce.data.data;
      // console.log("res", responce);
      let result = `User Name : ${responce.resultusername} & User Id : ${responce.resultid}`;
      if (responce.result == "Successfull") {
        sessionStorage.setItem('user', JSON.stringify(responce))
        swal({
          title: "Success..!",
          text: "Login has been successfull !!",
          icon: "success",
          button: "OK",
        }).then((okay) => {
          if (okay) {
            window.location.href = "./Dashboard/Cricket/4";
          }
        });
      } else {
        
        swal({
          title: "Registration Error..!!",
          text: responce.result,
          icon: "error",
          button: "OK",
        });
      }
    } catch (e) {
      console.log("Something Error", e);
    }
  };

  return (
    <div>
      <div class="container">
        <div class="row">
          <div class="col-md-6">
            <div class="login_form">
              <h1>
                SIGN IN YOUR
                <br /> <span>ACCOUNT</span>
              </h1>
              <p>
                To Keep connected with us please login with your personal info.
              </p>
              <form>
                <div class="form-group">
                  <label for="email">Login Id</label>
                  <input
                    type="text"
                    class="form-control"
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="User Id"
                    name="username"
                  />
                </div>
                <div class="form-group">
                  <label for="pwd">Password</label>
                  <input
                    type="password"
                    class="form-control"
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    name="pswd"
                  />
                </div>
                <div class="form-group form-check set_dflex">
                  
                  <div class="login_btn">
                    <button
                      type="button"
                      onClick={() => Login_APi()}
                      class="btn button btn-block"
                    >
                      Sign In{" "}
                    </button>
                  </div>
                  <label class="link_text">
                    <a href="/Forgot">Forgot Password </a>
                  </label>
                </div>
               
              </form>
            </div>
          </div>
          <div class="col-md-6">
            <div class="login_img">
              <img src="assets/images/login_img.png" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
