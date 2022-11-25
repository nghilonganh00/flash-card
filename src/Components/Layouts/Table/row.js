import classNames from 'classnames/bind';
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from 'react';
import styles from './Table.module.scss';
import { removeWord, updatewordInfoHandle } from '../../CRUB/CRUB'
import DropdownBtn from '../../Button/DropdownBtn/index';

const cx = classNames.bind(styles);

function Row({ wordInfo, index, data, setData }) {
    // Parameter
    const {id, word, date} = wordInfo;
    const mean = wordInfo.mean.toString()
    var color;
    const correct = wordInfo.result ? wordInfo.result.filter(function(e){return e === "correct"}).length : 0;
    const sum = wordInfo.result ? wordInfo.result.length : 0;
    const ratioCorrect = sum === 0 ? 0 : correct / sum ;
    const result = `${correct}/${sum}`;
    
    // Set color according to the correct answer ratio of the word
    if(ratioCorrect < 0.2) {
        color = "#dc3545"; 
    } else if(0.2 <= ratioCorrect && ratioCorrect < 0.5) {
        color = "#ffc107";
    } else if(0.5 <= ratioCorrect && ratioCorrect < 0.7) {
        color = "#17a2b8"
    } else {
        color = "#00c851"
    }
    
    //Delete a word
    const handleDel = (e, id) => {
        removeWord(id);
        const newData = data.filter((word) => {
            return word.id !== id
        })
        setData(newData)
        e.stopPropagation()
    }
    
    //Read more
    const [isReadMore, setIsReadMore] = useState(false);
    const readMoreRef = useRef();
    const toggleReadMore = (e) => {
        setIsReadMore(!isReadMore);
    };
    // Dropdown
    
    return ( 
        <div className={cx('row')} ref={readMoreRef} onClick={toggleReadMore}>
            <span className={cx('lineColor')} style={{ 
                backgroundColor: color,
            }}>
            </span>
            <div className={cx('containLess')}>
                <div className={cx('col', 'col-1')} >{index+1}</div>
                <div className={cx('col', 'col-2')} >{`${word.charAt(0).toUpperCase() + word.slice(1)}`}</div>
                <div className={cx('col', 'col-3')} >{mean}</div>
                <div className={cx('col', 'col-4')} >{result}</div>
                <div className={cx('col', 'col-5')} >
                    <div className={cx('ratioText')}>{`${Math.round(ratioCorrect * 100)}%`}</div>
                    <div className={cx('progress')}>
                        { ratioCorrect !== 0 && 
                            <div 
                                className={cx('ratioLine')} 
                                style={{ 
                                    backgroundColor: color,
                                    width: `${ratioCorrect * 100}%`,
                                }}
                            >
                            </div>
                        }
                    </div>
                </div>
                <div className={cx('col')} >
                    <DropdownBtn wordInfo={wordInfo} data={data} autoUpdate/>
                </div>
                <div className={cx('col')} >
                    <div className={cx('btn')} onClick={(e) => handleDel(e, id)}>
                        <FontAwesomeIcon icon={faTrashCan} />
                    </div>
                </div>
            </div>
            { isReadMore && <div className={cx('containMore')}>
                
            </div>}
        </div>                        
     );
}
export default Row;
