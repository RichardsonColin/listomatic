import React, { useEffect, useState, useRef } from 'react'
import { Switch, Route, Redirect, RouteComponentProps } from 'react-router-dom';
// import ExchangeHistory from './ExchangeHistory'
import SearchForm from './SearchForm'
import Exchange from './Exchange'

interface MatchParams {
  id: string;
}

interface MatchProps extends RouteComponentProps<MatchParams> {
}

// TODO: App wide - implement general hooks

const QUERY_LIMIT = 20

interface ExchangeUI {
  id: string;
  name: string;
  description: string;
  url: string;
  image: string;
  origin: string;
  grade: string;
  volume_24_hour: string;
  updated_at: string;
  last_addition: string;
}

function Routes() {
  // Prepare state hook for exchanges list
  const [exchangesList, setExchangesList] = useState<ExchangeUI[]>([])
  // Manages infinite scroll items
  const [filter, setFilter] = useState('')
  const [limit, setLimit] = useState(0)
  const [isFetching, setIsFetching] = useState(false)
  const [maxReached, setMaxReached] = useState(false)
  const scrollElm: any = useRef(null)

  // Create async function for fetching exchanges list
  const fetchExchanges = async (filter: string, limit: number) => {
    setIsFetching(true)
    setMaxReached(false)
    // TODO: refactor querystring creation
    let limitTotal = String(QUERY_LIMIT)
    let limitFrom = String(limit)
    let params = { filter, limitFrom, limitTotal }
    let queryString = new URLSearchParams(params).toString()
    let url = `/exchanges?${queryString}`

    const fetchedExchanges = await fetch(url)
      .then(res => res.json())
    // Update exchangesList state
    if (fetchedExchanges.length) {
      setExchangesList(exchanges => [...exchanges, ...fetchedExchanges])
    } else {
      setMaxReached(true)
    }
    setIsFetching(false)
  }

  const fetchMoreExchanges = () => {
    setLimit(limit => {
      let newLimit = limit + QUERY_LIMIT
      fetchExchanges(filter, newLimit)
      return newLimit
    })
  }

  const onScroll = (evt: any) => {
    let scrollHeight = scrollElm.current.scrollHeight - scrollElm.current.offsetHeight
    let scrollPosition = scrollElm.current.scrollTop

    if (!isFetching && !maxReached) {
      // Fetch if 90% scrolled
      (scrollPosition / scrollHeight) * 100 > 90 && fetchMoreExchanges()
    }
  }

  useEffect(() => {
    fetchExchanges('', limit)
  }, [])

  const getAllExchanges = () => {
    return <div>
      <header className="app-header">
        <div className="content-center">
          <SearchForm
            setLimit={setLimit}
            filter={filter}
            setFilter={setFilter}
            setExchangesList={setExchangesList}
            fetchExchanges={fetchExchanges}
          />
        </div>
      </header>
      <main className="app-main" ref={scrollElm} onScroll={onScroll}>
        <div className="content-center">
          {exchangesList.length > 0 &&
            exchangesList.map((exchange: ExchangeUI) => (
              <Exchange key={exchange.id} {...exchange} />
            ))
          }
        </div>
      </main>
    </div>
  }
  // const getHistory = ({ match }: MatchProps) => {
  //   const { params } = match
  //   return <main className="app-main">
  //     <ExchangeHistory {...params} />
  //   </main>
  // }
  return (
    <Switch>
      <Route
        exact
        path='/'
        render={getAllExchanges}
      />
      {/* <Route exact path='/history/:id' render={getHistory} /> */}
      <Redirect to='/' />
    </Switch>
  );
}


export default Routes;
