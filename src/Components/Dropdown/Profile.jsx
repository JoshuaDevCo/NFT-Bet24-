import React, { useState, useEffect } from 'react'
import UpperHeader from '../Dash_Child/UpperHeader'
import LeftSidebar from '../Dash_Child/LeftSidebar'
import FirstSlid from '../Dash_Child/FirstSlid'
import { API } from '../../API';
import { toast } from 'react-toastify';

function Profile() {
    const user = sessionStorage.getItem("user");
    let ress = JSON.parse(user);
    let userName = ress.resultusername;
    let userId = ress.resultid;

    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [agcAddress, setAGCAddress] = useState("")
    const [usdtAddress, setUSDTAddress] = useState("")

    const Profile = async () => {
        try {
            let res;
            if (userName.includes("BT")) {
                res = await API.get(`Userprofile_Details?uid=${userId}`);
            } else {
                res = await API.get(`Userprofile_Details_MLM?uid=${userId}`);
            }
            res = res.data.data[0];
            console.log("Profile+>", res);
            setAGCAddress(res.WalletAddress)
            setUSDTAddress(res.USDT_Address)
            setEmail(res.email)
            setPhone(res.mobile)
        } catch (e) {
            console.log("Somthing error in Profile API", e);
        }
    }

    useEffect(() => {
        Profile();
    }, [])


    const Profile_Update = async () => {
        try {
            let res;
            if (userName.includes("BT")) {
                res = await API.post("Update_User_Profile", {
                    "uid": userId,
                    "f_name": userName,
                    "email": email,
                    "mobile": phone,
                    "AGC_Address": agcAddress,
                    "USDT_Address": usdtAddress
                });
            } else {
                res = await API.post(`Update_User_Profile_MLM`, {
                    "uid": userId,
                    "f_name": userName,
                    "email": email,
                    "mobile": phone,
                    "AGC_Address": agcAddress,
                    "USDT_Address": usdtAddress
                },
                );
            }
            res = res.data.data
            console.log("Profile_Update", res);
            toast(res)

        } catch (e) {
            console.log("Somthig error in Profile Update api ", e);
        }
    }



    return (
        <div>

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
                                            <div class="bars_bg" style={{ backgroundColor: "#e53856" }} >
                                                <div class="row">
                                                    <div class="col-md-12">
                                                        <div class="section_heading">
                                                            <h2>Profile</h2>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="row">
                                                <from>
                                                    {/* <div className="col-md-12"> */}
                                                    <div className="col-lg-6 col-12">
                                                        <label className="fromdate">User Id</label>
                                                        <br />
                                                        <input
                                                            className="userid form-control"
                                                            type="text"
                                                            placeholder="User Id"
                                                            style={{ backgroundColor: "#fff" }}
                                                            value={userId}
                                                            // onChange={(e) => setOld(e.target.value)}
                                                            maxLength={20}
                                                            readOnly
                                                        />
                                                    </div>
                                                    <div className="col-lg-6 col-12">
                                                        <label className="fromdate">Name</label>
                                                        <br />
                                                        <input
                                                            className="name form-control"
                                                            type="text"
                                                            placeholder="Name"
                                                            value={userName}
                                                            style={{ backgroundColor: "#fff" }}
                                                            // onChange={(e) => setOld(e.target.value)}
                                                            maxLength={20}
                                                            readOnly
                                                        />
                                                    </div>
                                                    <div className="col-lg-6 col-12">
                                                        <label className="fromdate email">Email</label>
                                                        <br />
                                                        <input
                                                            className="email form-control"
                                                            type="text"
                                                            placeholder="Eamil"
                                                            value={email}
                                                            onChange={(e) => setEmail(e.target.value)}
                                                            maxLength={50}
                                                        />
                                                    </div>
                                                    <div className="col-lg-6 col-12">
                                                        <label className="fromdate phoen">Phone No</label>
                                                        <br />
                                                        {/* <select
                                                            id="countryCode"
                                                            value={countryCode}
                                                            onChange={handleChange}
                                                            placeholder="Select country code"
                                                        >
                                                            <option value="">Select a country code</option>
                                                            {countryCodes.map((country) => (
                                                                <option value={country.idd.root}>
                                                                    {country.idd.root}{country?.idd?.suffixes}{" "}{country.altSpellings[0]}
                                                                </option>
                                                            ))}
                                                        </select> */}
                                                        <div style={{ display: "flex" }}>
                                                            <input
                                                                className="phone form-control"
                                                                type="text"
                                                                style={{ width: "50px" }}
                                                                value="+91"

                                                            />
                                                            <input
                                                                className="phone form-control"
                                                                type="text"
                                                                placeholder="Phone No"
                                                                value={phone}
                                                                onChange={(e) => setPhone(e.target.value)}
                                                                maxLength={20}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6 col-12">
                                                        <label className="fromdate AGC Address">Wallet Address</label>
                                                        <br />
                                                        <input
                                                            className="form-control"
                                                            type="text"
                                                            placeholder="Wallet Address"
                                                            value={agcAddress}
                                                            onChange={(e) => setAGCAddress(e.target.value)}
                                                        />
                                                    </div>
                                                    {/* <div className="col-lg-6 col-12">
                                                        <label className="fromdate USDT Address">USDT Address</label>
                                                        <br />
                                                        <input
                                                            className="form-control"
                                                            type="text"
                                                            placeholder="USDT Address(BEP20)"
                                                            value={usdtAddress}
                                                            onChange={(e) => setUSDTAddress(e.target.value)}
                                                        />
                                                    </div> */}
                                                    <div className="col-lg-6 col-12 submit_btnn">
                                                        <br />
                                                        <input
                                                            className=" fromdate btn submit_BTN"
                                                            // type="submit"
                                                            value="Update"
                                                            onClick={() => Profile_Update()}
                                                        />
                                                    </div>
                                                    {/* </div>*/}
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

        </div>
    )
}

export default Profile