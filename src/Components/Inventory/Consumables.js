import React, { useState, useEffect, useContext } from "react";
import { Table } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../../context/userContext";
import ReactCardFlip from "react-card-flip";
import "./inventory.css";

function Consumables() {
  const { userData } = useContext(UserContext);
  const navigate = useNavigate();
  const [redirect, setRedirect] = useState(false);
  const [consumables, setConsumables] = useState([]);

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
  const [isConsumables, setIsConsumables] = useState(false);

  const getConsumables = () => {
    if (localStorage.getItem("auth-token") !== null) {
      fetch("http://labinventory-api.herokuapp.com/consumables/", {
        headers: {
          Authorization: `Token ${userData.token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setConsumables(data);
          setIsConsumables(!isConsumables);
        });
    }
  };

  useEffect(() => {
    getConsumables();
  }, []);

  //   method to update one of the consumables
  const editCal = (consumable) => {
    console.log("edited");
    setId(consumable.id);
    setDescription(consumable.description);
    setStorageTemp(consumable.storage_temp);
    setRefNum(consumable.reference_num);
    setPartNum(consumable.part_number);
    setUom(consumable.unit_of_measure);
    setQuantity(consumable.quantity);
    setLotNum(consumable.lot_number);
    setExpiration(consumable.expiration_date);
    setComments(consumable.comments);
  };

  //   method to delete calibrator
  const deleteCal = (id) => {
    console.log("deleted");
    fetch("http://labinventory-api.herokuapp.com/consumables/" + id, {
      method: "DELETE",
      headers: {
        Authorization: `Token ${userData.token}`,
      },
    }).then((data) => getConsumables());
  };

  //   map over calibrator data to get data for the table
  const consumableTable =
    consumables &&
    consumables.map((consumable) => {
      return (
        <tr>
          <td>{consumable.id}</td>
          <td>{consumable.description}</td>
          <td>{consumable.storage_temp}</td>
          <td>{consumable.reference_num}</td>
          <td>{consumable.part_number}</td>
          <td>{consumable.unit_of_measure}</td>
          <td>{consumable.quantity}</td>
          <td>{consumable.lot_number}</td>
          <td>{consumable.expiration_date}</td>
          <td>{consumable.comments}</td>
          <td className="editicons">
            <i
              class="far fa-edit"
              onClick={() => {
                editCal(consumable);
                handleClick();
              }}
            ></i>
            <i
              class="far fa-trash-alt"
              onClick={() => deleteCal(consumable.id)}
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
      fetch("http://labinventory-api.herokuapp.com/consumables/", {
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
          getConsumables();
        });
    }
  };

  const patchRequest = (e) => {
    e.preventDefault();
    console.log("patch");
    console.log(id);
    if (localStorage.getItem("auth-token") !== null) {
      fetch("http://labinventory-api.herokuapp.com/consumables/" + id, {
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
          getConsumables();
        });
    }
    //   getCalibrators();
  };

  console.log(consumables.length)

  return (
    <div id="consumables">
      <h3 className="invTitle">Consumables</h3>
      {consumables.length !== 0 ? (
        <ReactCardFlip
          className="flipCard"
          isFlipped={isFlipped}
          fliDirection="vertical"
        >
          <div className="frontCard">
            <div className="consumableTable">
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
                <tbody>{consumableTable}</tbody>
              </Table>
            </div>
          </div>

          {/* back of card for updating consumable */}
          <div className="backCard">
            <div className="newConsumable">
              <h3>Update Consumable</h3>
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
                        <button onClick={handleClick}>Update</button>
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </form>
            </div>
          </div>
        </ReactCardFlip>
      ) : (
        <h4>No consumables added yet.</h4>
      )}

      {/* form for adding a calibrator */}
      <button onClick={showAdd}>Add Consumable</button>
      <div
        className="newConsumable"
        style={{ display: isAdding ? "block" : "none" }}
      >
        <h3>Add Consumable</h3>
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

export default Consumables;
