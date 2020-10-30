import React from 'react'
import { Link } from "react-router-dom";
import '../css/nav.css';

function Nav() {
  return (
    <nav className="nav">
      <Link className="navbar-brand" to='/'>
        <h2>Listomatic</h2>
      </Link>
    </nav>
  )
}

export default Nav;
