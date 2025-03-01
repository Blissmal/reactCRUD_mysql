import express from 'express';
import mysql from 'mysql';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
    host: "127.0.0.1",
    user: "blissmal",
    password: "bliss",
    database: "bliss",
    dateStrings: 'date'
});


db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log("MySQL Connected...");
});

// Routes
app.get('/', (req, res) => {
    const sql = "SELECT * FROM books";
    db.query(sql, (err, data) => {
        if (err) {
            return res.status(500).json({ error: "Error fetching books" });
        }
        return res.json(data);
    });
});

app.post('/create', (req, res) => {
    const { publisher, name, date } = req.body;
    const sql = "INSERT INTO books (publisher, name, date) VALUES (?, ?, ?)";
    const values = [publisher, name, date];
    db.query(sql, values, (err, result) => {
        if (err) {
            return res.status(500).json({ error: "Error creating book" });
        }
        return res.json({ message: "Book created successfully", id: result.insertId });
    });
});

app.put('/update/:id', (req, res) => {
    const { publisher, name, date } = req.body;
    const sql = "UPDATE books SET publisher = ?, name = ?, date = ? WHERE id = ?";
    const id = req.params.id;
    const values = [publisher, name, date, id];
    db.query(sql, values, (err, result) => {
        if (err) {
            return res.status(500).json({ error: "Error updating book" });
        }
        return res.json({ message: "Book updated successfully", result });
    });
});

app.delete('/delete/:id', (req, res) => {
    const sql = "DELETE FROM books WHERE id = ?";
    const id = req.params.id;
    db.query(sql, [id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: "Error deleting book" });
        }
        return res.json({ message: "Book deleted successfully", result });
    });
});

app.get('/getRecord/:id', (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM books WHERE id = ?";

    db.query(sql, [id], (err, data) => {
        if (err) {
            return res.status(500).json({ error: "Error fetching book" });
        }
        // Check if data exists
        if (data.length === 0) {
            return res.status(404).json({ error: "Book not found" });
        }
        return res.json(data);  // Return the fetched book data
    });
});


const PORT = 3030;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
