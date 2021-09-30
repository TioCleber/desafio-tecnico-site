import React from "react";
import { Link } from 'react-router-dom';

import '../styles/global.css';
import '../styles/header.css';

function Header() {
  return (
    <header>
      <nav>
        <ul className="list-route">
          <li><Link to="/" >Home</Link></li>
          <li><Link to="busca">Lista Registrados</Link></li>
        </ul>
      </nav>
    </header>
  )
}

export default Header;