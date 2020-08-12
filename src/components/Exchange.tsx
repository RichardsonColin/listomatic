import React, { useEffect, useState } from 'react'
import BasePair from './BasePair'
import '../css/exchange.css';

interface BasePairUI {
  id: string;
  exchange_id: string;
  symbol: string;
  updated_at: string;
}

interface ExchangeProps {
  id: string;
  name: string;
  description: string;
  website_url: string;
  logo_url: string;
  country_origin: string;
  grade: string;
  volume_24_hour: string;
  updated_at: string;
}

function Exchange(props: ExchangeProps) {
  const [basePairsList, setBasePairsList] = useState<BasePairUI[]>([])

  const fetchBasePairs = async (exchangeId: string) => {
    const basePairs = await fetch(`/exchanges/${exchangeId}/base-pairs`)
      .then(res => res.json()) // Process the incoming data
    basePairs.map((pair: any) => pair.exchange_id = exchangeId)
    // Update basePairsList state
    setBasePairsList(basePairs)
  }

  // Use useEffect to call fetchMessage() on initial render
  useEffect(() => {
    fetchBasePairs(props.id)
  }, [])



  // const updated = new Date(props.updated_at).toDateString()
  const updated = props.updated_at
  return (
    <article className="exchange">
      <header>
        <div>
          {
            props.logo_url !== null &&
            <a href={props.website_url} target="#">
              <img src={props.logo_url} alt={`logo for ${props.name}`} />
            </a>
          }
          <h2>{props.name}</h2>
        </div>
        <div>
          <span>
            <strong>24H Volume</strong>: {parseFloat(props.volume_24_hour) > 0 ?
              `${parseFloat(props.volume_24_hour).toFixed(0)} BTC` :
              'Unknown'}
          </span>
          <span><strong>Grade</strong>: {props.grade}</span>
        </div>
      </header>
      <main>
        <div className="exchange-pairs-container">
          {basePairsList.length > 0 &&
            basePairsList.map((basePair: BasePairUI) => (
              <BasePair key={basePair.id} {...basePair} />
            ))
          }
        </div>
      </main>
      <footer>
        <span><strong>Origin</strong>: {props.country_origin}</span>
        <span><strong>Updated</strong>: {updated}</span>
      </footer>
    </article>
  )
}

export default Exchange;
