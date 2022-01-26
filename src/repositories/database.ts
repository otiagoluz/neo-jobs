import sqlite3 from 'sqlite3'
const SOURCE = 'db.sqlite'
const SQL_JOBS_CREATE = `
    CREATE TABLE jobs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        description TEXT
    )`
const database = new sqlite3.Database(SOURCE, (err) => {
    if (err) {
        console.error(err.message)
        throw err
    } else {
        console.log('Database successfully connected.')
        database.run(SQL_JOBS_CREATE, (err) => {
            if (err) {
                console.log(err);
            } else {
                console.log('Jobs table created.')
            }
        })
    }
})
export default database