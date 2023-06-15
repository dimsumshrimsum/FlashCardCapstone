import React, { useState, useRef, useEffect } from "react";

function CardForm({
  header,
  initialFormData,
  altButtonHandler,
  altButtonText,
  submitHandler,
}) {
  const formRef = useRef(null);
  const [formData, setFormData] = useState(initialFormData);
  useEffect(() => {
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  console.log(initialFormData);

  function handleInput(event) {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  }
  function handleFormSubmit(event) {
    event.preventDefault();
    submitHandler(formData);
    setFormData(initialFormData);
  }
  return (
    <div className="card mb-4" ref={formRef}>
      <form onSubmit={handleFormSubmit}>
        <div className="card-header">
          <h1>{header}</h1>
        </div>
        <div className="card-body">
          <div className="row mb-3">
            <div className="col col-4">
              <label htmlFor="front" className=" col col-form-label">
                {" "}
                <h3>Front</h3>{" "}
              </label>
              <textarea
                name="front"
                value={formData.front}
                onChange={handleInput}
                cols="30"
                rows="10"
              ></textarea>
            </div>
            <div className="col col-4 ">
              <label htmlFor="back" className=" col col-form-label">
                <h3>Back</h3>
              </label>
              <textarea
                value={formData.back}
                name="back"
                onChange={handleInput}
                cols="30"
                rows="10"
              ></textarea>
            </div>
          </div>
        </div>
        <div className="card-footer">
          <button onClick={altButtonHandler} className="btn btn-secondary mr-2">
            {altButtonText}
          </button>
          <input type="submit" value="Submit" className="btn btn-primary" />
        </div>
      </form>
    </div>
  );
}
export default CardForm;
