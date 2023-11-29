import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import Navbar from '../Header/Navbar';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import moment from 'moment/moment';
import { useNavigate } from 'react-router-dom';

export default function Tennis_scoreboard() {
  let navigate = useNavigate();

const [scoreboard_data, setscoreboard_data] = useState([])
let {CompetitionID, eventType}=useParams()
    const Scoreboard_data=async()=>{
        try {
          let res=await axios.get(`https://nft-betting-api.nakshtech.info/GetEventCompetitionsData?EventTypeID=${eventType}&CompetitionID=${CompetitionID}`)
          // console.log("Even_Type",res.data);
          setscoreboard_data(res.data)

        } catch (error) {
            console.log("Something Error in Tennis Scoreboard_data API",error);
        }
    }

    useEffect(()=>{
        Scoreboard_data()
    },[])


  return (
    <div>
         <Navbar />
      <main class="main_root wrapper">
        {/* <!-- Sidebar end  -->
	    <!-----=======body section start=======----> */}
        <div id="content">
          <div class="container">
            <div class="row">
              <div class="col-md-12">
                <div class=" tab-content_bg">
                  
                  {/* <!-----tab pane------>  */}
                  <div class="tab-content">
                   
                    <div id="Home3" class="container tab-pane active">
                      <div class="">
                        <div class="table-responsive-sm">
                          <table class="table">
                            <thead>
                              <tr>
                                <th scope="col">#</th>
                                <th scope="col">id</th>
                                <th scope="col">Name</th>
                                <th scope="col">openDate</th>

                              </tr>
                            </thead>
                            <tbody className="text-white">
                              {scoreboard_data?.map((item, index) => (
                                <tr>
                                  <th scope="row">{index+1}</th>
                                  <td>{item.event.id}</td>
                                  <td><a href=''  style={{color:"#fff",textDecoration: "none"}} onClick={()=>navigate(`/Tennis_Matches?Id=${item.event.id}&Time=${item.openDate}`)} >{item.event.name}</a></td>
                                  <td>{ moment(item.event.openDate).format("DD/MM/YYYY h:m:s A")}</td>

                                 
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        
                        </div>
                      </div>
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
  )
}
