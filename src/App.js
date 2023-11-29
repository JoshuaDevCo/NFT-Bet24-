import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Dashboard from "./Components/Dashboard/Dashboard";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./Components/Login/Login";
import Forgot from "./Components/Login/Forgot";
import Football_scorebaord from "./Components/FootballScoreboard/Football_scorebaord";
import Football_Matches from "./Components/Matches/Football_Matches";
import Registration from "./Components/Registration/Registration";
import Tennis_scoreboard from "./Components/TennisScoreboard/Tennis_scoreboard";
import Tennis_Matches from "./Components/Matches/Tennis_Matches";
import Live_Matches from "./Components/Matches/Live_Matches";
import Scoreboard from "./Components/Scoreboard/Scoreboard";
import Home from "./Components/Home/Home";
import Bet_History_Drop from "./Components/Dropdown/BetHistory";
import ProfitLoss from "./Components/Dropdown/ProfitLoss";
import Statement from "./Components/Dropdown/AllStatement";
import Unsellected from "./Components/Dropdown/UnsellectedBet";
import Change_Password from "./Components/Dropdown/ChangePassword";
import Button_value from "./Components/Dropdown/Button_Value";
import Level_Income from "./Components/Income Reports/Level_Income";
import Direct_Income from "./Components/Income Reports/Direct_Income";
import Profile from "./Components/Dropdown/Profile";
import Transation_Password from "./Components/Dropdown/Transation_Password";
import Withdrawal from "./Components/Dropdown/Withdrawal";
import TransferFund from "./Components/Dropdown/TransferFund";
import TransferFundHistory from "./Components/Dropdown/TransferFundHistory";
import Withdrawal_History from "./Components/Dropdown/Withdrawal_History";
import Deposit from "./Components/Dropdown/Deposit";
import Deposit_History from "./Components/Dropdown/Deposit_History";

function App() {
  return (
    <BrowserRouter>
      {/* <Navbar/> */}
      <>
        <ToastContainer />
        <Toaster position="top-center" reverseOrder={false} />
        <Routes>
          <Route path="/Dashboard/:name/:type" element={<Dashboard />} />
          <Route
            path="/Dashboard/:name/:type/:competitionId"
            element={<Dashboard />}
          />
          <Route path="/Registration" element={<Registration />} />

          <Route path="/Live_Matches" element={<Live_Matches />} />
          <Route
            path="/scoreboard/:CompetitionID/:eventType"
            element={<Scoreboard />}
          />
          <Route path="/Tennis_Matches" element={<Tennis_Matches />} />

          <Route
            path="/Tennis/:CompetitionID/:eventType"
            element={<Tennis_scoreboard />}
          />
          <Route path="/Football_Matches" element={<Football_Matches />} />

          <Route
            path="/Soccer/:CompetitionID/:eventType"
            element={<Football_scorebaord />}
          />

          <Route path="/" element={<Home />} />

          <Route path="/Login" element={<Login />} />
          <Route path="/Forgot" element={<Forgot />} />
          <Route path="/Bet_History_Drop" element={<Bet_History_Drop />} />
          <Route path="/ProfitLoss" element={<ProfitLoss />} />
          <Route path="/Statement" element={<Statement />} />
          <Route path="/Unsellected" element={<Unsellected />} />
          <Route path="/Change_Password" element={<Change_Password />} />
          <Route path="/Button_value" element={<Button_value />} />
          <Route path="/Level_Income" element={<Level_Income />} />
          <Route path="/Direct_Income" element={<Direct_Income />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/Withdrawal" element={<Withdrawal />} />
          <Route
            path="/TransferFundHistory"
            element={<TransferFundHistory />}
          />
          <Route path="/Withdrawal_History" element={<Withdrawal_History />} />
          <Route
            path="/Transation_Password"
            element={<Transation_Password />}
          />
          <Route path="/TransferFund" element={<TransferFund />} />
          <Route path="/Deposit" element={<Deposit />} />
          <Route path="/DepositHistory" element={<Deposit_History />} />
        </Routes>
      </>
    </BrowserRouter>
  );
}

export default App;
