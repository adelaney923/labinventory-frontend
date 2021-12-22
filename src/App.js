import React, {useState} from 'react'
import {Route, Routes} from "react-router-dom"
import Header from "./Components/Nav/Nav";
import Landing from './Components/LandingPage/Landing'
import Contact from './Components/Contact/Contact'
import Signup from './Components/Auth/Signup'
import Login from './Components/Auth/Login'
import InventoryHome from './Components/Inventory/InventoryHomeHome'
import UserContext from "./context/userContext";
// import axios from "axios";


function App() {
  const [userData, setUserData] = useState({
    email: undefined,
    token: undefined,
  });


  return (
    <div className="App">
      <UserContext.Provider value={{ userData, setUserData }}>
        <Header />
        <Routes>
          <Route exact path="/" element={<Landing />} />
          <Route exact path="/contact" element={<Contact />} />
          <Route exact path="/sign-up" element={<Signup />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/inventory" element={<InventoryHome />} />
        </Routes>
      </UserContext.Provider>
    </div>
  );
}

export default App;
