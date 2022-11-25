import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import rabbitLegacy from "crypto-js/rabbit-legacy";
import { removeWord } from "../../CRUB/CRUB";
import styles from './Table.module.scss'

const cx = classNames.bind(styles)

function Table({dataFitered, data, setData}) {
    const handleDel = (id) => {
        removeWord(id);
        const newData = data.filter((word) => {
            return word.id !== id
        })
        setData(newData)
    }

    return ( 
        <div className={cx('wrapper')} >
            <div className={cx('row', 'head')}>
                <div className={cx('column')}>#ID</div>
                <div className={cx('column')}>Word</div>
                <div className={cx('column')}>Mean</div>
                <div className={cx('column')}>Result</div>
                <div className={cx('column')}>Progress</div>
                <div className={cx('column')}>Sunday</div>
                <div className={cx('column')}>Sunday</div>
            </div>
            <div className={cx('body')}>
                {
                    dataFitered.map((wordInfo, index) => { 
                        const {id, word, mean, date} = wordInfo;
                        var color;
                        const correct = wordInfo.result.filter(function(e){return e === "correct"}).length;
                        const sum = wordInfo.result.length
                        const result = `${correct}/${sum}`;
                        const ratioCorrect = correct / sum;
                        if(ratioCorrect < 0.2) {
                            color = "#dc3545";
                        } else if(0.2 <= ratioCorrect && ratioCorrect < 0.5) {
                            color = "#ffc107";
                        } else if(0.5 <= ratioCorrect && ratioCorrect < 0.7) {
                            color = "#17a2b8"
                        } else {
                            color = "#00c851"
                        }
                        console.log(color);
                        return <div className={cx('row')} key={index}>
                            <span className={cx('lineColor')} style={{ backgroundColor: color }}></span>
                            <div className={cx('column')} >{index+1}</div>
                            <div className={cx('column')} >{word.charAt(0).toUpperCase() + word.slice(1)}</div>
                            <div className={cx('column')} >{mean.charAt(0).toUpperCase() + mean.slice(1)}</div>
                            <div className={cx('column')} >{result}</div>
                            <div className={cx('column')} >
                                <div className={cx('progress')}>
                                    <div 
                                        className={cx('ratio')} 
                                        style={{ 
                                            backgroundColor: color,
                                            width: `${ratioCorrect * 100}%`,

                                         }}
                                    ></div>
                                </div>
                            </div>
                            <div className={cx('column')} >{date}</div>
                            <div className={cx('column')} >
                                <div className={cx('btn')} onClick={(e) => handleDel(id)}>
                                    <FontAwesomeIcon icon={faTrashCan} />
                                </div>
                            </div>
                        </div>
                    })
                }
            </div>
        </div>
    );
}

export default Table