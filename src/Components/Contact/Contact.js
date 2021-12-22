import React from "react";
import { useEffect, useState } from "react";
const { GoogleSpreadsheet } = require("google-spreadsheet");
const creds = require("../../client_secret.json");
let doc = {};

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [buttonText, setButtonText] = useState("Send");

  const makeInitialCall = async () => {
    doc = new GoogleSpreadsheet("1CFw9i7jG-egHhLlZTzNERF7UIVaKzfl5sSt5rj0C0O8");
    await doc.useServiceAccountAuth(creds);
    await doc.loadInfo();
    let dataRows = await doc.sheetsByIndex[0].getRows();
    console.log(doc.sheetsByIndex[0]);
    console.log(dataRows);
  };
  useEffect(() => {
    makeInitialCall();
  }, []);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setButtonText("Thanks!");
    let newRow = {
      Name: name,
      Email: email,
      Message: message,
    };

    let sheet = await doc.sheetsByIndex[0];
    sheet.addRow(newRow);
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <div className="contact-form">
      <form>
        <h3>Let's Talk</h3>
        <input
          type="text"
          onChange={handleNameChange}
          value={name}
          placeholder="Name"
        />
        <input
          type="email"
          onChange={handleEmailChange}
          value={email}
          placeholder="Email"
        />
        <textarea
          type="text"
          onChange={handleMessageChange}
          value={message}
          placeholder="What's on your mind?"
        />
        <button onClick={handleSubmit}>{buttonText}</button>
      </form>
    </div>
  );
};

export default Contact;
