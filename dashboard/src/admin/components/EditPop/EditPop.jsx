import { useState, useEffect } from "react";
// import "./App.css";
import Sidebar from "../Sidebar/Sidebar";
import DashboardTitle from "../Dashboardtitle";

function Edit() {
  const initialValues = { name: "", description: "", weight: "", size: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };

  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formValues);
    }
  }, [formErrors]);

  const validate = (values) => {
    const errors = {};
    if (!values.name) {
      errors.name = "Name is required!";
    }
    if (!values.description) {
      errors.description = "Description is required!";
    }
    if (!values.weight) {
      errors.weight = "Weight is required!";
    } else if (isNaN(values.weight)) {
      errors.weight = "Weight must be a number!";
    }
    if (!values.size) {
      errors.size = "Size is required!";
    } else if (isNaN(values.size)) {
      errors.size = "Size must be a number!";
    }
    return errors;
  };

  return (
    <div className="d-flex">
      <Sidebar />
      <div className="flex-grow-1">
        <DashboardTitle />
        <div className="p-4">
          <div className="container">
            {Object.keys(formErrors).length === 0 && isSubmit ? (
              <div className="ui message success">Submitted successfully</div>
            ) : (
              <pre>{JSON.stringify(formValues, undefined, 2)}</pre>
            )}

            <form onSubmit={handleSubmit}>
              <h1>Product Form</h1>
              <div className="ui divider"></div>
              <div className="ui form">
                <div className="field">
                  <label>Name</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={formValues.name}
                    onChange={handleChange}
                  />
                </div>
                <p>{formErrors.name}</p>
                <div className="field">
                  <label>Description</label>
                  <input
                    type="text"
                    name="description"
                    placeholder="Description"
                    value={formValues.description}
                    onChange={handleChange}
                  />
                </div>
                <p>{formErrors.description}</p>
                <div className="field">
                  <label>Weight</label>
                  <input
                    type="text"
                    name="weight"
                    placeholder="Weight"
                    value={formValues.weight}
                    onChange={handleChange}
                  />
                </div>
                <p>{formErrors.weight}</p>
                <div className="field">
                  <label>Size</label>
                  <input
                    type="text"
                    name="size"
                    placeholder="Size"
                    value={formValues.size}
                    onChange={handleChange}
                  />
                </div>
                <p>{formErrors.size}</p>
                <button className="fluid ui button blue">Submit</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Edit;
