import React, { useEffect, useState } from "react";
import "./Login_modal.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { API } from "../../API";
import swal from "sweetalert";
import axios from "axios";
import { IoMdClose } from "react-icons/io";
import loginimg from "../Assets/bet21-logo.png"


export default function Login_modal(props) {
  const [modalShow, setModalShow] = React.useState(false);
  const [UserName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [data, setData] = useState("");
  const [spinner, setspinner] = useState(false);
  
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

  const SessionClear = async () => {
    sessionStorage.clear();
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
        setspinner(false);

        return base64EncryptedData;
      }
    } catch (e) {
      console.log("encrypt Api error:", e);
      setspinner(false);
    }
  };

  const handleName = (event) => {
    const newValue = event.target.value.replace(/[^A-Z , 0-9]/gi, "");
      setUserName(newValue)
  }

  const Login_APi = async (name,pswd) => {
    let username=name||UserName;
    let psword=pswd||password
    try {
      setspinner(true);
      let body = await encryptdata({
        username: username,
        password: psword,
        ipaddress: data,
      });
      let responce = await API.post("login_new", {
        encryptedData: body,
      });
      // let responce = await API.post("/login_new", {
        
      // });
      responce = responce.data.data;
      console.log("res", responce);
      let result = `User Name : ${responce.resultusername} & User Id : ${responce.resultid}`;
      if (responce.result == "Successfull") {
        // sessionStorage.setItem("token", token)
        sessionStorage.setItem("user", JSON.stringify(responce));
        sessionStorage.setItem('jwtToken',  JSON.stringify(responce.token));

        // Clear the token after 5 minutes
       
        swal({
          title: "Success..!",
          text:  "Welcome To Bet24 !!",
          icon: loginimg,
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
  useEffect(() => {
    SessionClear();
  }, []);
  return (
    <div className="Main_lgon_mdoal">
      <Modal
        {...props}
        className="full_modal"
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header className="login_headr">
          <Modal.Title
            className="arrange_ment"
            id="contained-modal-title-vcenter"
          >
            <h4 className="Main_login_heading">Login</h4>
            <span className="circlue_red ">
              <IoMdClose
                className="login_icons"
                onClick={props.onHide}
              ></IoMdClose>
            </span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="conten_body">
          <div className="body_content_login">
            <div className="main_card_login">
              <label htmlFor="username">Username</label> <br />
              <input
                type="text"
                placeholder="Enter Username"
                onChange={(e) => setUserName(e.target.value)}
                    // placeholder="User Id"
                    name="username"
                className="input_login"
             
              />
              <div className="mt-4">
                <label htmlFor="password">Password</label> <br />
                <input
                  type="password"
                  placeholder="Enter password"
                  className="input_login"
                  onChange={(e) => setPassword(e.target.value)}
                   
                    name="pswd"
                />
              </div>
              <p className="term_cond">
                I am at least <span className="red_hu"> 18 years </span> of age
                and I have read, accept and agree to the{" "}
                <span className="green_hun">
                  {" "}
                  Terms and Conditions , Responsible Gaming , GamCare, Gambling
                  Therapy{" "}
                </span>
              </p>
             
                {" "}
                <button className="login_btn" onClick={() => Login_APi() }    >
                  {" "}
                  Login
                </button>
             
              <p className="term_cond">
                This site is protected by reCAPTCHA and the Google{" "}
                <span className="green_hun"> Privacy Policy </span> and{" "}
                <span className="green_hun">Terms of Service </span> apply.
              </p>
            </div>
          </div>
        </Modal.Body>
        {/* <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer> */}
      </Modal>
    </div>
  );
}
