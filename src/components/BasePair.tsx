import React, { useEffect, useState } from 'react'
import '../css/base-pair.css';

interface BasePairProps {
  id: string;
  exchange_id: string;
  symbol: string;
  updated_at: string;
  fetchTradingPairs: (exchange_id: string, basePairId: string) => void;
}

function BasePair(props: BasePairProps) {
  return (
    <div>
      <button className="alt-btn"
        onClick={() => props.fetchTradingPairs(props.exchange_id, props.id)}
      >{props.symbol}</button>
    </div>
  )
}

export default BasePair;
