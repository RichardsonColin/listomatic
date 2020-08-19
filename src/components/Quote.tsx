import React from 'react'
import '../css/quote.css';

interface QuoteProps {
  id: string;
  exchange_id: string;
  symbol: string;
  updated_at: string;
  fetchTradingPairs: (exchange_id: string, quoteId: string) => void;
}

function Quote(props: QuoteProps) {
  return (
    <div>
      <button className="alt-btn"
        onClick={() => props.fetchTradingPairs(props.exchange_id, props.id)}
      >{props.symbol}</button>
    </div>
  )
}

export default Quote;
