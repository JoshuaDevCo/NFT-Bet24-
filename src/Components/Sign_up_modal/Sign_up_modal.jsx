import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { IoMdClose } from "react-icons/io";
import { API } from "../../API";
import swal from "sweetalert";
import { toast } from "react-toastify";
import Login_modal from "../Login_modal/Login_modal";

export default function Sign_up_modal(props,{setModalShow1}) {
  const [mobile, setMobile] = useState("");
  const Mobile_Data = (event) => {
    const newValue = event.target.value.replace(/[^0-9]/gi, "");
    setMobile(newValue);
  };
  const [modalShow, setModalShow] = React.useState(false);

  const [name, setName] = useState("");
  //   const [mobile, setMobile] = useState("");
  const [lastName, setlastName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [confermPassword, setConPassword] = useState("");

  const [referral, setReferral] = useState("");
  const [valid, setValid] = useState(true);

  const [country, setSelectedCountry] = useState("🇺🇸 United States");
  const [countries, setCountries] = useState([]);

  const EmailValidation = (event) => {
    const inputValue = event.target.value;
    setEmail(inputValue);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(inputValue);
    setValid(isValid);
  };

  //   const Mobile_Data = (event) => {
  //     const newValue = event.target.value.replace(/[^0-9]/gi, "");
  //     setMobile(newValue);
  //   };

  const handleReferral = (event) => {
    const newValue = event.target.value.replace(/[^0-9]/gi, "");
    Check_Sponser(newValue);
    setReferral(newValue);
  };

  const handleName = (event) => {
    const newValue = event.target.value.replace(/[^A-Z]/gi, "");
    if (event.target.name === "fname") {
      setName(newValue);
    } else {
      setlastName(newValue);
    }
  };

  const [sponserCheck, setSponserCheck] = useState(0);
  const Check_Sponser = async (value) => {
    // console.log("value", value);
    try {
      let res = await API.post(`/check_sponsorid`, {
        uid: value,
      });
      res = res.data.data.result;
      // console.log("Check_Sponser", res);
      setSponserCheck(res);
    } catch (e) {
      console.log("Somthing Error in Sponser API");
    }
  };

  const encryptdata = async (payload) => {
    try {
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
          return base64EncryptedData
       
      }
    } catch (e) {
      console.log("encrypt Api error:", e);
    }
  };

  const Registration_APi = async () => {
    console.log('country1', country)
    try {
      if (password != confermPassword) {
        toast.error("Confirm Password is not match");
        return;
      } else if (sponserCheck == "Sponsor Id doesnot exists !!") {
        toast.error("Sponsor Id doesnot exists !!");
        return;
      } else if (!referral) {
        toast.error("Invalid Referral Id !!");
        return;
      }
      else if (!name) {
        toast.error("First Name is required");
        return;
      } else if (mobile.length <= 9) {
        toast.error("Enter Valid Mobile Number !!");
        return;
      } else if (!email || !valid) {
        toast.error("Please enter a valid email address");
        return;

      } else if (!password) {
        toast.error("Password is required");
        return;
      }
      let body = await encryptdata({
        uid: "",
        f_name: name,
        m_name: "",
        l_name: lastName,
        password: password,
        email: email,
        mobile: mobile,
        country: country,
        sponser_id: referral
      });
      let responce = await API.post("/registration", {
        encryptedData: body,
      });
      responce = responce.data.data;
      // console.log("res", responce);

      if (responce.result == "Successfull") {
        swal({
          title: "Success..!",
          text: responce.return_result,
          icon: "success",
          button: "OK",
          
        }).then((okay) => {
          if (okay) {
            window.location.href = "./Login";
           
          }
          window.loacton.reload()
        });
      } else {
        if (responce.result === "Bookie id is invalid") {
          swal({
            title: "Registration Error..!!",
            text: "Invalid Referral Id !!",
            icon: "error",
            button: "OK",
          });
        } else {
          swal({
            title: "Registration Error..!!",
            text: responce.result,
            icon: "error",
            button: "OK",
          });
        }
      }
    } catch (e) {
      console.log("Something Error", e);
    }
  };

  useEffect(() => {
    fetch(
      "https://valid.layercode.workers.dev/list/countries?format=select&flags=true&value=code"
    )
      .then((response) => response.json())
      .then((data) => {
        // console.log("data", data);
        setCountries(data.countries);
        // setSelectedCountry(data.userSelectValue);
        // setcountryValue()
      });
  }, []);
  
  return (
    <div>
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
              <h4 className="Main_login_heading">SIGN UP</h4>
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
              <p className="text-center py-3">
                Enter your personal details to begin your journey with us.
              </p>
              <div className="main_card_login">
                <div>
                  <label htmlFor="username">Referral Id</label> <br />
                  <input
                    type="text"
                    placeholder="Referral Id"
                    className="input_login"
                    value={referral}
                    onChange={(e) => handleReferral(e)}
                    id=""
                    name="referralid"
                    required
                    maxLength={8}
                  />
                  {sponserCheck == "Sponsor Id doesnot exists !!" && (
                    <p className="" style={{ color: "red" }}>
                      Sponsor Id doesnot exists !!
                    </p>
                  )}
                </div>
                <div className="mt-4">
                  <label htmlFor="username">First Name</label> <br />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => handleName(e)}
                    name="fname"
                    required
                    maxLength={40}
                    placeholder="First Name"
                    className="input_login"
                    id=""
                  />
                </div>
                <div className="mt-4">
                  <label htmlFor="username">Last Name</label> <br />
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => handleName(e)}
                    placeholder="Last Name"
                    name="lname"
                    required
                    maxLength={40}
                    className="input_login"
                  />
                </div>
                <div className="mt-4">
                  <label htmlFor="username">Mobile No.</label> <br />
                  <input
                    type="number"
                    onChange={Mobile_Data}
                    placeholder="Mobile No."
                    name="Last name"
                    required
                    maxLength={15}
                    className="input_login"
                  />
                </div>
                <div className="mt-4">
                  <label htmlFor="username">Email Id</label> <br />
                  <input
                    type="email"
                    onChange={EmailValidation}
                    placeholder="Email Id"
                    name="email"
                    required
                    maxLength={40}
                    className="input_login"
                  />
                  {!valid && (
                    <p className="" style={{ color: "red" }}>
                      Please enter a valid email address.
                    </p>
                  )}
                </div>
                <div className="mt-4">
                  <label htmlFor="username">Country</label> <br />
                  <select
                    name="gender"
                    id="countries"
                    className="input_login"
                    value={country}
                    onChange={(e) => setSelectedCountry(e.target.value)}
                  >
                    {countries.map((country) => (
                      <option key={country.value} value={country.label}>
                        {country.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mt-4">
                  <label htmlFor="username">Password</label> <br />
                  <input
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    name="pswd"
                    required
                    maxLength={30}
                    className="input_login"
                  />
                </div>
                <div className="mt-4">
                  <label htmlFor="username">Confirm Password</label> <br />
                  <input
                    type="password"
                    onChange={(e) => setConPassword(e.target.value)}
                    placeholder="Confirm Password"
                    name="pswd"
                    maxLength={30}
                    className="input_login"
                  />
                </div>
                {/* <p className="term_cond">
                  I am at least <span className="red_hu"> 18 years </span> of
                  age and I have read, accept and agree to the{" "}
                  <span className="green_hun">
                    {" "}
                    Terms and Conditions , Responsible Gaming , GamCare,
                    Gambling Therapy{" "}
                  </span>
                </p> */}
                {/* <a className="text-decoration-none" href="/"> */}{" "}
                <button
                  className="login_btn mt-3"
                  onClick={() => Registration_APi()}
                >
                  {" "}
                  Sign up
                </button>
                {/* </a> */}
                <p className="term_cond">
                  Already have an account
                  <span
                    className="green_hun"
                    onClick={() => (props.onHide(),setModalShow(true))}
                  >
                    {" "}
                    Sign In{" "}
                  </span>
                </p>
              </div>
            </div>
          </Modal.Body>
          {/* <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer> */}
        </Modal>
      </div>
      <Login_modal show={modalShow} onHide={() => setModalShow(false)} />
    </div>
  );
}
