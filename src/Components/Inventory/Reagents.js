import React, { useState, useEffect, useContext } from "react";
import { Table } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../../context/userContext";
import ReactCardFlip from "react-card-flip";
import "./inventory.css";

function Reagents() {
  const { userData } = useContext(UserContext);
  const navigate = useNavigate();
  const [redirect, setRedirect] = useState(false);
  const [reagents, setReagents] = useState([]);

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
  const [isReagents, setIsReagents] = useState(false);

  const getReagents = () => {
    if (localStorage.getItem("auth-token") !== null) {
      fetch("https://labinventory-api.herokuapp.com/reagents/", {
        headers: {
          Authorization: `Token ${userData.token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setReagents(data);
          setIsReagents(!isReagents);
        });
    }
  };

  useEffect(() => {
    getReagents();
  }, []);

  //   method to update one of the Reagents
  const editCal = (reagent) => {
    console.log("edited");
    setId(reagent.id);
    setDescription(reagent.description);
    setStorageTemp(reagent.storage_temp);
    setRefNum(reagent.reference_num);
    setPartNum(reagent.part_number);
    setUom(reagent.unit_of_measure);
    setQuantity(reagent.quantity);
    setLotNum(reagent.lot_number);
    setExpiration(reagent.expiration_date);
    setComments(reagent.comments);
  };

  //   method to delete calibrator
  const deleteCal = (id) => {
    console.log("deleted");
    fetch("https://labinventory-api.herokuapp.com/reagents/" + id, {
      method: "DELETE",
      headers: {
        Authorization: `Token ${userData.token}`,
      },
    }).then((data) => getReagents());
  };

  //   map over calibrator data to get data for the table
  const reagentTable =
    reagents &&
    reagents.map((reagent) => {
      return (
        <tr>
          <td>{reagent.id}</td>
          <td>{reagent.description}</td>
          <td>{reagent.storage_temp}</td>
          <td>{reagent.reference_num}</td>
          <td>{reagent.part_number}</td>
          <td>{reagent.unit_of_measure}</td>
          <td>{reagent.quantity}</td>
          <td>{reagent.lot_number}</td>
          <td>{reagent.expiration_date}</td>
          <td>{reagent.comments}</td>
          <td className="editicons">
            <i
              class="far fa-edit"
              onClick={() => {
                editCal(reagent);
                handleClick();
              }}
            ></i>
            <i
              class="far fa-trash-alt"
              onClick={() => deleteCal(reagent.id)}
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
      fetch("https://labinventory-api.herokuapp.com/reagents/", {
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
          getReagents();
        });
    }
  };

  const patchRequest = (e) => {
    e.preventDefault();
    console.log("patch");
    console.log(id);
    if (localStorage.getItem("auth-token") !== null) {
      fetch("https://labinventory-api.herokuapp.com/reagents/" + id, {
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
          getReagents();
        });
    }
    //   getCalibrators();
  };

  console.log(reagents.length);

  return (
    <div id="reagents">
      <h3 className="invTitle">Reagents</h3>
      {reagents.length !== 0 ? (
        <ReactCardFlip
          className="flipCard"
          isFlipped={isFlipped}
          fliDirection="vertical"
        >
          <div className="frontCard">
            <div className="reagentTable">
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
                <tbody>{reagentTable}</tbody>
              </Table>
            </div>
          </div>

          {/* back of card for updating control */}
          <div className="backCard">
            <div className="newReagent">
              <h3>Update Reagent</h3>
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
        <h4>No reagents added yet.</h4>
      )}

      {/* form for adding a calibrator */}
      <button className="invButton" onClick={showAdd}>
        Add Reagent
      </button>
      <div
        className="newReagent"
        style={{ display: isAdding ? "block" : "none" }}
      >
        <h3>Add Reagent</h3>
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

export default Reagents;
