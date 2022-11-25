import classNames from 'classnames/bind';
import { BrowserRouter as Router, Switch, Route, Link, Routes } from "react-router-dom";
import styles from './App.module.scss';
import axios from 'axios';

import Main from './pages/Main/index';
import Store from './pages/Store/index'
import NavBar from './Components/Layouts/NavBar/';

const cx = classNames.bind(styles)
function App() {
  const axios = require("axios");

  return (
    <Router>
      <div className='App'>
        <div className={cx('wrapper')}>
          <NavBar />
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/store" element={<Store />} />
          </Routes>
        </div>
        </div>
    </Router>
  );
}

export default App;
