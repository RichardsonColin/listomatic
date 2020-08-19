import React from 'react'
import '../css/search-form.css';

interface SearchFormProps {
  setLimit: any,
  setExchangesList: any,
  filter: string,
  setFilter: any,
  fetchExchanges: (filter: string, limit: number) => void;
}

function SearchForm(props: SearchFormProps) {

  const handleSubmit = (evt: any) => {
    evt.preventDefault()
    props.setLimit(0)
    props.setExchangesList([])
    props.fetchExchanges(props.filter, 0)
  }

  const handleChange = (evt: any) => {
    props.setFilter(evt.target.value)
  }

  const handleBlur = (evt: any) => {
    if (props.filter !== undefined && !props.filter.length) {
      props.setLimit(0)
      props.setExchangesList([])
      props.fetchExchanges(props.filter, 0)
    }
  }

  return (
    <div className="search-form-container">
      <form onSubmit={handleSubmit}>
        <label>
          Filter exchanges:
          <input
            type="text"
            placeholder="Exchange name"
            value={props.filter}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </label>
        <button className="main-btn" type="submit">Search</button>
      </form>
    </div>
  )
}

export default SearchForm;
