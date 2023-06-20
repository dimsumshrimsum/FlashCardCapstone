import React, { useState, useRef, useEffect } from "react";
function DeckForm({
  header,
  initialFormData,
  submitHandler,
  altButtonHandler,
}) {
  // const formRef = useRef(null);
  //need to copy over form ref stuff from card form to auto scroll
  const [formData, setFormData] = useState(initialFormData);
  // useEffect(() => {
  //   if (formRef.current) {
  //     formRef.current.scrollIntoView({ behavior: "smooth" });
  //   }
  // }, []);
  function handleInput(event) {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  }
  function handleFormSubmit(event) {
    event.preventDefault();
    submitHandler(formData);
  }
  return (
    <form className="container mb-3">
      <div className="card">
        <div className="card-header">
          <h1>{header}</h1>
        </div>
        <div className="card-body">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInput}
            className="form-control mb-3"
          />
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            value={formData.description}
            name="description"
            onChange={handleInput}
            cols="30"
            rows="10"
            className="form-control"
          ></textarea>
        </div>
        <div className="card-footer mt-2">
          <button className="btn btn-secondary mr-1" onClick={altButtonHandler}>
            CANCEL
          </button>
          <button onClick={handleFormSubmit} className="btn btn-primary">
            Submit
          </button>
        </div>
      </div>
    </form>
  );
}
export default DeckForm;
