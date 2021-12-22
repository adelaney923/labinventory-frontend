import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../../context/userContext";

function Consumables() {
  const { userData } = useContext(UserContext);
  const [consumables, setConsumables] = useState([]);

//   const getInventory = () => {
//     if (localStorage.getItem("auth-token") !== null) {
//       fetch("http://localhost:8000/calibrators/", {
//         headers: {
//           Authorization: `Token ${userData.token}`,
//         },
//       })
//         .then((res) => res.json())
//         .then((data) => setCalibrators(data));
//     }
//   };

//   useEffect(() => {
//     getInventory();
//   }, []);

  return (
    <div id="consumables">
      <h1>Consumables</h1>
    </div>
  );
}

export default Consumables;
