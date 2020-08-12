import React, { useEffect, useState } from 'react'
import '../css/exchange.css';

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
  // const [basePairList, setBasePairList] = useState<BasePairUI[]>([])
  const updated = new Date(props.updated_at).toDateString()
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
            <strong>24H Volume</strong>:
            {parseFloat(props.volume_24_hour) > 0 ?
              `${parseFloat(props.volume_24_hour).toFixed(0)} BTC` :
              'Unknown'}
          </span>
          <span><strong>Grade</strong>: {props.grade}</span>
        </div>
      </header>
      <main>

      </main>
      <footer>
        <p><strong>Origin</strong>: {props.country_origin}</p>
        <p><strong>Updated</strong>: {updated}</p>
      </footer>
    </article>
  )
}

export default Exchange;
