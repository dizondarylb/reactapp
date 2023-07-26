const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('database.db', (err) => {
    if(err) {
        console.log('Error connecting to the database: ', err.message);
    } else {
        console.log('Connected to the database.');
    }
});

db.run('PRAGMA foreign_keys = ON');

module.exports = db;