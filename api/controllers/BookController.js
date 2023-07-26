const Book = require('../models/books');

class BookController {
    static async createBook(req, res) {
        const { name, location_id } = req.body;

        try {
            await Book.create(name, location_id);
            res.json({ message: 'Book created successfully.'});
        } catch (err) {
            console.log('Error creating book: ', err.message);
            res.status(500).json({ message: 'Error creating book.' })
        }
    }

    static async updateBook(req, res) {
        const { id } = req.params;
        const { name, location_id } = req.body;

        try {
            await Book.update(id, name, location_id);
            res.json({ message: 'Book updated successfully.'});
        } catch (err) {
            console.log('Error updating book: ', err.message);
            res.status(500).json({ message: 'Error updating book.' })
        }
    }

    static async deleteBook(req, res) {
        const { id } = req.params;

        try {
            await Book.delete(id);
            res.json({ message: 'Book deleted successfully.'});
        } catch (err) {
            console.log('Error deleting book: ', err.message);
            res.status(500).json({ message: 'Error deleting book.' })
        }
    }
}

module.exports = BookController;