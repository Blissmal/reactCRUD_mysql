import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateBook = () => {
  const [values, setValues] = useState({
    publisher: "",
    name: "",
    date: "",
  });

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3030/create", values)
      .then((res) => {
        console.log(res.data);
        setValues({
          publisher: "",
          name: "",
          date: "",
        });

        navigate("/");
      })
      .catch((err) => console.error("Error:", err));
  };

  return (
    <div className="d-flex align-items-center mt-3 flex-column">
      <h1>Add a book</h1>
      <form className="w-50" onSubmit={handleSubmit}>
        <div className="mb-3 mt-3">
          <label htmlFor="publisher" className="form-label">
            Publisher:
          </label>
          <input
            type="text"
            className="form-control"
            id="publisher"
            placeholder="Enter publisher name"
            name="publisher"
            value={values.publisher}
            onChange={(e) =>
              setValues({ ...values, publisher: e.target.value })
            }
          />
        </div>
        <div className="mb-3">
          <label htmlFor="bookName" className="form-label">
            Book Name:
          </label>
          <input
            type="text"
            className="form-control"
            id="bookName"
            placeholder="Enter Book Name"
            name="name"
            value={values.name}
            onChange={(e) => setValues({ ...values, name: e.target.value })}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="date" className="form-label">
            Date:
          </label>
          <input
            type="date"
            className="form-control"
            id="date"
            name="date"
            value={values.date}
            onChange={(e) => setValues({ ...values, date: e.target.value })}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateBook;
