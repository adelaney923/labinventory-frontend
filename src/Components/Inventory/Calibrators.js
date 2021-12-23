import React, { useState, useEffect, useContext } from "react";
import {Table} from 'react-bootstrap'
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../../context/userContext";
import ReactCardFlip from "react-card-flip";
import './inventory.css'

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

//   variables and function for card flip
  const [isFlipped, setIsFlipped] = useState(false)
  const handleClick = () => {
      setIsFlipped(!isFlipped)
  }

//   variables and function for displaying add calibrator
  const [isAdding, setIsAdding] = useState(false)
  const showAdd = () => {
      setIsAdding(!isAdding)
  }

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

//   method to update one of the calibrators
  const editCal = (calibrator) => {
    console.log("edited");
    console.log(calibrator)
    setDescription(calibrator.description);
    setStorageTemp(calibrator.storage_temp);
    setRefNum(calibrator.reference_num);
    setPartNum(calibrator.part_number);
    setUom(calibrator.unit_of_measure);
    setQuantity(calibrator.quantity);
    setLotNum(calibrator.lot_number);
    setExpiration(calibrator.expiration_date);
    setComments(calibrator.comments);
}

//   method to delete calibrator
  const deleteCal = (id) => {
      console.log("deleted");
      fetch("http://localhost:8000/calibrators/" + id, {
        method: "DELETE",
        headers: {
          Authorization: `Token ${userData.token}`,
        }
      }).then((data) => getCalibrators());
  }

//   map over calibrator data to get data for the table
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
            <i class="far fa-edit" onClick={() => {
                editCal(calibrator)
                handleClick()}}></i>
            <i
              class="far fa-trash-alt"
              onClick={() => deleteCal(calibrator.id)}></i>
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
            getCalibrators();
    })
  };
}


  return (
    <div>
      <h1>Calibrators</h1>
      <ReactCardFlip isFlipped={isFlipped} fliDirection="vertical">
        <div className="frontCard">
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
            <button onClick={showAdd}>
              Add Calibrator
            </button>
          </div>
        </div>
        <div className="backCard">
          <div className="newCalibrator">
            <h3>Update Calibrator</h3>
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
                        value={description}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        onChange={(e) => setStorageTemp(e.target.value)}
                        placeholder="Storage Temp"
                        value={storageTemp}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        onChange={(e) => setRefNum(e.target.value)}
                        placeholder="Reference Number"
                        value={refNum}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        onChange={(e) => setPartNum(e.target.value)}
                        placeholder="Part Number"
                        value={partNum}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        onChange={(e) => setUom(e.target.value)}
                        placeholder="UOM"
                        value={uom}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        onChange={(e) => setQuantity(e.target.value)}
                        placeholder="Quantity"
                        value={quantity}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        onChange={(e) => setLotNum(e.target.value)}
                        placeholder="Lot"
                        value={lotNum}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        onChange={(e) => setExpiration(e.target.value)}
                        placeholder="Expiration"
                        value={expiration}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        onChange={(e) => setComments(e.target.value)}
                        placeholder="Comments"
                        value={comments}
                      />
                    </td>
                    <td>
                      <button onClick={handleSubmit} onClick={handleClick}>
                        Update
                      </button>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </form>
          </div>
        </div>
      </ReactCardFlip>

      {/* form for adding a calibrator */}
      <div
        className="newCalibrator"
        style={{ display: isAdding ? "block" : "none" }}
      >
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
                  <button onClick={handleSubmit}>Add</button>
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
