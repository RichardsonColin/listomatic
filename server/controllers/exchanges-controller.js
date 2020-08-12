const db = require('../db')

// Controller for GET request to '/exchanges'
exports.exchangesGetAll = async (req, res) => {
  const { rows } = await db.query('SELECT * FROM exchanges;', [])
  console.log(rows)
  res.json(rows)
}

// Controller for GET request to '/exchanges/:id'
exports.exchangesGetOne = async (req, res) => {
  const { id } = req.params
  const { rows } = await db.query('SELECT * FROM exchanges WHERE id = $1', [id])
  console.log(rows)
  res.json(rows[0])
}