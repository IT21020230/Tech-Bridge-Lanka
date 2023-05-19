import React, { useState } from "react";

function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [messageError, setMessageError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // validate form data
    let errors = {};
    if (!name) {
      errors.name = "Please enter your name";
    }
    if (!email) {
      errors.email = "Please enter your email";
    }
    if (!message) {
      errors.message = "Please enter a message";
    }

    // show errors if any
    setNameError(errors.name || "");
    setEmailError(errors.email || "");
    setMessageError(errors.message || "");

    // submit form if no errors
    if (Object.keys(errors).length === 0) {
      console.log("Submitting form", { name, email, message });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <div style={{ color: "red" }}>{nameError}</div>
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div style={{ color: "red" }}>{emailError}</div>
      </div>
      <div>
        <label htmlFor="message">Message</label>
        <textarea
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        ></textarea>
        <div style={{ color: "red" }}>{messageError}</div>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}

export default ContactForm;