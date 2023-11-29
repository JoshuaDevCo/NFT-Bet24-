import React from 'react'
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

function Rule() {
  return (
	<>

<Popup trigger=
                {<button> <i class="fa fa-info-circle" position="right center"></i> </button>}
                position="buttom center">
                <div  class="overlay10 ">
				<div class="popup_header">
    		<span class="tokenset" style={{paddingRight:"5rem"}}>Rules</span>
	    	<a class="closebtn" onclick="closeNav10()">&times;</a>
    	</div>
	    <div class="popup_match_heading">
	        <h3>Match</h3>
	    </div>
	    <div class="popup_content">
	    	<ul>
	    		<li>TENNIS Match Odds :- If 1st set has been not completed at the time of the retirement or disqualification, then all bets relating to that individual match will be void.</li>
	    		<li>FOOTBALL Match Odds :- All bets apply to the relevant full 'regular time' period including stoppage time. Any extra-time and/or penalty shoot-out is not included. For the cancellation of a goal, due to VAR, bets matched between the time of the goal being scored and the time at which the video assistant referee finishes the review will be voided. For the cancellation of a red card, due to VAR, bets matched after the time at which the video assistant referee commences the review will be voided.</li>
	    		<li>FOOTBALL Under_Over Goals :- In the event of a match starting but not being completed, all bets will be void, unless the specific market outcome is already determined,</li>
	    	</ul>
	    </div>
				</div>
            
            </Popup>

        	
	</>
  )
}

export default Rule;