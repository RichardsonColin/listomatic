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

exports.exchangesGetBasePairs = async (req, res) => {
  const { id } = req.params
  const { rows } = await db.query(`SELECT DISTINCT bp.id, bp.symbol
    FROM exchange_cryptocurrency_base_pair_references ref
    INNER JOIN base_pairs bp
    ON bp.id = ref.base_pair_id
    WHERE ref.exchange_id = $1
    ORDER BY bp.symbol;`, [id])
  res.json(rows)
}

exports.exchangesGetTradingPairs = async (req, res) => {
  const { exchange_id, base_pair_id } = req.params
  const { rows } = await db.query(`SELECT DISTINCT c.id, e.name AS exchange_name, bp.symbol AS base_pair_symbol, c.symbol AS cryptocurrency_symbol
    FROM exchange_cryptocurrency_base_pair_references ref
    INNER JOIN exchanges e
    ON e.id = ref.exchange_id
    INNER JOIN base_pairs bp
    ON bp.id = ref.base_pair_id
    INNER JOIN cryptocurrencies c
    ON c.id = ref.cryptocurrency_id
    WHERE ref.exchange_id = $1
    AND ref.base_pair_id = $2
    ORDER BY bp.symbol;`, [exchange_id, base_pair_id])
  res.json(rows)
}