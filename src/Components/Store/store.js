import classNames from 'classnames/bind'
import { Howl } from 'howler';
import { useState, useEffect, useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrashCan, faHeadphonesSimple } from '@fortawesome/free-solid-svg-icons';
import styles from './store.module.scss'
import { StateToolContext } from '../Provider'
import { retrieveWords, removeWord } from '../CRUB/CRUB'
import { DisplayToolAdd } from '../Tools/Tools'

const cx = classNames.bind(styles);

function Store() {
    const contextStateTool = useContext(StateToolContext)
    const [ data, setData ] = useState([])
    const lenghtData = data.length

    useEffect(() => {
        const stateTool = contextStateTool.stateTool
        const newData = contextStateTool.addedData
        
        if(stateTool === 'hidden') {
            if(newData) {
                setData([newData, ...data])
            }
        }
    },[contextStateTool.stateTool])

    useEffect(() => {
        const getAllWords = async () => {
            const allWordsReverse = await retrieveWords()
            const allWords = allWordsReverse.reverse()
            if(allWords) setData(allWords)
        }
        getAllWords()
    }, [])    
    const handleSingleRemove = (id) => {
        removeWord(id)
        const newData = data.filter((word) => {
            return word.id !== id
        })
        setData(newData)
    }
    const soundPlay = (src) => {
        const sound = new Howl ({
            src, 
            html5: true,
        })
        sound.play();
    }
    const handleSpeaking = (audio) => {
        audio.play()
    }
    return (
        <div>
            <div className={cx('tableWords')}>
                <div className={cx('container')}>
                    <div className={cx('headerTable')}>
                        <div className={cx('category')}>ID</div>
                        <div className={cx('category')}>Word</div>
                        <div className={cx('category')}>Mean</div>
                        <div className={cx('category')}>Result</div>
                        <div className={cx('category')}>Date</div>
                    </div>
                    <div className={cx('bodyTable')}>
                        <div className={cx('containerBody')}>
                            {
                                data.map((infoWord, index) => {
                                    return <div key={index} className={cx('infoWord')}>
                                        <h4 className={cx('idWord')}>{index + 1}</h4>
                                        <h4 className={cx('textWord')}>{infoWord.word}</h4>
                                        <h4 className={cx('meanWord')}>{infoWord.mean}</h4>
                                        <h4 className={cx('resultWord')}>{infoWord.result}</h4>
                                        <h4 className={cx('dateWord')} style={{marginRight: 10}}>{infoWord.date}</h4>
                                        <div 
                                            className={cx('btnSingleRemove')}
                                            onClick={(e) => handleSingleRemove(infoWord.id)}
                                        > 
                                            <FontAwesomeIcon icon={faTrashCan} />
                                        </div>  
                                        <div
                                            className={cx('btnSignleRemove')}
                                            onClick={(e) => soundPlay(infoWord.audio)}
                                        >
                                            <FontAwesomeIcon icon={faHeadphonesSimple} />
                                        </div>
                                       
                                    </div>
                                } )
                            }
                        </div> 
                    </div>
                </div>
            </div>
            <div className={cx('toolBar')}>
                <div className={cx('toolContainer')}>
                    <div className={cx('btnTool')}>
                        <FontAwesomeIcon icon={faPlus} onClick={contextStateTool.handleStateTool}/>
                    </div>
                    <div className={cx('btnTool')}>
                        <FontAwesomeIcon icon={faTrashCan} />
                    </div>
                    <div className={cx('btnTool')}>
                        <FontAwesomeIcon icon={faPlus} />
                    </div>
                    <div className={cx('btnTool')}>
                        <FontAwesomeIcon icon={faPlus} />
                    </div>
                </div>
            </div>
            <div className={`displayTool ${contextStateTool.stateTool}`}>
                <div className={cx('overlay')}></div> 
                <div className={cx('contanierTool')}>
                    <DisplayToolAdd visibility={contextStateTool.stateTool} lengthData={lenghtData}/>
                </div>
            </div>
        </div>
    )
}
export default Store