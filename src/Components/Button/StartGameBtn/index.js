import classNames from "classnames/bind";

import styles from './StartGameBtn.module.scss'

const cx = classNames.bind(styles)
function StartGameBtn({ children, onClick }) {
    const props = {
        onClick,
    }
    console.log(props)
    return ( 
        <div className={cx('wrapper')} {...props}>
            <span className={cx('border')}></span>
            <span className={cx('border')}></span>
            <span className={cx('border')}></span>
            <span className={cx('border')}></span>
            {children}
        </div>
     );
}
export default StartGameBtn