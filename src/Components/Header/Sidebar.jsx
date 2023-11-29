import React from "react";

function Sidebar() {
  return (
    <div>
      <nav id="sidebar">
        <ul class="list-unstyled components">
          <li class="active">
            <a
              href="#homeSubmenu"
              data-toggle="collapse"
              aria-expanded="false"
              class="dropdown-toggle text_caps"
            >
              Others
            </a>
            <ul class="collapse list-unstyled show" id="homeSubmenu">
              <li>
                <a href="#">Live Casino</a>
              </li>
              <li>
                <a href="#">Slot Game</a>
              </li>
              <li>
                <a href="#">Casino Queen</a>
              </li>
              <li>
                <a href="#">Dragon Tiger</a>
              </li>
              <li>
                <a href="#">Sport Casino</a>
              </li>
              <li>
                <a href="#">Andar Bahar</a>
              </li>
              <li>
                <a href="#">Bollywood Casino</a>
              </li>
              <li>
                <a href="#">Casino War</a>
              </li>
              <li>
                <a href="#">Worli</a>
              </li>
              <li>
                <a href="#">Lottery</a>
              </li>
              <li>
                <a href="#">3 Card Judgement</a>
              </li>
              <li>
                <a href="#">Binary</a>
              </li>
              <li>
                <a href="#">Virtual</a>
              </li>
              <li>
                <a href="#">Cricket Casino</a>
              </li>
            </ul>
          </li>
          <li>
            <a
              href="#TenisSubmenu"
              data-toggle="collapse"
              aria-expanded="false"
              class="dropdown-toggle text_caps"
            >
              All Sports
            </a>
            <ul class="collapse list-unstyled" id="TenisSubmenu">
              <li>
                <a href="#">Football</a>
              </li>
              <li>
                <a href="#">Tennis</a>
              </li>
              <li>
                <a href="#">Cricket</a>
              </li>
              <li>
                <a href="#">Ice Hockey</a>
              </li>
              <li>
                <a href="#">Volleyball</a>
              </li>
              <li>
                <a href="#">Politics</a>
              </li>
              <li>
                <a href="#">Basketball</a>
              </li>
              <li>
                <a href="#">Table Tennis</a>
              </li>
              <li>
                <a href="#">Darts</a>
              </li>
              <li>
                <a href="#">Badminton</a>
              </li>
              <li>
                <a href="#">Kabaddi</a>
              </li>
              <li>
                <a href="#">Boxing</a>
              </li>
              <li>
                <a href="#">Mixed Martial Arts</a>
              </li>
              <li>
                <a href="#">Motor Sport</a>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Sidebar;
