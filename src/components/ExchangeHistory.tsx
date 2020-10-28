import React, { useState, useEffect } from 'react'
// import '../css/donate.css';

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
    setExchangeStartDate(list.slice(-1)[0].created_at)
    setExchangeAssets(list)
  }

  useEffect(() => {
    getExchangeHistory()
  }, [])

  return (
    <div>
      <div>
        {
          exchangeAssets.length > 0 &&
          exchangeAssets.map((item: ExchangeHistoryUI) => (
            // <DonationAddress key={address.id} {...address} />
            new Date(exchangeStartDate).toLocaleDateString() !== new Date(item.created_at).toLocaleDateString() ?
              <div>
                {item.asset_symbol} : {new Date(item.created_at).toLocaleDateString()}
              </div> :
              null
          ))
        }
      </div>
    </div>
  )
}

export default ExchangeHistory;
