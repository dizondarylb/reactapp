const db = require('../db');

class Book {
    static createTable() {
        const sql = `
            CREATE TABLE IF NOT EXISTS books (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                location_id INTEGER,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (location_id) REFERENCES locations(id) ON DELETE SET NULL
            );
        `;

        return new Promise((resolve, reject) => {
            db.run(sql, (err) => {
                if (err) reject(err);
                else resolve();
            });
        });
    }

    static getByLocationId(id) {
        const query = `SELECT * FROM books WHERE location_id = ?;`;

        return new Promise((resolve, reject) => {
            db.all(query, [id], (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });
    }

    static create(name, location_id) {
        return new Promise((resolve, reject) => {
            const query = `INSERT INTO books (name, location_id) VALUES (?, ?)`;

            db.run(query, [name, location_id], (err) => {
                if (err) {
                    reject(err);
                } else  {
                    resolve(this.lastID);
                }
            });
        });
    }

    static update(id, name, location_id) {
        return new Promise((resolve, reject) => {
            const query = `UPDATE books SET name = ?, location_id = ? WHERE id = ?`;

            db.run(query, [name, location_id, id], (err) => {
                if (err) {
                    reject(err);
                } else  {
                    resolve(this.changes);
                }
            });
        });
    }
    
    static delete(id) {
        return new Promise((resolve, reject) => {
            const query = `DELETE FROM books WHERE id = ?`;

            db.run(query, [id], (err) => {
                if (err) {
                    reject(err);
                } else  {
                    resolve(this.changes);
                }
            });
        });
    }
}

module.exports = Book;