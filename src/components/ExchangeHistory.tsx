import React, { useState, useEffect } from 'react'
import '../css/exchange-history.css';

interface ExchangeHistoryUI {
  quote_symbol: string;
  asset_symbol: string;
  created_at: string;
}

interface ExchangeHistoryProps {
  id: string;
}

function ExchangeHistory(props: ExchangeHistoryProps) {
  const [exchangeAssets, setExchangeAssets] = useState<ExchangeHistoryUI[]>([])
  const [exchangeStartDate, setExchangeStartDate] = useState('')

  const getExchangeHistory = async () => {
    const list = await fetch(`/exchanges/${props.id}/assets`)
      .then(res => res.json())
    setExchangeStartDate(new Date(list.slice(-1)[0].created_at).toLocaleDateString())
    setExchangeAssets(list)
  }

  const displayHistoryList = () => {
    let dateToDisplay = ''
    let setDate = false

    return exchangeAssets.length ?
      exchangeAssets.map((item: ExchangeHistoryUI) => {
        let itemDate = new Date(item.created_at).toLocaleDateString()
        if (dateToDisplay !== itemDate) {
          dateToDisplay = itemDate
          setDate = true
        } else {
          setDate = false
        }

        if (exchangeStartDate !== itemDate) {
          return <div key={`${item.quote_symbol}-${item.asset_symbol}`} className="history-wrapper">
            {setDate ?
              <div className="history-date">{dateToDisplay}</div> :
              null
            }
            <span className="history-asset">
              {item.quote_symbol}:{item.asset_symbol}
            </span>
          </div>
        }
        return null
      }) :
      null
  }

  useEffect(() => {
    getExchangeHistory()
  }, [])

  return (
    <div>
      <div>
        {displayHistoryList()}
      </div>
    </div>
  )
}

export default ExchangeHistory;
