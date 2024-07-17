import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const UpdateBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [values, setValues] = useState({
    publisher: "",
    name: "",
    date: "",
  });

  useEffect(() => {
    axios
      .get(`http://localhost:3030/getRecord/${id}`)
      .then((res) => {
        const bookData = res.data[0]; // Assuming your API returns an array with one book object
        setValues({
          publisher: bookData.publisher,
          name: bookData.name,
          date: bookData.date,
        });
      })
      .catch((err) => console.error("Error fetching book:", err));
  }, [id]); // Include id in the dependency array to re-fetch when id changes

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put("http://localhost:3030/update/" + id, values) // Adjust URL for your update endpoint
      .then((res) => {
        console.log("Book updated successfully:", res.data);
        navigate("/");
      })
      .catch((err) => console.error("Error updating book:", err));
  };

  return (
    <div className="d-flex align-items-center mt-3 flex-column">
      <h1>Update Book</h1>
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

export default UpdateBook;
