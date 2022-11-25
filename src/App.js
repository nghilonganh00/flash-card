import classNames from 'classnames/bind';
import { useState, useRef, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, Routes } from "react-router-dom";
import axios from 'axios';
import styles from './App.module.scss';
import api from './Components/api/contacts'
import { StateToolProvider } from './Components/Provider';

import Main from './pages/Main/index';
import Store from './pages/Store/index'
import NavBar from './Components/Layouts/NavBar/';

const cx = classNames.bind(styles)
function App() {
  
  return (
    <Router>
      <div className='App'>
        <div className={cx('wrapper')}>
          <NavBar />
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/store" element={<StateToolProvider><Store /></StateToolProvider>} />
          </Routes>
        </div>
        </div>
    </Router>
  );
}

export default App;
