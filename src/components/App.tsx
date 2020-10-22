import React from 'react'
import Routes from "./Routes";
import Nav from './Nav'
import Donate from './Donate'
import Footer from './Footer'

function App() {
  return (
    <div className="app">
      <Nav />
      <Routes />
      <Donate />
      <Footer />
    </div>
  )
}

export default App;
