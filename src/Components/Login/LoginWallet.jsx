import React, { useState, useEffect } from "react";
import { API } from "../../API";
import swal from "sweetalert";
import { useHistory, useNavigate } from 'react-router-dom'
import Web3 from 'web3'
import axios from "axios";

function LoginWallet() {
  const [UserName, setUserName] = useState("");
  const [inputValue, setInputValue] = useState('')
  const Navigate = useNavigate()
  const [userAddress, setuserAddress] = useState('')
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



  const [account, setAccount] = useState(null)
    const [chainId, setChainId] = useState(null)

    const metamask = async () => {
        let isConnected = false
        try {
            if (window.ethereum) {
                window.web3 = new Web3(window.ethereum)
                await window.ethereum.enable()
                isConnected = true
            } else if (window.web3) {
                window.web3 = new Web3(window.web3.currentProvider)
                isConnected = true
            } else {
                isConnected = false
            }
            if (isConnected === true) {
                const web3 = window.web3
                let accounts = await web3.eth.getAccounts()
                setInputValue(accounts[0])
                console.log("accounts", accounts);
                console.log("accounts0", accounts[0]);
                setuserAddress(accounts[0])
                console.log("accounts0Length", accounts[0].length);
                if ( accounts[0].length > 30) {
                    setAccount(accounts[0])
                    setInputValue(accounts[0])

                    // handleLogin()
                   // AutoLogin();
                  
                  const res = await API.get(`/login?id='${ accounts[0]}'`)
                //    const res = await API.get(`/login?id='0x4437449B6613AeF19b5298FaC77F6Ff96d2ef05e'`)
                   console.log("res",res);
                   if (res.data.success && res.data.data !== 0) {
                    // localStorage.setItem("isAuthenticated", true);
                    localStorage.setItem('user', JSON.stringify(res.data.data))
                    Navigate('/dashboard')
                    return true
                } else {
                    return false
                }
           
                    
                }
                // if (inputValue !== accounts[0]) {
                //     setInputValue(accounts[0])
                //     setTimeout(() => {
                //         handleLogin()
                //     }, 5000);

                // }
                let chain = await web3.eth.getChainId()
                setChainId(chain)
                if (chain === 56) {
                    // handleLogin2(accounts[0]);
                }
                window.ethereum.on('accountsChanged', async function (accounts) {
                    if (account !== accounts[0]) {
                        setAccount(accounts[0])
                        setuserAddress(account[0])
                        // setInputValue(account[0])
                    }
                    if (inputValue !== accounts[0]) {
                        // console.log("[0]",account[0])
                        setInputValue(accounts[0])
                    }
                    let chain = await web3.eth.getChainId()
                    setChainId(chain)
                    if (chain === 56) {
                    }
                })
            }
        } catch (error) {
            console.log('error message', error.message)
        }
    }

    useEffect(() => {
        // return () => {
            // setInputValue('')
            // setAccount('')
            metamask()
        // }
    }, [])


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

export default LoginWallet;
