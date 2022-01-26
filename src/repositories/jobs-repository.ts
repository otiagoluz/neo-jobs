import Job from '../models/job'
import database from './database'

const jobsRepository = {
  create: (job: Job, callback: (id?: number) => void) => {
    const sql = 'INSERT INTO jobs (name, description) VALUES (?, ?)';
    const params = [job.name, job.description];
    database.run(sql, params, function(_err) {
        callback(this?.lastID)
    })
  },

  index: (callback: (jobs: Job[]) => void) => {
    const sql = 'SELECT * FROM jobs';
    const params: any[] = [];
    database.all(sql, params, (_err, rows) => callback(rows))
  },

  detail: (id: number, callback: (job?: Job) => void) => {
    const sql = 'SELECT * FROM jobs WHERE id = ?';
    const params = [id];
    database.get(sql, params, (_err, row) => callback(row))
  },

  update: (id: number, job: Job, callback: (notFound: boolean) => void) => {
    const sql = 'UPDATE jobs SET name = ?, description = ? WHERE id = ?';
    const params = [job.name, job.description, id];
    database.run(sql, params, function(_err) {
        callback(this?.changes === 0);
    })
  },

  delete: (id: number, callback: (notFound: boolean) => void) => {
    const sql = 'DELETE FROM jobs WHERE id = ?';
    const params = [id];
    database.run(sql, params, function(_err) {
      callback(this?.changes === 0);
    })
  }

}
export default jobsRepository