import classNames from "classnames/bind";
import { removeWord, updateDataHandle } from '../../CRUB/CRUB'
import styles from './Table.module.scss'
import Row from "./row";
const cx = classNames.bind(styles)

function Table({dataFitered, data, setData}) {
    return ( 
        <div className={cx('wrapper')} >
            <div className={cx('row', 'head')}>
                <div className={cx('col', 'col-1')}>#ID</div>
                <div className={cx('col', 'col-2')}>Word</div>
                <div className={cx('col', 'col-3')}>Mean</div>
                <div className={cx('col', 'col-4')}>Result</div>
                <div className={cx('col', 'col-5')}>Progress</div>
                <div className={cx('col', 'col-6')}>L&R</div>
                <div className={cx('col', 'col-7')}>Sunday</div>
            </div>
            <div className={cx('body')}>
                {
                    dataFitered.map((wordInfo, index) => { 
                        return <Row wordInfo = {wordInfo} data = {data} setData = {setData} index = {index} key={index}/>
                    })
                }
            </div>
        </div>
    );
}

export default Table