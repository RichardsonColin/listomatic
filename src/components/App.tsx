import React, { useEffect, useState } from 'react'
import Exchange from './Exchange'
import Footer from './Footer'

interface ExchangeUI {
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

function App() {
  // Prepare state hook for welcome message
  const [welcomeMessage, setWelcomeMessage] = useState('')

  // Prepare state hook for exchanges list
  const [exchangesList, setExchangesList] = useState<ExchangeUI[]>([])

  // Create async function for fetching welcome message
  const fetchMessage = async () => {
    // Use Fetch API to fetch '/api' endpoint
    const message = await fetch('/api')
      .then(res => res.text()) // process incoming data
    // Update welcomeMessage state
    setWelcomeMessage(message)
  }
  // Create async function for fetching users list
  const fetchExchanges = async () => {
    const exchanges = await fetch('/exchanges')
      .then(res => res.json()) // Process the incoming data
    // exchanges.sort((a: any, b: any) => a.name.localeCompare(b.name))
    exchanges.sort((a: any, b: any) => {
      a.volume_24_hour = a.volume_24_hour === null ? 0 : a.volume_24_hour
      b.volume_24_hour = b.volume_24_hour === null ? 0 : b.volume_24_hour
      return Number.parseFloat(b.volume_24_hour) - Number.parseFloat(a.volume_24_hour)
    })
    // Update usersList state
    setExchangesList(exchanges)
  }

  // Use useEffect to call fetchMessage() on initial render
  useEffect(() => {
    fetchMessage()
    fetchExchanges()
  }, [])

  return (
    <div className="app">
      <header className="app-header">
        <p>{welcomeMessage}</p>
        <button className="main-btn" onClick={fetchExchanges}>Fetch exchanges</button>
      </header>
      <main className="app-main">
        <div className="content-center">
          {exchangesList.length > 0 &&
            exchangesList.map((exchange: ExchangeUI) => (
              <Exchange key={exchange.id} {...exchange} />
            ))
          }
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default App;
