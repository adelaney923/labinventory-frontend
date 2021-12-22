import React, {useState, useEffect, useContext} from 'react';
import {Link} from "react-router-dom"
import UserContext from "../../context/userContext"

function InventoryHome() {
    const { userData } = useContext(UserContext);
    const [calibrators, setCalibrators] = useState([]);
    // const [controls, setControls] = useState([]);
    // const [consumables, setConsumables] = useState([]);
    // const [reagents, setReagents] = useState([]);

    const getInventory = () => {
        if (localStorage.getItem("auth-token") !== null) {
            fetch("http://localhost:8000/calibrators/", {
                headers: {
                    "Authorization": `Token ${userData.token}`
                }
            })
            .then((res) => res.json())
            .then((data) => setCalibrators(data))
        }
    }

    useEffect(() => {
        getInventory();
    }, []);


    return (
        <div id='inventory'>
            <h1>Inventory</h1>
        </div>
    )
}

export default InventoryHome