import React, { useState, useEffect } from "react";
import { API } from "../../API";
import swal from "sweetalert";
import { toast } from "react-toastify";

function Registration() {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [lastName, setlastName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [confermPassword, setConPassword] = useState("");

  const [referral, setReferral] = useState("");
  const [valid, setValid] = useState(true);

  const [country, setSelectedCountry] = useState(
    "🇺🇸 United States"
  );
  const [countries, setCountries] = useState([]);

  const EmailValidation = (event) => {
    const inputValue = event.target.value;
    setEmail(inputValue);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(inputValue);
    setValid(isValid);
  };

  const Mobile_Data = (event) => {
    const newValue = event.target.value.replace(/[^0-9]/gi, "");
    setMobile(newValue);
  };

  const handleReferral = (event) => {
    const newValue = event.target.value.replace(/[^0-9]/gi, "");
    Check_Sponser(newValue)
    setReferral(newValue);
  };

  const handleName=(event)=>{
    const newValue = event.target.value.replace(/[^A-Z]/gi, "");
    if(event.target.name==='fname'){
      setName(newValue)
    }else{
      setlastName(newValue)
    }
  }


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

  const Registration_APi = async () => {
    console.log('country1',country)
    try {
      if (password != confermPassword) {
        toast.error("Confirm Password is not match");
        return;
      } else if (sponserCheck == "Sponsor Id doesnot exists !!") {
        toast.error("Sponsor Id doesnot exists !!");
        return;
      }else if (!referral) {
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
      let responce = await API.post("/registration", {
        uid: "",
        f_name: name,
        m_name: "",
        l_name: lastName,
        password: password,
        email: email,
        mobile: mobile,
        country:country,
        sponser_id:referral
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
        console.log("data", data);
        setCountries(data.countries);
        // setSelectedCountry(data.userSelectValue);
        // setcountryValue()
      });
  }, []);
  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <div className="login_form registerForm">
              <h1>SIGN UP</h1>
              <p>Enter your personal details to begin your journey with us.</p>
              <form>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="firstName">Referral Id</label>
                      <input
                        type="text"
                        className="form-control"
                        value={referral}
                        onChange={(e) => handleReferral(e)}
                        placeholder="Referral Id"
                        name="referralid"
                        required
                        maxLength={8}
                      />
                       {sponserCheck == "Sponsor Id doesnot exists !!" && (<p  className="" style={{ color: "red" }}>Sponsor Id doesnot exists !!</p>)}
                    </div>
                  </div>
                  {/* <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="firstName">Bookie Name</label>
                      <input
                        type="text"
                        className="form-control"
                        onChange={(e) => setbookiename(e.target.value)}
                        placeholder="Bookie Name"
                        name="First name"
                        required
                        maxLength={40}
                      />
                    </div>
                  </div> */}

                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="firstName">First Name</label>
                      <input
                        type="text"
                        className="form-control"
                        value={name}
                        onChange={(e) => handleName(e)}
                        placeholder="First Name"
                        name="fname"
                        required
                        maxLength={40}
                      />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="LastName">Last Name</label>
                      <input
                        type="text"
                        className="form-control"
                        value={lastName}
                        onChange={(e) => handleName(e)}
                        placeholder="Last Name"
                        name="lname"
                        required
                        maxLength={40}
                      />
                    </div>
                  </div>

                  {/* <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="dob">Date of Birth</label>
                      <input
                        type="date"
                        id="dob"
                        className="form-control"
                        name="dob"
                        value={dob}
                        onChange={(e) => setDob(e.target.value)}
                        required
                      />
                    </div>
                  </div> */}
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="mobile">Mobile No.</label>
                      <input
                        type="text"
                        className="form-control"
                        onChange={Mobile_Data}
                        placeholder="Mobile No."
                        name="Last name"
                        required
                        maxLength={15}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="email">Email Id</label>
                      <input
                        type="email"
                        className="form-control"
                        onChange={EmailValidation}
                        placeholder="Email Id"
                        name="email"
                        required
                        maxLength={40}
                      />
                        {!valid && (
                            <p className="" style={{ color: "red" }}>
                              Please enter a valid email address.
                            </p>
                        )}
                    </div>
                  </div>

                  {/* <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="address">Address</label>
                      <input
                        type="text"
                        id="address"
                        name="address"
                        className="form-control"
                        placeholder="Address"
                        value={address}
                        onChange={(e) => setaddress(e.target.value)}
                        required
                        maxLength={40}
                      />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="city">City</label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        className="form-control"
                        placeholder="City"
                        value={city}
                        onChange={(e) => setcity(e.target.value)}
                        required
                        maxLength={40}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="state">State</label>
                      <input
                        type="text"
                        id="state"
                        name="state"
                        className="form-control"
                        placeholder="State"
                        value={state}
                        onChange={(e) => setstate(e.target.value)}
                        required
                        maxLength={40}
                      />
                    </div>
                  </div> */}
                  <div className="col-md-6">
                    <div class="form-group">
                    <label for="Country">Country</label>
                        <select name="gender" className="form-control dropmain" id="countries"
                        value={country}
                        onChange={(e) =>
                          setSelectedCountry(e.target.value)
                        }>
                        {countries.map((country) => (
                        <option key={country.value} value={country.label}>
               {country.label}
            </option>
                        ))}
                        
                        </select>
                      {/* <label htmlFor="country">Country</label>
                      <Select
                        //   styles={{ width: '100%' }}
                        // className="form-control"
                        id="countries"
                        options={countries}
                        value={country}
                        onChange={(selectedOption) =>
                          setSelectedCountry(selectedOption)
                        }
                      /> */}
                  </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="password">Password</label>
                      <input
                        type="password"
                        className="form-control"
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        name="pswd"
                        required
                        maxLength={30}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="confirmPassword">Confirm Password</label>
                      <input
                        type="password"
                        className="form-control"
                        onChange={(e) => setConPassword(e.target.value)}
                        placeholder="Confirm Password"
                        name="pswd"
                        maxLength={30}
                      />
                    </div>
                  </div>
                </div>
                <div className="login_btn">
                  <button
                    type="button"
                    onClick={() => Registration_APi()}
                    className="btn button btn-block"
                  >
                    Sign Up
                  </button>
                </div>
                <p>
                  Already have an account <a href="/">Sign In</a>
                </p>
              </form>
            </div>
          </div>
          <div className="col-md-6">
            <div className="login_img">
              <img src="assets/images/login_img.png" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Registration;
