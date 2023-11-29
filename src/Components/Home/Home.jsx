import React, { useState, useEffect, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Home.css";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import Login_modal from "../Login_modal/Login_modal";
import Sign_up_modal from "../Sign_up_modal/Sign_up_modal";
import { API } from "../../API";
import axios from "axios";
import LoginWallet from "../Login_modal/LoginWallte";

function Home() {
  const [modalShow, setModalShow] = React.useState(false);
  const [walletShow, setWalletShow] = React.useState(false);
  const [modalShow1, setModalShow1] = React.useState(false);

  const handle_close = () => {
    setModalShow(false);
  };
  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

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

  const encryptdata = async (payload) => {
    try {
      let res;
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
          ["encrypt"],
        );
        const encryptedData = await window.crypto.subtle.encrypt(
          {
            name: "RSA-OAEP",
          },
          cryptoKey,
          textBuffer,
        );
        // Convert encryptedData to base64
        const base64EncryptedData = btoa(
          String.fromCharCode(...new Uint8Array(encryptedData)),
        );

        return base64EncryptedData;
      }
    } catch (e) {
      console.log("encrypt Api error:", e);
    }
  };

  const Login_APi = async (name, pswd) => {
    let username = name;
    let psword = pswd;
    try {
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
      sessionStorage.setItem("user", JSON.stringify(responce));
      sessionStorage.setItem("jwtToken", JSON.stringify(responce.token));
      window.location.href = "./Dashboard/InPlay/0";
    } catch (e) {
      console.log("Something Error", e);
    }
  };

  return (
    <div>
      <main class="main_nth">
        <header class="wyzHeader fixed" id="main-head">
          <div class="container-fluid">
            <nav class="navbar nav_home navbar-dark">
              <a class="navbar-brand" href="#">
                <img src="assets1/images/bet21-logo.png" />
              </a>
              <div class="signBtn">
                <ul className="d-flex">
                  {/* <li class="nav-item teli_icon">
                    <a
                      class="nav-link hover_flip text-dark md_width main_login"
                      onClick={() => setModalShow(true)}
                    >
                      SignIn
                    </a>
                  </li>
                  <Login_modal
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                  /> */}
                  <li class="nav-item teli_icon" style={{ marginRight: "5px" }}>
                    <a
                      class="nav-link hover_flip text-dark md_width main_login"
                      onClick={() => setWalletShow(true)}
                    >
                       SignIn
                    </a>
                  </li>
                  <LoginWallet
                    show={walletShow}
                    onHide={() => setWalletShow(false)}
                  />

                  {/* <li class="nav-item teli_icon">
                    <a
                      class="nav-link hover_flip md_width text-dark main_login"
                      onClick={() => setModalShow1(true)}
                    >
                      SignUp
                    </a>
                  </li> */}
                  <Sign_up_modal
                    show={modalShow1}
                    onHide={() => setModalShow1(false)}
                    setModalShow1={setModalShow1}
                  />
                  <li class="nav-item teli_icon ms-1">
                    <a
                      class="nav-link hover_flip md_width text-dark main_login"
                      onClick={() => Login_APi("Demo", "123456")}
                    >
                      Demo
                    </a>
                  </li>
                </ul>
              </div>
            </nav>
          </div>
        </header>

        <Slider {...settings}>
          <div className="">
            <a href="#">
              <img src="assets1/images/banner1.png" />
            </a>
          </div>
          <div>
            <a href="#">
              <img src="assets1/images/banner2.png" />
            </a>
          </div>
          <div>
            <a href="#">
              <img src="assets1/images/banner3.png" />
            </a>
          </div>
          <div>
            <a href="#">
              <img src="assets1/images/banner4.jpg" />
            </a>
          </div>
        </Slider>

        <section class="section_padding">
          <div class="container-fluid">
            <div class="row">
              <div class="col-md-12">
                <div class="casino_heading">
                  <h2 className="main_asion_heading">OUR LIVE CASINOS</h2>
                </div>
              </div>
              <div class="cardItem_row">
                <div class="card_item">
                  <a href="#">
                    <img src="assets1/images/card/teen1.jpg" />
                    <div class="cardBtn">Login</div>
                  </a>
                </div>
                <div class="card_item">
                  <a href="#">
                    <img src="assets1/images/card/roulette1.jpg" />
                    <div class="cardBtn">Login</div>
                  </a>
                </div>
                <div class="card_item">
                  <a href="#">
                    <img src="assets1/images/card/teen.jpg" />
                    <div class="cardBtn">Login</div>
                  </a>
                </div>
                <div class="card_item">
                  <a href="#">
                    <img src="assets1/images/card/teen20.jpg" />
                    <div class="cardBtn">Login</div>
                  </a>
                </div>
                <div class="card_item">
                  <a href="#">
                    <img src="assets1/images/card/poker20.jpg" />
                    <div class="cardBtn">Login</div>
                  </a>
                </div>
                <div class="card_item">
                  <a href="#">
                    <img src="assets1/images/card/teen9.jpg" />
                    <div class="cardBtn">Login</div>
                  </a>
                </div>
                <div class="card_item">
                  <a href="#">
                    <img src="assets1/images/card/teen8.jpg" />
                    <div class="cardBtn">Login</div>
                  </a>
                </div>
                <div class="card_item">
                  <a href="#">
                    <img src="assets1/images/card/poker.jpg" />
                    <div class="cardBtn">Login</div>
                  </a>
                </div>
                <div class="card_item">
                  <a href="#">
                    <img src="assets1/images/card/poker6.jpg" />
                    <div class="cardBtn">Login</div>
                  </a>
                </div>
                <div class="card_item">
                  <a href="#">
                    <img src="assets1/images/card/baccarat.jpg" />
                    <div class="cardBtn">Login</div>
                  </a>
                </div>
                <div class="card_item">
                  <a href="#">
                    <img src="assets1/images/card/dt20.jpg" />
                    <div class="cardBtn">Login</div>
                  </a>
                </div>
                <div class="card_item">
                  <a href="#">
                    <img src="assets1/images/card/dt6.jpg" />
                    <div class="cardBtn">Login</div>
                  </a>
                </div>
                <div class="card_item">
                  <a href="#">
                    <img src="assets1/images/card/dtl20.jpg" />
                    <div class="cardBtn">Login</div>
                  </a>
                </div>
                <div class="card_item">
                  <a href="#">
                    <img src="assets1/images/card/baccarat2.jpg" />
                    <div class="cardBtn">Login</div>
                  </a>
                </div>
                <div class="card_item">
                  <a href="#">
                    <img src="assets1/images/card/card32.jpg" />
                    <div class="cardBtn">Login</div>
                  </a>
                </div>
                <div class="card_item">
                  <a href="#">
                    <img src="assets1/images/card/abj.jpg" />
                    <div class="cardBtn">Login</div>
                  </a>
                </div>
                <div class="card_item">
                  <a href="#">
                    <img src="assets1/images/card/lucky7.jpg" />
                    <div class="cardBtn">Login</div>
                  </a>
                </div>
                <div class="card_item">
                  <a href="#">
                    <img src="assets1/images/card/lucky7eu.jpg" />
                    <div class="cardBtn">Login</div>
                  </a>
                </div>
                <div class="card_item">
                  <a href="#">
                    <img src="assets1/images/card/lucky7eu.jpg" />
                    <div class="cardBtn">Login</div>
                  </a>
                </div>
                <div class="card_item">
                  <a href="#">
                    <img src="assets1/images/card/war.jpg" />
                    <div class="cardBtn">Login</div>
                  </a>
                </div>
                <div class="card_item">
                  <a href="#">
                    <img src="assets1/images/card/aaa.jpg" />
                    <div class="cardBtn">Login</div>
                  </a>
                </div>
                <div class="card_item">
                  <a href="#">
                    <img src="assets1/images/card/worli.jpg" />
                    <div class="cardBtn">Login</div>
                  </a>
                </div>
                <div class="card_item">
                  <a href="#">
                    <img src="assets1/images/card/3cardj.jpg" />
                    <div class="cardBtn">Login</div>
                  </a>
                </div>
                <div class="card_item">
                  <a href="#">
                    <img src="assets1/images/card/ab20.jpg" />
                    <div class="cardBtn">Login</div>
                  </a>
                </div>
                <div class="card_item">
                  <a href="#">
                    <img src="assets1/images/card/card32eu.jpg" />
                    <div class="cardBtn">Login</div>
                  </a>
                </div>
                <div class="card_item">
                  <a href="#">
                    <img src="assets1/images/card/worli2.jpg" />
                    <div class="cardBtn">Login</div>
                  </a>
                </div>
                <div class="card_item">
                  <a href="#">
                    <img src="assets1/images/card/race20.jpg" />
                    <div class="cardBtn">Login</div>
                  </a>
                </div>
                <div class="card_item">
                  <a href="#">
                    <img src="assets1/images/card/lucky7eu2.jpg" />
                    <div class="cardBtn">Login</div>
                  </a>
                </div>
                <div class="card_item">
                  <a href="#">
                    <img src="assets1/images/card/superover.jpg" />
                    <div class="cardBtn">Login</div>
                  </a>
                </div>
                <div class="card_item">
                  <a href="#">
                    <img src="assets1/images/card/trap.jpg" />
                    <div class="cardBtn">Login</div>
                  </a>
                </div>
                <div class="card_item">
                  <a href="#">
                    <img src="assets1/images/card/patti2.jpg" />
                    <div class="cardBtn">Login</div>
                  </a>
                </div>
                <div class="card_item">
                  <a href="#">
                    <img src="assets1/images/card/cricketv3.jpg" />
                    <div class="cardBtn">Login</div>
                  </a>
                </div>
                <div class="card_item">
                  <a href="#">
                    <img src="assets1/images/card/cmatch20.jpg" />
                    <div class="cardBtn">Login</div>
                  </a>
                </div>
                <div class="card_item">
                  <a href="#">
                    <img src="assets1/images/card/queen.jpg" />
                    <div class="cardBtn">Login</div>
                  </a>
                </div>
                <div class="card_item">
                  <a href="#">
                    <img src="assets1/images/card/teen20b.jpg" />
                    <div class="cardBtn">Login</div>
                  </a>
                </div>
                <div class="card_item">
                  <a href="#">
                    <img src="assets1/images/card/teensin.jpg" />
                    <div class="cardBtn">Login</div>
                  </a>
                </div>
                <div class="card_item">
                  <a href="#">
                    <img src="assets1/images/card/teenmuf.jpg" />
                    <div class="cardBtn">Login</div>
                  </a>
                </div>
                <div class="card_item">
                  <a href="#">
                    <img src="assets1/images/card/cmeter.jpg" />
                    <div class="cardBtn">Login</div>
                  </a>
                </div>
                <div class="card_item">
                  <a href="#">
                    <img src="assets1/images/card/teen6.jpg" />
                    <div class="cardBtn">Login</div>
                  </a>
                </div>
                <div class="card_item">
                  <a href="#">
                    <img src="assets1/images/card/trio.jpg" />
                    <div class="cardBtn">Login</div>
                  </a>
                </div>
                <div class="card_item">
                  <a href="#">
                    <img src="assets1/images/card/notenum.jpg" />
                    <div class="cardBtn">Login</div>
                  </a>
                </div>
                <div class="card_item">
                  <a href="#">
                    <img src="assets1/images/card/kbc.jpg" />
                    <div class="cardBtn">Login</div>
                  </a>
                </div>
                <div class="card_item">
                  <a href="#">
                    <img src="assets1/images/card/teen2.jpg" />
                    <div class="cardBtn">Login</div>
                  </a>
                </div>
                <div class="card_item">
                  <a href="#">
                    <img src="assets1/images/card/roulette.jpg" />
                    <div class="cardBtn">Login</div>
                  </a>
                </div>
                <div class="card_item">
                  <a href="#">
                    <img src="assets1/images/card/aaa2.jpg" />
                    <div class="cardBtn">Login</div>
                  </a>
                </div>
                <div class="card_item">
                  <a href="#">
                    <img src="assets1/images/card/race2.jpg" />
                    <div class="cardBtn">Login</div>
                  </a>
                </div>
                <div class="card_item">
                  <a href="#">
                    <img src="assets1/images/card/dum10.jpg" />
                    <div class="cardBtn">Login</div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section class="section_padding">
          <div class="container-fluid">
            <div class="row">
              <div class="col-md-12">
                <div class="casino_heading">
                  <h2 className="main_asion_heading">OUR VIRTUAL CASINO</h2>
                </div>
              </div>
              <div class="cardItem_row">
                <div class="card_item">
                  <a href="#">
                    <img src="assets1/images/virtual_casino/vlucky7.jpg" />
                    <div class="cardBtn">Login</div>
                  </a>
                </div>
                <div class="card_item">
                  <a href="#">
                    <img src="assets1/images/virtual_casino/vtrio.jpg" />
                    <div class="cardBtn">Login</div>
                  </a>
                </div>
                <div class="card_item">
                  <a href="#">
                    <img src="assets1/images/virtual_casino/vdtl20.jpg" />
                    <div class="cardBtn">Login</div>
                  </a>
                </div>
                <div class="card_item">
                  <a href="#">
                    <img src="assets1/images/virtual_casino/vteenmuf.jpg" />
                    <div class="cardBtn">Login</div>
                  </a>
                </div>
                <div class="card_item">
                  <a href="#">
                    <img src="assets1/images/virtual_casino/vaaa.jpg" />
                    <div class="cardBtn">Login</div>
                  </a>
                </div>
                <div class="card_item">
                  <a href="#">
                    <img src="assets1/images/virtual_casino/vbtable.jpg" />
                    <div class="cardBtn">Login</div>
                  </a>
                </div>
                <div class="card_item">
                  <a href="#">
                    <img src="assets1/images/virtual_casino/vdt6.jpg" />
                    <div class="cardBtn">Login</div>
                  </a>
                </div>
                <div class="card_item">
                  <a href="#">
                    <img src="assets1/images/virtual_casino/vteen.jpg" />
                    <div class="cardBtn">Login</div>
                  </a>
                </div>
                <div class="card_item">
                  <a href="#">
                    <img src="assets1/images/virtual_casino/vteen20.jpg" />
                    <div class="cardBtn">Login</div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section class="section_padding">
          <div class="container-fluid">
            <div class="row">
              <div class="col-md-6">
                <div class="casino_heading">
                  <h2 className="main_asion_heading">LIVE CASINOS</h2>
                </div>

                <div class="cardItem_row">
                  <div class="card_item_4">
                    <a href="#">
                      <img src="assets1/images/live_casino/26.jpg" />
                      <div class="cardBtn">Login</div>
                    </a>
                  </div>
                  <div class="card_item_4">
                    <a href="#">
                      <img src="assets1/images/live_casino/24.jpg" />
                      <div class="cardBtn">Login</div>
                    </a>
                  </div>
                  <div class="card_item_4">
                    <a href="#">
                      <img src="assets1/images/live_casino/31.jpg" />
                      <div class="cardBtn">Login</div>
                    </a>
                  </div>
                  <div class="card_item_4">
                    <a href="#">
                      <img src="assets1/images/live_casino/21.jpg" />
                      <div class="cardBtn">Login</div>
                    </a>
                  </div>
                  <div class="card_item_4">
                    <a href="#">
                      <img src="assets1/images/live_casino/17.jpg" />
                      <div class="cardBtn">Login</div>
                    </a>
                  </div>

                  <div class="card_item_4">
                    <a href="#">
                      <img src="assets1/images/live_casino/1.jpg" />
                      <div class="cardBtn">Login</div>
                    </a>
                  </div>
                  <div class="card_item_4">
                    <a href="#">
                      <img src="assets1/images/live_casino/2.jpg" />
                      <div class="cardBtn">Login</div>
                    </a>
                  </div>
                  <div class="card_item_4">
                    <a href="#">
                      <img src="assets1/images/live_casino/3.jpg" />
                      <div class="cardBtn">Login</div>
                    </a>
                  </div>
                  <div class="card_item_4">
                    <a href="#">
                      <img src="assets1/images/live_casino/5.jpg" />
                      <div class="cardBtn">Login</div>
                    </a>
                  </div>
                  <div class="card_item_4">
                    <a href="#">
                      <img src="assets1/images/live_casino/6.jpg" />
                      <div class="cardBtn">Login</div>
                    </a>
                  </div>
                  <div class="card_item_4">
                    <a href="#">
                      <img src="assets1/images/fantasy_game/4.jpg" />
                      <div class="cardBtn">Login</div>
                    </a>
                  </div>
                  <div class="card_item_4">
                    <a href="#">
                      <img src="assets1/images/fantasy_game/3.jpg" />
                      <div class="cardBtn">Login</div>
                    </a>
                  </div>
                  <div class="card_item_4">
                    <a href="#">
                      <img src="assets1/images/fantasy_game/aviator.jpg" />
                      <div class="cardBtn">Login</div>
                    </a>
                  </div>
                  <div class="card_item_4">
                    <a href="#">
                      <img src="assets1/images/fantasy_game/1.jpg" />
                      <div class="cardBtn">Login</div>
                    </a>
                  </div>
                  <div class="card_item_4">
                    <a href="#">
                      <img src="assets1/images/fantasy_game/5.jpg" />
                      <div class="cardBtn">Login</div>
                    </a>
                  </div>
                  <div class="card_item_4">
                    <a href="#">
                      <img src="assets1/images/fantasy_game/6.jpg" />
                      <div class="cardBtn">Login</div>
                    </a>
                  </div>
                  <div class="card_item_4">
                    <a href="#">
                      <img src="assets1/images/fantasy_game/8.jpg" />
                      <div class="cardBtn">Login</div>
                    </a>
                  </div>
                  <div class="card_item_4">
                    <a href="#">
                      <img src="assets1/images/fantasy_game/11.jpg" />
                      <div class="cardBtn">Login</div>
                    </a>
                  </div>
                  <div class="card_item_4">
                    <a href="#">
                      <img src="assets1/images/fantasy_game/7.jpg" />
                      <div class="cardBtn">Login</div>
                    </a>
                  </div>
                  <div class="card_item_4">
                    <a href="#">
                      <img src="assets1/images/fantasy_game/10.jpg" />
                      <div class="cardBtn">Login</div>
                    </a>
                  </div>
                  <div class="card_item_4">
                    <a href="#">
                      <img src="assets1/images/fantasy_game/13.jpg" />
                      <div class="cardBtn">Login</div>
                    </a>
                  </div>
                  <div class="card_item_4">
                    <a href="#">
                      <img src="assets1/images/fantasy_game/16.jpg" />
                      <div class="cardBtn">Login</div>
                    </a>
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="casino_heading">
                  <h2 className="main_asion_heading">FANTASY GAMES</h2>
                </div>

                <div class="cardItem_row">
                  <div class="card_item_4">
                    <a href="#">
                      <img src="assets1/images/fantasy_game/14.jpg" />
                      <div class="cardBtn">Login</div>
                    </a>
                  </div>
                  <div class="card_item_4">
                    <a href="#">
                      <img src="assets1/images/fantasy_game/12.jpg" />
                      <div class="cardBtn">Login</div>
                    </a>
                  </div>
                  <div class="card_item_4">
                    <a href="#">
                      <img src="assets1/images/fantasy_game/15.jpg" />
                      <div class="cardBtn">Login</div>
                    </a>
                  </div>
                  <div class="card_item_4">
                    <a href="#">
                      <img src="assets1/images/fantasy_game/18.jpg" />
                      <div class="cardBtn">Login</div>
                    </a>
                  </div>
                  <div class="card_item_4">
                    <a href="#">
                      <img src="assets1/images/fantasy_game/19.jpg" />
                      <div class="cardBtn">Login</div>
                    </a>
                  </div>
                  <div class="card_item_4">
                    <a href="#">
                      <img src="assets1/images/fantasy_game/20.jpg" />
                      <div class="cardBtn">Login</div>
                    </a>
                  </div>
                  <div class="card_item_4">
                    <a href="#">
                      <img src="assets1/images/fantasy_game/22.jpg" />
                      <div class="cardBtn">Login</div>
                    </a>
                  </div>
                  <div class="card_item_4">
                    <a href="#">
                      <img src="assets1/images/fantasy_game/17.jpg" />
                      <div class="cardBtn">Login</div>
                    </a>
                  </div>
                  <div class="card_item_4">
                    <a href="#">
                      <img src="assets1/images/fantasy_game/23.jpg" />
                      <div class="cardBtn">Login</div>
                    </a>
                  </div>
                  <div class="card_item_4">
                    <a href="#">
                      <img src="assets1/images/fantasy_game/24.jpg" />
                      <div class="cardBtn">Login</div>
                    </a>
                  </div>
                  <div class="card_item_4">
                    <a href="#">
                      <img src="assets1/images/fantasy_game/25.jpg" />
                      <div class="cardBtn">Login</div>
                    </a>
                  </div>
                  <div class="card_item_4">
                    <a href="#">
                      <img src="assets1/images/fantasy_game/26.jpg" />
                      <div class="cardBtn">Login</div>
                    </a>
                  </div>
                  <div class="card_item_4">
                    <a href="#">
                      <img src="assets1/images/fantasy_game/diam11.png" />
                      <div class="cardBtn">Login</div>
                    </a>
                  </div>
                  <div class="card_item_4">
                    <a href="#">
                      <img src="assets1/images/fantasy_game/27.jpg" />
                      <div class="cardBtn">Login</div>
                    </a>
                  </div>
                  <div class="card_item_4">
                    <a href="#">
                      <img src="assets1/images/fantasy_game/dice.jpg" />
                      <div class="cardBtn">Login</div>
                    </a>
                  </div>
                  <div class="card_item_4">
                    <a href="#">
                      <img src="assets1/images/fantasy_game/goal.jpg" />
                      <div class="cardBtn">Login</div>
                    </a>
                  </div>
                  <div class="card_item_4">
                    <a href="#">
                      <img src="assets1/images/fantasy_game/rummy.jpg" />
                      <div class="cardBtn">Login</div>
                    </a>
                  </div>
                  <div class="card_item_4">
                    <a href="#">
                      <img src="assets1/images/fantasy_game/ludoclub.jpg" />
                      <div class="cardBtn">Login</div>
                    </a>
                  </div>
                  <div class="card_item_4">
                    <a href="#">
                      <img src="assets1/images/fantasy_game/ludo-lands.jpg" />
                      <div class="cardBtn">Login</div>
                    </a>
                  </div>
                  <div class="card_item_4">
                    <a href="#">
                      <img src="assets1/images/fantasy_game/poptheball.jpg" />
                      <div class="cardBtn">Login</div>
                    </a>
                  </div>
                  <div class="card_item_4">
                    <a href="#">
                      <img src="assets1/images/fantasy_game/jetx.jpg" />
                      <div class="cardBtn">Login</div>
                    </a>
                  </div>
                  <div class="card_item_4">
                    <a href="#">
                      <img src="assets1/images/fantasy_game/RussianKeno.jpg" />
                      <div class="cardBtn">Login</div>
                    </a>
                  </div>
                  <div class="card_item_4">
                    <a href="#">
                      <img src="assets1/images/fantasy_game/cricketx.jpg" />
                      <div class="cardBtn">Login</div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section class="section_padding">
          <div class="container-fluid">
            <div class="row">
              <div class="col-md-12">
                <div class="casino_heading">
                  <h2 className="main_asion_heading mb-4">SPORTS</h2>
                </div>
              </div>
              <div class="cardItem_row">
                <div class="card_item_16">
                  <a href="#">
                    <img src="assets1/images/sports/politics.svg" />
                    <h2 class="card_title">Politics</h2>
                  </a>
                </div>
                <div class="card_item_16">
                  <a href="#">
                    <img src="assets1/images/sports/tennis.svg" />
                    <h2 class="card_title">Tennis</h2>
                  </a>
                </div>
                <div class="card_item_16">
                  <a href="#">
                    <img src="assets1/images/sports/Mixed_Martial_Arts.svg" />
                    <h2 class="card_title">Mixed Martial Arts</h2>
                  </a>
                </div>
                <div class="card_item_16">
                  <a href="#">
                    <img src="assets1/images/sports/golf.svg" />
                    <h2 class="card_title">Golf</h2>
                  </a>
                </div>
                <div class="card_item_16">
                  <a href="#">
                    <img src="assets1/images/sports/cricket.svg" />
                    <h2 class="card_title">Cricket</h2>
                  </a>
                </div>
                <div class="card_item_16">
                  <a href="#">
                    <img src="assets1/images/sports/Beach_Volleyball.svg" />
                    <h2 class="card_title">Beach Volleyball</h2>
                  </a>
                </div>
                <div class="card_item_16">
                  <a href="#">
                    <img src="assets1/images/sports/Table_Tennis.svg" />
                    <h2 class="card_title">Table Tennis</h2>
                  </a>
                </div>
                <div class="card_item_16">
                  <a href="#">
                    <img src="assets1/images/sports/Horse_Racing.svg" />
                    <h2 class="card_title">Horse Racing</h2>
                  </a>
                </div>
                <div class="card_item_16">
                  <a href="#">
                    <img src="assets1/images/sports/Esports.svg" />
                    <h2 class="card_title">Esports</h2>
                  </a>
                </div>
                <div class="card_item_16">
                  <a href="#">
                    <img src="assets1/images/sports/Greyhound_Racing.svg" />
                    <h2 class="card_title">Greyhound Racing</h2>
                  </a>
                </div>
                <div class="card_item_16">
                  <a href="#">
                    <img src="assets1/images/sports/Motorbikes.svg" />
                    <h2 class="card_title">Motorbikes</h2>
                  </a>
                </div>
                <div class="card_item_16">
                  <a href="#">
                    <img src="assets1/images/sports/Basketball.svg" />
                    <h2 class="card_title">Basketball</h2>
                  </a>
                </div>
                <div class="card_item_16">
                  <a href="#">
                    <img src="assets1/images/sports/MotoGP.svg" />
                    <h2 class="card_title">MotoGP</h2>
                  </a>
                </div>
                <div class="card_item_16">
                  <a href="#">
                    <img src="assets1/images/sports/Chess.svg" />
                    <h2 class="card_title">Chess</h2>
                  </a>
                </div>
                <div class="card_item_16">
                  <a href="#">
                    <img src="assets1/images/sports/Volleyball.svg" />
                    <h2 class="card_title">Volleyball</h2>
                  </a>
                </div>
                <div class="card_item_16">
                  <a href="#">
                    <img src="assets1/images/sports/Ice_Hockey.svg" />
                    <h2 class="card_title">Ice Hockey</h2>
                  </a>
                </div>
                <div class="card_item_16">
                  <a href="#">
                    <img src="assets1/images/sports/Badminton.svg" />
                    <h2 class="card_title">Badminton</h2>
                  </a>
                </div>
                <div class="card_item_16">
                  <a href="#">
                    <img src="assets1/images/sports/Snooker.svg" />
                    <h2 class="card_title">Snooker</h2>
                  </a>
                </div>
                <div class="card_item_16">
                  <a href="#">
                    <img src="assets1/images/sports/Handball.svg" />
                    <h2 class="card_title">Handball</h2>
                  </a>
                </div>
                <div class="card_item_16">
                  <a href="#">
                    <img src="assets1/images/sports/Kabaddi.svg" />
                    <h2 class="card_title">Kabaddi</h2>
                  </a>
                </div>
                <div class="card_item_16">
                  <a href="#">
                    <img src="assets1/images/sports/Rugby_League.svg" />
                    <h2 class="card_title">Rugby League</h2>
                  </a>
                </div>
                <div class="card_item_16">
                  <a href="#">
                    <img src="assets1/images/sports/Cycling.svg" />
                    <h2 class="card_title">Cycling</h2>
                  </a>
                </div>
                <div class="card_item_16">
                  <a href="#">
                    <img src="assets1/images/sports/Athletics.svg" />
                    <h2 class="card_title">Athletics</h2>
                  </a>
                </div>
                <div class="card_item_16">
                  <a href="#">
                    <img src="assets1/images/sports/Sumo.svg" />
                    <h2 class="card_title">Sumo</h2>
                  </a>
                </div>
                <div class="card_item_16">
                  <a href="#">
                    <img src="assets1/images/sports/Virtual_sports.svg" />
                    <h2 class="card_title">Virtual sports</h2>
                  </a>
                </div>
                <div class="card_item_16">
                  <a href="#">
                    <img src="assets1/images/sports/Motor_Sports.svg" />
                    <h2 class="card_title">Motor Sports</h2>
                  </a>
                </div>
                <div class="card_item_16">
                  <a href="#">
                    <img src="assets1/images/sports/Baseball.svg" />
                    <h2 class="card_title">Baseball</h2>
                  </a>
                </div>
                <div class="card_item_16">
                  <a href="#">
                    <img src="assets1/images/sports/Rugby_Union.svg" />
                    <h2 class="card_title">Rugby Union</h2>
                  </a>
                </div>
                <div class="card_item_16">
                  <a href="#">
                    <img src="assets1/images/sports/Darts.svg" />
                    <h2 class="card_title">Darts</h2>
                  </a>
                </div>
                <div class="card_item_16">
                  <a href="#">
                    <img src="assets1/images/sports/American_Football.svg" />
                    <h2 class="card_title">American Football</h2>
                  </a>
                </div>
                <div class="card_item_16">
                  <a href="#">
                    <img src="assets1/images/sports/Soccer.svg" />
                    <h2 class="card_title">Soccer</h2>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* <section class="section_padding">
          <div class="container-fluid">
            <div class="row">
              <div class="col-md-12">
                <div class="casino_heading">
                  <h2 className="main_asion_heading mb-3">TOP WINNERS</h2>
                </div>
              </div>

              <div class="col-md-12">
                <div id="winner_carousel" class="owl-carousel owl-theme">
                  <OwlCarousel
                    loop={true}
                    margin={100}
                    nav={false}
                    autoplay={true}
                    animateOut={true}
                    autoplayHoverPause={true}
                    autoplayTimeout={4000}
                    smartSpeed={9500}
                    dots={false}
                    responsive={{
                      0: { items: 2 },
                      600: { items: 3 },
                      768: { items: 4 },
                      1199: { items: 6 },
                      1399: { items: 8 },
                    }}
                  >
                    <div class="item">
                      <div class="winnter_item">
                        <img src="assets1/images/user-icon.png" />
                        <div class="winner_content">
                          <div class="d-flex justify-content-between">
                            <p>Player</p>
                            <p>jd****</p>
                          </div>
                          <div class="d-flex justify-content-between">
                            <p>Time</p>
                            <p>20/08/2023 13:50p</p>
                          </div>
                          <div class="d-flex justify-content-between">
                            <p>Win Amount</p>
                            <p>26,23,230</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="item">
                      <div class="winnter_item">
                        <img src="assets1/images/user-icon.png" />
                        <div class="winner_content">
                          <div class="d-flex justify-content-between">
                            <p>Player</p>
                            <p>jd****</p>
                          </div>
                          <div class="d-flex justify-content-between">
                            <p>Time</p>
                            <p>20/08/2023 13:50p</p>
                          </div>
                          <div class="d-flex justify-content-between">
                            <p>Win Amount</p>
                            <p>26,23,230</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="item">
                      <div class="winnter_item">
                        <img src="assets1/images/user-icon.png" />
                        <div class="winner_content">
                          <div class="d-flex justify-content-between">
                            <p>Player</p>
                            <p>jd****</p>
                          </div>
                          <div class="d-flex justify-content-between">
                            <p>Time</p>
                            <p>20/08/2023 13:50p</p>
                          </div>
                          <div class="d-flex justify-content-between">
                            <p>Win Amount</p>
                            <p>26,23,230</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="item">
                      <div class="winnter_item">
                        <img src="assets1/images/user-icon.png" />
                        <div class="winner_content">
                          <div class="d-flex justify-content-between">
                            <p>Player</p>
                            <p>jd****</p>
                          </div>
                          <div class="d-flex justify-content-between">
                            <p>Time</p>
                            <p>20/08/2023 13:50p</p>
                          </div>
                          <div class="d-flex justify-content-between">
                            <p>Win Amount</p>
                            <p>26,23,230</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="item">
                      <div class="winnter_item">
                        <img src="assets1/images/user-icon.png" />
                        <div class="winner_content">
                          <div class="d-flex justify-content-between">
                            <p>Player</p>
                            <p>jd****</p>
                          </div>
                          <div class="d-flex justify-content-between">
                            <p>Time</p>
                            <p>20/08/2023 13:50p</p>
                          </div>
                          <div class="d-flex justify-content-between">
                            <p>Win Amount</p>
                            <p>26,23,230</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="item">
                      <div class="winnter_item">
                        <img src="assets1/images/user-icon.png" />
                        <div class="winner_content">
                          <div class="d-flex justify-content-between">
                            <p>Player</p>
                            <p>jd****</p>
                          </div>
                          <div class="d-flex justify-content-between">
                            <p>Time</p>
                            <p>20/08/2023 13:50p</p>
                          </div>
                          <div class="d-flex justify-content-between">
                            <p>Win Amount</p>
                            <p>26,23,230</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="item">
                      <div class="winnter_item">
                        <img src="assets1/images/user-icon.png" />
                        <div class="winner_content">
                          <div class="d-flex justify-content-between">
                            <p>Player</p>
                            <p>jd****</p>
                          </div>
                          <div class="d-flex justify-content-between">
                            <p>Time</p>
                            <p>20/08/2023 13:50p</p>
                          </div>
                          <div class="d-flex justify-content-between">
                            <p>Win Amount</p>
                            <p>26,23,230</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="item">
                      <div class="winnter_item">
                        <img src="assets1/images/user-icon.png" />
                        <div class="winner_content">
                          <div class="d-flex justify-content-between">
                            <p>Player</p>
                            <p>jd****</p>
                          </div>
                          <div class="d-flex justify-content-between">
                            <p>Time</p>
                            <p>20/08/2023 13:50p</p>
                          </div>
                          <div class="d-flex justify-content-between">
                            <p>Win Amount</p>
                            <p>26,23,230</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </OwlCarousel>
                </div>
              </div>
            </div>
          </div>
        </section> */}
        <footer class="footer_section">
          <div class="social_media_section">
            <div class="container-fluid">
              <div class="row">
                <div class="col-md-7">
                  <div class="support_item">24X7 Support</div>
                </div>
                <div class="col-md-5">
                  <div class="socialIcon ">
                    <ul>
                    <li>
                        <a href="#">
                          <img src="assets1/images/telegram.png" />
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <img src="assets1/images/whatsapp.png" />
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <img src="assets1/images/facebook.png" />
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <img src="assets1/images/instagram.png" />
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <img src="assets1/images/youtube.png" />
                        </a>
                      </li>                  
                      <li>
                        <a href="#">
                          <img src="assets1/images/twitter.png" />
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="ft_bg">
            <div class="container">
              <div class="row align-items-center">
                <div class="col-md-3">
                  <div class="foter_content">
                    <img src="assets1/images/bet21-logo.png" />
                  </div>
                </div>
                <div class="col-md-9">
                  <div class="foter_content ms-0 md-lg-5">
                    <ul>
                      <li>
                        <a href="#">About Us</a>
                      </li>
                      <li>
                        <a href="#">Terms and Conditions</a>
                      </li>
                      <li>
                        <a href="#">Responsible Gaming</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div class="footer_bottom">
              <p>© Copyright 2023. Be24.Network All Rights Reserved.</p>
            </div>
          </div>
        </footer>

        <button onclick="topFunction()" id="myBtn" title="Go to top">
          <img src="assets1/images/cheveron.png" />
        </button>
      </main>
    </div>
  );
}

export default Home;
