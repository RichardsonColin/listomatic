const db = require('../db')

// Controller for GET request to '/assets'
exports.assetsGetAll = async (req, res) => {
  const { rows } = await db.query('SELECT * FROM assets;', [])
  res.json(rows)
}

// Controller for GET request to '/assets/:id'
exports.assetsGetOne = async (req, res) => {
  const { id } = req.params
  const { rows } = await db.query('SELECT * FROM assets WHERE id = $1', [id])
  res.json(rows[0])
}