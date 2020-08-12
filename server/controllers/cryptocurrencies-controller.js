const db = require('../db')

// Controller for GET request to '/cryptocurrencies'
exports.cryptocurrenciesGetAll = async (req, res) => {
  const { rows } = await db.query('SELECT * FROM cryptocurrencies;', [])
  res.json(rows)
}

// Controller for GET request to '/cryptocurrencies/:id'
exports.cryptocurrenciesGetOne = async (req, res) => {
  const { id } = req.params
  const { rows } = await db.query('SELECT * FROM cryptocurrencies WHERE id = $1', [id])
  res.json(rows[0])
}