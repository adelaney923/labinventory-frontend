import React, {useState, useEffect, useContext} from 'react';
import {Link} from "react-router-dom"
import UserContext from "../../context/userContext"
import Controls from './Controls';
import Calibrators from './Calibrators';
import Reagents from './Reagents';
import Consumables from './Consumables';

function InventoryHome() {
    const { userData } = useContext(UserContext);

    return (
        <div id='inventory'>
            {userData.token ? (
                <>
            <h1>Inventory</h1>
            <Controls />
            <Calibrators />
            <Reagents />
            <Consumables />
            </>
            ) : (
                <p>not logged in</p>
            )
            }
        </div>
    )
}

export default InventoryHome