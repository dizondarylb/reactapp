const db = require('../db');

class Location {
    static createTable() {
        const sql = `
            CREATE TABLE IF NOT EXISTS locations (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                parent_location_id INTEGER,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (parent_location_id) REFERENCES locations(id) ON DELETE SET NULL
            );
        `;

        return new Promise((resolve, reject) => {
            db.run(sql, (err) => {
                if (err) reject(err);
                else resolve();
            });
        });
    }

    static getDefaultLocation() {
        const query = `SELECT * FROM locations WHERE parent_location_id IS NULL;`;

        return new Promise((resolve, reject) => {
            db.all(query, (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });
    }

    static getByParentId(parent_location_id) {
        const query = `SELECT * FROM locations WHERE parent_location_id = ?;`;

        return new Promise((resolve, reject) => {
            db.all(query, [parent_location_id], (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });
    }

    static getLocationUntilRoot(id) {
        const query = `
            WITH RECURSIVE LocationCTE(id, name, parent_location_id, path) AS (
                SELECT id, name, parent_location_id, CAST(name AS TEXT) as path
                FROM locations WHERE id = ?
                UNION ALL
                SELECT l.id, l.name, l.parent_location_id, l.name || ' > ' || lcte.path
                FROM locations l
                JOIN LocationCTE lcte on lcte.parent_location_id = l.id
            ) SELECT * FROM LocationCTE ORDER BY id;
        `;

        return new Promise((resolve, reject) => {
            db.all(query, [id], (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });
    }

    static create(name, parent_location_id) {
        return new Promise((resolve, reject) => {
            const query = `
                INSERT INTO locations (name, parent_location_id) VALUES (?, ?);
            `;

            db.run(query, [name, parent_location_id], (err) => {
                if (err) {
                    reject(err);
                } else  {
                    resolve(this.lastID);
                }
            });
        });
    }

    static update(id, name, parent_location_id) {
        return new Promise((resolve, reject) => {
            const query = `UPDATE locations SET name = ?, parent_location_id = ? WHERE id = ?`;

            db.run(query, [name, parent_location_id, id], (err) => {
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
            const query = `DELETE FROM locations WHERE id = ?`;

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

module.exports = Location;