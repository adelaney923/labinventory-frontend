import React, { useState, useEffect, useContext } from "react";
import {Table} from 'react-bootstrap'
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../../context/userContext";

function Calibrators() {
  const { userData } = useContext(UserContext);
  const navigate = useNavigate()
  const [redirect, setRedirect] = useState(false);
  const [calibrators, setCalibrators] = useState();

//   setting states for new calibrator form
  const [description, setDescription] = useState();
  const [storageTemp, setStorageTemp] = useState();
  const [refNum, setRefNum] = useState();
  const [partNum, setPartNum] = useState();
  const [uom, setUom] = useState();
  const [quantity, setQuantity] = useState();
  const [lotNum, setLotNum] = useState();
  const [expiration, setExpiration] = useState();
  const [comments, setComments] = useState("");

//   state for adding the info to make new calibrators
//   const [post, setPost] = useState({
//     description: "",
//     img: "",
//     location: "",
//     price: "",
//     caption: "",
//   });


  const getCalibrators = () => {
    if (localStorage.getItem("auth-token") !== null) {
      fetch("http://localhost:8000/calibrators/", {
        headers: {
          Authorization: `Token ${userData.token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => setCalibrators(data));
    }
  };

  useEffect(() => {
    getCalibrators();
  }, []);

  const editCal = (id) => {
      console.log(id)
  }
  const deleteCal = (id) => {
      console.log(id)
  }

  const calibratorTable = calibrators && calibrators.map((calibrator) => {
      return (
        <tr>
          <td>{calibrator.id}</td>
          <td>{calibrator.description}</td>
          <td>{calibrator.storage_temp}</td>
          <td>{calibrator.reference_num}</td>
          <td>{calibrator.part_number}</td>
          <td>{calibrator.unit_of_measure}</td>
          <td>{calibrator.quantity}</td>
          <td>{calibrator.lot_number}</td>
          <td>{calibrator.expiration_date}</td>
          <td>{calibrator.comments}</td>
          <td className="editicons">
            <i class="far fa-edit" onClick={() => editCal(calibrator.id)}></i>
            <i
              class="far fa-trash-alt"
              onClick={() => deleteCal(calibrator.id)}
            ></i>
          </td>
        </tr>
      );
  })

//   handle submit for form to add new calibrator
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('submitted')
        if (localStorage.getItem("auth-token") !== null) {
            fetch("http://localhost:8000/calibrators/", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Token ${userData.token}`,
                },
                body: JSON.stringify({
                    description: description,
                    storage_temp: storageTemp,
                    reference_num: refNum,
                    part_number: partNum,
                    unit_of_measure: uom,
                    quantity: quantity,
                    lot_number: lotNum,
                    expiration_date: expiration,
                    comments: comments
                }),
      })
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            setRedirect(true);
    })
  };
}

  if (redirect) {
      navigate('/inventory')
  }

  return (
    <div id="calibrators">
      <h1>Calibrators</h1>
      <div className="calibratorTable">
        <Table responsive striped bordered hover size="sm">
          <thead>
            <tr>
              <th>#</th>
              <th>Description</th>
              <th>Storage</th>
              <th>REF</th>
              <th>P/N</th>
              <th>UOM</th>
              <th>QTY</th>
              <th>Lot</th>
              <th>Expiration Date</th>
              <th>Comments</th>
              <th></th>
            </tr>
          </thead>
          <tbody>{calibratorTable}</tbody>
        </Table>
      </div>

      <div className="newCalibrator">
        <h3>Add Calibrator</h3>
        <form onSubmit={handleSubmit}>
          <Table responsive striped bordered hover size="sm">
            <thead>
              <tr>
                <th>Description</th>
                <th>Storage</th>
                <th>REF</th>
                <th>P/N</th>
                <th>UOM</th>
                <th>QTY</th>
                <th>Lot</th>
                <th>Expiration Date</th>
                <th>Comments</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <input
                    type="text"
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Description"
                  />
                </td>
                <td>
                  <input
                    type="text"
                    onChange={(e) => setStorageTemp(e.target.value)}
                    placeholder="Storage Temp"
                  />
                </td>
                <td>
                  <input
                    type="text"
                    onChange={(e) => setRefNum(e.target.value)}
                    placeholder="Reference Number"
                  />
                </td>
                <td>
                  <input
                    type="text"
                    onChange={(e) => setPartNum(e.target.value)}
                    placeholder="Part Number"
                  />
                </td>
                <td>
                  <input
                    type="text"
                    onChange={(e) => setUom(e.target.value)}
                    placeholder="UOM"
                  />
                </td>
                <td>
                  <input
                    type="text"
                    onChange={(e) => setQuantity(e.target.value)}
                    placeholder="Quantity"
                  />
                </td>
                <td>
                  <input
                    type="text"
                    onChange={(e) => setLotNum(e.target.value)}
                    placeholder="Lot"
                  />
                </td>
                <td>
                  <input
                    type="text"
                    onChange={(e) => setExpiration(e.target.value)}
                    placeholder="Expiration"
                  />
                </td>
                <td>
                  <input
                    type="text"
                    onChange={(e) => setComments(e.target.value)}
                    placeholder="Comments"
                  />
                </td>
                <td>
                  <button onClick={handleSubmit}>Add Calibrator</button>
                </td>
              </tr>
            </tbody>
          </Table>
        </form>
      </div>
    </div>
  );
}

export default Calibrators;
