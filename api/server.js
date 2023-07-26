const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const db = require('./db');
const Book = require('./models/books');
const Location = require('./models/locations');
const BookController = require('./controllers/BookController');
const LocationController = require('./controllers/LocationController');


db.serialize(() => {
    Book.createTable()
        .then(() => Location.createTable())
        .then(() => console.log('Tables created successfully'))
        .catch((err) => {
            console.log('Database Error: ', err);
        });
});

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());


app.get('/api/locations/current/:id', LocationController.getLocationById);
app.post('/api/locations', LocationController.createLocation);
app.put('/api/locations/:id', LocationController.updateLocation);
app.delete('/api/locations/:id', LocationController.deleteLocation);

app.post('/api/books', BookController.createBook);
app.put('/api/books/:id', BookController.updateBook);
app.delete('/api/books/:id', BookController.deleteBook);


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});