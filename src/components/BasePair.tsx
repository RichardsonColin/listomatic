import React, { useEffect, useState } from 'react'
import '../css/base-pair.css';

interface BasePairProps {
  id: string;
  symbol: string;
  updated_at: string;
}

function BasePair(props: BasePairProps) {
  // console.log(props)
  // const [basePairsList, setBasePairsList] = useState<BasePairUI[]>([])
  return (
    <div>
      <button className="alt-btn">{props.symbol}</button>
    </div>
  )
}

export default BasePair;
