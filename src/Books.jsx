import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Books = () => {
    const [books, setBooks] = useState([])

    useEffect(() => {
        axios
        .get("http://localhost:3030")
        .then(res => setBooks(res.data))
        .catch(err => console.log(err))
    }, [])

    const handleDelete = (id) => {
        axios.delete(`http://localhost:3030/delete/${id}`)
        .then(() => window.location.reload())
        .catch(err => console.log(err))
    }

    return (
        <div className='container mt-5'>
            <Link to='/create' className='btn btn-success mb-2'>Create book</Link>
            {books.length !== 0 ? 
                <table className='table'>
                    <thead>
                        <tr>
                            <th scope='col'>#</th>
                            <th scope='col'>Publisher</th>
                            <th scope='col'>Book Name</th>
                            <th scope='col'>Date</th>
                            <th scope='col'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            books.map((book, index) => (
                                <tr key={book.id}>
                                    <td>{index + 1}</td>
                                    <td>{book.publisher}</td>
                                    <td>{book.name}</td>
                                    <td>{book.date}</td>
                                    <td>
                                        <Link to={`/update/${book.id}`} className='btn btn-info btn-sm me-2'>Update</Link>
                                        <button onClick={() => handleDelete(book.id)} className='btn btn-danger btn-sm'>Delete</button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table> 
                : 
                <h2>No records</h2>
            }
        </div>
    )
}

export default Books
