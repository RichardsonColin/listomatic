const db = require('../db')

// Controller for GET request to '/base-pairs'
exports.basePairsGetAll = async (req, res) => {
  const { rows } = await db.query('SELECT * FROM base_pairs;', [])
  res.json(rows)
}

// Controller for GET request to '/base-pairs/:id'
exports.basePairsGetOne = async (req, res) => {
  const { id } = req.params
  const { rows } = await db.query('SELECT * FROM base_pairs WHERE id = $1', [id])
  res.json(rows[0])
}