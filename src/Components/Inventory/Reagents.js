import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../../context/userContext";

function Reagents() {
  const { userData } = useContext(UserContext);
  const [reagents, setReagents] = useState([]);

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
    <div id="Reagents">
      <h1>Reagents</h1>
    </div>
  );
}

export default Reagents;
