import { BrowserRouter as Router, Switch, Route, Link, Routes } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faHome } from '@fortawesome/free-solid-svg-icons';
import classNames from "classnames/bind";
import styles from './NavBar.module.scss'

const cx = classNames.bind(styles)
function NavBar() {
    return ( 
        <nav className={cx('navBar')}>
          <div className={cx('wrapper')}>
            <ul className={cx('top')}>
              <li className={cx('item')}>
                <Link to="/">
                  <FontAwesomeIcon icon={faHome}/>
                </Link>
              </li>
              <li className={cx('item')}>
                <Link to="/store">
                  <FontAwesomeIcon icon={faHome} />
                </Link>
              </li>
              <li className={cx('item')}>
                <Link to="/">
                  <FontAwesomeIcon icon={faHome} />
                </Link>
              </li>
              <li className={cx('item')}>
                <Link to="/">
                  <FontAwesomeIcon icon={faHome} />
                </Link>
              </li>
            </ul>
          </div>
        </nav>
     );
}

export default NavBar;