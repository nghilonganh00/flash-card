import { useState, useRef, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, Routes } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faHome } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import './Resert.scss';
import './App.scss';
import api from './Components/api/contacts'
import { StateToolProvider } from './Components/Provider';
import Main from './Components/Main/Main';
import Store from './Components/Store/store'

function App() {
  
  return (
    <Router>
      <div className="App">
        <nav className={`navBar $`}>
          <ul>
            <li className='itemNav'>
              <Link to="/">
                <FontAwesomeIcon icon={faHome}/>
              </Link>
            </li>
            <li className='itemNav'>
              <Link to="/store" style={{marginLeft: 3}}>
                <FontAwesomeIcon icon={faBook} />
              </Link>
            </li>
            <li className='itemNav'>
              <Link to="/">
                <FontAwesomeIcon icon={faHome} />
              </Link>
            </li>
            <li className='itemNav'>
              <Link to="/">
                <FontAwesomeIcon icon={faHome} />
              </Link>
            </li>
          </ul>
          <div className='btnNav'>
            <FontAwesomeIcon icon={faHome}/>
          </div>
        </nav>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/store" element={<StateToolProvider><Store /></StateToolProvider>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
