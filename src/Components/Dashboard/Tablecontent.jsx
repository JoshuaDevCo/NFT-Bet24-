import React from "react";
import "./Tablecontent.css";

function Tablecontent() {
  return (
    <>
      <div className="game_MobTable">
        <div className="items_wraper">
          <div className="game_MobTable_row">
            <div className="colItem vr_middle col__4 text_center">
              <span>Live</span>
            </div>
            <div className="colItem col__8 flexSet">
              <div className="col_Inner">
                <a href="#">
                  <p>Pakistan v Australia</p>
                  <p>(ICC World Cup Warm Up..)</p>
                </a>
              </div>
              <div className="icon_Items vr_middle">
                <div className="gameIcon">
                  <span>F</span>
                </div>
                <div className="gameIcon">
                  <span>F1</span>
                </div>
              </div>
            </div>
          </div>
          <div className="bottm_td_shape">
            <div className="colItem flexSet">
              <div className="column1">
                <div className="tdBox pink">
                  <span>2.5</span>
                </div>
                <div className="tdBox blue">
                  <span>2.5</span>
                </div>
              </div>
              <div className="column1">
                <div className="tdBox blank">
                  <span>-</span>
                </div>
                <div className="tdBox blank">
                  <span>-</span>
                </div>
              </div>
              <div className="column1">
                <div className="tdBox pink">
                  <span>2.5</span>
                </div>
                <div className="tdBox blue">
                  <span>2.5</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </>
  );
}

export default Tablecontent;
