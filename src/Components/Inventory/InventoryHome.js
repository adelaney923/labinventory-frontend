import React, {useState, useEffect, useContext} from 'react';
import {Link} from "react-router-dom"
import UserContext from "../../context/userContext"
import Controls from './Controls';
import Calibrators from './Calibrators';
import Reagents from './Reagents';
import Consumables from './Consumables';
import './inventory.css'

function InventoryHome() {
    const { userData } = useContext(UserContext);

    return (
      <div id="inventory">
        {userData.token ? (
          <div>
            <h1>Inventory</h1>
            <Controls />
            <Calibrators />
            <Reagents />
            <Consumables />
          </div>
        ) : (
          <div className="container">
            <img
              className="labphoto"
              src="https://res.cloudinary.com/adelaney923/image/upload/v1640113474/labphoto1_l17oef.jpg"
              alt="labphoto"
            />
            <div className="errorMessage">
              <p className="errorText">
                <Link className='loginlink' to="/login">Login</Link> to see your inventory.
              </p>
            </div>
          </div>
        )}
      </div>
    );
}

export default InventoryHome