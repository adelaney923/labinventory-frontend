import React, { useState, useEffect, useContext } from "react";
import { Table } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../../context/userContext";
import ReactCardFlip from "react-card-flip";
import "./inventory.css";

function Controls() {
  const { userData } = useContext(UserContext);
  const navigate = useNavigate();
  const [redirect, setRedirect] = useState(false);
  const [controls, setControls] = useState([]);

  //   setting states for new calibrator form
  const [id, setId] = useState();
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
  const [isFlipped, setIsFlipped] = useState(false);
  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };

  //   variables and function for displaying add calibrator
  const [isAdding, setIsAdding] = useState(false);
  const showAdd = () => {
    setIsAdding(!isAdding);
  };

  // variable to choose what is shown in calibrators table
  const [isControls, setIsControls] = useState(false);

  const getControls = () => {
    if (localStorage.getItem("auth-token") !== null) {
      fetch("https://labinventory-api.herokuapp.com/controls/", {
        headers: {
          Authorization: `Token ${userData.token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setControls(data);
          setIsControls(!isControls);
        });
    }
  };

  useEffect(() => {
    getControls();
  }, []);

  //   method to update one of the controls
  const editCal = (control) => {
    console.log("edited");
    setId(control.id);
    setDescription(control.description);
    setStorageTemp(control.storage_temp);
    setRefNum(control.reference_num);
    setPartNum(control.part_number);
    setUom(control.unit_of_measure);
    setQuantity(control.quantity);
    setLotNum(control.lot_number);
    setExpiration(control.expiration_date);
    setComments(control.comments);
  };

  //   method to delete calibrator
  const deleteCal = (id) => {
    console.log("deleted");
    fetch("https://labinventory-api.herokuapp.com/controls/" + id, {
      method: "DELETE",
      headers: {
        Authorization: `Token ${userData.token}`,
      },
    }).then((data) => getControls());
  };

  //   map over calibrator data to get data for the table
  const controlTable =
    controls &&
    controls.map((control) => {
      return (
        <tr>
          <td>{control.id}</td>
          <td>{control.description}</td>
          <td>{control.storage_temp}</td>
          <td>{control.reference_num}</td>
          <td>{control.part_number}</td>
          <td>{control.unit_of_measure}</td>
          <td>{control.quantity}</td>
          <td>{control.lot_number}</td>
          <td>{control.expiration_date}</td>
          <td>{control.comments}</td>
          <td className="editicons">
            <i
              class="far fa-edit"
              onClick={() => {
                editCal(control);
                handleClick();
              }}
            ></i>
            <i
              class="far fa-trash-alt"
              onClick={() => deleteCal(control.id)}
            ></i>
          </td>
        </tr>
      );
    });

  //   handle submit for form to add new calibrator
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submitted");
    if (localStorage.getItem("auth-token") !== null) {
      fetch("https://labinventory-api.herokuapp.com/controls/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
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
          comments: comments,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          getControls();
        });
    }
  };

  const patchRequest = (e) => {
    e.preventDefault();
    console.log("patch");
    console.log(id);
    if (localStorage.getItem("auth-token") !== null) {
      fetch("https://labinventory-api.herokuapp.com/controls/" + id, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
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
          comments: comments,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          getControls();
        });
    }
    //   getCalibrators();
  };

  console.log(controls.length);

  return (
    <div id="controls">
      <h3 className="invTitle">Controls</h3>
      {controls.length !== 0 ? (
        <ReactCardFlip
          className="flipCard"
          isFlipped={isFlipped}
          fliDirection="vertical"
        >
          <div className="frontCard">
            <div className="controlTable">
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
                    <th>Expiration</th>
                    <th>Comments</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>{controlTable}</tbody>
              </Table>
            </div>
          </div>

          {/* back of card for updating control */}
          <div className="backCard">
            <div className="newControl">
              <h3>Update Control</h3>
              <form onSubmit={patchRequest}>
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
                      <th>Expiration</th>
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
                          size="15"
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          onChange={(e) => setStorageTemp(e.target.value)}
                          placeholder="Storage Temp"
                          value={storageTemp}
                          size="15"
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          onChange={(e) => setRefNum(e.target.value)}
                          placeholder="Reference Number"
                          value={refNum}
                          size="15"
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          onChange={(e) => setPartNum(e.target.value)}
                          placeholder="Part Number"
                          value={partNum}
                          size="15"
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          onChange={(e) => setUom(e.target.value)}
                          placeholder="UOM"
                          value={uom}
                          size="15"
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          onChange={(e) => setQuantity(e.target.value)}
                          placeholder="Quantity"
                          value={quantity}
                          size="4"
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          onChange={(e) => setLotNum(e.target.value)}
                          placeholder="Lot"
                          value={lotNum}
                          size="15"
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          onChange={(e) => setExpiration(e.target.value)}
                          placeholder="Expiration"
                          value={expiration}
                          size="10"
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          onChange={(e) => setComments(e.target.value)}
                          placeholder="Comments"
                          value={comments}
                          size="15"
                        />
                      </td>
                      <td>
                        <button className="invButton" onClick={handleClick}>
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
      ) : (
        <h4>No controls added yet.</h4>
      )}

      {/* form for adding a calibrator */}
      <button className="invButton" onClick={showAdd}>
        Add Control
      </button>
      <div
        className="newControl"
        style={{ display: isAdding ? "block" : "none" }}
      >
        <h3>Add Control</h3>
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
                    size="15"
                  />
                </td>
                <td>
                  <input
                    type="text"
                    onChange={(e) => setStorageTemp(e.target.value)}
                    placeholder="Storage Temp"
                    size="15"
                  />
                </td>
                <td>
                  <input
                    type="text"
                    onChange={(e) => setRefNum(e.target.value)}
                    placeholder="Reference Number"
                    size="15"
                  />
                </td>
                <td>
                  <input
                    type="text"
                    onChange={(e) => setPartNum(e.target.value)}
                    placeholder="Part Number"
                    size="15"
                  />
                </td>
                <td>
                  <input
                    type="text"
                    onChange={(e) => setUom(e.target.value)}
                    placeholder="UOM"
                    size="15"
                  />
                </td>
                <td>
                  <input
                    type="text"
                    onChange={(e) => setQuantity(e.target.value)}
                    placeholder="Quantity"
                    size="4"
                  />
                </td>
                <td>
                  <input
                    type="text"
                    onChange={(e) => setLotNum(e.target.value)}
                    placeholder="Lot"
                    size="15"
                  />
                </td>
                <td>
                  <input
                    type="text"
                    onChange={(e) => setExpiration(e.target.value)}
                    placeholder="Expiration"
                    size="10"
                  />
                </td>
                <td>
                  <input
                    type="text"
                    onChange={(e) => setComments(e.target.value)}
                    placeholder="Comments"
                    size="15"
                  />
                </td>
                <td>
                  <button className="invButton" onClick={handleSubmit}>
                    Add
                  </button>
                </td>
              </tr>
            </tbody>
          </Table>
        </form>
      </div>
    </div>
  );
}

export default Controls;
