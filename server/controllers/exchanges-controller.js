const db = require('../db')

// Controller for GET request to '/exchanges'
exports.exchangesGetAll = async (req, res) => {
  const { filter, limitFrom, limitTotal } = req.query
  let queryStatement = `SELECT *,
    (SELECT MAX(created_at)
      FROM exchange_asset_pair_references ref
      WHERE ref.exchange_id = e.id) AS last_addition
    FROM exchanges e
    WHERE EXISTS(
      SELECT 1 FROM exchange_asset_pair_references
      WHERE exchange_id = e.id
    )`
  let queryParams = []

  // Filter query by search word
  if(filter !== undefined) {
    queryParams.push(filter)
    queryStatement += ` AND LOWER(e.name) LIKE LOWER('%' || $${queryParams.length} || '%')`
  }

  // Limit/offset query by value
  if(limitFrom !== undefined && limitTotal !== undefined) {
    // let perLimit = 20
    queryParams.push(limitTotal, limitFrom)
    queryStatement += ` ORDER BY id LIMIT $${queryParams.length - 1} OFFSET $${queryParams.length}`
  }

  const { rows } = await db.query(queryStatement, queryParams)
  res.json(rows)
}

// Controller for GET request to '/exchanges/:id'
exports.exchangesGetOne = async (req, res) => {
  const { id } = req.params
  const { rows } = await db.query('SELECT * FROM exchanges WHERE id = $1;', [id])
  res.json(rows[0])
}

exports.exchangesGetQuotes = async (req, res) => {
  const { id } = req.params
  const { rows } = await db.query(`SELECT DISTINCT quote_symbol
    FROM exchange_asset_pair_references
    WHERE exchange_id = $1
    AND is_stale = FALSE
    AND quote_symbol != asset_symbol
    ORDER BY quote_symbol;`, [id])
  res.json(rows)
}

exports.exchangesGetAssets = async (req, res) => {
  const { id } = req.params
  const { rows } = await db.query(`SELECT DISTINCT quote_symbol, asset_symbol, created_at
    FROM exchange_asset_pair_references
    WHERE exchange_id = $1
    AND is_stale = FALSE
    AND quote_symbol != asset_symbol
    ORDER BY created_at DESC;`, [id])
  res.json(rows)
}

exports.exchangesGetTradingPairs = async (req, res) => {
  const { exchangeId, assetId } = req.params
  const { rows } = await db.query(`SELECT DISTINCT ref.id, e.api_id AS api_id, ref.quote_symbol AS quote_symbol, ref.asset_symbol AS asset_symbol
    FROM exchange_asset_pair_references ref
    INNER JOIN exchanges e
    ON e.id = ref.exchange_id
    WHERE ref.exchange_id = $1
    AND ref.quote_symbol = $2
    AND ref.is_stale = FALSE
    AND ref.quote_symbol != ref.asset_symbol
    ORDER BY ref.asset_symbol;`, [exchangeId, assetId])
  res.json(rows)
}